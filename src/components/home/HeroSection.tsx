import React from 'react';
import { Box, Typography } from '@mui/material';

const HeroSection: React.FC = () => {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: 1.1,
          animation: 'fadeInUp 0.8s ease-out forwards',
        }}
      >
        MOBILE DECALS & WRAPS <br />
        FOR <strong>TRADESMEN</strong>
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
          maxWidth: 'md',
          animation: 'fadeInUp 0.8s ease-out forwards 0.1s',
        }}
      >
        Transform your work vehicle into a 24/7 advertisement. Professional decals, graphics, and
        signs installed <strong style={{ color: 'white' }}>on-site in Cleveland</strong>.
      </Typography>

      <Box
        component="img"
        src="/my-branded-truck.png"
        alt="Custom truck wraps in Cleveland"
        sx={{
          width: '100%',
          maxWidth: { xs: '95%', sm: '80%', md: '900px' },
          height: 'auto',
          borderRadius: 0,
          boxShadow: 'none',
          backgroundColor: 'none',
          animation: 'scaleIn 1s ease-out forwards 0.2s',
          
        }}
      />
    </>
  );
};

export default HeroSection;
