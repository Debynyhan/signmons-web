// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      clientPort: 5173,
    },
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '4caeaf2a17d0.ngrok-free.app',
      // Add other hostnames as needed
    ],
  },
});
