import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: 'black',
        color: 'white',
        minHeight: '100vh',         // full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // push CTA to bottom
        py: { xs: 6, md: 10 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        {/* Headline */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: '2rem', md: '3.25rem' },
            lineHeight: 1.2,
          }}
        >
          MOBILE DECALS & WRAPS
          <br />
          FOR{' '}
          <Box component="span" sx={{ color: 'teal.300' }}>
            TRADESMEN
          </Box>
        </Typography>

        {/* Subheading */}
        <Typography
          variant="h6"
          sx={{
            color: 'grey.400',
            mb: 4,
            maxWidth: 700,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.2rem' },
          }}
        >
          On-site vehicle graphics for hardworking pros in{' '}
          <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Cleveland & nearby areas
          </Box>
          .
        </Typography>

        {/* Truck Image */}
        <Box
          component="img"
          src="/my-branded-truck.png"
          alt="Signmons van preview"
          sx={{
            width: '100%',
            maxWidth: 640,
            mx: 'auto',
            height: 'auto',
            mb: { xs: 4, md: 0 }, // remove extra space on desktop
          }}
        />
      </Container>

      {/* CTA */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/start-design')}
          sx={{
            bgcolor: 'teal.500',
            color: 'white',
            fontWeight: 'bold',

            px: 4,
            py: 1.5,
            '&:hover': {
              bgcolor: 'teal.600',
            },
          }}
        >
          Start Your Design
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
