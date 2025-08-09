import React from 'react';
import { LIGHTS } from './constants';

export interface LightRigProps {
  // Multiplier applied to all light intensities for easy global tuning
  intensityScale?: number;
}

const LightRig: React.FC<LightRigProps> = ({ intensityScale = 1 }) => {
  return (
    <group>
      <ambientLight
        color={LIGHTS.ambient.color}
        intensity={LIGHTS.ambient.intensity * intensityScale}
      />
      <directionalLight
        color={LIGHTS.directional.color}
        intensity={LIGHTS.directional.intensity * intensityScale}
        position={LIGHTS.directional.position}
      />
    </group>
  );
};

export default LightRig;
