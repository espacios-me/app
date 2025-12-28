/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Modality, Type } from '@google/genai';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini AI with API key from environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Generate growth roadmap endpoint
app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { prompt, totalSteps } = req.body;

    if (!prompt || !totalSteps) {
      return res.status(400).json({ error: 'Missing required fields: prompt, totalSteps' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveSummary: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  goal: { type: Type.STRING }
                },
                required: ["title", "goal"]
              }
            }
          },
          required: ["executiveSummary", "steps"]
        }
      }
    });

    const data = JSON.parse(response.text);
    res.json(data);
  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(500).json({
      error: 'Failed to generate roadmap',
      message: error.message
    });
  }
});

// Generate step content endpoint
app.post('/api/generate-step', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing required field: prompt' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });

    res.json({ text: response.text.trim() });
  } catch (error) {
    console.error('Error generating step:', error);
    res.status(500).json({
      error: 'Failed to generate step content',
      message: error.message
    });
  }
});

// Generate audio endpoint
app.post('/api/generate-audio', async (req, res) => {
  try {
    const { text, voiceName = 'Zephyr' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Missing required field: text' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName } }
        }
      }
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    const audioData = part?.inlineData?.data;

    if (!audioData) {
      throw new Error("No audio data received from Gemini API");
    }

    const mimeType = part?.inlineData?.mimeType || "audio/pcm;rate=24000";
    const match = mimeType.match(/rate=(\d+)/);
    const sampleRate = match ? parseInt(match[1], 10) : 24000;

    res.json({
      audioData,
      mimeType,
      sampleRate
    });
  } catch (error) {
    console.error('Error generating audio:', error);
    res.status(500).json({
      error: 'Failed to generate audio',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Espacios API Proxy Server running on port ${PORT}`);
  console.log(`🔑 API Key: ${process.env.GEMINI_API_KEY ? 'Loaded' : '❌ Missing'}`);
});
