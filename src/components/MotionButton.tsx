// src/components/MotionButton.tsx
import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

// Type-safe cubic bezier easing tuple
const EASING: [number, number, number, number] = [0.42, 0, 0.58, 1];

// Framer Motion variant for scale-in animation
const scaleVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASING },
  },
};

// Extend ButtonProps to accept all MUI Button props and children
const MotionButton: React.FC<ButtonProps> = ({ children, sx, ...rest }) => {
  return (
    <motion.div variants={scaleVariant} initial="hidden" animate="visible">
      <Button
        {...rest}
        sx={{
          px: 5,
          py: 1.5,
          fontSize: '1rem',
          borderRadius: '9999px',
          boxShadow: 6,
          '&:hover': { transform: 'scale(1.02)' },
          ...sx, // Allow custom styles via prop
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default MotionButton;
