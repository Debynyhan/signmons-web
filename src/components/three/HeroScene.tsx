import React, { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor, Stats } from '@react-three/drei';
// Optional dev perf overlay (install r3f-perf if desired)
// import { Perf } from 'r3f-perf';
import { useTheme, useMediaQuery } from '@mui/material';
import { CAMERA_FOV, CAMERA_Z, FOG, MODEL, PARTICLES } from './constants';
import LightRig from './LightRig';
import GalaxyParticles from './GalaxyParticles';
import PassingShapes from './PassingShapes';
import AnchoredShapes from './AnchoredShapes';
import SignmonsModel from './SignmonsModel';
import { useAudioAnalyser } from '../../hooks/useAudioAnalyser';
// Use direct public path for Vite static asset
const audioUrl = '/audio/audiosignmons.mp3';

const HeroScene: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [count, setCount] = useState<number>(
    isMobile ? PARTICLES.mobileCount : PARTICLES.desktopCount,
  );

  // Optional perf overlay toggle via env flag
  const showPerf = import.meta.env.DEV && String(import.meta.env.VITE_PERF_OVERLAY) === 'true';

  const camera = useMemo(
    () => ({ position: [0, 0, CAMERA_Z(isMobile)] as [number, number, number], fov: CAMERA_FOV }),
    [isMobile],
  );

  const adaptivePerf = String(import.meta.env.VITE_ADAPTIVE_PERF ?? 'false') === 'true';

  // Audio analyser to drive subtle dance moves
  const { amp, start } = useAudioAnalyser(audioUrl);
  // Expose a global starter so UI can call within the same user gesture
  useEffect(() => {
    (window as any).signmonsStartAudio = start;
    return () => {
      try {
        delete (window as any).signmonsStartAudio;
      } catch {}
    };
  }, [start]);
  useEffect(() => {
    let removed = false;
    const tryStart = async () => {
      const ok = await start();
      if (ok && !removed) {
        window.removeEventListener('pointerdown', onPointer);
        window.removeEventListener('signmons-start-audio', onPointer as EventListener);
        removed = true;
      }
    };
    const onPointer = () => void tryStart();
    if ((window as any).__signmonsWantsAudio) void tryStart();
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('signmons-start-audio', onPointer as EventListener);
    return () => {
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('signmons-start-audio', onPointer as EventListener);
    };
  }, [start]);

  return (
    <Canvas
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: false,
        premultipliedAlpha: true,
      }}
      dpr={[1, 1.5]}
      camera={camera}
      frameloop="always"
      shadows={false}
    >
      {/* Toggle with VITE_PERF_OVERLAY=true in .env.local */}
      {showPerf ? <Stats /> : null}
      <fog attach="fog" args={[FOG.color, FOG.near, FOG.far]} />

      {adaptivePerf && (
        <PerformanceMonitor
          onDecline={() => setCount((c) => Math.max(300, Math.floor(c * 0.85)))}
          onIncline={() =>
            setCount((c) => Math.min(isMobile ? 600 : PARTICLES.desktopCount, Math.ceil(c * 1.08)))
          }
        />
      )}
      <AdaptiveDpr pixelated={false} />

      <LightRig intensityScale={1} />

      <GalaxyParticles isMobile={isMobile} count={count} />
      <PassingShapes isMobile={isMobile} />
      <AnchoredShapes isMobile={isMobile} />

      <SignmonsModel
        url={MODEL.url}
        isMobile={isMobile}
        position={isMobile ? MODEL.mobile.position : MODEL.desktop.position}
        rotationY={isMobile ? MODEL.mobile.rotationY : MODEL.desktop.rotationY}
        // Subtle scale pulse with audio amplitude
        scale={(isMobile ? MODEL.mobile.scale : MODEL.desktop.scale) * (1 + amp * 0.03)}
        playFirstClip
        // Bobbing depth modulated by amp inside model via prop
        bob
        spin={0.18 + amp * 0.3}
      />
    </Canvas>
  );
};

export default HeroScene;
