// src/components/HeroMobile.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import HeroShapes from '../common/HeroBackground';
import TapForSound from '../common/TapForSound';
import MotionButton from '../common/MotionButton';
import { COPY } from '../../content/positioning';
import { PageName } from '../../types/navigation';

// Animation variants
const EASING: [number, number, number, number] = [0.42, 0, 0.58, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING } },
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
        'radial-gradient(circle at center, rgba(0, 234, 255, 0.9) 0%, rgba(162, 89, 255, 0.9) 50%, rgba(17,17,17, 0.95) 100%)',
      color: 'text.primary',
      px: 2,
      py: 2,
    }}
  >
    <TapForSound
      position="top-right"
      onTap={() => window.dispatchEvent(new CustomEvent('signmons-start-audio'))}
    />
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
        <Typography
          component="h1"
          variant="h3"
          align="center"
          sx={{
            color: 'common.white',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            mb: 1.6,
            fontSize: { xs: '2rem', sm: '2.4rem' },
            textShadow: '0 2px 0 rgba(0,0,0,0.6)',
          }}
        >
          <Box component="span" sx={{ color: (t: any) => t.palette.secondary.light }}>
            Websites
          </Box>
          {'. Branding. Marketing.'}
        </Typography>
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: 'common.white',
              maxWidth: '100%',
              fontWeight: 500,
              fontSize: '1.1rem',
              lineHeight: 1.5,
              textShadow: '0 2px 0 rgba(0,0,0,0.6)',
            }}
          >
            {'Online, on '}
            <Box
              component="span"
              sx={{
                color: (t: any) => t.palette.secondary.light,
                fontWeight: 800,
                fontSize: '1.1em',
              }}
            >
              vehicles
            </Box>
            {', on merch — Signmons makes it happen.'}
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
