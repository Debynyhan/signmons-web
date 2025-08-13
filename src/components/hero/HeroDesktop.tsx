// src/components/HeroDesktop.tsx

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import HeroShapes from '../common/HeroBackground';
import MotionButton from '../common/MotionButton';
import { COPY } from '../../content/positioning';
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
  height: 'calc(100dvh - 64px)',
  boxSizing: 'border-box',
      background:
        'radial-gradient(1200px 700px at 40% 20%, rgba(122,92,230,0.35), rgba(0,234,255,0.20) 40%, rgba(0,0,0,0) 70%), radial-gradient(circle at center, rgba(26, 28, 44, 0.85) 0%, rgba(14, 14, 20, 0.85) 100%)',
      color: 'text.primary',
      px: 2,
  py: 2,
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
        opacity: 1,
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
                variant="h1"
                align="left"
                sx={{
                  color: 'primary.light',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  mb: 1.5,
                  maxWidth: '100%',
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.6rem', lg: '4.2rem' },
                  textShadow:
                    '0 1px 0 rgba(0,0,0,0.85), 0 6px 22px rgba(0,0,0,0.55), 0 0 22px rgba(0,234,255,0.35), 0 0 40px rgba(122,92,230,0.28), 0 0 64px rgba(122,92,230,0.18)',
                }}
              >
                {COPY.hero.h1}
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
                  fontSize: '1.05rem',
                  textShadow: '0 3px 12px rgba(0,0,0,0.5)',
                }}
              >
                {COPY.hero.sub}
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
  pb: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
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
            {COPY.hero.cta}
          </MotionButton>
        </motion.div>
      </Box>
    </Box>
  </Box>
);

export default HeroDesktop;
