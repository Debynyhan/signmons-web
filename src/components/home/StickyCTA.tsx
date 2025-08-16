import React from 'react';
import { Button } from '@mui/material';

interface StickyCTAProps {
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
}

const StickyCTA: React.FC<StickyCTAProps> = ({ onPrimaryClick, onSecondaryClick }) => {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        backdropFilter: 'blur(8px)',
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6))',
        paddingTop: '8px',
        paddingBottom: '8px',
        display: 'flex',
        gap: '8px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      <Button variant="contained" color="primary" onClick={onPrimaryClick} fullWidth>
        Start My Free Design
      </Button>
      {onSecondaryClick && (
        <Button variant="outlined" onClick={onSecondaryClick} fullWidth>
          Learn More
        </Button>
      )}
    </div>
  );
};

export default StickyCTA;
