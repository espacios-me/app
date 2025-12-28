/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { BusinessDetails, StrategyFocus } from "../types";
import { base64ToArrayBuffer, pcmToWav } from "./audioUtils";

// Use backend API proxy instead of direct Gemini API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const ESPACIOS_KNOWLEDGE_BASE = `
Espacios is a done-for-you growth and automation agency.
Services:
1. Lead Generation & Paid Ads (Meta, Google, Funnel strategy).
2. WhatsApp & Messaging Sales (Shared inboxes, lead routing, faster close rates).
3. AI-Powered Automation (First response, qualification, intent detection, AI Copilots).
4. Email Marketing & Nurturing (Drip sequences, CRM-linked automation).
5. CRM & Sales Infrastructure (HubSpot/Zoho setup, pipeline design).
6. Custom Workflows (Assignment rules, booking automation, data enrichment).
Approach: "We do the work for you. We run the system. Systems, not just tools."
`;

export const getStepCount = (depth: string): number => {
    switch (depth) {
        case 'EXPRESS': return 3;
        case 'STANDARD': return 5;
        case 'COMPREHENSIVE': return 8;
        default: return 5;
    }
};

const getFocusInstruction = (focus: StrategyFocus): string => {
    switch (focus) {
        case 'LEAD_GEN': return "Focus on demand generation, ad-to-WhatsApp funnels, and high-intent Google search strategy.";
        case 'WHATSAPP_SALES': return "Focus on conversational commerce, reducing lead leakage in DMs, and shared inbox efficiency.";
        case 'AI_AUTOMATION': return "Focus on using AI for lead qualification and instant response handling to scale without adding headcount.";
        case 'EMAIL_NURTURE': return "Focus on turning cold leads into long-term revenue through sophisticated drip sequences.";
        case 'CRM_INFRA': return "Focus on connecting silos, pipeline visibility, and single-source-of-truth setup.";
        case 'CUSTOM_WORKFLOWS': return "Focus on unique operational logic, booking automations, and removing manual data chaos.";
        default: return "Focus on holistic business growth and automation.";
    }
};

/**
 * Generates the high-level roadmap outline.
 * Calls backend API proxy which uses gemini-3-pro-preview for complex strategic reasoning.
 */
export const generateGrowthRoadmap = async (
    details: BusinessDetails
): Promise<{ executiveSummary: string; stepOutlines: { title: string; goal: string }[] }> => {
    const totalSteps = getStepCount(details.auditDepth);
    const focusInstruction = getFocusInstruction(details.strategyFocus);

    const prompt = `
    Act as a World-Class Growth Strategist from Espacios Agency.
    ${ESPACIOS_KNOWLEDGE_BASE}

    Target Company: ${details.companyName}
    Current Bottleneck: ${details.currentBottleneck}
    Desired Growth Goal: ${details.growthGoal}
    Strategy Focus: ${details.strategyFocus} (${focusInstruction})

    Generate a ${totalSteps}-step "Growth Path" roadmap.
    1. An executive summary (2-3 sentences) of the transformation.
    2. A list of exactly ${totalSteps} steps, each with a professional title and a strategic goal for that phase.

    Return JSON matching this schema:
    {
      "executiveSummary": "string",
      "steps": [{"title": "string", "goal": "string"}]
    }
    `;

    const response = await fetch(`${API_BASE_URL}/api/generate-roadmap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, totalSteps })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || 'Failed to generate roadmap');
    }

    const data = await response.json();
    return {
        executiveSummary: data.executiveSummary,
        stepOutlines: data.steps
    };
};

/**
 * Generates detailed narration for a single step.
 */
export const generateStepContent = async (
    details: BusinessDetails,
    stepIndex: number,
    totalSteps: number,
    stepTitle: string,
    stepGoal: string,
    previousContext: string = ""
): Promise<string> => {
    const focusInstruction = getFocusInstruction(details.strategyFocus);

    const prompt = `
    You are the Espacios Growth AI. You are delivering a professional strategic briefing for ${details.companyName}.
    This is Step ${stepIndex} of ${totalSteps} in their Growth Roadmap.
    Phase: ${stepTitle}
    Objective: ${stepGoal}

    Context: ${focusInstruction}
    Previous Context: ${previousContext.slice(-1000)}

    Task: Write the spoken narration for this phase. Be authoritative, tactical, and visionary.
    Don't just say what to do; say how Espacios executes it. Use terminology like "automation logic," "lead routing," or "conversion systems."
    Length: ~150-200 words.

    Output strictly the raw narration text. No titles or markdown.
    `;

    const response = await fetch(`${API_BASE_URL}/api/generate-step`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || 'Failed to generate step content');
    }

    const data = await response.json();
    return data.text;
};

/**
 * Transforms text into spoken audio using Gemini 2.5 Flash TTS via backend API.
 */
export const generateBriefingAudio = async (text: string, audioContext: AudioContext): Promise<AudioBuffer> => {
  const response = await fetch(`${API_BASE_URL}/api/generate-audio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voiceName: 'Zephyr' })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Failed to generate audio');
  }

  const data = await response.json();
  const { audioData, sampleRate } = data;

  if (!audioData) throw new Error("No audio data received.");

  // PCM data is converted to a WAV blob so it can be decoded by the browser's native decodeAudioData method.
  const wavArrayBuffer = await pcmToWav(base64ToArrayBuffer(audioData), sampleRate).arrayBuffer();
  return await audioContext.decodeAudioData(wavArrayBuffer);
};
