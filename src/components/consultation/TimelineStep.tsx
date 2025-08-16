// src/components/consultation/TimelineStep.tsx

import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import { formatDateForInput, isDateInFuture } from '../../utils/dateUtils';
import type { TimelineInfo } from '../../types/consultation';

interface TimelineStepProps {
  initialInfo?: TimelineInfo;
  onNext: (info: TimelineInfo) => void;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ initialInfo, onNext }) => {
  // default to tomorrow
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const defaultDate = formatDateForInput(today);

  const [date, setDate] = useState(initialInfo?.date || defaultDate);
  const [rush, setRush] = useState(initialInfo?.rush ?? false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isDateInFuture(date)) {
      setError('Please pick a date in the future');
    } else {
      setError(null);
    }
  }, [date]);

  const isValid = !error;

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        When would you like your mockup?
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        style={{ marginBottom: '16px' }}
      >
        Select a delivery date. Rush (24-hr) delivery adds a small fee.
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {/* Date picker */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Delivery Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: formatDateForInput(new Date()) }}
            error={!!error}
            helperText={error}
          />
        </Grid>

        {/* Rush toggle */}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch checked={rush} onChange={(e) => setRush(e.target.checked)} />}
            label="Rush delivery (24-hour)"
          />
        </Grid>

        {/* Continue button */}
        <Grid item xs={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" disabled={!isValid} onClick={() => onNext({ date, rush })}>
              Continue
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TimelineStep;
