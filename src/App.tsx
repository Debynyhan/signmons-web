// src/App.tsx

import React, { useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ToastContainer from './components/common/ToastContainer';

// Layout Components
import Header from './components/layout/Header';

// Router
import PageRouter from './router/PageRouter';

type PageName = 'home' | 'start-design' | 'thank-you';

const AppContent: React.FC = () => {
  const { userId, isAuthReady } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageName>('home');

  const handleNavigate = (page: PageName) => {
    setCurrentPage(page);
  };

  if (!isAuthReady) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          color: '#fff',
          backgroundColor: '#111',
        }}
      >
        <CircularProgress color="primary" style={{ marginBottom: 16 }} />
        <Typography variant="h6">Loading Signmons...</Typography>
        <Typography variant="body2" color="text.secondary">
          Setting up your secure design environment.
        </Typography>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#111',
      }}
    >
      <Header userId={userId} currentPage={currentPage} onNavigate={handleNavigate} />

      <main style={{ flexGrow: 1 }}>
        <PageRouter currentPage={currentPage} onNavigate={handleNavigate} />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <ToastProvider>
      <AppContent />
      <ToastContainer />
    </ToastProvider>
  </AuthProvider>
);

export default App;
