// src/components/HeroMobile.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import HeroShapes from '../common/HeroBackground';
import MotionButton from '../common/MotionButton';
import AnimatedTruck from '../common/AnimatedTruck';
import AnimatedHeadline from '../common/AnimatedHeadline';
import { PageName } from '../../types/navigation';

// Animation variants
const EASING: [number, number, number, number] = [0.42, 0, 0.58, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING } },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASING } },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASING } },
};

interface HeroMobileProps {
  navigate: (page: PageName) => void;
}

const HeroMobile: React.FC<HeroMobileProps> = ({ navigate }) => (
  <Box
    component="section"
    aria-label="Hero"
    sx={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      // The background gradient can stay here or be removed in favor of the overlay box
      background:
        'radial-gradient(circle at center, rgba(43,45,59,0.95) 0%, rgba(17,17,17,0.97) 100%)',
      color: 'text.primary',
      px: 2,
      py: 4,
    }}
  >
    {/* --- Background shapes and a separate overlay for a solid black effect --- */}

    {/* Hero Shapes as the bottom layer (zIndex: 0) */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0, // This is the base layer
        width: '100%',
        height: '100%',
      }}
    >
      <HeroShapes />
    </Box>

    {/* A solid black overlay on top of the shapes (zIndex: 1) */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 1, // This is the middle layer, on top of the shapes
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(0,0,0,0.62)', // A dark black overlay
        pointerEvents: 'none', // Prevents this overlay from blocking clicks
      }}
    />

    {/* --- All main content on the top layer (zIndex: 2) --- */}
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1, // Allows this box to grow and push the content down
        justifyContent: 'space-between', // Pushes the button to the bottom
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <motion.div variants={slideIn} initial="hidden" animate="visible">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 2,
              maxWidth: '100%',
            }}
          >
            <AnimatedHeadline words={['BRANDING', 'THAT', 'ROLLS', 'WITH', 'YOU']} />
          </Typography>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: 'common.white',
              mb: 2,
              maxWidth: '95%',
              fontWeight: 500,
              fontSize: '1.125rem',
            }}
          >
            Decals, wraps, and websites that shout your name (so you don’t have to).
            <strong style={{ color: '#17EAD9', fontWeight: 800 }}> Boost your brand 24/7</strong>.
          </Typography>
        </motion.div>
      </Box>

      {/* Van image */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          mt: 12,
          mb: 4,
        }}
      >
        <AnimatedTruck src="/my-branded-truck.png" alt="Custom wraps for tradesmen" speed={13} />
      </Box>

      {/* Button at the bottom */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 360,
          margin: 'auto',
        }}
      >
        <motion.div variants={popIn} initial="hidden" animate="visible">
          <MotionButton
            fullWidth
            onClick={() => navigate('start-design')}
            sx={{ bgcolor: 'secondary.main', color: '#fff', py: 2 }}
          >
            GET YOUR FREE DESIGN
          </MotionButton>
        </motion.div>
      </Box>
    </Box>
  </Box>
);

export default HeroMobile;
