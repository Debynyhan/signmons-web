// src/theme/theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// Define your custom theme options
const baseThemeOptions: ThemeOptions = {
  // Palette for dark mode
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3', // A vibrant blue for primary actions (e.g., "Start Your Project")
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4CAF50', // A complementary green for secondary actions or highlights
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF5252', // Standard red for error states
    },
    warning: {
      main: '#FFC107', // Standard amber for warnings
    },
    info: {
      main: '#2196F3', // Same as primary for consistent info alerts
    },
    success: {
      main: '#4CAF50', // Same as secondary for consistent success alerts
    },
    background: {
      default: '#121212', // Very dark background for the main page (matching your image)
      paper: '#1E1E1E', // Slightly lighter dark for cards, dialogs, etc.
    },
    text: {
      primary: '#FFFFFF', // White text for main content on dark backgrounds
      secondary: '#B0B0B0', // Lighter grey for secondary text
      disabled: '#616161',
    },
    action: {
      // For hover/active states of components
      active: '#B0B0B0',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)',
    },
    divider: 'rgba(255, 255, 255, 0.12)', // Subtle divider color
  },

  // Typography settings
  typography: {
    fontFamily: 'Inter, sans-serif', // Ensure 'Inter' is imported in your public/index.html
    h1: {
      fontSize: '3.5rem', // For extra large titles
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
      '@media (min-width:600px)': {
        // Responsive font size for larger screens
        fontSize: '4.5rem',
      },
      '@media (min-width:900px)': {
        fontSize: '6rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    // Add more typography variants as needed (h3, h4, h5, h6, subtitle1, subtitle2, body2, button, caption, overline)
  },

  // Component style overrides
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px', // Rounded buttons (like your CTA)
          textTransform: 'none', // Prevent uppercase by default
          fontWeight: 700,
          padding: '12px 30px', // More generous padding
        },
        containedPrimary: {
          boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)', // Subtle shadow for primary button
          '&:hover': {
            boxShadow: '0 6px 15px rgba(33, 150, 243, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px', // Slightly rounded corners for cards (like featurettes)
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)', // Deeper shadow for dark mode
          backgroundColor: '#1E1E1E', // Match background.paper
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            // Style for outlined text field
            borderRadius: '8px', // Slightly rounded input fields
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)', // Light border for dark mode
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2196F3', // Primary color on focus
            },
          },
          '& .MuiInputBase-input': {
            color: '#FFFFFF', // White text input
          },
          '& .MuiInputLabel-root': {
            color: '#B0B0B0', // Light grey label
            '&.Mui-focused': {
              color: '#2196F3', // Primary color for focused label
            },
          },
        },
      },
    },
    // Add more component overrides as you use them (e.g., MuiAppBar, MuiDrawer)
  },
};

// Create the theme
const theme = createTheme(baseThemeOptions);

// Make font sizes responsive
export default responsiveFontSizes(theme);
