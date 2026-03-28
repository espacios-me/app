#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const workspace = process.cwd();
const manifestPath = path.join(workspace, 'config', 'trusted-workers', 'secrets.manifest.json');
const probesPath = path.join(workspace, 'config', 'trusted-workers', 'key-probes.json');

function readJson(file) {
  if (!fs.existsSync(file)) throw new Error(`Missing file: ${file}`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function envName() {
  const raw = (process.env.ATOM_ENV || process.env.NODE_ENV || 'development').toLowerCase();
  if (raw === 'prod') return 'production';
  if (raw === 'stage') return 'preview';
  return raw;
}

function timeoutSignal(ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, cleanup: () => clearTimeout(timer) };
}

function duplicateNames(items, key) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of items) {
    const value = item?.[key];
    if (!value) continue;
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

async function runHttpBearer(secretValue, probe) {
  const { signal, cleanup } = timeoutSignal(12000);
  try {
    const response = await fetch(probe.url, {
      method: probe.method || 'GET',
      headers: {
        Authorization: `Bearer ${secretValue}`,
        Accept: 'application/json'
      },
      signal
    });
    return response;
  } finally {
    cleanup();
  }
}

async function runHttpQuery(secretValue, probe) {
  const { signal, cleanup } = timeoutSignal(12000);
  try {
    const url = new URL(probe.url);
    url.searchParams.set(probe.queryParamName || 'key', secretValue);
    const response = await fetch(url, {
      method: probe.method || 'GET',
      headers: { Accept: 'application/json' },
      signal
    });
    return response;
  } finally {
    cleanup();
  }
}

function consequenceBlock(probe) {
  return [
    'Choices:',
    `1) Best choice — rotate or re-add the key securely and test again.`,
    '   Consequence: provider-backed features should recover if the key is the real problem.',
    '2) Fastest choice — temporarily disable the affected provider feature.',
    '   Consequence: work can continue, but users lose that feature.',
    '3) Ignore it for now.',
    '   Consequence: runtime failures may keep happening and become harder to debug.'
  ].join('\n');
}

async function main() {
  const manifest = readJson(manifestPath);
  const probesConfig = readJson(probesPath);
  const duplicates = {
    secrets: duplicateNames(manifest.secrets || [], 'name'),
    probes: duplicateNames(probesConfig.probes || [], 'secretName')
  };

  const currentEnv = envName();
  const results = [];

  for (const probe of probesConfig.probes || []) {
    const secretName = probe.secretName;
    const secretValue = process.env[secretName];
    const manifestSecret = (manifest.secrets || []).find((item) => item.name === secretName);
    const requiredHere = Array.isArray(manifestSecret?.requiredIn) ? manifestSecret.requiredIn.includes(currentEnv) : false;

    if (!secretValue) {
      results.push({
        secretName,
        status: requiredHere ? 'missing' : 'skipped',
        plainEnglish: requiredHere ? `${secretName} is required in ${currentEnv} but is not present.` : `${secretName} is not set, so the probe was skipped.`
      });
      continue;
    }

    if (probe.type === 'manualOnly') {
      results.push({
        secretName,
        status: 'manual',
        plainEnglish: probe.plainEnglish,
        ifFail: probe.ifFail
      });
      continue;
    }

    try {
      const response = probe.type === 'httpQuery'
        ? await runHttpQuery(secretValue, probe)
        : await runHttpBearer(secretValue, probe);

      const successCodes = Array.isArray(probe.successStatus) ? probe.successStatus : [200];
      const ok = successCodes.includes(response.status);
      results.push({
        secretName,
        status: ok ? 'working' : 'failing',
        httpStatus: response.status,
        plainEnglish: ok
          ? `${secretName} appears to be accepted by the provider.`
          : `${secretName} was rejected or did not return the expected success code.` ,
        ifFail: probe.ifFail
      });
    } catch (error) {
      results.push({
        secretName,
        status: 'error',
        plainEnglish: `${secretName} could not be tested because the provider probe failed to complete.`,
        error: error instanceof Error ? error.message : String(error),
        ifFail: probe.ifFail
      });
    }
  }

  const wantsJson = process.argv.includes('--json');

  if (wantsJson) {
    console.log(JSON.stringify({ environment: currentEnv, duplicates, results }, null, 2));
  } else {
    console.log('Trusted Key Probe Report');
    console.log('========================');
    console.log(`Environment: ${currentEnv}`);
    console.log('');

    if (duplicates.secrets.length || duplicates.probes.length) {
      console.log('Duplicate warning:');
      if (duplicates.secrets.length) console.log(`- Duplicate secret definitions: ${duplicates.secrets.join(', ')}`);
      if (duplicates.probes.length) console.log(`- Duplicate probe definitions: ${duplicates.probes.join(', ')}`);
      console.log('Consequence: workers may produce conflicting or misleading results until duplicates are cleaned up.');
      console.log('');
    }

    for (const result of results) {
      console.log(`Secret: ${result.secretName}`);
      console.log(`Status: ${result.status}`);
      console.log(`Explanation: ${result.plainEnglish}`);
      if (typeof result.httpStatus === 'number') console.log(`HTTP status: ${result.httpStatus}`);
      if (result.ifFail && result.status !== 'working') console.log(`Impact: ${result.ifFail}`);
      if (result.error) console.log(`Technical note: ${result.error}`);
      if (result.status !== 'working') console.log(consequenceBlock(result));
      console.log('');
    }
  }

  const hasFailures = results.some((r) => ['missing', 'failing', 'error'].includes(r.status));
  const hasDuplicates = duplicates.secrets.length > 0 || duplicates.probes.length > 0;
  process.exit(hasFailures || hasDuplicates ? 1 : 0);
}

main().catch((error) => {
  console.error('Trusted Key Probe Worker failed.');
  console.error(`Reason: ${error instanceof Error ? error.message : String(error)}`);
  console.error('Choices:');
  console.error('1) Fix the configuration files now. Consequence: health checks become trustworthy.');
  console.error('2) Skip the probe temporarily. Consequence: bad keys or duplicates may go unnoticed.');
  process.exit(2);
});
