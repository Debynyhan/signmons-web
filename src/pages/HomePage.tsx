// src/pages/HomePage.tsx
import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
// Import MUI Icons
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SignpostIcon from '@mui/icons-material/Signpost';
import WebAssetIcon from '@mui/icons-material/WebAsset';

// Define the props type for HomePage
interface HomePageProps {
  navigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    // Main container for the homepage, dark background, cinematic feel
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)', // FIX: Adjusted minHeight to account for fixed header (64px is AppBar default height)
        // FIX: Radial Gradient Background
        background:
          'radial-gradient(circle at center, rgba(28, 30, 36, 1) 0%, rgba(18, 18, 18, 1) 100%)', // Darker center to lighter edges
        color: 'text.primary',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0, 0, 0, 0.2)', // Slightly lighter overlay for the new gradient
          zIndex: 0,
        },
      }}
    >
      {/* Content wrapper */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // FIX: Keep center justify but manage inner spacing better
          width: '100%',
          maxWidth: { xs: '90%', md: '80%', lg: '1200px' },
          mx: 'auto',
          py: { xs: 4, md: 8 }, // FIX: Reduced overall vertical padding slightly
          textAlign: 'center',
          gap: { xs: 4, md: 6 }, // FIX: Use gap for consistent spacing between major sections
        }}
      >
        {/* Main Headline */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'extrabold',
            lineHeight: 1.1,
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out forwards',
            '@keyframes fadeInUp': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
            // FIX: Color 'TRADESMEN'
            '& strong': { color: 'primary.main' }, // Uses primary.main from your theme
          }}
        >
          MOBILE DECALS & WRAPS <br />
          FOR **TRADESMEN**
        </Typography>

        {/* Sub-Headline / Value Proposition */}
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            maxWidth: 'md',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out forwards 0.1s',
            '& strong': { color: 'primary.main' }, // FIX: Ensure strong tags are colored
          }}
        >
          Transform your work vehicle into a powerful, 24/7 advertisement. Professional vehicle
          decals, window graphics, and yard signs installed **on-site** in{' '}
          <strong>Cleveland & surrounding areas</strong>.
        </Typography>

        {/* Main Vehicle Image */}
        <Box
          component="img"
          src="/my-branded-truck.png" // Your image path
          alt="Custom vehicle decals and wraps for tradesmen in Cleveland, Ohio"
          sx={{
            width: '100%',
            maxWidth: { xs: '95%', sm: '80%', md: '900px' },
            height: 'auto',
            borderRadius: '16px',
            boxShadow: 8,
            // FIX: Reduced margin-bottom, relying on parent's gap
            opacity: 0,
            transform: 'scale(0.95)',
            animation: 'scaleIn 1s ease-out forwards 0.2s',
            '@keyframes scaleIn': {
              from: { opacity: 0, transform: 'scale(0.95)' },
              to: { opacity: 1, transform: 'scale(1)' },
            },
          }}
        />

        {/* Featurettes below the main image */}
        <Grid
          container
          spacing={4}
          sx={{ width: '100%', px: { xs: 2, md: 0 } }} // FIX: Removed margin-bottom, relying on parent's gap
        >
          {/* Note: Kept 'component="div"' if you were still having Grid type errors. Remove if fixed. */}
          <Grid item xs={12} md={4} component="div">
            <Box
              sx={{
                textAlign: 'left',
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out forwards 0.3s',
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ color: 'primary.light', mb: 1, fontWeight: 'semibold' }}
              >
                ON-SITE INSTALLATION
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                We come to your job site or office for seamless decal and wrap application, saving
                your valuable time.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} component="div">
            <Box
              sx={{
                textAlign: 'left',
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out forwards 0.4s',
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ color: 'secondary.light', mb: 1, fontWeight: 'semibold' }}
              >
                CUSTOM DESIGNS
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Eye-catching graphics tailored to your business, ensuring maximum visibility and
                professionalism.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} component="div">
            <Box
              sx={{
                textAlign: 'left',
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out forwards 0.5s',
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ color: 'info.light', mb: 1, fontWeight: 'semibold' }}
              >
                COMPLETE BRANDING
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                From vehicle wraps to yard signs and business window decals, we ensure consistent,
                impactful branding.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Call to Action Button */}
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
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out forwards 0.6s',
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.2s ease-in-out',
            },
          }}
        >
          GET YOUR FREE DESIGN PROOF
        </Button>

        {/* Simple Carousel Indicators (if you implement a carousel later) */}
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            mt: 8, // Keep a larger margin-top for these, as they are at the very bottom
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out forwards 0.7s',
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: 'grey.600',
              borderRadius: '50%',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'grey.400' },
            }}
          ></Box>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: 'primary.main',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          ></Box>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: 'grey.600',
              borderRadius: '50%',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'grey.400' },
            }}
          ></Box>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: 'grey.600',
              borderRadius: '50%',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'grey.400' },
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
