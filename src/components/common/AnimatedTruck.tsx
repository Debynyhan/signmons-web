// src/components/common/AnimatedTruck.tsx
import React from 'react';
import { Box, SxProps, Theme, useTheme, useMediaQuery } from '@mui/material';
import { motion, TargetAndTransition } from 'framer-motion';

interface AnimatedTruckProps {
  /** Image URL for the truck graphic */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Cycle speed (seconds) for mobile loop */
  speed?: number;
  /** SX overrides for styling the image */
  sx?: SxProps<Theme>;
}

const AnimatedTruck: React.FC<AnimatedTruckProps> = ({
  src,
  alt = 'Animated truck',
  speed = 9,
  sx,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  /**
   * Mobile animation sequence:
   * 1. Start off-screen right (100vw)
   * 2. Drive to center (0%)
   * 3. Pause at center (0%) for 5s
   * 4. Drive off left (-100vw)
   * 5. Pause off-screen for 2s
   * Loop infinitely
   */
  const mobileCycle: TargetAndTransition = {
    x: ['100vw', '0%', '0%', '-100vw', '-100vw'],
    transition: {
      duration: speed, // total cycle time in seconds
      times: [0, 0.111, 0.667, 0.778, 1],
      ease: 'linear',
      repeat: Infinity,
    },
  };

  /**
   * Desktop: single drive-in, stop at center, no loop
   */
  const desktopCycle: TargetAndTransition = {
    x: ['100vw', '0%'],
    transition: { duration: 2, ease: 'easeOut' },
  };

  return (
    <motion.div initial={{ x: '100vw' }} animate={isMobile ? mobileCycle : desktopCycle}>
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        sx={{
          width: '100%',
          maxWidth: { xs: '300px', sm: '400px', md: '100%' },
          height: 'auto',
          mx: 'auto',
          mt: 2,
          mb: { xs: 4, md: 0 },
          // Removed borderRadius and boxShadow per design
          filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))',
          ...sx,
        }}
      />
    </motion.div>
  );
};

export default AnimatedTruck;
