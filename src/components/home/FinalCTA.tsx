import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface FinalCTAProps { onClick: () => void }

const FinalCTA: React.FC<FinalCTAProps> = ({ onClick }) => (
  <Box sx={{ textAlign: 'center', py: 6 }}>
    <Typography variant="h5" sx={{ mb: 1 }}>Ready to Stand Out?</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Get a free custom mockup—no obligation.</Typography>
    <Button variant="contained" size="large" onClick={onClick}>Get My Free Mockup</Button>
  </Box>
);

export default FinalCTA;
