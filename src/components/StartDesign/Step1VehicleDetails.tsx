// src/components/StartDesign/Step1VehicleDetails.tsx

import React from 'react';
import { Box, Typography, Button, TextField, Grid, Paper, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@mui/system';
import { Step1Props } from '../../types/startDesignTypes';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Step1VehicleDetails: React.FC<Step1Props> = ({
  vehicleImages,
  vehicleDetails,
  handleVehicleImageUpload,
  handleRemoveVehicleImage,
  handleVehicleDetailsChange,
  isStep1Valid,
  onNext,
  vehicleFileInputRef,
}) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleVehicleImageUpload(Array.from(files));
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Step 1: Tell Us About Your Vehicle
      </Typography>
      <Typography variant="body2" sx={{ mb: 4 }}>
        Upload clear photos of your vehicle from multiple angles (side, front, back) and provide its
        basic details.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ mb: 2 }}
        >
          Upload Vehicle Images
          <VisuallyHiddenInput
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            ref={vehicleFileInputRef}
          />
        </Button>
        {vehicleImages.length === 0 && (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            *Please upload at least one image. Clear photos from multiple angles help us design
            better.
          </Typography>
        )}

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {vehicleImages.map((file, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Paper
                sx={{
                  position: 'relative',
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Vehicle preview ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
                <Typography variant="caption" noWrap sx={{ mt: 1 }}>
                  {file.name}
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    bgcolor: 'rgba(255,0,0,0.6)',
                    color: 'white',
                  }}
                  onClick={() => handleRemoveVehicleImage(index)}
                >
                  <CancelIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Vehicle Make"
            name="make"
            value={vehicleDetails.make}
            onChange={handleVehicleDetailsChange}
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Vehicle Model"
            name="model"
            value={vehicleDetails.model}
            onChange={handleVehicleDetailsChange}
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Vehicle Year"
            name="year"
            type="number"
            value={vehicleDetails.year}
            onChange={handleVehicleDetailsChange}
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Any specific areas for decals or existing issues?"
            name="notes"
            value={vehicleDetails.notes}
            onChange={handleVehicleDetailsChange}
            multiline
            rows={3}
            variant="outlined"
            placeholder="e.g., 'toolboxes,' 'faded paint on driver's side,' 'existing decals to remove/cover.'"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<NavigateNextIcon />}
          onClick={onNext}
          disabled={!isStep1Valid}
        >
          Next: Your Design Ideas
        </Button>
      </Box>
    </Box>
  );
};

export default Step1VehicleDetails;
