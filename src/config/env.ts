// src/config/env.ts
import { z } from 'zod';

// Define schema for required/optional environment variables
const EnvSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().min(1),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  VITE_FIREBASE_APP_ID: z.string().min(1),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  // Dev-only optional settings
  NGROK_HOST: z.string().optional(),
});

// Collect values from import.meta.env (Vite) and process.env fallback for tools
const getProcEnv = (key: string): string | undefined => {
  // Guard against ReferenceError in browsers where process is undefined
  return typeof process !== 'undefined' && (process as any)?.env
    ? ((process as any).env[key] as string | undefined)
    : undefined;
};

const rawEnv = {
  VITE_FIREBASE_API_KEY:
    import.meta.env.VITE_FIREBASE_API_KEY ?? getProcEnv('VITE_FIREBASE_API_KEY'),
  VITE_FIREBASE_AUTH_DOMAIN:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? getProcEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  VITE_FIREBASE_PROJECT_ID:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ?? getProcEnv('VITE_FIREBASE_PROJECT_ID'),
  VITE_FIREBASE_STORAGE_BUCKET:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? getProcEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  VITE_FIREBASE_MESSAGING_SENDER_ID:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ??
    getProcEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID ?? getProcEnv('VITE_FIREBASE_APP_ID'),
  VITE_FIREBASE_MEASUREMENT_ID:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? getProcEnv('VITE_FIREBASE_MEASUREMENT_ID'),
  NGROK_HOST: (import.meta as any).env?.NGROK_HOST ?? getProcEnv('NGROK_HOST'),
};

const parsed = EnvSchema.safeParse(rawEnv);
if (!parsed.success) {
  // Build a concise message without leaking secrets
  const fields = parsed.error.issues.map((i) => i.path.join('.')).join(', ');
  console.error(`[env] Missing or invalid env variables: ${fields}`);
  throw new Error('Environment misconfiguration. See console for details.');
}

export const env = parsed.data;
export const isDev = !!import.meta.env.DEV;
export const isProd = !!import.meta.env.PROD;
