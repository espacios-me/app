# Trusted Secret Workers

This repository uses trusted workers to help with API key management without storing real secrets in Git.

## Rules

- Never commit a real API key.
- Never ask for a real API key in an issue or pull request.
- Only store secret names in the repository.
- Add real values through secure channels such as Wrangler secrets.
- Explain problems in plain language.
- Always provide choices and consequences.

## Files

- `config/trusted-workers/secrets.manifest.json`
- `scripts/trusted-workers/secret-doctor.mjs`

## Safe add flow

```bash
npx wrangler secret put OPENAI_API_KEY
```

Use the same pattern for any other secret name in the manifest.

## Secret doctor

Run:

```bash
node scripts/trusted-workers/secret-doctor.mjs
```

Or:

```bash
node scripts/trusted-workers/secret-doctor.mjs --json
```

The worker will tell you:

- what is missing
- why it matters
- what the best choice is
- what the consequence is if you ignore it

## Principle

Trusted workers should help operators safely manage configuration.
They should not silently move or expose real secret values.
