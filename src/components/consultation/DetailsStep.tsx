// src/components/consultation/DetailsStep.tsx

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Typography, Grid, TextField, Button } from '@mui/material';
import { stripHtmlTags, trimAndClamp } from '../../utils/stringUtils';
import type { DetailsInfo } from '../../types/consultation';

interface DetailsStepProps {
  initialInfo?: DetailsInfo;
  onNext: (info: DetailsInfo) => void;
}

// Business rule: max 500 characters
const MAX_NOTES_LEN = 500;

const DetailsStep: React.FC<DetailsStepProps> = ({ initialInfo, onNext }) => {
  const [notes, setNotes] = useState<string>(initialInfo?.notes || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Strip any HTML and enforce max length
    const sanitized = trimAndClamp(stripHtmlTags(notes), MAX_NOTES_LEN);
    if (sanitized.length === 0) {
      setError(null); // notes are optional
    } else if (sanitized.length > MAX_NOTES_LEN) {
      setError(`Notes must be under ${MAX_NOTES_LEN} characters`);
    } else {
      setError(null);
    }
  }, [notes]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };

  const isValid = error === null;

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Any additional details?
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        style={{ marginBottom: '16px' }}
      >
        Let me know any special instructions, placement notes, or ideas.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Notes & Details (optional)"
            placeholder="e.g. ‘Please focus the swoosh on the passenger side’"
            multiline
            minRows={4}
            maxRows={8}
            value={notes}
            onChange={handleChange}
            fullWidth
            error={!!error}
            helperText={
              error
                ? error
                : `${trimAndClamp(stripHtmlTags(notes), MAX_NOTES_LEN).length}/${MAX_NOTES_LEN}`
            }
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={() =>
                onNext({
                  notes: trimAndClamp(stripHtmlTags(notes), MAX_NOTES_LEN),
                })
              }
            >
              Continue
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailsStep;
