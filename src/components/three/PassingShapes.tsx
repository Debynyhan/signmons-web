import React, { useMemo, useRef } from 'react';
import { useTheme } from '@mui/material';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { applyPositionGradient, createGradientStandardMaterial, getVibrantGradientStops } from './materials';

const PassingShapes: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const theme = useTheme();
  const gradientStops = useMemo(() => getVibrantGradientStops(theme), [theme]);

  const pool = isMobile ? 1 : 2;
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const activeRef = useRef<boolean[]>(Array(pool).fill(false));
  const velRef = useRef<THREE.Vector3[]>(Array.from({ length: pool }, () => new THREE.Vector3()));
  const nextSpawnRef = useRef<number>(0);

  const geos = useMemo(
    () => ({
      tetra: applyPositionGradient(new THREE.TetrahedronGeometry(0.4), gradientStops, 'y'),
      sphere: applyPositionGradient(new THREE.SphereGeometry(0.35, 16, 16), gradientStops, 'y'),
      box: applyPositionGradient(new THREE.BoxGeometry(0.38, 0.38, 0.38), gradientStops, 'y'),
    }),
    [gradientStops],
  );

  const material = useMemo(() => createGradientStandardMaterial(), []);

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

    const baseSpeed = isMobile ? 0.55 : 0.75;
    const depthFactor = 1 + (0.8 - (z + 1.2) / 2.2);
    velRef.current[idx].set(dir * baseSpeed * depthFactor, 0, (Math.random() - 0.5) * 0.15);

    activeRef.current[idx] = true;
    nextSpawnRef.current = t + (3 + Math.random() * 4);
  };

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (t > nextSpawnRef.current) spawnOne(t);

    for (let i = 0; i < pool; i++) {
      const m = meshesRef.current[i];
      if (!m || !activeRef.current[i]) continue;
      const v = velRef.current[i];
      m.position.addScaledVector(v, delta);
      m.rotation.x += 0.15 * delta;
      m.rotation.y += 0.18 * delta;
      if (m.position.x > 8 || m.position.x < -8) {
        activeRef.current[i] = false;
        m.visible = false;
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

export default PassingShapes;
