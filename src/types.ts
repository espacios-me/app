/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type StrategyFocus = 'LEAD_GEN' | 'WHATSAPP_SALES' | 'AI_AUTOMATION' | 'EMAIL_NURTURE' | 'CRM_INFRA' | 'CUSTOM_WORKFLOWS';

export interface BusinessDetails {
  companyName: string;
  currentBottleneck: string;
  growthGoal: string;
  strategyFocus: StrategyFocus;
  auditDepth: 'EXPRESS' | 'STANDARD' | 'COMPREHENSIVE';
}

export interface RoadmapStep {
    index: number;
    title: string;
    text: string;
    audioBuffer: AudioBuffer | null;
}

export interface GrowthRoadmap {
  totalSteps: number;
  executiveSummary: string;
  steps: RoadmapStep[];
}

export enum AppState {
  PLANNING,
  GENERATING_ROADMAP,
  READY_TO_VIEW
}
