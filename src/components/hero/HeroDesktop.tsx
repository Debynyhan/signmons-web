// src/components/HeroDesktop.tsx

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import HeroShapes from '../common/HeroBackground';
import MotionButton from '../common/MotionButton';
import AnimatedHeadline from '../common/AnimatedHeadline';
import { PageName } from '../../types/navigation';

// Animation variants (keep these in sync with HeroMobile)
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

interface HeroDesktopProps {
  navigate: (page: PageName) => void;
}

const HeroDesktop: React.FC<HeroDesktopProps> = ({ navigate }) => (
  <Box
    component="section"
    aria-label="Hero"
    sx={{
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
      background:
        'radial-gradient(circle at center, rgba(43, 45, 59, 0.8) 0%, rgba(17, 17, 17, 0.8) 100%)',
      color: 'text.primary',
      px: 2,
      py: 4,
      overflow: 'hidden',
    }}
  >
    {/* 3D background shapes */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0, // renders above background gradient
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    >
      <HeroShapes />
    </Box>

    <Grid
      container
      rowSpacing={{ xs: 10, md: 2 }}
      columnSpacing={{ xs: 0, md: 4 }}
      alignItems="center"
      justifyContent="center"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        width: '100%',
        maxWidth: 1200,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            width: '100%',
            maxWidth: 520,
            mx: { xs: 'auto', md: 0 },
          }}
        >
          {/* Headline + subcopy without GlassCard */}
          <Box sx={{ width: '100%', mb: 2 }}>
            <motion.div variants={slideIn} initial="hidden" animate="visible">
              <Typography
                component="h1"
                variant="h3"
                align="left"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 1.5,
                  maxWidth: '100%',
                  textShadow: '0 4px 16px rgba(0,0,0,0.55)',
                }}
              >
                <AnimatedHeadline words={['BRANDING', 'THAT', 'ROLLS', 'WITH', 'YOU']} />
              </Typography>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <Typography
                variant="body1"
                align="left"
                sx={{
                  color: 'common.white',
                  maxWidth: '92%',
                  fontWeight: 500,
                  fontSize: '1.15rem',
                  textShadow: '0 3px 12px rgba(0,0,0,0.5)',
                }}
              >
                Decals, wraps, and websites that shout your name (so you don’t have to).{' '}
                <strong style={{ color: '#17EAD9', fontWeight: 800 }}>Boost</strong> your brand
                24/7.
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </Grid>

      {/* Removed van image on homepage; 3D background now showcases the brand */}
    </Grid>

    {/* Bottom-centered CTA overlay */}
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        px: 2,
        pb: 'max(env(safe-area-inset-bottom), 24px)',
        pointerEvents: 'none',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 420, pointerEvents: 'auto' }}>
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

export default HeroDesktop;
