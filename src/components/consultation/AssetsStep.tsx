// src/components/consultation/AssetsStep.tsx

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Typography, Grid, Button, FormHelperText, TextField, LinearProgress } from '@mui/material';
import { compressImage, formatBytes } from '../../utils/image';

// ——— Export the data shape for upstream consumption ———
export interface AssetsInfo {
  logos: File[];
  tagline: string;
}

// Security constants
const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'] as const;
const MAX_TAGLINE_LEN = 100;

interface AssetsStepProps {
  initialInfo?: AssetsInfo;
  onNext: (info: AssetsInfo) => void;
}

const AssetsStep: React.FC<AssetsStepProps> = ({ initialInfo, onNext }) => {
  const [logos, setLogos] = useState<File[]>(initialInfo?.logos || []);
  const [meta, setMeta] = useState<Record<string, { original: number; compressed: number }>>({});
  const [compressing, setCompressing] = useState(false);
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
        setFileError('Logos must be PNG, JPEG, SVG, or WebP');
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

  const isValid = logos.length > 0 && !fileError && !taglineError && !compressing;

  const handleFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    // Capture the input element before any awaits so we can safely reset it later
    const inputEl = e.currentTarget;
    const fileList = inputEl?.files;
    if (!fileList) return;

    const room = Math.max(0, MAX_FILES - logos.length);
    const picked = Array.from(fileList).slice(0, room);

    setCompressing(true);
    try {
      const processed: File[] = [];
      const newMeta: Record<string, { original: number; compressed: number }> = { ...meta };

      for (const f of picked) {
        const originalSize = f.size;
        // Compress raster; keep SVG as-is
        let out: File = f;
        try {
          if (f.type !== 'image/svg+xml') {
            out = await compressImage(f, {
              maxWidth: 1600,
              maxHeight: 1600,
              quality: 0.86,
              mime: 'image/webp',
            });
          }
        } catch {
          out = f; // fallback
        }
        processed.push(out);
        newMeta[out.name] = { original: originalSize, compressed: out.size };
      }

      setMeta(newMeta);
      setLogos((prev) => [...prev, ...processed].slice(0, MAX_FILES));
    } finally {
      setCompressing(false);
      // Reset so same file can be reselected; use captured element to avoid pooled-event nulls
      if (inputEl) inputEl.value = '';
    }
  };

  const removeLogo = (idx: number) => {
    setLogos((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Upload Your Logo(s)
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
        We’ll use these to mock up your design. SVG, PNG, or high-res JPG preferred.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="outlined" component="label" fullWidth disabled={compressing}>
            {compressing ? 'Optimizing…' : `Select Logo Files (max ${MAX_FILES})`}
            <input
              type="file"
              accept={(ALLOWED_TYPES as readonly string[]).join(',')}
              multiple
              hidden
              onChange={handleFiles}
            />
          </Button>
          {compressing && (
            <div style={{ marginTop: 8 }}>
              <LinearProgress />
              <FormHelperText>Compressing selected images for faster upload…</FormHelperText>
            </div>
          )}
          {fileError ? (
            <FormHelperText error>{fileError}</FormHelperText>
          ) : logos.length === 0 ? (
            <FormHelperText error>Please upload at least one file</FormHelperText>
          ) : null}
        </Grid>

        {logos.map((file, i) => {
          const m = meta[file.name];
          const saved = m ? Math.max(0, m.original - m.compressed) : undefined;
          const savingsText = saved !== undefined ? ` • Saved: ${formatBytes(saved)}` : '';
          return (
            <Grid item xs={12} sm={6} key={i}>
              <div
                style={{
                  padding: 8,
                  border: '1px solid #444',
                  borderRadius: 4,
                  position: 'relative',
                }}
              >
                <Typography noWrap sx={{ pr: 6 }}>
                  {file.name}
                </Typography>
                {m && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {`Original: ${formatBytes(m.original)} • Optimized: ${formatBytes(m.compressed)}${savingsText}`}
                  </Typography>
                )}
                <Button
                  size="small"
                  onClick={() => removeLogo(i)}
                  sx={{ position: 'absolute', top: 4, right: 4 }}
                >
                  Remove
                </Button>
              </div>
            </Grid>
          );
        })}

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
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={() => onNext({ logos, tagline: tagline.trim() })}
            >
              Continue
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AssetsStep;
