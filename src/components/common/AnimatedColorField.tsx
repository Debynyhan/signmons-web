import React, { useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface AnimatedColorFieldProps {
  label: string;
  color: string;
  onChange: (hex: string) => void;
  id?: string;
  pulse?: boolean; // whether to pulse on mount
  size?: number; // swatch size in px
  glowColor?: string; // optional override for glow color
}

const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

const AnimatedColorField: React.FC<AnimatedColorFieldProps> = ({
  label,
  color,
  onChange,
  id,
  pulse = true,
  size = 56,
  glowColor,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pulsing, setPulsing] = useState<boolean>(pulse);

  const handlePick = () => {
    inputRef.current?.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e.target.value;
    onChange(val);
  };

  // Basic keyboard accessibility
  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePick();
    }
  };

  const glow = glowColor ?? color;
  const baseShadow = '0 8px 24px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.08)';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Typography style={{ marginBottom: 8, fontWeight: 500 }}>{label}</Typography>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <motion.button
          type="button"
          aria-label={`${label}: ${color}`}
          onClick={() => {
            setPulsing(false);
            handlePick();
          }}
          onKeyDown={handleKeyDown}
          style={{
            width: size,
            height: size,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.15)',
            background: color,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            alignSelf: 'center',
            boxSizing: 'border-box',
            boxShadow: baseShadow,
          }}
          initial={{ scale: 1 }}
          animate={
            pulsing
              ? {
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    `${baseShadow}, 0 0 0 0 rgba(0,0,0,0)`,
                    `${baseShadow}, 0 0 18px 6px ${glow}66`,
                    `${baseShadow}, 0 0 0 0 rgba(0,0,0,0)`,
                  ],
                }
              : { boxShadow: baseShadow, scale: 1 }
          }
          transition={{ duration: 1.6, repeat: pulsing ? Infinity : 0, ease: 'easeInOut' }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        />
      </div>
      <input
        id={id}
        ref={inputRef}
        type="color"
        value={color}
        onChange={handleChange}
        style={visuallyHidden}
        aria-hidden
        tabIndex={-1}
      />
    </div>
  );
};

export default AnimatedColorField;
