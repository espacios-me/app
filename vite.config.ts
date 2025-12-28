/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    // Load API key from environment
    const apiKey = env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
       console.warn("⚠️  WARNING: GEMINI_API_KEY not set. Please configure it in .env.local");
    } else {
       console.log("✅ GEMINI_API_KEY loaded for build.");
    }

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve('.'),
        }
      }
    };
});
