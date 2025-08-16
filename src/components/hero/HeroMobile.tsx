// src/components/HeroMobile.tsx

import React from 'react';
import { Typography } from '@mui/material';
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
  <section
    aria-label="Hero"
    style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100dvh',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background:
        'radial-gradient(circle at center, rgba(0, 234, 255, 0.9) 0%, rgba(162, 89, 255, 0.9) 50%, rgba(17,17,17, 0.95) 100%)',
      color: 'white',
      padding: '16px',
    }}
  >
    <TapForSound
      position="top-right"
      onTap={() => window.dispatchEvent(new CustomEvent('signmons-start-audio'))}
    />
    {/* Background shapes as mid layer */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <HeroShapes />
    </div>

    {/* Overlay above shapes */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.28)',
        pointerEvents: 'none',
      }}
    />
    {/* Content top layer */}
    <div
      style={{
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
      <div style={{ width: '100%', maxWidth: 600, margin: '0 auto 16px' }}>
        <Typography
          component="h1"
          variant="h3"
          align="center"
          style={{
            color: 'white',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            marginBottom: '12.8px',
            fontSize: '2.4rem',
            textShadow: '0 2px 0 rgba(0,0,0,0.6)',
          }}
        >
          <span style={{ color: '#00eaff' }}>Websites</span>
          {'. Branding. Marketing.'}
        </Typography>
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Typography
            variant="body1"
            align="center"
            style={{
              color: 'white',
              maxWidth: '100%',
              fontWeight: 500,
              fontSize: '1.1rem',
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
      </div>

      {/* Van image removed on homepage; 3D background now showcases the brand */}

      {/* Bottom-centered CTA overlay */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 64px)',
          zIndex: 3,
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
                background: '#00BFA5',
                color: '#fff',
                padding: '16px 0',
                boxShadow: '0 8px 22px rgba(0,191,165,0.35)',
              }}
            >
              {COPY.hero.cta}
            </MotionButton>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroMobile;
