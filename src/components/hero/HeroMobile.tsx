// src/components/HeroMobile.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import HeroShapes from '../common/HeroBackground';
import MotionButton from '../common/MotionButton';
import { COPY } from '../../content/positioning';
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
      minHeight: '100dvh',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background:
        'radial-gradient(1000px 600px at 50% 25%, rgba(122,92,230,0.38), rgba(0,234,255,0.22) 45%, rgba(0,0,0,0) 70%), radial-gradient(circle at center, rgba(26,28,44,0.9) 0%, rgba(14,14,20,0.9) 100%)',
      color: 'text.primary',
      px: 2,
      py: 2,
    }}
  >
    {/* Background shapes as mid layer */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <HeroShapes />
    </Box>

    {/* Overlay above shapes */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(0,0,0,0.28)',
        pointerEvents: 'none',
      }}
    />
    {/* Content top layer */}
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1,
        justifyContent: 'flex-start',
      }}
    >
      {/* Headline + copy without GlassCard */}
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mb: 2 }}>
        <motion.div variants={slideIn} initial="hidden" animate="visible">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            sx={{
              color: 'primary.light',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              mb: 1.6,
              fontSize: { xs: '2rem', sm: '2.4rem' },
              textShadow:
                '0 1px 0 rgba(0,0,0,0.85), 0 5px 18px rgba(0,0,0,0.55), 0 0 16px rgba(0,234,255,0.34), 0 0 28px rgba(122,92,230,0.25), 0 0 50px rgba(122,92,230,0.18)',
            }}
          >
            {COPY.hero.h1}
          </Typography>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: 'text.primary',
              maxWidth: '100%',
              fontWeight: 500,
              textShadow: '0 2px 10px rgba(0,0,0,0.45)',
            }}
          >
            {COPY.hero.sub}
          </Typography>
        </motion.div>
      </Box>

      {/* Van image removed on homepage; 3D background now showcases the brand */}

      {/* Bottom-centered CTA overlay */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 64px)',
          zIndex: 3,
          display: 'flex',
          justifyContent: 'center',
          px: 2,
          pb: 0,
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 420, pointerEvents: 'auto' }}>
          <motion.div variants={popIn} initial="hidden" animate="visible">
            <MotionButton
              fullWidth
              onClick={() => navigate('start-design')}
              sx={{
                background: (t) => t.palette.success.main,
                color: (t) => t.palette.success.contrastText,
                py: 2,
                boxShadow: '0 8px 22px rgba(0,255,137,0.35)',
                '&:hover': {
                  background: (t) => t.palette.success.dark,
                  boxShadow: '0 10px 28px rgba(0,255,137,0.45)',
                },
              }}
            >
              {COPY.hero.cta}
            </MotionButton>
          </motion.div>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default HeroMobile;
