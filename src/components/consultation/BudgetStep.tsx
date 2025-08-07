// src/components/consultation/BudgetStep.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, FormHelperText, Button } from '@mui/material';
import { isPositiveInteger, isWithinRange } from '../../utils/validationUtils';
import type { BudgetInfo } from '../../types/consultation';

interface BudgetStepProps {
  initialInfo?: BudgetInfo;
  onNext: (info: BudgetInfo) => void;
}

// Business requirement: minimum budget $100
const MIN_BUDGET = 100;

const BudgetStep: React.FC<BudgetStepProps> = ({ initialInfo, onNext }) => {
  // Track values as strings for full control
  const [minStr, setMinStr] = useState<string>(initialInfo != null ? String(initialInfo.min) : '');
  const [maxStr, setMaxStr] = useState<string>(initialInfo != null ? String(initialInfo.max) : '');
  const [error, setError] = useState<string | null>(null);

  // Validate whenever minStr/maxStr change
  useEffect(() => {
    if (!isPositiveInteger(minStr, MIN_BUDGET)) {
      setError(`Min must be an integer ≥ $${MIN_BUDGET}`);
    } else if (!isPositiveInteger(maxStr)) {
      setError('Max must be a non-negative integer');
    } else if (!isWithinRange(minStr, maxStr, MIN_BUDGET)) {
      setError('Max must be ≥ Min');
    } else {
      setError(null);
    }
  }, [minStr, maxStr]);

  const isValid = !error;

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        What’s your budget range?
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
        Helps me tailor options to your price point. Minimum ${MIN_BUDGET}.
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {/* Min budget */}
        <Grid item xs={6}>
          <TextField
            label="Min ($)"
            type="text"
            placeholder={String(MIN_BUDGET)}
            value={minStr}
            onChange={(e) => setMinStr(e.target.value)}
            fullWidth
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
            error={!!error && !isPositiveInteger(minStr, MIN_BUDGET)}
          />
        </Grid>

        {/* Max budget */}
        <Grid item xs={6}>
          <TextField
            label="Max ($)"
            type="text"
            placeholder="e.g. 1000"
            value={maxStr}
            onChange={(e) => setMaxStr(e.target.value)}
            fullWidth
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
            error={!!error && !isWithinRange(minStr, maxStr, MIN_BUDGET)}
          />
        </Grid>

        {/* Validation error */}
        {error && (
          <Grid item xs={12}>
            <FormHelperText error>{error}</FormHelperText>
          </Grid>
        )}

        {/* Continue */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={() =>
                onNext({
                  min: Number(minStr),
                  max: Number(maxStr),
                })
              }
            >
              Continue
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BudgetStep;
