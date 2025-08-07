// src/theme/theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// TypeScript: Extend theme to include your custom 'signmons' object
declare module '@mui/material/styles' {
  interface Theme {
    signmons: {
      blue: string;
      purple: string;
      green: string;
      accent: string;
      dark: string;
    };
  }
  interface ThemeOptions {
    signmons?: {
      blue?: string;
      purple?: string;
      green?: string;
      accent?: string;
      dark?: string;
    };
  }
}

const baseThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#00eaff', // Neon teal/cyan
      light: '#42f6ff',
      dark: '#008ca1',
      contrastText: '#181827',
    },
    secondary: {
      main: '#a259ff', // Vibrant purple
      light: '#c299ff',
      dark: '#6900c2',
      contrastText: '#181827',
    },
    success: {
      main: '#00ff89', // Neon green
      light: '#5cffb4',
      dark: '#00c35e',
      contrastText: '#181827',
    },
    error: { main: '#ff37c7' },
    warning: { main: '#ffd600' },
    info: { main: '#00eaff' },

    background: {
      default: '#181827',
      paper: '#232344',
    },
    text: {
      primary: '#f7f7fa',
      secondary: '#90caf9',
      disabled: '#6c6c85',
    },
    divider: 'rgba(0,234,255,0.18)',
    // ❌ REMOVE signmons from here!
  },

  // ...typography and components as before...
  typography: {
    fontFamily: 'Inter, "Montserrat", "Segoe UI", "Roboto", Arial, sans-serif',
    // ...etc.
  },

  components: {
    // ...etc.
  },

  // ✅ Add your custom colors here at the root!
  signmons: {
    blue: '#00eaff',
    purple: '#a259ff',
    green: '#00ff89',
    accent: '#ff37c7',
    dark: '#181827',
  },
};

const theme = createTheme(baseThemeOptions);
export default responsiveFontSizes(theme);
