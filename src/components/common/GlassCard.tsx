// src/components/common/GlassCard.tsx
import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface GlassCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * GlassCard: reusable glassmorphism wrapper for sections and tiles.
 * - High-contrast text (no opacity applied to children)
 * - Performant blur with subtle brand glow edge
 * - Responsive padding
 */
const GlassCard: React.FC<GlassCardProps> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        p: { xs: 2.5, sm: 3.5 },
        background: 'rgba(17,25,40,0.55)',
        backdropFilter: 'blur(12px) saturate(140%)',
        WebkitBackdropFilter: 'blur(12px) saturate(140%)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 12px 34px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)',
        overflow: 'hidden',
        '&:after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          boxShadow: '0 0 0 1px rgba(0,255,240,0.08), 0 0 80px rgba(120,80,255,0.10) inset',
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default GlassCard;
