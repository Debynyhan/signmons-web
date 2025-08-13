// Hero background (modular): assembles particles, passing shapes, and anchored shapes
import React, { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { DPR, CAMERA_FOV, CAMERA_Z, FOG, PARTICLES, MODEL } from '../three/constants';
import GalaxyParticles from '../three/GalaxyParticles';
import PassingShapes from '../three/PassingShapes';
import AnchoredShapes from '../three/AnchoredShapes';
import LightRig from '../three/LightRig';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import SignmonsModel from '../three/SignmonsModel';

const HeroShapes: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [galaxyCount, setGalaxyCount] = useState<number>(isMobile ? 450 : PARTICLES.desktopCount);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={DPR}
        camera={{ position: [0, 0, CAMERA_Z(isMobile)], fov: CAMERA_FOV }}
        frameloop="always"
        shadows={false}
      >
        <fog attach="fog" args={[FOG.color, FOG.near, FOG.far]} />

        <PerformanceMonitor
          onDecline={() => setGalaxyCount((c) => Math.max(300, Math.floor(c * 0.8)))}
          onIncline={() =>
            setGalaxyCount((c) =>
              Math.min(isMobile ? 600 : PARTICLES.desktopCount, Math.ceil(c * 1.1)),
            )
          }
        />
        <AdaptiveDpr pixelated={false} />

        <LightRig intensityScale={1} />

        {/* Background visuals */}
        <GalaxyParticles isMobile={isMobile} count={galaxyCount} />
        <PassingShapes isMobile={isMobile} />
        <AnchoredShapes isMobile={isMobile} />

        {/* Foreground Signmons GLB */}
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
    </div>
  );
};

export default HeroShapes;
