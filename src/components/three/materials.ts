import * as THREE from 'three';

// Factory to create a soft circular sprite texture for stars (single source of truth)
export function createStarTexture(size: number = 64): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
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
}

// Standard emissive metal material used for passing shapes
export function createStandardEmissiveMaterial(color: THREE.ColorRepresentation) {
  return new THREE.MeshStandardMaterial({
    roughness: 0.2,
    metalness: 0.8,
    emissive: new THREE.Color('#13346c'),
    emissiveIntensity: 0.25,
    color,
  });
}
