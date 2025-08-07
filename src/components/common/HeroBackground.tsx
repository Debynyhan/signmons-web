// src/components/HeroShapes.tsx

import React, { useRef, useMemo } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShapesProps {
  isMobile: boolean;
}

const Shapes: React.FC<ShapesProps> = ({ isMobile }) => {
  const meshRefs = useRef<THREE.Mesh[]>([]);

  // scene configuration
  const speedFactor = 0.65;
  const rangeX = isMobile ? 6 : 10;
  const rangeY = isMobile ? 3 : 12;
  const rangeZ = isMobile ? 3 : 5;
  const numMeshes = isMobile ? 8 : 18;
  const palette = [0x6628b9, 0x0075c2, 0xef7f34, 0x098469, 0xeb3baa];

  // persistent state
  const velocities = useMemo(
    () => Array.from({ length: numMeshes }, () => new THREE.Vector3()),
    [numMeshes],
  );
  const offsets = useMemo(
    () =>
      Array.from({ length: numMeshes }, () => ({
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2,
      })),
    [numMeshes],
  );

  // animation + collision loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // float, rotate, boundary bounce
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const vel = velocities[i];
      const phase = offsets[i];

      mesh.position.x += Math.sin(t + phase.x) * 0.006 * speedFactor + vel.x;
      mesh.position.y += Math.cos(t + phase.y) * 0.004 * speedFactor + vel.y;
      mesh.position.z += Math.sin(t + phase.z) * 0.003 * speedFactor + vel.z;
      mesh.rotation.x += (0.001 + i * 0.00015) * speedFactor;
      mesh.rotation.y += (0.0013 + i * 0.00011) * speedFactor;
      vel.multiplyScalar(0.88);

      const halfX = rangeX / 2;
      const halfY = rangeY / 2;
      const halfZ = rangeZ / 2;
      if (mesh.position.x > halfX || mesh.position.x < -halfX) vel.x *= -1;
      if (mesh.position.y > halfY || mesh.position.y < -halfY) vel.y *= -1;
      if (mesh.position.z > halfZ || mesh.position.z < -halfZ) vel.z *= -1;
    });

    // mesh-to-mesh collisions
    for (let i = 0; i < numMeshes; i++) {
      for (let j = i + 1; j < numMeshes; j++) {
        const a = meshRefs.current[i];
        const b = meshRefs.current[j];
        if (!a || !b) continue;
        const dist = a.position.distanceTo(b.position);
        const minDist = 1.2;
        if (dist < minDist) {
          const dir = new THREE.Vector3().subVectors(a.position, b.position).normalize();
          velocities[i].add(dir.clone().multiplyScalar(0.05 * (minDist - dist) * speedFactor));
          velocities[j].add(dir.clone().multiplyScalar(-0.05 * (minDist - dist) * speedFactor));
        }
      }
    }
  });

  return (
    <>
      {Array.from({ length: numMeshes }).map((_, i) => {
        const posX = (Math.random() - 0.5) * rangeX;
        const posY = (Math.random() - 0.5) * rangeY;
        const posZ = (Math.random() - 0.5) * rangeZ;
        return (
          <mesh key={i} ref={(el) => (meshRefs.current[i] = el!)} position={[posX, posY, posZ]}>
            {i % 4 === 0 && <tetrahedronGeometry args={[0.8]} />}
            {i % 4 === 1 && <sphereGeometry args={[0.6, 32, 32]} />}
            {i % 4 === 2 && <boxGeometry args={[0.8, 0.8, 0.8]} />}
            {i % 4 === 3 && <coneGeometry args={[0.6, 1.2, 4]} />}
            <meshStandardMaterial color={palette[i % palette.length]} flatShading />
          </mesh>
        );
      })}
    </>
  );
};

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
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, isMobile ? 8 : 10], fov: 50 }}
      >
        <ambientLight color={0x00eaff} intensity={0.8} />
        <directionalLight color={0xef7f34} intensity={0.8} position={[2, 4, 4]} />
        <Shapes isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default HeroShapes;
