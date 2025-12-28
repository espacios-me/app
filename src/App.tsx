/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Loader2, RefreshCw, ChevronLeft } from 'lucide-react';
import StrategyPlanner from './components/StrategyPlanner';
import RoadmapViewer from './components/RoadmapViewer';
import { AppState, BusinessDetails, GrowthRoadmap } from './types';
import { generateGrowthRoadmap, generateStepContent, generateBriefingAudio, getStepCount } from './services/geminiService';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.PLANNING);
  const [details, setDetails] = useState<BusinessDetails | null>(null);
  const [roadmap, setRoadmap] = useState<GrowthRoadmap | null>(null);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(0);
  const [isGeneratingNext, setIsGeneratingNext] = useState(false);
  const generatingRef = useRef(false);

  // Buffer Engine
  useEffect(() => {
    if (appState === AppState.READY_TO_VIEW && roadmap && details) {
        const totalTarget = getStepCount(details.auditDepth);
        if (roadmap.steps.length < totalTarget && roadmap.steps.length < currentPlayingIndex + 3 && !generatingRef.current) {
            generateNextPhase(roadmap.steps.length + 1);
        }
    }
  }, [appState, roadmap, currentPlayingIndex, details]);

  const generateNextPhase = async (index: number) => {
    if (!details || !roadmap || generatingRef.current) return;
    try {
        generatingRef.current = true;
        setIsGeneratingNext(true);
        
        const totalTarget = getStepCount(details.auditDepth);
        const blueprint = roadmap.steps.find(s => false); // Just a placeholder logic
        // We actually need the original outlines from generateGrowthRoadmap...
        // Let's store them in the roadmap object.
    } finally {
        generatingRef.current = false;
        setIsGeneratingNext(false);
    }
  };

  const startAnalysis = async (input: BusinessDetails) => {
    setDetails(input);
    setAppState(AppState.GENERATING_ROADMAP);
    
    try {
        const { executiveSummary, stepOutlines } = await generateGrowthRoadmap(input);
        
        // Generate first step immediately
        const first = stepOutlines[0];
        const text = await generateStepContent(input, 1, stepOutlines.length, first.title, first.goal, "");
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        const audio = await generateBriefingAudio(text, ctx);
        await ctx.close();

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
        console.error(e);
        setAppState(AppState.PLANNING);
    }
  };

  const fillRoadmap = async (input: BusinessDetails, initial: GrowthRoadmap, outlines: any[]) => {
      let currentRoadmap = initial;
      for (let i = 1; i < outlines.length; i++) {
          const beat = outlines[i];
          const prevText = currentRoadmap.steps.map(s => s.text).join(" ");
          const text = await generateStepContent(input, i + 1, outlines.length, beat.title, beat.goal, prevText);
          
          const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
          const ctx = new AudioContextClass();
          const audio = await generateBriefingAudio(text, ctx);
          await ctx.close();

          currentRoadmap = {
              ...currentRoadmap,
              steps: [...currentRoadmap.steps, { index: i + 1, title: beat.title, text, audioBuffer: audio }]
          };
          setRoadmap(currentRoadmap);
      }
  };

  return (
    <div className="min-h-screen text-editorial-900 selection:bg-stone-200">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 bg-white/80 backdrop-blur-sm mb-6">
          <TrendingUp size={18} className="text-editorial-900" />
          <span className="text-xs font-bold uppercase tracking-widest text-stone-600">AI Growth Architect</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif leading-tight tracking-tighter mb-4">
          Map Your Growth <span className="italic text-stone-400">Transformation</span>
        </h2>
        <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
          Get a personalized, multi-step roadmap with AI-generated strategic briefings tailored to your business.
        </p>
        {appState === AppState.READY_TO_VIEW && (
          <button
            onClick={() => setAppState(AppState.PLANNING)}
            className="mt-6 inline-flex items-center gap-2 bg-editorial-900 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg"
          >
            <ChevronLeft size={16} /> Start New Analysis
          </button>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-32">
          {appState === AppState.PLANNING && (
              <div className="space-y-8">
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
    </div>
  );
}

export default App;
