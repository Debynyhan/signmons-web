// src/components/layout/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PaletteIcon from '@mui/icons-material/Palette';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type PageName = 'home' | 'start-design' | 'thank-you';

interface HeaderProps {
  userId: string | null;
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
}

const Header: React.FC<HeaderProps> = ({ userId, currentPage, onNavigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper', boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Brand + User ID */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            Signmons
          </Typography>
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

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: isMobile ? 1 : 2 }}>
          <Button
            color="inherit"
            onClick={() => onNavigate('home')}
            sx={{ color: currentPage === 'home' ? 'primary.main' : 'text.primary' }}
          >
            <HomeIcon sx={{ mr: isMobile ? 0 : 1 }} />
            {!isMobile && <Typography>Home</Typography>}
          </Button>

          <Button
            color="inherit"
            onClick={() => onNavigate('start-design')}
            sx={{ color: currentPage === 'start-design' ? 'primary.main' : 'text.primary' }}
          >
            <PaletteIcon sx={{ mr: isMobile ? 0 : 1 }} />
            {!isMobile && <Typography>Start Design</Typography>}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
