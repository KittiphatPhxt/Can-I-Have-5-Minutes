"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseHeartbeatOptions {
  bpm?: number;
  volume?: number;
  isMuted?: boolean;
}

export function useHeartbeat(
  enabled: boolean,
  options: UseHeartbeatOptions = {}
) {
  const { bpm = 64, volume = 0.45, isMuted = false } = options;
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isBeating, setIsBeating] = useState(false);

  // Play single pulse (either lub or dub)
  const playPulse = useCallback(
    (
      ctx: AudioContext,
      freqStart: number,
      freqEnd: number,
      duration: number,
      gainLevel: number
    ) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(
          freqEnd,
          ctx.currentTime + duration
        );

        // Lowpass to give it a deep, muffled body resonance
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(130, ctx.currentTime);

        const targetGain = isMuted ? 0 : volume * gainLevel;
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(targetGain, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + duration
        );

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
      } catch (err) {
        console.warn("Heartbeat synth error", err);
      }
    },
    [isMuted, volume]
  );

  // Play full 'lub-dub' double beat
  const triggerHeartbeat = useCallback(() => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    setIsBeating(true);
    // 1st beat: Lub
    playPulse(ctx, 58, 42, 0.14, 1.0);

    // 2nd beat: Dub (shortly after)
    setTimeout(() => {
      playPulse(ctx, 70, 48, 0.1, 0.75);
    }, 140);

    // Reset visual beat pulse
    setTimeout(() => {
      setIsBeating(false);
    }, 380);
  }, [playPulse]);

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsBeating(false);
      return;
    }

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!audioCtxRef.current && AudioContextClass) {
      audioCtxRef.current = new AudioContextClass();
    }

    // Trigger immediate first beat
    triggerHeartbeat();

    // Loop interval based on BPM
    const intervalMs = (60 / bpm) * 1000;
    timerRef.current = setInterval(triggerHeartbeat, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [enabled, bpm, triggerHeartbeat]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, []);

  return { isBeating };
}
