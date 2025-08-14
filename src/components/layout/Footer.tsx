import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{ bgcolor: 'background.paper', p: 3, textAlign: 'center', boxShadow: 3 }}
  >
    <Typography variant="caption">
      &copy; {new Date().getFullYear()} <Box component="span" sx={{ fontFamily: '"Bruno Ace SC", Inter, sans-serif' }}>Signmons</Box>. All rights reserved.
    </Typography>
    <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
      Your Mobile Marketing Partner for Tradesmen & Small Businesses in Cleveland & Surrounding
      Areas.
    </Typography>
  </Box>
);

export default Footer;
