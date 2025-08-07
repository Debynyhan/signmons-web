/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Define types for your specific VITE_ prefixed environment variables here
  // For example:
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  // Add any other VITE_ variables you might use later
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
