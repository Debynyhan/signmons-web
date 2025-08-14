// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { auth } from '../firebase/firebase';

// Define the shape of the context data
interface AuthContextType {
  userId: string | null;
  user: User | null;
  isAuthReady: boolean;
}

// Create the context with default empty values
const AuthContext = createContext<AuthContextType>({
  userId: null,
  user: null,
  isAuthReady: false,
});

// Create a custom hook for consuming the context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component that wraps your application
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    // In development, don't block rendering on auth
    if (import.meta.env.DEV) {
      setIsAuthReady(true);
      // Still attach listener in background, but UI won't wait on it
      try {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            setUser(firebaseUser);
            setUserId(firebaseUser.uid);
          } else {
            setUser(null);
            setUserId(null);
          }
        });
        return () => unsub();
      } catch {
        return;
      }
    }

    // Production: attach listener and add a safety timeout to avoid indefinite spinner
    const safety = setTimeout(() => setIsAuthReady((v) => v || true), 2000);
    let unsubscribe = () => {};
    try {
      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          setUserId(firebaseUser.uid);
        } else {
          setUser(null);
          setUserId(null);
          signInAnonymously(auth).catch((error) => {
            console.error('Anonymous sign-in failed:', error);
          });
        }
        setIsAuthReady(true);
      });
    } catch (e) {
      console.error('Auth listener failed to attach:', e);
      setIsAuthReady(true);
    }

    return () => {
      clearTimeout(safety);
      try {
        unsubscribe();
      } catch {}
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userId, isAuthReady }}>{children}</AuthContext.Provider>
  );
};
