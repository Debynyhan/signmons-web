import React from 'react';
import { Box, Typography, TextField, Grid, Button, Paper, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VisuallyHiddenInput from './VisuallyHiddenInput';

interface Step2FormProps {
  businessType: string;
  brandPersonality: string;
  designText: string;
  logoFile: File | null;
  setBusinessType: (value: string) => void;
  setBrandPersonality: (value: string) => void;
  setDesignText: (value: string) => void;
  setLogoFile: (file: File | null) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  isStep2Valid: boolean;
  logoFileInputRef: React.RefObject<HTMLInputElement>;
}

const brandPersonalities = [
  'Clean & Minimalist',
  'Bold & Eye-Catching',
  'Traditional & Professional',
  'Modern & Techy',
  'Friendly & Approachable',
  'Rugged & Durable',
];

const Step2Form: React.FC<Step2FormProps> = ({
  businessType,
  brandPersonality,
  designText,
  logoFile,
  setBusinessType,
  setBrandPersonality,
  setDesignText,
  setLogoFile,
  onBack,
  onSubmit,
  loading,
  isStep2Valid,
  logoFileInputRef,
}) => {
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0]);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    if (logoFileInputRef.current) {
      logoFileInputRef.current.value = '';
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Step 2: Your Design Ideas
      </Typography>
      <Typography variant="body2" sx={{ mb: 4 }}>
        Tell us about your business and your vision for the design.
      </Typography>

      <TextField
        fullWidth
        label="What's your business type?"
        value={businessType}
        onChange={(e) => setBusinessType(e.target.value)}
        placeholder="e.g., Plumbing, Landscaping, HVAC"
        sx={{ mb: 4 }}
      />

      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
        What's your brand's personality?
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {brandPersonalities.map((personality) => (
          <Grid item xs={6} sm={4} md={3} key={personality}>
            <Button
              fullWidth
              variant={brandPersonality === personality ? 'contained' : 'outlined'}
              color={brandPersonality === personality ? 'primary' : 'inherit'}
              onClick={() => setBrandPersonality(personality)}
              startIcon={brandPersonality === personality ? <CheckCircleOutlineIcon /> : null}
              sx={{
                py: 2,
                borderColor: brandPersonality === personality ? 'primary.main' : 'text.secondary',
                color: brandPersonality === personality ? 'white' : 'text.primary',
              }}
            >
              {personality}
            </Button>
          </Grid>
        ))}
      </Grid>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="What text should be on the decal?"
        value={designText}
        onChange={(e) => setDesignText(e.target.value)}
        placeholder="e.g., 'Smith HVAC - (555) 123-4567'"
        sx={{ mb: 4 }}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
          Upload Your Logo
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Vector files preferred (.SVG, .AI, .EPS). PNG/JPG accepted.
        </Typography>
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload Logo
          <VisuallyHiddenInput
            type="file"
            accept=".svg,.ai,.eps,.png,.jpg,.jpeg"
            onChange={handleLogoUpload}
            ref={logoFileInputRef}
          />
        </Button>
        {logoFile && (
          <Paper
            sx={{
              mt: 1,
              p: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2">{logoFile.name}</Typography>
            <IconButton onClick={handleRemoveLogo} size="small" color="error">
              <CancelIcon />
            </IconButton>
          </Paper>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={onSubmit}
          disabled={loading || !isStep2Valid}
        >
          {loading ? 'Submitting...' : 'Submit Design Request'}
        </Button>
      </Box>
    </Box>
  );
};

export default Step2Form;
