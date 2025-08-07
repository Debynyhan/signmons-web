// src/components/consultation/ColorsStep.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, FormHelperText, Button } from '@mui/material';
import type { ColorsInfo } from '../../types/consultation';
import { sanitizeHex, ensureContrast } from '../../utils/validationUtils';


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

      <Grid container spacing={4} justifyContent="center">
        {/* Primary Color */}
        <Grid item xs={6} sm={4}>
          <Typography>Primary Color</Typography>
          <TextField
            type="color"
            value={primary}
            onChange={(e) => setPrimary(sanitizeHex(e.target.value))}
            fullWidth
            sx={{ height: 56, p: 0 }}
          />
        </Grid>

        {/* Accent Color */}
        <Grid item xs={6} sm={4}>
          <Typography>Accent Color</Typography>
          <TextField
            type="color"
            value={accent}
            onChange={(e) => setAccent(sanitizeHex(e.target.value))}
            fullWidth
            sx={{ height: 56, p: 0 }}
          />
        </Grid>

        {/* Live preview swatches */}
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
        <Grid item xs={12}>
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
