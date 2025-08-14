// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Pre-bundle only core UI libs for faster cold start
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
      // Prebundle R3F + reconciler to avoid ESM/CJS named export issues
      '@react-three/fiber',
      '@react-three/drei',
      'three',
      'three-stdlib',
      'react-reconciler',
      'react-reconciler/constants',
    ],
    // Avoid heavy/complex ESM during cold start; loaded lazily anyway
    exclude: ['firebase', 'meshoptimizer'],
  },
  // Treat 3D assets as static to avoid extra transforms in dev
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.ktx2'],
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Increase warning threshold or handle large chunks
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate major vendor libraries
          'vendor-react': ['react', 'react-dom'],
          'vendor-mui': ['@mui/material', '@mui/icons-material'],
          'vendor-framer': ['framer-motion'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
    watch: {
      ignored: ['**/node_modules/**', 'public/models/**', 'public/audio/**'],
    },
  },
});
