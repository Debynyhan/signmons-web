// src/components/consultation/VehicleStep.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { vehicleTypes, vehicleMakes, vehicleModels } from '../../constants/vehicleData';
import type { VehicleInfo } from '../../types/consultation';
// Local state type for controlled Autocomplete fields
type LocalVehicleInfo = { [K in keyof VehicleInfo]: string | null };

interface VehicleStepProps {
  initialInfo?: VehicleInfo;
  onNext: (info: VehicleInfo) => void;
}

// Years from current back 30
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 31 }, (_, i) => String(currentYear - i));

// Common color options
const colorOptions = ['White', 'Black', 'Red', 'Blue', 'Silver', 'Gray', 'Other'];

const VehicleStep: React.FC<VehicleStepProps> = ({ initialInfo, onNext }) => {
  const [info, setInfo] = useState<LocalVehicleInfo>(() => ({
    type: initialInfo?.type || null,
    make: initialInfo?.make || null,
    model: initialInfo?.model || null,
    year: initialInfo?.year || null,
    color: initialInfo?.color || null,
  }));

  // Sync if user navigates Back
  useEffect(() => {
    if (initialInfo) {
      setInfo({
        type: initialInfo.type || null,
        make: initialInfo.make || null,
        model: initialInfo.model || null,
        year: initialInfo.year || null,
        color: initialInfo.color || null,
      });
    }
  }, [initialInfo]);

  const isValid = [info.type, info.make, info.model, info.year, info.color].every(
    (v) => v !== null && v !== '',
  );

  const handleChange =
    <K extends keyof VehicleInfo>(field: K) =>
    (_event: any, value: string | null) => {
      setInfo((prev) => ({
        ...prev,
        [field]: value,
        ...(field === 'make' ? { model: null } : {}),
      }));
    };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        Tell me about your vehicle
      </Typography>

      <Grid container spacing={2}>
        {/* Vehicle Type */}
        <Grid item xs={12}>
          <Autocomplete
            options={vehicleTypes}
            value={info.type}
            onChange={handleChange('type')}
            autoHighlight
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => <TextField {...params} label="Vehicle Type" fullWidth />}
          />
        </Grid>

        {/* Make */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={vehicleMakes}
            value={info.make}
            onChange={handleChange('make')}
            autoHighlight
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => <TextField {...params} label="Make" fullWidth />}
          />
        </Grid>

        {/* Model */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={info.make ? vehicleModels[info.make as keyof typeof vehicleModels] || [] : []}
            value={info.model}
            onChange={handleChange('model')}
            autoHighlight
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => <TextField {...params} label="Model" fullWidth />}
          />
        </Grid>

        {/* Year */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={years}
            value={info.year}
            onChange={handleChange('year')}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => <TextField {...params} label="Year" fullWidth />}
          />
        </Grid>

        {/* Color */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={colorOptions}
            value={info.color}
            onChange={handleChange('color')}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => <TextField {...params} label="Color" fullWidth />}
          />
        </Grid>

        {/* Continue Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={() =>
                onNext({
                  type: info.type!,
                  make: info.make!,
                  model: info.model!,
                  year: info.year!,
                  color: info.color!,
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

export default VehicleStep;
