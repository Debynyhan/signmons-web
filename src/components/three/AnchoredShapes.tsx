import React, { memo, useMemo, useRef } from 'react';
import { useTheme } from '@mui/material';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SHAPES } from './constants';
import {
  applyPositionGradient,
  createGradientStandardMaterial,
  getVibrantGradientStops,
} from './materials';

const AnchoredShapes: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  const theme = useTheme();

  const gradientStops = useMemo(() => getVibrantGradientStops(theme), [theme]);
  const material = useMemo(() => createGradientStandardMaterial(), []);

  const speed = SHAPES.speed;

  const basePositions = useMemo<THREE.Vector3[]>(
    () =>
      isMobile
        ? [
            new THREE.Vector3(-2.3, 1.2, -0.9),
            new THREE.Vector3(2.1, 0.8, -0.3),
            new THREE.Vector3(-0.8, -1.4, 0.5),
          ]
        : [
            new THREE.Vector3(-3.0, 1.6, -1.2),
            new THREE.Vector3(3.2, 1.0, -0.4),
            new THREE.Vector3(-3.4, -0.4, -0.2),
            new THREE.Vector3(3.0, -1.2, 0.6),
            new THREE.Vector3(-0.6, 1.0, 0.4),
            new THREE.Vector3(0.8, -1.6, -0.8),
          ],
    [isMobile],
  );

  const phases = useMemo(
    () =>
      basePositions.map((_, i) => ({
        x: 0.6 + i * 0.9,
        y: 1.3 + i * 0.7,
        z: 2.1 + i * 0.8,
      })),
    [basePositions],
  );

  const freqs = useMemo(
    () =>
      basePositions.map((_, i) => ({
        x: 0.25 * speed + i * 0.01,
        y: 0.2 * speed + i * 0.008,
        z: 0.16 * speed + i * 0.006,
      })),
    [basePositions, speed],
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const omega = (Math.PI * 2) / SHAPES.spinZPeriodSec; // full turn per period

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.016;
    }

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const base = basePositions[i];
      const phase = phases[i];
      const f = freqs[i];

      mesh.position.x = base.x + Math.sin(t * f.x + phase.x) * 0.14;
      mesh.position.y = base.y + Math.cos(t * f.y + phase.y) * 0.11;
      mesh.position.z = base.z + Math.sin(t * f.z + phase.z) * 0.1;

      const rx = (0.1 + i * 0.01) * delta * 0.1 * speed;
      const ry = (0.14 + i * 0.01) * delta * 0.1 * speed;
      mesh.rotation.x += rx;
      mesh.rotation.y += ry;
      // Precise clockwise Z spin: full 360° per configured period; small per-index phase
      const zPhase = i * 0.6;
      mesh.rotation.z = -omega * t + zPhase;
    });
  });

  return (
    <group ref={groupRef}>
      {basePositions.map((pos, i) => (
        <mesh
          key={`${isMobile ? 'm' : 'd'}-${i}`}
          ref={(el) => (meshRefs.current[i] = el!)}
          position={pos.toArray()}
          material={material}
        >
          {i % 3 === 0 && (
            <tetrahedronGeometry
              args={[0.65]}
              onUpdate={(g: THREE.TetrahedronGeometry) =>
                applyPositionGradient(g, gradientStops, 'y')
              }
            />
          )}
          {i % 3 === 1 && (
            <sphereGeometry
              args={[0.52, 24, 24]}
              onUpdate={(g: THREE.SphereGeometry) => applyPositionGradient(g, gradientStops, 'y')}
            />
          )}
          {i % 3 === 2 && (
            <boxGeometry
              args={[0.6, 0.6, 0.6]}
              onUpdate={(g: THREE.BoxGeometry) => applyPositionGradient(g, gradientStops, 'y')}
            />
          )}
        </mesh>
      ))}
    </group>
  );
};

export default memo(AnchoredShapes);
