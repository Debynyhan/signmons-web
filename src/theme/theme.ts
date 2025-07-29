// src/theme/theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

const baseThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3', // Vibrant blue
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4CAF50', // Complementary green
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    error: { main: '#FF5252' },
    warning: { main: '#FFC107' },
    info: { main: '#2196F3' },
    success: { main: '#4CAF50' },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      disabled: '#616161',
    },
    action: {
      active: '#B0B0B0',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },

  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
      '@media (min-width:600px)': { fontSize: '4.5rem' },
      '@media (min-width:900px)': { fontSize: '6rem' },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },

  components: {
    // Global element overrides
    MuiCssBaseline: {
      styleOverrides: {
        img: {
          borderRadius: '0 !important',
          boxShadow: 'none !important',
          transform: 'none !important',
          animation: 'none !important',
          WebkitAnimation: 'none !important',
          MozAnimation: 'none !important',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
          textTransform: 'none',
          fontWeight: 700,
          padding: '12px 30px',
        },
        containedPrimary: {
          boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 15px rgba(33, 150, 243, 0.4)',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          backgroundColor: '#1E1E1E',
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2196F3',
            },
          },
          '& .MuiInputBase-input': {
            color: '#FFFFFF',
          },
          '& .MuiInputLabel-root': {
            color: '#B0B0B0',
            '&.Mui-focused': {
              color: '#2196F3',
            },
          },
        },
      },
    },
  },
};

const theme = createTheme(baseThemeOptions);
export default responsiveFontSizes(theme);
