import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

const EASING: [number, number, number, number] = [0.42, 0, 0.58, 1];

const scaleVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASING } },
};

const MotionButton: React.FC<ButtonProps> = ({ children, sx, ...rest }) => (
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
        ...sx,
      }}
    >
      {children}
    </Button>
  </motion.div>
);

export default MotionButton;
