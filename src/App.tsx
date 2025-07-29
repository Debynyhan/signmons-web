import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from './firebase/firebase';

// Pages
import HomePage from './pages/HomePage';
import StartDesignPage from './pages/StartDesignPage';
// import ThankYouPage from './pages/ThankYouPage';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Toast context
import { useToast } from './components/context/ToastContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const theme = useTheme();
  const { showToast } = useToast(); // ✅ New Toast context hook

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error('Anonymous sign-in failed:', error);
          showToast(`Authentication error: ${error.message}`, 'error');
        });
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, [showToast]);

  const navigate = (page: string) => setCurrentPage(page);

  const renderPage = () => {
    if (!isAuthReady) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h6">Loading Signmons...</Typography>
          <Typography variant="body2" color="text.secondary">
            Setting up your secure design environment.
          </Typography>
        </Box>
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'start-design':
        return <StartDesignPage userId={userId} navigate={navigate} />;
      // case 'thank-you':
      //   return <ThankYouPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header userId={userId} currentPage={currentPage} onNavigate={navigate} />
      <Box component="main" sx={{ flexGrow: 1, pt: '64px' }}>
        {renderPage()}
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
