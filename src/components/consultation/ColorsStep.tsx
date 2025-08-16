// src/components/consultation/ColorsStep.tsx

import React, { useState, useEffect } from 'react';
import { Typography, Grid, FormHelperText, Button } from '@mui/material';
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
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Pick Your Brand Colors
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        style={{ marginBottom: '24px' }}
      >
        Choose a primary and an accent color for your branding.
      </Typography>

      {/* Centered, equal-width columns for the two pickers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 240px)',
          justifyContent: 'center',
          justifyItems: 'center',
          columnGap: '48px',
          rowGap: '24px',
          marginBottom: '16px',
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
      </div>

      {/* Live preview swatches */}
      <Grid container>
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '16px',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                backgroundColor: primary,
                border: '1px solid #ccc',
              }}
            />
            <div
              style={{
                width: 40,
                height: 40,
                backgroundColor: accent,
                border: '1px solid #ccc',
              }}
            />
          </div>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <FormHelperText error>{error}</FormHelperText>
          </Grid>
        )}

        {/* Continue button */}
        <Grid item xs={12} style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={() => onNext({ primary: sanitizeHex(primary), accent: sanitizeHex(accent) })}
            >
              Continue
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ColorsStep;
