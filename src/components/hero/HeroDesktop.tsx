// src/components/HeroDesktop.tsx

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import HeroShapes from '../common/HeroBackground';
import TapForSound from '../common/TapForSound';
import GlassCard from '../common/GlassCard';
import MotionButton from '../common/MotionButton';
import { COPY } from '../../content/positioning';
import { PageName } from '../../types/navigation';

// Animation variants (keep these in sync with HeroMobile)
const EASING: [number, number, number, number] = [0.42, 0, 0.58, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING } },
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
        'radial-gradient(circle at center, rgba(0, 234, 255, 0.9) 0%, rgba(162, 89, 255, 0.9) 50%, rgba(17,17,17, 0.95) 100%)',
      color: 'text.primary',
      px: { xs: 2, md: 4 },
      py: { xs: 2, md: 4 },
      overflow: 'hidden',
    }}
  >
    <TapForSound
      position="top-right"
      onTap={() => window.dispatchEvent(new CustomEvent('signmons-start-audio'))}
    />
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
      columnSpacing={{ xs: 0, md: 6 }}
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
            maxWidth: { xs: 520, md: 520 },
            mx: { xs: 'auto', md: 0 },
            mt: { xs: 0, md: 2 },
          }}
        >
          {/* Headline + subcopy inside GlassCard (desktop only component) */}
          <GlassCard sx={{ width: '100%', mb: 3, p: { xs: 2.5, md: 5 } }} accent="left">
            <Typography
              component="h1"
              variant="h1"
              align="left"
              sx={{
                color: 'common.white',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                mb: 1.5,
                maxWidth: '100%',
                fontSize: { xs: '2.2rem', sm: '3rem', md: '3.8rem', lg: '4.4rem' },
                // Small, sharp shadow for contrast
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
                align="left"
                sx={{
                  color: 'common.white',
                  maxWidth: '96%',
                  fontWeight: 500,
                  fontSize: { xs: '1.2rem', md: '1.25rem' },
                  lineHeight: 1.5,
                  // Match headline's small, sharp shadow for better contrast
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
          </GlassCard>
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
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 72px)',
        zIndex: 2,
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
              // Original green CTA via theme
              background: (t) => t.palette.success.main,
              color: (t) => t.palette.success.contrastText,
              py: 2,
              boxShadow: '0 10px 28px rgba(0,255,137,0.35)',
              '&:hover': {
                background: (t) => t.palette.success.dark,
                boxShadow: '0 12px 34px rgba(0,255,137,0.45)',
              },
            }}
          >
            {COPY.hero.cta}
          </MotionButton>
        </motion.div>
      </Box>
    </Box>
  </Box>
);

export default HeroDesktop;
