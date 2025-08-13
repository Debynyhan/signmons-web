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
    // Safety timeout: don't block the whole UI if auth never resolves (dev without .env, offline, etc.)
    const safety = setTimeout(() => setIsAuthReady((v) => v || true), 2000);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
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

    return () => {
      clearTimeout(safety);
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userId, isAuthReady }}>{children}</AuthContext.Provider>
  );
};
