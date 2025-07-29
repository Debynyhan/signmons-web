import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SignpostIcon from '@mui/icons-material/Signpost';

const features = [
  {
    icon: <LocalShippingIcon sx={{ color: 'primary.light', fontSize: '2.5rem' }} />,
    title: 'ON-SITE INSTALLATION',
    description: 'We come to your job site or office for seamless decal and wrap application.',
  },
  {
    icon: <StorefrontIcon sx={{ color: 'secondary.light', fontSize: '2.5rem' }} />,
    title: 'CUSTOM DESIGNS',
    description: 'Eye-catching graphics tailored to your business.',
  },
  {
    icon: <SignpostIcon sx={{ color: 'info.light', fontSize: '2.5rem' }} />,
    title: 'COMPLETE BRANDING',
    description: 'Vehicle wraps, yard signs, window decals—all consistent, all you.',
  },
];

const FeatureGrid: React.FC = () => {
  return (
    <Grid container spacing={4}>
      {features.map((feature, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Box textAlign="center">
            {feature.icon}
            <Typography variant="h6" sx={{ mt: 1, mb: 1, fontWeight: 'semibold' }}>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feature.description}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureGrid;
