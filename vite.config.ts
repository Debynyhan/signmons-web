// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    host: true, // This is already set correctly
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      clientPort: 5173, // IMPORTANT: Ensure this matches your actual Vite dev server port
    },
    // --- FIX START ---
    allowedHosts: [
      'localhost', // Always allow localhost
      '127.0.0.1', // Always allow 127.0.0.1
      'b6b3874f5453.ngrok-free.app', // <--- ADD YOUR CURRENT NGROK HOSTNAME HERE
      // Add any other specific hostnames you might use for local testing (e.g., your local IP if accessing directly)
    ],
    // --- FIX END ---
  },
});
