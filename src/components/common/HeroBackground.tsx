// Hero background (modular): assembles particles, passing shapes, and anchored shapes
import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { DPR, CAMERA_FOV, CAMERA_Z, FOG } from '../three/constants';
import GalaxyParticles from '../three/GalaxyParticles';
import PassingShapes from '../three/PassingShapes';
import AnchoredShapes from '../three/AnchoredShapes';
import LightRig from '../three/LightRig';

const HeroShapes: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      >
        <fog attach="fog" args={[FOG.color, FOG.near, FOG.far]} />

        <LightRig intensityScale={1} />

        <GalaxyParticles isMobile={isMobile} />
        <PassingShapes isMobile={isMobile} />
        <AnchoredShapes isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default HeroShapes;
