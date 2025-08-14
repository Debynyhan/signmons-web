import { useEffect, useMemo, useRef, useState } from 'react';

export type UseAudioAnalyserOptions = {
  loop?: boolean;
  fftSize?: number; // power of 2, default 2048
  smoothingTimeConstant?: number; // 0..1, default 0.8
  volume?: number;
};

// Returns amplitude (0..1), an imperative start() (user gesture), and the audio element
export function useAudioAnalyser(
  url: string,
  {
    loop = true,
    fftSize = 2048,
    smoothingTimeConstant = 0.8,
    volume = 0.8,
  }: UseAudioAnalyserOptions = {},
) {
  const audio = useMemo(() => {
    const el = new Audio(url);
    // iOS-friendly & CORS safe
    (el as any).playsInline = true;
    el.crossOrigin = 'anonymous';
    el.preload = 'auto';
    el.loop = loop;
    el.volume = volume;
    return el;
  }, [url, loop, volume]);
  const ctxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Float32Array | null>(null);
  const [amp, setAmp] = useState(0);
  const startingRef = useRef(false);

  useEffect(() => {
    const onErr = () => console.error('AUDIO ERROR', audio.error, 'src=', audio.src);
    const onCan = () => console.log('AUDIO canplay, src=', audio.src);
    audio.addEventListener('error', onErr);
    audio.addEventListener('canplay', onCan);
    return () => {
      audio.removeEventListener('error', onErr);
      audio.removeEventListener('canplay', onCan);
      try {
        audio.pause();
        // Do NOT clear src here; StrictMode double-invokes effects in dev
        // which would leave the element with an empty src when remounted.
      } catch {}
    };
  }, [audio]);

  const start = async (): Promise<boolean> => {
    // If audio is already playing, don't restart it.
    if (startingRef.current || (audio.currentTime > 0 && !audio.paused)) return false;

    startingRef.current = true;
    if (!ctxRef.current) {
      const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
      ctxRef.current = new Ctx();
      srcRef.current = ctxRef.current!.createMediaElementSource(audio);
      analyserRef.current = ctxRef.current!.createAnalyser();
      analyserRef.current.fftSize = fftSize;
      analyserRef.current.smoothingTimeConstant = smoothingTimeConstant;
      dataRef.current = new Float32Array(analyserRef.current.frequencyBinCount);
      srcRef.current.connect(analyserRef.current);
      analyserRef.current.connect(ctxRef.current!.destination);
    }
    try {
      if (ctxRef.current!.state === 'suspended') {
        await ctxRef.current!.resume();
      }
      // Ensure ready to play and from start
      if (!audio.src) {
        // If src was cleared by a previous cleanup (e.g., StrictMode), restore it.
        audio.src = url;
      }
      if (audio.readyState < 2) audio.load();
      audio.muted = false;
      audio.currentTime = 0;
      try {
        await audio.play();
      } catch (e) {
        // iOS unlock micro-kick
        try {
          audio.muted = true;
          await audio.play();
          audio.pause();
          audio.muted = false;
          audio.currentTime = 0;
          await audio.play();
        } catch (e2) {
          throw e2;
        }
      }
      // Notify listeners (e.g., TapForSound) that audio actually started
      window.dispatchEvent(new CustomEvent('signmons-audio-started'));
      return true;
    } catch (e) {
      // likely blocked until a user gesture
      return false;
    } finally {
      startingRef.current = false;
    }
  };

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const an = analyserRef.current;
      const arr = dataRef.current;
      if (an && arr) {
        (an as any).getFloatTimeDomainData(arr as any);
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
          const v = arr[i]; // already -1..1
          sum += v * v;
        }
        const rms = Math.sqrt(sum / arr.length); // 0..~1
        setAmp(Math.min(1, rms * 3.5));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // On page/tab hide, pause audio to avoid background playback; resume on show if user intended
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        try {
          audio.pause();
        } catch {}
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [audio]);

  // Expose the starter immediately (no effect) so it is available during the same render tick
  try {
    (window as any).signmonsStartAudio = start;
  } catch {}

  return { amp, start, audio } as const;
}
