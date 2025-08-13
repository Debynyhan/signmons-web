import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useTheme } from '@mui/material';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PARTICLES, getSceneColors } from './constants';
import { createStarTexture } from './materials';

export const GalaxyParticles: React.FC<{ isMobile: boolean; count?: number }> = ({
  isMobile,
  count: countOverride,
}) => {
  const theme = useTheme();
  const { inner, outer, accent } = getSceneColors(theme);
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);

  const baseCount = isMobile ? PARTICLES.mobileCount : PARTICLES.desktopCount;
  const count = countOverride ?? baseCount;
  const maxCount = baseCount; // prebuild to the highest expected count for this device
  const radius = isMobile ? PARTICLES.radiusMobile : PARTICLES.radiusDesktop;
  const { branches, spin, randomness } = PARTICLES;

  const starTexture = useMemo(() => createStarTexture(64), []);

  // Memoized PointsMaterial instance to avoid recompiles/prop churn
  const material = useMemo(() => {
    const m = new THREE.PointsMaterial({
      size: isMobile ? 0.085 : 0.11,
      sizeAttenuation: true,
      vertexColors: true,
      map: starTexture,
      alphaMap: starTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
      alphaTest: 0.1,
    });
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starTexture, isMobile]);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(maxCount * 3);
    const col = new Float32Array(maxCount * 3);

    for (let i = 0; i < maxCount; i++) {
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
      // Base radial gradient color
      const base =
        t < 0.5 ? inner.clone().lerp(mid, t / 0.5) : mid.clone().lerp(outer, (t - 0.5) / 0.5);

      // Add subtle branch-biased vibrance (cyan vs. magenta) and HSL jitter for variety
      const branchPhase = (i % branches) / Math.max(1, branches);
      const bias = branchPhase < 0.5 ? outer : accent; // cyan-heavy vs magenta-heavy halves
      const mixAmt = 0.2 + Math.random() * 0.3; // 0.2–0.5 blend toward bias
      const c = base.clone().lerp(bias, mixAmt);
      const hueJitter = (Math.random() - 0.5) * 0.03; // ~±11° hue shift
      const satJitter = (Math.random() - 0.5) * 0.12; // subtle saturation jitter
      const lightJitter = (Math.random() - 0.5) * 0.06; // subtle lightness jitter
      c.offsetHSL(hueJitter, satJitter, lightJitter);
      const vibrance = 0.9 + Math.random() * 0.25; // 0.9–1.15 brightness range
      c.multiplyScalar(vibrance);

      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, [maxCount, branches, radius, spin, randomness, inner, outer, accent]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    g.setDrawRange(0, Math.min(count, maxCount));
    g.computeBoundingSphere();
    geometryRef.current = g;
    return g;
  }, [positions, colors]);

  // Only adjust draw range when count changes (avoid rebuilding attributes)
  useEffect(() => {
    const g = geometryRef.current;
    if (!g) return;
    g.setDrawRange(0, Math.min(count, maxCount));
  }, [count, maxCount]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    // Time-based rotation to avoid delta jitter; keep value bounded to avoid precision drift
    const t = clock.getElapsedTime() % 10000;
    pointsRef.current.rotation.y = t * 0.03;
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={[0, 0, -2]} frustumCulled={false}>
      <primitive attach="material" object={material} />
    </points>
  );
};

export default memo(GalaxyParticles);
