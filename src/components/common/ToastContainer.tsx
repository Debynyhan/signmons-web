// src/components/common/ToastContainer.tsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useToast } from '../../context/ToastContext';

/**
 * Renders global toast notifications based on context state.
 */
const ToastContainer: React.FC = () => {
  const { open, message, severity, hideToast } = useToast();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={hideToast}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={hideToast} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastContainer;
