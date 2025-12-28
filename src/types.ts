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
  ROUTE_CONFIRMED,
  GENERATING_ROADMAP,
  READY_TO_VIEW,
  PRESENTING
}

/**
 * Story styles for the navigation-based growth narrative.
 */
export type StoryStyle = 'GROWTH' | 'NOIR' | 'CHILDREN' | 'HISTORICAL' | 'FANTASY';

/**
 * Details of the calculated route from Google Maps.
 */
export interface RouteDetails {
  startAddress: string;
  endAddress: string;
  distance: string;
  duration: string;
  durationSeconds: number;
  travelMode: 'WALKING' | 'DRIVING';
  voiceName: string;
  storyStyle: StoryStyle;
}

/**
 * A segment of the generated audio story.
 */
export interface StorySegment {
  index: number;
  text: string;
  audioBuffer: AudioBuffer | null;
}

/**
 * Complete audio story structure.
 */
export interface AudioStory {
  totalSegmentsEstimate: number;
  segments: StorySegment[];
}
