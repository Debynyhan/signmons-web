import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import HeroSection from '../components/home/HeroSection';
import FeatureGrid from '../components/home/FeatureGrid';
import CarouselIndicators from '../components/home/CarouselIndicators';

interface HomePageProps {
  navigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
        background: 'radial-gradient(circle at center, #1C1E24 0%, #121212 70%)',
        color: 'text.primary',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0, 0, 0, 0.2)',
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: { xs: '90%', md: '80%', lg: '1200px' },
          mx: 'auto',
          py: { xs: 4, md: 8 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, md: 4 },
        }}
      >
        <HeroSection />
        <FeatureGrid />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('start-design')}
          sx={{
            py: { xs: 1.5, md: 2 },
            px: { xs: 6, md: 8 },
            fontSize: { xs: '1rem', md: '1.25rem' },
            borderRadius: '9999px',
            boxShadow: 6,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': { transform: 'scale(1.02)' },
          }}
        >
          GET YOUR FREE DESIGN PROOF
        </Button>
        <CarouselIndicators activeIndex={1} />
      </Box>
    </Box>
  );
};

export default HomePage;
