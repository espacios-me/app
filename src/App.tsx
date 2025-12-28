/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Loader2, AlertCircle, X } from 'lucide-react';
import StrategyPlanner from './components/StrategyPlanner';
import RoadmapViewer from './components/RoadmapViewer';
import { AppState, BusinessDetails, GrowthRoadmap } from './types';
import { generateGrowthRoadmap, generateStepContent, generateBriefingAudio } from './services/geminiService';
import { getAudioContext } from './services/audioContext';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.PLANNING);
  const [details, setDetails] = useState<BusinessDetails | null>(null);
  const [roadmap, setRoadmap] = useState<GrowthRoadmap | null>(null);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startAnalysis = async (input: BusinessDetails) => {
    setDetails(input);
    setAppState(AppState.GENERATING_ROADMAP);
    setErrorMessage(null);

    try {
        const { executiveSummary, stepOutlines } = await generateGrowthRoadmap(input);

        // Generate first step immediately
        const first = stepOutlines[0];
        const text = await generateStepContent(input, 1, stepOutlines.length, first.title, first.goal, "");
        const ctx = getAudioContext();
        const audio = await generateBriefingAudio(text, ctx);

        const initialRoadmap: GrowthRoadmap = {
            totalSteps: stepOutlines.length,
            executiveSummary,
            steps: [{ index: 1, title: first.title, text, audioBuffer: audio }]
        };

        setRoadmap(initialRoadmap);
        setAppState(AppState.READY_TO_VIEW);

        // Chain the rest of the steps in background
        fillRoadmap(input, initialRoadmap, stepOutlines);

    } catch (e) {
        console.error('Error generating roadmap:', e);
        const errorMsg = e instanceof Error ? e.message : 'An unexpected error occurred';
        setErrorMessage(`Failed to generate roadmap: ${errorMsg}. Please check your connection and try again.`);
        setAppState(AppState.PLANNING);
    }
  };

  const fillRoadmap = async (input: BusinessDetails, initial: GrowthRoadmap, outlines: any[]) => {
      let currentRoadmap = initial;
      for (let i = 1; i < outlines.length; i++) {
          const beat = outlines[i];
          const prevText = currentRoadmap.steps.map(s => s.text).join(" ");
          const text = await generateStepContent(input, i + 1, outlines.length, beat.title, beat.goal, prevText);

          const ctx = getAudioContext();
          const audio = await generateBriefingAudio(text, ctx);

          currentRoadmap = {
              ...currentRoadmap,
              steps: [...currentRoadmap.steps, { index: i + 1, title: beat.title, text, audioBuffer: audio }]
          };
          setRoadmap(currentRoadmap);
      }
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      {errorMessage && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded p-4 flex items-start gap-2">
          <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-red-600">
            <X size={20} />
          </button>
        </div>
      )}

      {appState === AppState.PLANNING && <StrategyPlanner onPlanCreated={startAnalysis} appState={appState} />}

      {appState === AppState.GENERATING_ROADMAP && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 size={48} className="animate-spin text-stone-900" />
        </div>
      )}

      {appState === AppState.READY_TO_VIEW && roadmap && details && (
        <RoadmapViewer
          roadmap={roadmap}
          details={details}
          currentPlayingIndex={currentPlayingIndex}
          onStepChange={setCurrentPlayingIndex}
          isGenerating={roadmap.steps.length < roadmap.totalSteps}
        />
      )}
    </div>
  );
}

export default App;
