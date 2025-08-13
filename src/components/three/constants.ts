// Centralized constants for the hero 3D scene (single source of truth)
import * as THREE from 'three';
import { Theme } from '@mui/material';

export const DPR: [number, number] = [1, 1.25];
export const CAMERA_FOV = 50;
export const CAMERA_Z = (isMobile: boolean) => (isMobile ? 8 : 10);
export const FOG = { color: 0x0f1624, near: 6, far: 20 } as const;

// Colors derived from theme, always call with theme
export const getSceneColors = (theme: Theme) => ({
  inner: new THREE.Color(theme.palette.secondary.main || '#17EAD9'),
  outer: new THREE.Color(theme.palette.primary.main || '#7A5CE6'),
  accent: new THREE.Color(theme.palette.info?.main || '#ff37c7'),
});

export const LIGHTS = {
  ambient: { color: 0x00eaff, intensity: 0.8 },
  directional: { color: 0xef7f34, intensity: 0.8, position: [2, 4, 4] as [number, number, number] },
} as const;

// Particles
export const PARTICLES = {
  mobileCount: 360,
  desktopCount: 820,
  radiusMobile: 7,
  radiusDesktop: 12,
  branches: 4,
  spin: 1.0,
  randomness: 0.32,
};

// Shapes
export const SHAPES = {
  speed: 0.26, // base speed factor
  mobile: 2,
  desktop: 5,
  // Full 360° z-rotation period in seconds (change once, affects all shapes)
  spinZPeriodSec: 60,
};

// Foreground model defaults
export const MODEL = {
  url: '/models/signmons3D.glb',
  desktop: {
    position: [2.6, -1.1, 0.6] as [number, number, number],
    rotationY: -0.25,
    scale: 1.2,
  },
  mobile: {
    position: [0.2, -1.1, 1.1] as [number, number, number],
    rotationY: 0.0,
    scale: 0.95,
  },
} as const;
