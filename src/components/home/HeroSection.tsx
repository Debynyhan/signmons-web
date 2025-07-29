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
          display: 'block',
          width: '100%',
          maxWidth: { xs: '95%', sm: '80%', md: '900px' },
          height: 'auto',
          borderRadius: '0px !important',
          boxShadow: 'none !important',
          transform: 'none !important',
          backgroundColor: 'transparent !important',
          objectFit: 'contain',
          animation: 'none !important',
          WebkitAnimation: 'none !important', // ✅ Safari fallback
          MozAnimation: 'none !important', // ✅ Firefox fallback
        }}
      />
    </>
  );
};

export default HeroSection;
