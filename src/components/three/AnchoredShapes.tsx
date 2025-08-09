import React, { useMemo, useRef } from 'react';
import { useTheme } from '@mui/material';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SHAPES } from './constants';

const AnchoredShapes: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  const theme = useTheme();

  const palette = [
    new THREE.Color(theme.palette.primary.main || '#7A5CE6').getHex(),
    new THREE.Color(theme.palette.secondary.main || '#17EAD9').getHex(),
    new THREE.Color(theme.palette.info?.main || '#ff37c7').getHex(),
  ];

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

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.02;
    }

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const base = basePositions[i];
      const phase = phases[i];

      mesh.position.x = base.x + Math.sin(t * 0.25 * speed + phase.x) * 0.14;
      mesh.position.y = base.y + Math.cos(t * 0.2 * speed + phase.y) * 0.11;
      mesh.position.z = base.z + Math.sin(t * 0.16 * speed + phase.z) * 0.1;

      mesh.rotation.x += (0.0005 + i * 0.00003) * speed;
      mesh.rotation.y += (0.0007 + i * 0.00002) * speed;
    });
  });

  return (
    <group ref={groupRef}>
      {basePositions.map((pos, i) => (
        <mesh
          key={`${isMobile ? 'm' : 'd'}-${i}`}
          ref={(el) => (meshRefs.current[i] = el!)}
          position={pos.toArray()}
        >
          {i % 3 === 0 && <tetrahedronGeometry args={[0.65]} />}
          {i % 3 === 1 && <sphereGeometry args={[0.52, 24, 24]} />}
          {i % 3 === 2 && <boxGeometry args={[0.6, 0.6, 0.6]} />}
          <meshStandardMaterial
            color={palette[i % palette.length]}
            roughness={0.8}
            metalness={0.12}
            emissive={new THREE.Color('#0b1020')}
            emissiveIntensity={0.18}
          />
        </mesh>
      ))}
    </group>
  );
};

export default AnchoredShapes;
