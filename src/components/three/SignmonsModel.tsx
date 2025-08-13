import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export type SignmonsModelProps = {
  url?: string;
  isMobile?: boolean;
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
  playFirstClip?: boolean;
  bob?: boolean;
  spin?: number; // radians/sec
};

const SignmonsModel: React.FC<SignmonsModelProps> = ({
  url = '/models/signmons3D.glb',
  isMobile = false,
  position = [2.6, -1.1, 0.6],
  rotationY = -0.25,
  scale = 1.2,
  playFirstClip = true,
  bob = true,
  spin = 0.18,
}) => {
  const group = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF(url, true) as unknown as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (!playFirstClip || !animations?.length) return;
    const first = names?.[0];
    const action = first ? actions[first] : undefined;
    if (action) {
      action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.2).play();
      return () => {
        action.fadeOut(0.2);
        action.stop();
      };
    }
  }, [actions, animations, names, playFirstClip]);

  useMemo(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.frustumCulled = false;
        obj.castShadow = false;
        obj.receiveShadow = false;
        if (obj.material) obj.material.needsUpdate = true;
      }
    });
  }, [scene]);

  const baseY = position[1];
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += spin * delta;
    if (bob) {
      const t = state.clock.getElapsedTime();
      group.current.position.y = baseY + Math.sin(t * 0.9) * 0.06;
    }
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[0, rotationY, 0]}
      scale={isMobile ? scale * 0.9 : scale}
    >
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/models/signmons3D.glb');

export default memo(SignmonsModel);
