// src/App.tsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'; // Import specific auth functions

// Import Firebase services from your setup file
import { auth } from './firebase/firebase'; // Assuming firebase.ts exports 'auth'

// Import MUI Components for layout and navigation
import { AppBar, Toolbar, Button, Box, Typography, CircularProgress } from '@mui/material';
// Import icons from MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import PaletteIcon from '@mui/icons-material/Palette'; // For Start Design
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // For user ID display

// IMPORTANT: These are the ONLY page components you should create and import for this first steel thread.
// You will create these files in your src/pages/ folder.
import HomePage from './pages/HomePage';
import StartDesignPage from './pages/StartDesignPage';
// You will create this component for the confirmation after form submission
// import ThankYouPage from './pages/ThankYouPage';

// For the global message box (keep this in App.tsx or a dedicated utility file)
declare global {
  interface Window {
    showMessage: (message: string, type?: 'info' | 'success' | 'error') => void;
  }
}

// Global message box utility function (attached to window object for broader use)
const showMessage = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
  const messageBox = document.getElementById('messageBox');
  if (messageBox) {
    messageBox.textContent = message;
    messageBox.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
      type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-blue-600'
    } transition-opacity duration-300 opacity-100 z-50`;
    setTimeout(() => {
      messageBox.className = messageBox.className.replace('opacity-100', 'opacity-0');
    }, 3000);
  }
};
window.showMessage = showMessage; // Attach to window

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home'); // State to control current page view
  const [userId, setUserId] = useState<string | null>(null); // Firebase user ID
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false); // Tracks if Firebase Auth is initialized

  // Firebase Authentication setup (runs once on component mount)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // User is authenticated
      } else {
        setUserId(null);
        // If no user is logged in, attempt anonymous sign-in
        signInAnonymously(auth).catch((error) => {
          console.error('Anonymous sign-in failed:', error);
          showMessage(`Failed to sign in anonymously: ${error.message}`, 'error');
        });
      }
      setIsAuthReady(true); // Authentication state is now known
    });

    // Cleanup subscription on unmount to prevent memory leaks
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Navigation function to change the current page
  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  // Renders the appropriate page component based on 'currentPage' state
  const renderPage = () => {
    // Show a loading spinner until Firebase authentication state is determined
    if (!isAuthReady) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 80px)', // Adjust for header height
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

    // Render the specific page component
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'start-design':
        // Pass userId to StartDesignPage for Firebase operations
        return <StartDesignPage userId={userId} navigate={navigate} />; // Added navigate prop for potential redirect
      case 'thank-you':
        return <ThankYouPage navigate={navigate} />; // Render thank you page after submission
      default:
        return <HomePage navigate={navigate} />; // Fallback to home page
    }
  };

  return (
    // Main container for the entire application, styled with MUI Box for Material Design
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Global Message Box for displaying notifications */}
      <div
        id="messageBox"
        className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white bg-blue-600 opacity-0 z-50"
      ></div>

      {/* Header/Navigation using MUI AppBar */}
      <AppBar position="sticky" sx={{ bgcolor: 'background.paper', boxShadow: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo/Site Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
              Signmons
            </Typography>
            {/* Display User ID for debugging/tracking (hidden on small screens) */}
            {userId && (
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  ml: 2,
                  color: 'text.secondary',
                }}
              >
                <AccountCircleIcon sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="caption">User: {userId.substring(0, 8)}...</Typography>
              </Box>
            )}
          </Box>

          {/* Navigation Buttons (minimal for the steel thread) */}
          <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
            <Button
              color="inherit"
              onClick={() => navigate('home')}
              sx={{ color: currentPage === 'home' ? 'primary.main' : 'text.primary' }}
            >
              <HomeIcon sx={{ mr: { xs: 0, sm: 1 } }} />{' '}
              <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Home</Typography>
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('start-design')}
              sx={{ color: currentPage === 'start-design' ? 'primary.main' : 'text.primary' }}
            >
              <PaletteIcon sx={{ mr: { xs: 0, sm: 1 } }} />{' '}
              <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Start Design</Typography>
            </Button>
            {/* Other navigation buttons (Services, About, Contact) will be added here later */}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {renderPage()}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: 'background.paper',
          color: 'text.secondary',
          p: 3,
          textAlign: 'center',
          boxShadow: 3,
        }}
      >
        <Typography variant="caption" sx={{ display: 'block' }}>
          &copy; {new Date().getFullYear()} Signmons. All rights reserved.
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
          Your Mobile Marketing Partner for Tradesmen & Small Businesses in Cleveland & Surrounding
          Areas.
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
