// src/components/consultation/IndustryStep.tsx

import React from 'react';
import { Grid, Typography } from '@mui/material';
import StepCard from '../common/StepCard';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BuildIcon from '@mui/icons-material/Build';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import StoreIcon from '@mui/icons-material/Store';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface IndustryStepProps {
  selected?: string;
  onSelect: (value: string) => void;
}

const industries = [
  { id: 'HVAC', label: 'HVAC', icon: <AcUnitIcon fontSize="large" /> },
  { id: 'Plumbing', label: 'Plumbing', icon: <BuildIcon fontSize="large" /> },
  { id: 'Electrical', label: 'Electrical', icon: <FlashOnIcon fontSize="large" /> },
  { id: 'Landscaping', label: 'Landscaping', icon: <LocalFloristIcon fontSize="large" /> },
  { id: 'Retail', label: 'Retail', icon: <StoreIcon fontSize="large" /> },
  { id: 'Other', label: 'Other', icon: <MoreHorizIcon fontSize="large" /> },
];

const IndustryStep: React.FC<IndustryStepProps> = ({ selected, onSelect }) => {
  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Which industry best describes your work?
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {industries.map(({ id, label, icon }) => (
          <Grid item xs={6} sm={4} key={id}>
            <StepCard
              selected={selected === id}
              onClick={() => onSelect(id)}
              icon={icon}
              label={label}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default IndustryStep;
