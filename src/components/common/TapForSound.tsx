import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

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

  const positionStyles: React.CSSProperties = {
    position: 'absolute',
    right: '16px', // Default for mobile
    zIndex: 1001,
    pointerEvents: 'auto',
  };

  if (position === 'bottom-right') {
    positionStyles.bottom = '16px';
  } else {
    positionStyles.top = '16px';
  }

  // Larger screens
  if (window.matchMedia('(min-width: 960px)').matches) {
    if (position === 'bottom-right') {
      positionStyles.bottom = '24px';
    } else {
      positionStyles.top = '24px';
    }
    positionStyles.right = '24px';
  }

  return (
    <div style={positionStyles}>
      <Button
        variant="contained"
        color="primary"
        onClick={onTap}
        style={{
          padding: '8px 16px',
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 'bold',
        }}
      >
        Tap for Sound
      </Button>
    </div>
  );
};

export default TapForSound;
