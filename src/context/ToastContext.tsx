// src/components/context/ToastContext.tsx
import { createContext, useContext, ReactNode, useState } from 'react';
import { AlertColor } from '@mui/material';

type ToastContextType = {
  open: boolean;
  message: string;
  severity: AlertColor;
  showToast: (message: string, severity?: AlertColor) => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const showToast = (msg: string, level: AlertColor = 'info') => {
    setMessage(msg);
    setSeverity(level);
    setOpen(true);
    console.log(`TOAST [${level.toUpperCase()}]:`, msg);
  };

  const hideToast = () => {
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ open, message, severity, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
};
