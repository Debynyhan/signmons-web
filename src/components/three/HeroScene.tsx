import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor, Stats } from '@react-three/drei';
// Optional dev perf overlay (install r3f-perf if desired)
// import { Perf } from 'r3f-perf';
import { useTheme, useMediaQuery } from '@mui/material';
import { CAMERA_FOV, CAMERA_Z, DPR, FOG, MODEL, PARTICLES } from './constants';
import LightRig from './LightRig';
import GalaxyParticles from './GalaxyParticles';
import PassingShapes from './PassingShapes';
import AnchoredShapes from './AnchoredShapes';
import SignmonsModel from './SignmonsModel';

const HeroScene: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [count, setCount] = useState<number>(isMobile ? PARTICLES.mobileCount : PARTICLES.desktopCount);

  // Optional perf overlay toggle via env flag
  const showPerf = import.meta.env.DEV && String(import.meta.env.VITE_PERF_OVERLAY) === 'true';

  const camera = useMemo(
    () => ({ position: [0, 0, CAMERA_Z(isMobile)] as [number, number, number], fov: CAMERA_FOV }),
    [isMobile],
  );

  return (
    <Canvas
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance', stencil: false }}
      dpr={DPR}
      camera={camera}
      frameloop="always"
      shadows={false}
    >
  {/* Toggle with VITE_PERF_OVERLAY=true in .env.local */}
  {showPerf ? <Stats /> : null}
      <fog attach="fog" args={[FOG.color, FOG.near, FOG.far]} />

      <PerformanceMonitor
        onDecline={() => setCount((c) => Math.max(300, Math.floor(c * 0.8)))}
        onIncline={() =>
          setCount((c) => Math.min(isMobile ? 600 : PARTICLES.desktopCount, Math.ceil(c * 1.1)))
        }
      />
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
        scale={isMobile ? MODEL.mobile.scale : MODEL.desktop.scale}
        playFirstClip
        bob
        spin={0.18}
      />
    </Canvas>
  );
};

export default HeroScene;
