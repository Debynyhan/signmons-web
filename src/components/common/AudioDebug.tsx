import React from 'react';

const AudioDebug: React.FC = () => {
  if (!import.meta.env.DEV) return null;
  return (
    <div
      style={{
        position: 'fixed',
        left: 12,
        bottom: 12,
        zIndex: 2000,
        padding: '8px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: '4px',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.25)',
      }}
    >
      <audio src="/audio/audiosignmons.mp3" controls preload="auto" style={{ width: 260 }} />
    </div>
  );
};

export default AudioDebug;
