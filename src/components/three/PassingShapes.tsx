import React, { memo, useMemo, useRef } from 'react';
import { useTheme } from '@mui/material';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  applyPositionGradient,
  createGradientStandardMaterial,
  getVibrantGradientStops,
} from './materials';

const PassingShapes: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const theme = useTheme();
  const gradientStops = useMemo(() => getVibrantGradientStops(theme), [theme]);

  const pool = isMobile ? 1 : 2;
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const activeRef = useRef<boolean[]>(Array(pool).fill(false));
  const velRef = useRef<THREE.Vector3[]>(Array.from({ length: pool }, () => new THREE.Vector3()));
  const alphaRef = useRef<number[]>(Array(pool).fill(0));
  const nextSpawnRef = useRef<number>(0.75); // slight initial delay and lower spawn rate

  const geos = useMemo(
    () => ({
      tetra: applyPositionGradient(new THREE.TetrahedronGeometry(0.4), gradientStops, 'y'),
      sphere: applyPositionGradient(new THREE.SphereGeometry(0.35, 16, 16), gradientStops, 'y'),
      box: applyPositionGradient(new THREE.BoxGeometry(0.38, 0.38, 0.38), gradientStops, 'y'),
    }),
    [gradientStops],
  );

  const material = useMemo(() => {
    const m = createGradientStandardMaterial();
    m.transparent = true;
    m.opacity = 0;
    return m;
  }, []);

  const spawnOne = (t: number) => {
    const idx = activeRef.current.findIndex((a) => !a);
    if (idx === -1) return;
    const m = meshesRef.current[idx];
    if (!m) return;
    const dir = 1;
    const y = (Math.random() - 0.5) * 2.2;
    const z = -1.2 + Math.random() * 2.2;
    const startX = dir > 0 ? -8 : 8;

    m.position.set(startX, y, z);
    m.rotation.set(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5);
    m.visible = true;

    const baseSpeed = isMobile ? 0.5 : 0.7;
    const depthFactor = 1 + (0.8 - (z + 1.2) / 2.2);
    velRef.current[idx].set(dir * baseSpeed * depthFactor, 0, (Math.random() - 0.5) * 0.15);

    alphaRef.current[idx] = 0; // start transparent and fade in
    activeRef.current[idx] = true;
    nextSpawnRef.current = t + (3 + Math.random() * 4);
  };

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (t > nextSpawnRef.current) spawnOne(t);

    const fadeSpeed = 1.3; // seconds to fade in/out
    for (let i = 0; i < pool; i++) {
      const m = meshesRef.current[i];
      if (!m || !activeRef.current[i]) continue;
      const v = velRef.current[i];
      m.position.addScaledVector(v, delta);
      m.rotation.x += 0.1 * delta;
      m.rotation.y += 0.12 * delta;

      // fade in to 0.9 then fade out when near exit bounds
      const distFromCenter = Math.abs(m.position.x);
      const targetOpacity =
        distFromCenter < 4 ? 0.9 : Math.max(0, 0.9 - (distFromCenter - 4) * 0.3);
      alphaRef.current[i] += (targetOpacity - alphaRef.current[i]) * Math.min(1, fadeSpeed * delta);
      (m.material as THREE.MeshStandardMaterial).opacity = alphaRef.current[i];

      if (m.position.x > 8 || m.position.x < -8 || alphaRef.current[i] < 0.02) {
        activeRef.current[i] = false;
        m.visible = false;
        alphaRef.current[i] = 0;
      }
    }
  });

  return (
    <group>
      {Array.from({ length: pool }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (meshesRef.current[i] = el!)}
          visible={false}
          geometry={i % 3 === 0 ? geos.tetra : i % 3 === 1 ? geos.sphere : geos.box}
          material={material}
        />
      ))}
    </group>
  );
};

export default memo(PassingShapes);
