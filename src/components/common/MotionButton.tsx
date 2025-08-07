import React from 'react';
import { Button, ButtonProps, Box } from '@mui/material';
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

// Animate glowing box-shadow
const glowPulse: Variants = {
  initial: { boxShadow: '0 0 18px #a259ff77, 0 0 48px #00eaff33' },
  animate: {
    boxShadow: [
      '0 0 18px #a259ff77, 0 0 48px #00eaff33',
      '0 0 32px #a259ffcc, 0 0 72px #00eaff66',
      '0 0 18px #a259ff77, 0 0 48px #00eaff33',
    ],
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
  },
};

const MotionButton: React.FC<ButtonProps> = ({ children, sx, ...rest }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      my: 2, // margin vertical for spacing, adjust as needed
    }}
  >
    <motion.div variants={scaleVariant} initial="hidden" animate="visible">
      <motion.div
        variants={glowPulse}
        initial="initial"
        animate="animate"
        style={{ display: 'inline-block', borderRadius: '9999px' }}
      >
        <Button
          {...rest}
          sx={{
            px: { xs: 3, sm: 5 }, // smaller padding on xs (mobile), default on sm+
            py: { xs: 1, sm: 1.5 },
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            borderRadius: '9999px',
            fontWeight: 900,
            letterSpacing: '0.06em',
            boxShadow: '0 0 18px #a259ff77, 0 0 48px #00eaff33', // fallback
            background: 'linear-gradient(90deg, #00eaff 0%, #a259ff 100%)',
            color: '#181827',
            minWidth: { xs: 200, sm: 240 }, // responsive min width
            transition: 'transform 0.2s cubic-bezier(.4,0,.2,1)',
            '&:hover': {
              transform: 'scale(1.04)',
              background: 'linear-gradient(90deg, #a259ff 0%, #00eaff 100%)',
              boxShadow: '0 0 28px 0 #00eaffbb',
            },
            ...sx,
          }}
        >
          {children}
        </Button>
      </motion.div>
    </motion.div>
  </Box>
);

export default MotionButton;
