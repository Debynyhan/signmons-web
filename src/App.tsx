// src/App.tsx
import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Router
import PageRouter from './router/PageRouter';

import { PageType } from './types';


type PageName = 'home' | 'start-design' | 'thank-you';

const AppContent: React.FC = () => {
  const { userId, isAuthReady } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageName>('home');

  const handleNavigate = (page: PageName) => {
    setCurrentPage(page);
  };

  if (!isAuthReady) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          color: 'text.primary',
          backgroundColor: 'background.default',
        }}
      >
        <CircularProgress color="primary" sx={{ mb: 2 }} />
        <Typography variant="h6">Loading Signmons...</Typography>
        <Typography variant="body2" color="text.secondary">
          Setting up your secure design environment.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Header userId={userId} currentPage={currentPage} onNavigate={handleNavigate} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <PageRouter userId={userId} currentPage={currentPage} onNavigate={handleNavigate} />
      </Box>
      <Footer />
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
