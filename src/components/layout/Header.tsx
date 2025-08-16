// src/components/layout/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PaletteIcon from '@mui/icons-material/Palette';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Type for page navigation
import { PageName } from '../../types/navigation';

interface HeaderProps {
  userId: string | null;
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
}

const Header: React.FC<HeaderProps> = ({ userId, currentPage, onNavigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      component="header"
      position="sticky"
      sx={{
        position: 'sticky',
        top: 0,
        backdropFilter: 'blur(10px) saturate(140%)',
        WebkitBackdropFilter: 'blur(10px) saturate(140%)',
        bgcolor: 'rgba(15,22,36,0.72)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 6px 24px -6px rgba(0,0,0,0.45)',
        overflow: 'hidden',
        zIndex: (t: any) => t.zIndex.appBar,
        // Animated vertical accent strip (same gradient as GlassCard accent)
        '&:before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: { xs: 4, sm: 5 },
          background: `linear-gradient(180deg, ${theme.palette.secondary?.main || '#17EAD9'} 0%, ${
            theme.palette.primary?.main || '#7A5CE6'
          } 60%, ${theme.palette.info?.main || '#ff37c7'} 100%)`,
          backgroundSize: '100% 200%',
          animation: 'accentScroll 14s linear infinite',
          opacity: 0.95,
          pointerEvents: 'none',
        },
        '@keyframes accentScroll': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 200%' },
        },
      }}
    >
      <Toolbar
        component="nav"
        aria-label="Main navigation"
        sx={{ justifyContent: 'space-between', pl: { xs: 1, sm: 1.5 } }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily:
                '"Bruno Ace SC", system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              position: 'relative',
              background: `linear-gradient(90deg, ${theme.palette.secondary?.main || '#17EAD9'}, ${
                theme.palette.primary?.main || '#7A5CE6'
              }, ${theme.palette.info?.main || '#ff37c7'})`,
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'brandShift 18s linear infinite',
              '@keyframes brandShift': {
                '0%': { backgroundPosition: '0% 50%' },
                '100%': { backgroundPosition: '200% 50%' },
              },
            }}
          >
            Signmons
          </Typography>
          {userId && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 16,
                color: theme.palette.text.secondary,
              }}
            >
              <AccountCircleIcon sx={{ mr: 1, fontSize: 18 }} />
              <Typography variant="caption">User: {userId.substring(0, 8)}...</Typography>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: isMobile ? 8 : 16 }}>
          <Button
            color="inherit"
            onClick={() => onNavigate('home')}
            sx={{ color: currentPage === 'home' ? 'primary.main' : 'text.primary' }}
            startIcon={<HomeIcon />}
          >
            {!isMobile && 'Home'}
          </Button>
          <Button
            color="inherit"
            onClick={() => onNavigate('start-design')}
            sx={{ color: currentPage === 'start-design' ? 'primary.main' : 'text.primary' }}
            startIcon={<PaletteIcon />}
          >
            {!isMobile && 'Start Design'}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
