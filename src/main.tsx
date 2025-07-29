// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Your main App component
import { ThemeProvider } from '@mui/material/styles'; // Import MUI ThemeProvider
import theme from './theme/theme'; // Your custom MUI theme

// No global CSS imports here anymore!

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
