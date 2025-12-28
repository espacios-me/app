/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Target, Zap, MessageSquare, Mail, Database, Workflow, Sparkles, Building2, AlertCircle } from 'lucide-react';
import { BusinessDetails, StrategyFocus, AppState } from '../types';

interface Props {
  onPlanCreated: (details: BusinessDetails) => void;
  appState: AppState;
}

const FOCUS_OPTIONS: { id: StrategyFocus; label: string; icon: React.ElementType; desc: string }[] = [
    { id: 'LEAD_GEN', label: 'Lead Generation', icon: Target, desc: 'Generate high-intent leads via Meta & Google.' },
    { id: 'WHATSAPP_SALES', label: 'WhatsApp Sales', icon: MessageSquare, desc: 'Turn messaging into a conversion machine.' },
    { id: 'AI_AUTOMATION', label: 'AI Automation', icon: Zap, desc: 'Scale responses with qualified AI first-responses.' },
    { id: 'EMAIL_NURTURE', label: 'Email Nurturing', icon: Mail, desc: 'Drip sequences that mature your leads.' },
    { id: 'CRM_INFRA', label: 'CRM & Pipeline', icon: Database, desc: 'Connect silos for full funnel visibility.' },
    { id: 'CUSTOM_WORKFLOWS', label: 'Custom Workflows', icon: Workflow, desc: 'Ops automation tailored to your logic.' },
];

const StrategyPlanner: React.FC<Props> = ({ onPlanCreated, appState }) => {
  const [details, setDetails] = useState<BusinessDetails>({
    companyName: '',
    currentBottleneck: '',
    growthGoal: '',
    strategyFocus: 'LEAD_GEN',
    auditDepth: 'STANDARD'
  });

  const isLocked = appState !== AppState.PLANNING;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (details.companyName && details.currentBottleneck && details.growthGoal) {
      onPlanCreated(details);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-10 transition-all duration-700 ${isLocked ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
      <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50 space-y-8">
        <div className="space-y-2">
            <h2 className="text-3xl font-serif text-editorial-900 tracking-tight">Growth Architecture</h2>
            <p className="text-stone-500 font-light">Define your current landscape and target vision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 pl-1">Company Name</label>
                <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <input 
                        type="text" 
                        required
                        placeholder="e.g. Acme Realty"
                        className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-editorial-900 focus:bg-white transition-all font-medium"
                        value={details.companyName}
                        onChange={e => setDetails({...details, companyName: e.target.value})}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 pl-1">Strategy Depth</label>
                <div className="flex bg-stone-100 p-1.5 rounded-2xl border border-stone-100 h-[58px]">
                    {(['EXPRESS', 'STANDARD', 'COMPREHENSIVE'] as const).map(d => (
                        <button
                            key={d}
                            type="button"
                            onClick={() => setDetails({...details, auditDepth: d})}
                            className={`flex-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${details.auditDepth === d ? 'bg-white text-editorial-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 pl-1">Current Bottleneck</label>
                <textarea 
                    required
                    placeholder="Where are you leaking leads or losing time? (e.g. Too many manual follow-ups, slow response to WhatsApp DMs...)"
                    className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl p-4 min-h-[100px] outline-none focus:border-editorial-900 focus:bg-white transition-all font-medium resize-none"
                    value={details.currentBottleneck}
                    onChange={e => setDetails({...details, currentBottleneck: e.target.value})}
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 pl-1">The Goal</label>
                <textarea 
                    required
                    placeholder="What does market dominance look like for you? (e.g. 2x lead volume, fully automated qualification...)"
                    className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl p-4 min-h-[100px] outline-none focus:border-editorial-900 focus:bg-white transition-all font-medium resize-none"
                    value={details.growthGoal}
                    onChange={e => setDetails({...details, growthGoal: e.target.value})}
                />
            </div>
        </div>

        <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 pl-1">Focus Pillar</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {FOCUS_OPTIONS.map(opt => {
                    const Icon = opt.icon;
                    const isActive = details.strategyFocus === opt.id;
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => setDetails({...details, strategyFocus: opt.id})}
                            className={`flex flex-col items-start p-5 rounded-3xl border-2 text-left transition-all ${isActive ? 'border-editorial-900 bg-editorial-900 text-white shadow-xl scale-[1.02]' : 'border-stone-100 bg-stone-50 text-stone-600 hover:border-stone-200 hover:bg-white'}`}
                        >
                            <Icon size={24} className={`mb-3 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                            <div className="font-bold text-sm mb-1">{opt.label}</div>
                            <div className={`text-[10px] leading-tight ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>{opt.desc}</div>
                        </button>
                    )
                })}
            </div>
        </div>

        <button
            type="submit"
            className="w-full bg-editorial-900 text-white py-6 rounded-3xl font-bold text-xl hover:bg-stone-800 transition-all shadow-2xl shadow-editorial-900/20 flex items-center justify-center gap-3 active:scale-[0.98]"
        >
            <Sparkles size={24} className="animate-pulse" />
            Generate Execution Roadmap
        </button>
      </div>
    </form>
  );
};

export default StrategyPlanner;
