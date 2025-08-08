import React from 'react';
import { Box, Button } from '@mui/material';

interface StickyCTAProps {
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
}

const StickyCTA: React.FC<StickyCTAProps> = ({ onPrimaryClick, onSecondaryClick }) => {
  return (
    <Box sx={{
      position: 'sticky',
      bottom: 0,
      zIndex: 10,
      backdropFilter: 'blur(8px)',
      background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6))',
      py: 1,
      display: { xs: 'flex', md: 'none' },
      gap: 1,
      px: 2,
    }}>
      <Button fullWidth variant="contained" onClick={onPrimaryClick}>Get a Free Mockup</Button>
      {onSecondaryClick && (
        <Button fullWidth variant="outlined" color="inherit" onClick={onSecondaryClick}>See Work</Button>
      )}
    </Box>
  );
};

export default StickyCTA;
