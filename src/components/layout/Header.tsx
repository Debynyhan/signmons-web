import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PaletteIcon from '@mui/icons-material/Palette';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Props {
  userId: string | null;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<Props> = ({ userId, currentPage, onNavigate }) => (
  <AppBar position="fixed" sx={{ bgcolor: 'background.default', boxShadow: 3 }}>
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Signmons
        </Typography>
        {userId && (
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 2 }}>
            <AccountCircleIcon sx={{ fontSize: 18, mr: 1 }} />
            <Typography variant="caption" color="text.secondary">
              User: {userId.substring(0, 8)}...
            </Typography>
          </Box>
        )}
      </Box>
      <Box display="flex" gap={{ xs: 1, sm: 2 }}>
        <Button
          onClick={() => onNavigate('home')}
          sx={{ color: currentPage === 'home' ? 'primary.main' : 'text.primary' }}
        >
          <HomeIcon sx={{ mr: { xs: 0, sm: 1 } }} />
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Home</Typography>
        </Button>
        <Button
          onClick={() => onNavigate('start-design')}
          sx={{ color: currentPage === 'start-design' ? 'primary.main' : 'text.primary' }}
        >
          <PaletteIcon sx={{ mr: { xs: 0, sm: 1 } }} />
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Start Design</Typography>
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
