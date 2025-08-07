// src/components/consultation/StepCard.tsx

import React from 'react';
import { Box, CardActionArea, CardContent, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface StepCardProps {
  selected?: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ selected, onClick, label, icon }) => {
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(0,0,0,0.5)' }}
      whileTap={{ scale: 0.98 }}
      animate={selected ? { boxShadow: `0 0 16px ${theme.palette.primary.main}` } : {}}
      transition={
        selected
          ? { repeat: Infinity, repeatType: 'mirror', duration: 2, ease: 'easeInOut' }
          : undefined
      }
      style={{ perspective: 600 }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          background: 'rgba(17,17,27,0.4)',
          backdropFilter: 'blur(12px)',
          transition: 'border-color 200ms, box-shadow 200ms',
          border: selected ? `2px solid ${theme.palette.primary.main}` : `2px solid transparent`,
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.light}`,
          },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'common.white',
            py: 3,
          }}
        >
          <Box mb={1}>{icon}</Box>
          <Typography variant="subtitle1">{label}</Typography>
        </CardContent>
      </CardActionArea>
    </motion.div>
  );
};

export default StepCard;
