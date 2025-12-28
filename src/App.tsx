/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { TrendingUp, Loader2, ChevronLeft, AlertCircle, X } from 'lucide-react';
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
    <div className="min-h-screen bg-editorial-100 text-editorial-900 selection:bg-stone-200">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 font-serif text-2xl font-bold tracking-tight pointer-events-auto cursor-pointer" onClick={() => setAppState(AppState.PLANNING)}>
              <div className="bg-editorial-900 text-white p-2 rounded-xl shadow-lg">
                <TrendingUp size={24} />
              </div>
              <span className="hidden sm:inline">Espacios <span className="text-stone-400 italic">Growth</span></span>
          </div>
          
          {appState === AppState.READY_TO_VIEW && (
              <button 
                onClick={() => setAppState(AppState.PLANNING)}
                className="pointer-events-auto flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-stone-200 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-sm"
              >
                <ChevronLeft size={16} /> New Analysis
              </button>
          )}
      </nav>

      {/* Error notification */}
      {errorMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-full px-6 animate-fade-in">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-2xl flex items-start gap-4">
            <AlertCircle size={24} className="text-red-600 shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-1">Error</h3>
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="p-2 hover:bg-red-100 rounded-xl transition-colors shrink-0"
              aria-label="Close error message"
            >
              <X size={20} className="text-red-600" />
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-32">
          {appState === AppState.PLANNING && (
              <div className="space-y-16">
                  <div className="max-w-4xl">
                      <h1 className="text-6xl md:text-8xl font-serif leading-[0.95] tracking-tighter mb-8">
                          Turn attention into <span className="italic text-stone-400">revenue.</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-stone-500 font-light leading-relaxed max-w-2xl">
                          We don’t sell tools. We run systems. Use our AI Growth Architect to map your business transformation.
                      </p>
                  </div>
                  <StrategyPlanner onPlanCreated={startAnalysis} appState={appState} />
              </div>
          )}

          {appState === AppState.GENERATING_ROADMAP && (
              <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
                  <div className="relative">
                      <div className="absolute inset-0 bg-editorial-900/5 blur-3xl rounded-full scale-150 animate-pulse" />
                      <Loader2 size={64} className="animate-spin text-editorial-900 relative" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-4xl font-serif tracking-tight">Engineering Your Path</h2>
                    <p className="text-stone-500 font-light max-w-sm mx-auto">Analyzing systems, identifying leverage points, and synthesizing your strategy.</p>
                  </div>
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
      </main>

      <footer className="border-t border-stone-200 bg-white/50 backdrop-blur-sm py-20 px-6 mt-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-6">
                  <div className="flex items-center gap-2 font-serif text-2xl font-bold">
                    <TrendingUp size={24} /> Espacios
                  </div>
                  <p className="text-stone-600 leading-relaxed max-w-md font-light">
                      A done-for-you growth agency. We plan, execute, and optimize the systems that generate leads, manage conversations, and convert demand into revenue.
                  </p>
              </div>
              <div className="grid grid-cols-2 gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                  <div className="space-y-4">
                      <h4 className="text-editorial-900">Services</h4>
                      <ul className="space-y-2 font-medium tracking-normal text-stone-500 normal-case">
                          <li>Lead Gen & Paid Ads</li>
                          <li>WhatsApp Sales Systems</li>
                          <li>AI-Powered Automation</li>
                          <li>CRM Infrastructure</li>
                      </ul>
                  </div>
                  <div className="space-y-4">
                      <h4 className="text-editorial-900">Contact</h4>
                      <ul className="space-y-2 font-medium tracking-normal text-stone-500 normal-case">
                          <li>strategy@espacios.agency</li>
                          <li>Systems Consultation</li>
                          <li>Digital Transformation</li>
                      </ul>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
}

export default App;
