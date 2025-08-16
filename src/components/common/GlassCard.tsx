import { useTheme } from '@mui/material';
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: 'left' | 'right';
}

/**
 * GlassCard: reusable glassmorphism wrapper for sections and tiles.
 * - High-contrast text (no opacity applied to children)
 * - Performant blur with subtle brand glow edge
 * - Optional accent gradient strip on left or right side
 * - Responsive padding
 */
const GlassCard: React.FC<GlassCardProps> = ({ children, style, accent }) => {
  const theme = useTheme();

  const accentStyle: React.CSSProperties = accent
    ? {
        position: 'relative',
        overflow: 'hidden',
      }
    : {};

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    borderRadius: 12,
    padding: '28px',
    background: 'rgba(17,25,40,0.55)',
    backdropFilter: 'blur(12px) saturate(140%)',
    WebkitBackdropFilter: 'blur(12px) saturate(140%)',
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow: '0 12px 34px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)',
    ...accentStyle,
    ...style,
  };

  const accentGradient = `linear-gradient(180deg, ${
    theme.palette.secondary?.main || '#17EAD9'
  } 0%, ${theme.palette.primary?.main || '#7A5CE6'} 60%, ${
    theme.palette.info?.main || '#ff37c7'
  } 100%)`;

  return (
    <div style={cardStyle}>
      {accent && (
        <div
          style={{
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            [accent]: 0,
            width: 4,
            background: accentGradient,
            opacity: 0.95,
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
      <div
        style={{
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          boxShadow: '0 0 0 1px rgba(0,255,240,0.08), 0 0 80px rgba(120,80,255,0.10) inset',
        }}
      />
    </div>
  );
};

export default GlassCard;
