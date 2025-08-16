import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion, Variants } from 'framer-motion';

// Animate scale in
const EASING: [number, number, number, number] = [0.42, 0, 0.58, 1];
const scaleVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASING },
  },
};

// Vibrant neon glow
const glowPulse: Variants = {
  initial: { boxShadow: '0 0 14px #7a5ce677, 0 0 36px #00eaff55' },
  animate: {
    boxShadow: [
      '0 0 14px #7a5ce677, 0 0 36px #00eaff55',
      '0 0 22px #7a5ce6aa, 0 0 50px #00eaff77',
      '0 0 14px #7a5ce677, 0 0 36px #00eaff55',
    ],
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
  },
};

const RADIUS = 10; // rectangular with rounded corners

const MotionButton: React.FC<ButtonProps> = ({ children, sx, ...rest }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      margin: '16px 0',
    }}
  >
    <motion.div variants={scaleVariant} initial="hidden" animate="visible">
      <motion.div
        variants={glowPulse}
        initial="initial"
        animate="animate"
        style={{ display: 'inline-block', borderRadius: `${RADIUS}px` }}
      >
        <Button
          {...rest}
          sx={{
            px: { xs: 3, sm: 5 },
            py: { xs: 1.1, sm: 1.6 },
            fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem' },
            borderRadius: `${RADIUS}px !important`,
            fontWeight: 800,
            letterSpacing: '0.06em',
            boxShadow: '0 0 14px #7a5ce677, 0 0 36px #00eaff55',
            // Brighter vibrant gradient (cyan -> violet)
            background: 'linear-gradient(90deg, #00E3F8 0%, #7A51FF 50%, #B84CFF 100%)',
            color: '#FFFFFF',
            minWidth: { xs: 200, sm: 240 },
            transition: 'transform 0.2s cubic-bezier(.4,0,.2,1)',
            filter: 'saturate(1.15)',
            '&:hover': {
              transform: 'scale(1.03)',
              background: 'linear-gradient(90deg, #B84CFF 0%, #7A51FF 50%, #00E3F8 100%)',
              boxShadow: '0 0 22px #7a5ce6aa, 0 0 50px #00eaff77',
              filter: 'saturate(1.2)',
            },
            // Ensure inner content wrapper doesn't keep pill corners
            '& .MuiButton-startIcon, & .MuiButton-endIcon': { borderRadius: `${RADIUS}px` },
            // Target the root class explicitly as a fallback
            '&.MuiButton-root': { borderRadius: `${RADIUS}px` },
            ...sx,
          }}
        >
          {children}
        </Button>
      </motion.div>
    </motion.div>
  </div>
);

export default MotionButton;
