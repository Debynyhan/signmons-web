// src/components/consultation/AssetsStep.tsx

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Typography, Grid, Button, FormHelperText, TextField } from '@mui/material';

// ——— Export the data shape for upstream consumption ———
export interface AssetsInfo {
  logos: File[];
  tagline: string;
}

// Security constants
const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'] as const;
const MAX_TAGLINE_LEN = 100;

interface AssetsStepProps {
  initialInfo?: AssetsInfo;
  onNext: (info: AssetsInfo) => void;
}

const AssetsStep: React.FC<AssetsStepProps> = ({ initialInfo, onNext }) => {
  const [logos, setLogos] = useState<File[]>(initialInfo?.logos || []);
  const [tagline, setTagline] = useState(initialInfo?.tagline.slice(0, MAX_TAGLINE_LEN) || '');

  // Error messages
  const [fileError, setFileError] = useState<string | null>(null);
  const [taglineError, setTaglineError] = useState<string | null>(null);

  // Client-side validation
  useEffect(() => {
    if (logos.length > MAX_FILES) {
      setFileError(`Maximum ${MAX_FILES} files allowed`);
      return;
    }
    for (const file of logos) {
      if (!ALLOWED_TYPES.includes(file.type as any)) {
        setFileError('Logos must be PNG, JPEG, or SVG');
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileError('Each file must be under 5 MB');
        return;
      }
    }
    setFileError(null);
  }, [logos]);

  useEffect(() => {
    const trimmed = tagline.trim();
    if (trimmed.length > MAX_TAGLINE_LEN) {
      setTaglineError(`Tagline must be under ${MAX_TAGLINE_LEN} characters`);
    } else {
      setTaglineError(null);
    }
  }, [tagline]);

  const isValid = logos.length > 0 && !fileError && !taglineError;

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const picked = Array.from(e.target.files);
    setLogos((prev) => [...prev, ...picked].slice(0, MAX_FILES));
  };

  const removeLogo = (idx: number) => {
    setLogos((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        Upload Your Logo(s)
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
        We’ll use these to mock up your design. SVG, PNG, or high-res JPG preferred.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="outlined" component="label" fullWidth>
            Select Logo Files (max {MAX_FILES})
            <input
              type="file"
              accept={ALLOWED_TYPES.join(',')}
              multiple
              hidden
              onChange={handleFiles}
            />
          </Button>
          {fileError ? (
            <FormHelperText error>{fileError}</FormHelperText>
          ) : logos.length === 0 ? (
            <FormHelperText error>Please upload at least one file</FormHelperText>
          ) : null}
        </Grid>

        {logos.map((file, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Box
              sx={{
                p: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                position: 'relative',
              }}
            >
              <Typography noWrap sx={{ pr: 6 }}>
                {file.name}
              </Typography>
              <Button
                size="small"
                onClick={() => removeLogo(i)}
                sx={{ position: 'absolute', top: 4, right: 4 }}
              >
                Remove
              </Button>
            </Box>
          </Grid>
        ))}

        <Grid item xs={12}>
          <TextField
            label="Tagline or Preferred Font"
            placeholder="e.g. 'Quality You Can Trust' or 'Roboto Bold'"
            value={tagline}
            onChange={(e) => setTagline(e.target.value.slice(0, MAX_TAGLINE_LEN))}
            fullWidth
            error={!!taglineError}
            helperText={taglineError ?? `${tagline.length}/${MAX_TAGLINE_LEN}`}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={() => onNext({ logos, tagline: tagline.trim() })}
            >
              Continue
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssetsStep;
