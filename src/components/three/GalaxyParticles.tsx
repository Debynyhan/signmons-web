import React, { useMemo, useRef } from 'react';
import { useTheme } from '@mui/material';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PARTICLES, getSceneColors } from './constants';
import { createStarTexture } from './materials';

export const GalaxyParticles: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const theme = useTheme();
  const { inner, outer, accent } = getSceneColors(theme);
  const pointsRef = useRef<THREE.Points>(null);

  const count = isMobile ? PARTICLES.mobileCount : PARTICLES.desktopCount;
  const radius = isMobile ? PARTICLES.radiusMobile : PARTICLES.radiusDesktop;
  const { branches, spin, randomness } = PARTICLES;

  const starTexture = useMemo(() => createStarTexture(64), []);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 0.9) * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const randomX = Math.random() ** 2 * (Math.random() < 0.5 ? -1 : 1) * randomness * r;
      const randomY = Math.random() ** 2 * (Math.random() < 0.5 ? -1 : 1) * randomness * 0.5 * r;
      const randomZ = Math.random() ** 2 * (Math.random() < 0.5 ? -1 : 1) * randomness * r;

      pos[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      pos[i3 + 1] = randomY * 0.6;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const t = r / radius;
      const mid = inner.clone().lerp(accent, 0.6);
      const c =
        t < 0.5 ? inner.clone().lerp(mid, t / 0.5) : mid.clone().lerp(outer, (t - 0.5) / 0.5);
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, [count, branches, radius, spin, randomness, inner, outer, accent]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    g.computeBoundingSphere();
    return g;
  }, [positions, colors]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03;
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      if (mat) {
        mat.size = (isMobile ? 0.095 : 0.12) + Math.sin(t * 0.9) * 0.012;
      }
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={[0, 0, -2]} frustumCulled={false}>
      <pointsMaterial
        size={isMobile ? 0.095 : 0.12}
        sizeAttenuation
        vertexColors
        map={starTexture}
        alphaMap={starTexture}
        transparent
        opacity={0.9}
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default GalaxyParticles;
