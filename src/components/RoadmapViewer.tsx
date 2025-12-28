/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronRight, CheckCircle2, Loader2, Volume2, TrendingUp, Building2, Target } from 'lucide-react';
import { GrowthRoadmap, BusinessDetails } from '../types';

interface Props {
  roadmap: GrowthRoadmap;
  details: BusinessDetails;
  currentPlayingIndex: number;
  onStepChange: (index: number) => void;
  isGenerating: boolean;
}

const RoadmapViewer: React.FC<Props> = ({ roadmap, details, currentPlayingIndex, onStepChange, isGenerating }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [buffering, setBuffering] = useState(false);

  const stopAudio = () => {
    if (sourceRef.current) {
        sourceRef.current.onended = null;
        try { sourceRef.current.stop(); } catch (e) {}
        sourceRef.current = null;
    }
  };

  const playStep = async (index: number) => {
    const step = roadmap.steps[index];
    if (!step?.audioBuffer) {
        setBuffering(true);
        return;
    }
    setBuffering(false);

    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    stopAudio();
    const source = audioContextRef.current.createBufferSource();
    source.buffer = step.audioBuffer;
    source.connect(audioContextRef.current.destination);
    sourceRef.current = source;

    source.onended = () => {
        if (index + 1 < roadmap.totalSteps) {
            onStepChange(index + 1);
        } else {
            setIsPlaying(false);
        }
    };
    source.start(0);
  };

  useEffect(() => {
    if (isPlaying) {
        playStep(currentPlayingIndex);
    } else {
        stopAudio();
    }
  }, [currentPlayingIndex, isPlaying, roadmap.steps]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in pb-32">
        {/* Header Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-editorial-900 text-white rounded-[2.5rem] p-10 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                    <TrendingUp size={200} />
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm border border-white/10">Strategic Briefing</div>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif leading-tight">Transformation Roadmap for {details.companyName}</h1>
                <p className="text-xl text-stone-300 font-light leading-relaxed max-w-2xl">
                    {roadmap.executiveSummary}
                </p>
                
                <div className="flex items-center gap-6 pt-4">
                    <button 
                        onClick={togglePlay}
                        className="bg-white text-editorial-900 h-16 w-16 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl group"
                    >
                        {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} className="ml-1" fill="currentColor" />}
                    </button>
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Status</div>
                        <div className="flex items-center gap-2">
                            {isPlaying ? (
                                <span className="text-green-400 font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    Active Briefing
                                </span>
                            ) : (
                                <span className="text-stone-500 font-medium">Briefing Paused</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-xl space-y-8">
                <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Current Objective</div>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-stone-100 rounded-2xl text-editorial-900 shrink-0"><Target size={20} /></div>
                        <p className="text-sm font-medium text-stone-600 leading-snug">{details.growthGoal}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-stone-400">System Blueprint</div>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-stone-100 rounded-2xl text-editorial-900 shrink-0"><CheckCircle2 size={20} /></div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-editorial-900 capitalize">{details.strategyFocus.replace('_', ' ')}</p>
                            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{details.auditDepth} Implementation</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Steps Grid */}
        <div className="space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 pl-4">Roadmap Execution Phases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmap.steps.map((step, idx) => {
                    const isCurrent = idx === currentPlayingIndex;
                    const isPast = idx < currentPlayingIndex;
                    
                    return (
                        <div 
                            key={idx}
                            onClick={() => onStepChange(idx)}
                            className={`group relative p-8 rounded-[2rem] border-2 transition-all cursor-pointer ${
                                isCurrent 
                                ? 'bg-white border-editorial-900 shadow-2xl scale-[1.03] z-10' 
                                : isPast 
                                ? 'bg-stone-50 border-stone-100 opacity-60' 
                                : 'bg-white border-stone-100 hover:border-stone-200 shadow-sm'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm ${isCurrent ? 'bg-editorial-900 text-white' : 'bg-stone-100 text-stone-400'}`}>
                                    0{step.index}
                                </div>
                                {isPast && <CheckCircle2 size={20} className="text-green-500" />}
                                {isCurrent && isPlaying && <Volume2 size={20} className="text-editorial-900 animate-bounce" />}
                            </div>
                            <h4 className={`text-xl font-serif mb-4 leading-tight ${isCurrent ? 'text-editorial-900' : 'text-stone-500'}`}>
                                {step.title}
                            </h4>
                            <div className={`text-sm leading-relaxed overflow-hidden transition-all ${isCurrent ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="pt-2 text-stone-600 border-t border-stone-100">
                                    {step.text}
                                </div>
                            </div>
                            {!isCurrent && (
                                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-2 flex items-center gap-1">
                                    View Details <ChevronRight size={12} />
                                </div>
                            )}
                        </div>
                    );
                })}

                {isGenerating && (
                    <div className="p-8 rounded-[2rem] border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-center space-y-4 animate-pulse bg-stone-50/50">
                        <Loader2 className="animate-spin text-stone-300" size={32} />
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Engineering Phase {roadmap.steps.length + 1}</div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default RoadmapViewer;
