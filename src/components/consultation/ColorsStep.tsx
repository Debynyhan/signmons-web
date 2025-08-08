// src/components/consultation/ColorsStep.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, FormHelperText, Button } from '@mui/material';
import type { ColorsInfo } from '../../types/consultation';
import { sanitizeHex, ensureContrast } from '../../utils/validationUtils';
import AnimatedColorField from '../common/AnimatedColorField';

interface ColorsStepProps {
  initialInfo?: ColorsInfo;
  onNext: (info: ColorsInfo) => void;
}

const ColorsStep: React.FC<ColorsStepProps> = ({ initialInfo, onNext }) => {
  const [primary, setPrimary] = useState<string>(sanitizeHex(initialInfo?.primary || '#000000'));
  const [accent, setAccent] = useState<string>(sanitizeHex(initialInfo?.accent || '#ffffff'));
  const [error, setError] = useState<string | null>(null);

  // Use ensureContrast for WCAG‐style contrast checking
  useEffect(() => {
    if (!ensureContrast(primary, accent, 3.0)) {
      setError('Primary and accent colors need ≥3:1 contrast');
    } else {
      setError(null);
    }
  }, [primary, accent]);

  const isValid = !error;

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        Pick Your Brand Colors
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
        Choose a primary and an accent color for your branding.
      </Typography>

      {/* Centered, equal-width columns for the two pickers */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(2, 240px)' },
          justifyContent: 'center',
          justifyItems: 'center',
          columnGap: { xs: 2, sm: 6 },
          rowGap: 3,
          mb: 2,
        }}
      >
        <AnimatedColorField
          label="Primary Color"
          color={primary}
          onChange={(c) => setPrimary(sanitizeHex(c))}
        />
        <AnimatedColorField
          label="Accent Color"
          color={accent}
          onChange={(c) => setAccent(sanitizeHex(c))}
        />
      </Box>

      {/* Live preview swatches */}
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 2,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: primary,
                border: '1px solid #ccc',
              }}
            />
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: accent,
                border: '1px solid #ccc',
              }}
            />
          </Box>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <FormHelperText error>{error}</FormHelperText>
          </Grid>
        )}

        {/* Continue button */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={() => onNext({ primary: sanitizeHex(primary), accent: sanitizeHex(accent) })}
            >
              Continue
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ColorsStep;
