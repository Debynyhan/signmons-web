// src/components/HeroDesktop.tsx

import React from 'react';
import { Grid, Typography } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import HeroShapes from '../common/HeroBackground';
import TapForSound from '../common/TapForSound';
import GlassCard from '../common/GlassCard';
import MotionButton from '../common/MotionButton';
import { COPY } from '../../content/positioning';
import { PageName } from '../../types/navigation';
const HeroScene = React.lazy(() => import('../three/HeroScene'));

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
  <section
    aria-label="Hero"
    style={{
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
      color: 'white',
      padding: '16px 32px',
      overflow: 'hidden',
    }}
  >
    <TapForSound
      position="top-right"
      onTap={() => window.dispatchEvent(new CustomEvent('signmons-start-audio'))}
    />
    {/* 3D background shapes */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0, // renders above background gradient
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 1,
      }}
    >
      <HeroShapes />
    </div>

    <Grid
      container
      rowSpacing={{ xs: 10, md: 2 }}
      columnSpacing={{ xs: 0, md: 6 }}
      alignItems="center"
      justifyContent="center"
      style={{
        width: '100%',
        maxWidth: 1200,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Grid item xs={12} md={6}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            maxWidth: 520,
            margin: '0',
            marginTop: '16px',
          }}
        >
          {/* Headline + subcopy inside GlassCard (desktop only component) */}
          <GlassCard style={{ width: '100%', marginBottom: 24, padding: '40px' }} accent="left">
            <Typography
              component="h1"
              variant="h1"
              align="left"
              style={{
                color: 'white',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
                maxWidth: '100%',
                fontSize: '4.4rem',
                textShadow: '0 2px 0 rgba(0,0,0,0.6)',
              }}
            >
              <span style={{ color: '#00eaff' }}>Websites</span>
              {'. Branding. Marketing.'}
            </Typography>

            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <Typography
                variant="body1"
                align="left"
                style={{
                  color: 'white',
                  maxWidth: '96%',
                  fontWeight: 500,
                  fontSize: '1.25rem',
                  lineHeight: 1.5,
                  textShadow: '0 2px 0 rgba(0,0,0,0.6)',
                }}
              >
                {'Online, on '}
                <span
                  style={{
                    color: '#00eaff',
                    fontWeight: 800,
                    fontSize: '1.1em',
                  }}
                >
                  vehicles
                </span>
                {', on merch — Signmons makes it happen.'}
              </Typography>
            </motion.div>
          </GlassCard>
        </div>
      </Grid>
  <Grid
        item
        xs={12}
        md={6}
        style={{
          position: 'relative',
          minHeight: 300,
          height: '100%',
          pointerEvents: 'auto',
        }}
      >
        <React.Suspense fallback={null}>
          <HeroScene />
        </React.Suspense>
      </Grid>
      {/* Removed van image on homepage; 3D background now showcases the brand */}
    </Grid>

    {/* Bottom-centered CTA overlay */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 72px)',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      <div style={{ width: '100%', maxWidth: 420, pointerEvents: 'auto' }}>
        <motion.div variants={popIn} initial="hidden" animate="visible">
          <MotionButton
            fullWidth
            onClick={() => navigate('start-design')}
            style={{
              background: '#00C853',
              color: 'white',
              padding: '16px 0',
              boxShadow: '0 10px 28px rgba(0,255,137,0.35)',
            }}
          >
            {COPY.hero.cta}
          </MotionButton>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroDesktop;
