import React, { useRef, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import * as THREE from 'three';

const HeroShapes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // determine screen size using the same breakpoints as the rest of your app
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // Pull the camera back a little more so we see the whole cloud
    const camera = new THREE.PerspectiveCamera(
      50,
      container.offsetWidth / container.offsetHeight,
      0.1,
      100,
    );
    camera.position.z = isMobile ? 8 : 10; // farther away on desktop

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(2, 4, 4);
    scene.add(directional);

    // Pick how far shapes can stray from the center
    const rangeX = isMobile ? 6 : 10;
    const rangeY = isMobile ? 3 : 5;
    const rangeZ = isMobile ? 3 : 5;
    // Decide how many shapes to create: 8 on mobile, 18 on desktop
    const numMeshes = isMobile ? 8 : 18;

    // Helper to create and place a mesh
    const createMesh = (index: number): THREE.Mesh => {
      let geometry: THREE.BufferGeometry;
      switch (index % 4) {
        case 0:
          geometry = new THREE.TetrahedronGeometry(0.8);
          break;
        case 1:
          geometry = new THREE.SphereGeometry(0.6, 32, 32);
          break;
        case 2:
          geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
          break;
        default:
          geometry = new THREE.ConeGeometry(0.6, 1.2, 4);
          break;
      }
      const palette = [0x6628b9, 0x0075c2, 0xef7f34, 0x098469, 0xeb3baa];
      const colour = palette[index % palette.length];
      const material = new THREE.MeshStandardMaterial({ color: colour, flatShading: true });
      const mesh = new THREE.Mesh(geometry, material);
      // constrain positions so they stay in view
      mesh.position.set(
        (Math.random() - 0.5) * rangeX,
        (Math.random() - 0.5) * rangeY,
        (Math.random() - 0.5) * rangeZ,
      );
      scene.add(mesh);
      return mesh;
    };

    const meshes: THREE.Mesh[] = [];
    for (let i = 0; i < numMeshes; i++) {
      meshes.push(createMesh(i));
    }

    let animationId: number;
    const renderFrame = () => {
      animationId = requestAnimationFrame(renderFrame);
      meshes.forEach((mesh, idx) => {
        mesh.rotation.x += 0.002 + idx * 0.0003 * .5;
        mesh.rotation.y += 0.003 + idx * 0.0002 * .5;
      });
      renderer.render(scene, camera);
    };
    renderFrame();

    const onResize = () => {
      if (!container) return;
      const { offsetWidth, offsetHeight } = container;
      camera.aspect = offsetWidth / offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(offsetWidth, offsetHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
        scene.remove(mesh);
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
};

export default HeroShapes;
