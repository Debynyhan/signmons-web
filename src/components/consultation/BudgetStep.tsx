// src/components/consultation/BudgetStep.tsx

import React, { useState } from 'react';
import { Box, Typography, Button, Slider } from '@mui/material';
import type { BudgetInfo } from '../../types/consultation';

interface BudgetStepProps {
  initialInfo?: BudgetInfo;
  onNext: (info: BudgetInfo) => void;
}

const MIN_BUDGET = 100;
const MAX_BUDGET = 2000;
const STEP = 50;

const BudgetStep: React.FC<BudgetStepProps> = ({ initialInfo, onNext }) => {
  const initialValue =
    initialInfo?.min && initialInfo.min >= MIN_BUDGET && initialInfo.min <= MAX_BUDGET
      ? initialInfo.min
      : MIN_BUDGET;
  const [value, setValue] = useState<number>(initialValue);

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        What’s your budget?
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
        Select your project budget. Minimum ${MIN_BUDGET}.
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 4 }}>
        <Slider
          value={value}
          min={MIN_BUDGET}
          max={MAX_BUDGET}
          step={STEP}
          marks={[
            { value: MIN_BUDGET, label: `$${MIN_BUDGET}` },
            { value: MAX_BUDGET, label: `$${MAX_BUDGET}` },
          ]}
          valueLabelDisplay="on"
          onChange={(_event: Event, newValue: number | number[]) =>
            setValue(Array.isArray(newValue) ? newValue[0] : newValue)
          }
          sx={{
            mb: 3,
            color: 'primary.main',
            height: 8,
            '& .MuiSlider-thumb': {
              height: 28,
              width: 28,
              backgroundColor: '#fff',
              border: '3px solid',
              borderColor: 'primary.main',
              boxShadow: 2,
              '&:hover, &.Mui-focusVisible': {
                boxShadow: 4,
              },
            },
            '& .MuiSlider-track': {
              border: 'none',
              height: 8,
              borderRadius: 4,
            },
            '& .MuiSlider-rail': {
              opacity: 0.5,
              backgroundColor: '#bdbdbd',
              height: 8,
              borderRadius: 4,
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: 'primary.main',
              color: '#222',
              borderRadius: 2,
              fontWeight: 700,
              fontSize: 16,
              top: -36,
              '&:before': {
                display: 'none',
              },
            },
          }}
          valueLabelFormat={(v: number) => `$${v}`}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button variant="contained" onClick={() => onNext({ min: value, max: value })}>
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetStep;
