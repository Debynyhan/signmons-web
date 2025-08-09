import * as THREE from 'three';
import { Theme } from '@mui/material';

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

// Util: lighten a color by factor (0..1)
function lighten(color: THREE.Color, factor: number) {
  const c = color.clone();
  return c.lerp(new THREE.Color('#ffffff'), factor);
}

export type GradientStop = { offset: number; color: THREE.Color };

// Centralized vibrant purple/pink gradient derived from theme
export function getVibrantGradientStops(theme: Theme): GradientStop[] {
  const purple = new THREE.Color(theme.palette.primary.main || '#7A5CE6');
  const pink = new THREE.Color(theme.palette.info?.main || '#ff37c7');
  const pinkLight = lighten(pink, 0.25);
  return [
    { offset: 0.0, color: purple },
    { offset: 0.65, color: pink },
    { offset: 1.0, color: pinkLight },
  ];
}

// Sample a multi-stop gradient at t in [0,1]
export function sampleGradient(stops: GradientStop[], t: number): THREE.Color {
  const clamped = Math.min(1, Math.max(0, t));
  let i = 0;
  for (; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (clamped >= a.offset && clamped <= b.offset) {
      const localT = (clamped - a.offset) / Math.max(1e-6, b.offset - a.offset);
      return a.color.clone().lerp(b.color, localT);
    }
  }
  return stops[stops.length - 1].color.clone();
}

// Apply vertical gradient as vertex colors based on chosen axis (default 'y')
export function applyPositionGradient(
  geometry: THREE.BufferGeometry,
  stops: GradientStop[],
  axis: 'x' | 'y' | 'z' = 'y',
): THREE.BufferGeometry {
  const pos = geometry.getAttribute('position');
  if (!pos) return geometry;
  const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    const value =
      (axisIndex === 0 ? pos.getX(i) : axisIndex === 1 ? pos.getY(i) : pos.getZ(i));
    if (value < min) min = value;
    if (value > max) max = value;
  }
  const range = Math.max(1e-6, max - min);
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const value =
      (axisIndex === 0 ? pos.getX(i) : axisIndex === 1 ? pos.getY(i) : pos.getZ(i));
    const t = (value - min) / range;
    const c = sampleGradient(stops, t);
    const i3 = i * 3;
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

// Standard material configured to use vertex colors (for gradient)
export function createGradientStandardMaterial(): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'), // base; vertex colors will tint
    vertexColors: true,
    roughness: 0.55,
    metalness: 0.25,
    emissive: new THREE.Color('#0b1020'),
    emissiveIntensity: 0.18,
  });
  return mat;
}
