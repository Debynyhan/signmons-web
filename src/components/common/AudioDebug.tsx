import React from 'react';
import { Box } from '@mui/material';

const AudioDebug: React.FC = () => {
  if (!import.meta.env.DEV) return null;
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 12,
        bottom: 12,
        zIndex: 2000,
        p: 1,
        bgcolor: 'rgba(0,0,0,0.5)',
        borderRadius: 1,
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.25)',
      }}
    >
      <audio src="/audio/audiosignmons.mp3" controls preload="auto" style={{ width: 260 }} />
    </Box>
  );
};

export default AudioDebug;
