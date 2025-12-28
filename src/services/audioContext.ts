/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Singleton AudioContext manager to avoid creating multiple instances.
 * Creating multiple AudioContext instances can be inefficient and may hit browser limits.
 */

let audioContext: AudioContext | null = null;

/**
 * Gets or creates the global AudioContext instance with proper browser compatibility.
 * Handles both standard AudioContext and webkit prefixed version for Safari compatibility.
 */
export const getAudioContext = (): AudioContext => {
  if (!audioContext || audioContext.state === 'closed') {
    // Type-safe way to handle webkit prefixed AudioContext
    const AudioContextClass = window.AudioContext || (window as typeof window & {
      webkitAudioContext: typeof AudioContext
    }).webkitAudioContext;

    if (!AudioContextClass) {
      throw new Error('AudioContext is not supported in this browser');
    }

    audioContext = new AudioContextClass();
  }

  return audioContext;
};

/**
 * Resumes the AudioContext if it's in a suspended state.
 * This is required by some browsers after user interaction.
 */
export const resumeAudioContext = async (): Promise<void> => {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
};

/**
 * Closes the global AudioContext instance.
 * Should only be called when the app is shutting down or audio is no longer needed.
 */
export const closeAudioContext = async (): Promise<void> => {
  if (audioContext && audioContext.state !== 'closed') {
    await audioContext.close();
    audioContext = null;
  }
};
