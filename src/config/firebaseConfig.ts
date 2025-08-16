// src/config/firebaseConfig.ts
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { env } from './env';

// Centralized config from env.ts (SSOT)
export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
} as const;

let app: FirebaseApp;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  // Avoid leaking secrets in logs
  console.error('[firebase] Failed to initialize app:', (e as Error).message);
  throw e;
}

export { app };
