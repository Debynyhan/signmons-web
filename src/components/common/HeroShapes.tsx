import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * HeroShapes renders animated 3D shapes using Three.js. The shapes are
 * non-interactive and always sit behind other content thanks to a negative
 * z-index and disabled pointer events.
 */
const HeroShapes: React.FC = () => {
  // Reference for the container that holds the Three.js canvas
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer with transparency so page backgrounds show through
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Scene and camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.offsetWidth / container.offsetHeight,
      0.1,
      100,
    );
    camera.position.z = 8;

    // Lighting for subtle shading
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(2, 4, 4);
    scene.add(directional);

    // Helper to create a shape based on index
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
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
      );
      scene.add(mesh);
      return mesh;
    };

    // Create the meshes
    const meshes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      meshes.push(createMesh(i));
    }

    // Animation loop
    let animationId: number;
    const renderFrame = () => {
      animationId = requestAnimationFrame(renderFrame);
      meshes.forEach((mesh, idx) => {
        mesh.rotation.x += 0.002 + idx * 0.0003;
        mesh.rotation.y += 0.003 + idx * 0.0002;
      });
      renderer.render(scene, camera);
    };
    renderFrame();

    // Resize handling
    const onResize = () => {
      if (!container) return;
      const { offsetWidth, offsetHeight } = container;
      camera.aspect = offsetWidth / offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(offsetWidth, offsetHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        const material = mesh.material as THREE.Material;
        material.dispose();
        scene.remove(mesh);
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Container styling ensures the background effect fills its parent and never blocks interactions
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
