import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

const TapForSound: React.FC<{
  position?: 'top-right' | 'bottom-right';
  onTap?: () => Promise<boolean> | boolean;
}> = ({ position = 'top-right', onTap }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onStarted = () => setVisible(false);
    window.addEventListener('signmons-audio-started', onStarted as EventListener);
    return () => window.removeEventListener('signmons-audio-started', onStarted as EventListener);
  }, []);

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: { xs: '16px', md: '24px' },
        right: { xs: '16px', md: '24px' },
        zIndex: 1001, // Ensure it's above other UI
        pointerEvents: 'auto',
      }}
    >
      <Button
        variant="contained"
        onClick={async () => {
          (window as any).__signmonsWantsAudio = true;
          // Try the provided onTap first
          let ok = false;
          if (onTap) {
            ok = Boolean(await onTap());
          }
          // Fallback to global starter to ensure same-tick user gesture
          if (!ok && (window as any).signmonsStartAudio) {
            ok = Boolean(await (window as any).signmonsStartAudio());
          }
          if (!ok) {
            // Also dispatch a custom event the scene listens for
            window.dispatchEvent(new CustomEvent('signmons-start-audio'));
          }
          if (ok) setVisible(false);
        }}
        sx={{
          borderRadius: '50px',
          textTransform: 'none',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(44, 255, 25, 0.44)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          transition: 'transform 0.2s ease-in-out, background-color 0.2s',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            transform: 'scale(1.05)',
          },
        }}
      >
        Tap for sound
      </Button>
    </Box>
  );
};

export default TapForSound;
