// src/components/StartDesign/ProgressDots.tsx
import React from 'react';
import { Box } from '@mui/material';

interface ProgressDotsProps {
  currentStep: number;
  totalSteps?: number; // Defaults to 3 (Step 1, Step 2, Thank You)
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ currentStep, totalSteps = 3 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: 2,
        bgcolor: 'background.paper',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {[...Array(totalSteps)].map((_, stepIndex) => (
        <Box
          key={stepIndex}
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: currentStep >= stepIndex + 1 ? 'primary.main' : 'grey.700',
            mx: 1,
            transition: 'background-color 0.3s ease',
          }}
        />
      ))}
    </Box>
  );
};

export default ProgressDots;
