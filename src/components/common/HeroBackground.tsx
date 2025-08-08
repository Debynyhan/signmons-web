// src/components/HeroShapes.tsx

import React, { useRef, useMemo } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShapesProps {
  isMobile: boolean;
}

// Galaxy particles using theme colors
const GalaxyParticles: React.FC<ShapesProps> = ({ isMobile }) => {
  const theme = useTheme();
  const pointsRef = useRef<THREE.Points>(null);

  // Configuration (slightly reduced for perf)
  const count = isMobile ? 600 : 1200;
  const radius = isMobile ? 7 : 12;
  const branches = 4;
  const spin = 1.1;
  const randomness = 0.32;
  const innerColor = new THREE.Color(theme.palette.secondary.main || '#17EAD9');
  const outerColor = new THREE.Color(theme.palette.primary.main || '#7A5CE6');
  const accentColor = new THREE.Color(theme.palette.info?.main || '#ff37c7');

  // Soft circular sprite for stars
  const starTexture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.5)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipMapLinearFilter;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
    return tex;
  }, []);

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
      const mid = innerColor.clone().lerp(accentColor, 0.6);
      const c =
        t < 0.5
          ? innerColor.clone().lerp(mid, t / 0.5)
          : mid.clone().lerp(outerColor, (t - 0.5) / 0.5);
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, [count, branches, radius, spin, randomness, innerColor, outerColor, accentColor]);

  // Memoize geometry to keep attribute counts in sync
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    g.computeBoundingSphere();
    return g;
  }, [positions, colors]);

  // Animate slow rotation and twinkle via size
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
    <points
      key={`galaxy-${count}-${radius}`}
      ref={pointsRef}
      geometry={geometry}
      position={[0, 0, -2]}
      frustumCulled={false}
    >
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

// Occasional fly-by shapes with varied depth
const PassingShapes: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const theme = useTheme();
  const palette = [
    new THREE.Color(theme.palette.secondary.main || '#17EAD9').getHex(),
    new THREE.Color(theme.palette.primary.main || '#7A5CE6').getHex(),
    new THREE.Color(theme.palette.info?.main || '#ff37c7').getHex(),
  ];
  const pool = isMobile ? 1 : 2;
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const activeRef = useRef<boolean[]>(Array(pool).fill(false));
  const velRef = useRef<THREE.Vector3[]>(Array.from({ length: pool }, () => new THREE.Vector3()));
  const nextSpawnRef = useRef<number>(0);

  const geos = useMemo(
    () => ({
      tetra: new THREE.TetrahedronGeometry(0.4),
      sphere: new THREE.SphereGeometry(0.35, 16, 16),
      box: new THREE.BoxGeometry(0.38, 0.38, 0.38),
    }),
    [],
  );

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 0.85,
        metalness: 0.08,
        emissive: new THREE.Color('#08101e'),
        emissiveIntensity: 0.15,
        color: palette[0],
      }),
    [palette],
  );

  const spawnOne = (t: number) => {
    const idx = activeRef.current.findIndex((a) => !a);
    if (idx === -1) return;
    const m = meshesRef.current[idx];
    if (!m) return;
    const dir = 1; // set -1 to invert
    const y = (Math.random() - 0.5) * 2.2;
    const z = -1.2 + Math.random() * 2.2; // [-1.2, 1.0]
    const startX = dir > 0 ? -8 : 8;

    m.position.set(startX, y, z);
    m.rotation.set(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5);
    m.visible = true;

    // Slight variance based on depth so closer = faster
    const baseSpeed = isMobile ? 0.55 : 0.75;
    const depthFactor = 1 + (0.8 - (z + 1.2) / 2.2);
    velRef.current[idx].set(dir * baseSpeed * depthFactor, 0, (Math.random() - 0.5) * 0.15);

    activeRef.current[idx] = true;
    // next spawn in 3-7s
    nextSpawnRef.current = t + (3 + Math.random() * 4);
  };

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Spawn if time
    if (t > nextSpawnRef.current) spawnOne(t);

    // Update active meshes
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
          material={mat}
        />
      ))}
    </group>
  );
};

const Shapes: React.FC<ShapesProps> = ({ isMobile }) => {
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  // Calmer motion (~40% slower than before)
  const speed = 0.32;

  const theme = useTheme();
  const palette = [
    new THREE.Color(theme.palette.primary.main || '#7A5CE6').getHex(),
    new THREE.Color(theme.palette.secondary.main || '#17EAD9').getHex(),
    new THREE.Color(theme.palette.info?.main || '#ff37c7').getHex(),
  ];

  // Strategic, stable anchor positions with varied depth (no randomness on rerender)
  const basePositions = useMemo<THREE.Vector3[]>(
    () =>
      isMobile
        ? [
            new THREE.Vector3(-2.3, 1.2, -0.9), // top-left (back)
            new THREE.Vector3(2.1, 0.8, -0.3), // top-right (mid)
            new THREE.Vector3(-0.8, -1.4, 0.5), // bottom-left (front)
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

  // Fixed per-shape phases so drift isn't synchronized
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

    // Rotate the whole group around Y to match galaxy rotation direction
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.02; // same direction as galaxy (positive)
    }

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const base = basePositions[i];
      const phase = phases[i];

      // Gentle orbital drift around anchors (small amplitude)
      mesh.position.x = base.x + Math.sin(t * 0.25 * speed + phase.x) * 0.14;
      mesh.position.y = base.y + Math.cos(t * 0.2 * speed + phase.y) * 0.11;
      mesh.position.z = base.z + Math.sin(t * 0.16 * speed + phase.z) * 0.1;

      // Slow rotations
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
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, isMobile ? 8 : 10], fov: 50 }}
      >
        <fog attach="fog" args={[0x0f1624, 6, 20]} />

        <ambientLight color={0x00eaff} intensity={0.8} />
        <directionalLight color={0xef7f34} intensity={0.8} position={[2, 4, 4]} />

        <GalaxyParticles isMobile={isMobile} />
        <PassingShapes isMobile={isMobile} />
        <Shapes isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default HeroShapes;
