import React from 'react';
import { Button, Typography } from '@mui/material';

interface FinalCTAProps {
  onClick: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onClick }) => (
  <div style={{ textAlign: 'center', padding: '48px 0' }}>
    <Typography variant="h5" sx={{ mb: 1 }}>
      Ready to Stand Out?
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Get a free custom mockup—no obligation.
    </Typography>
    <Button variant="contained" size="large" onClick={onClick}>
      Get My Free Mockup
    </Button>
  </div>
);

export default FinalCTA;
