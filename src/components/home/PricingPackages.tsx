import React from 'react';
import { Box, Grid, Button, Typography, Stack } from '@mui/material';

const tiers = [
  {
    name: 'Decals',
    price: 'From $199',
    bullets: ['Fast turnaround', 'High-visibility', 'Durable materials'],
  },
  {
    name: 'Vehicle Wraps',
    price: 'From $1499',
    bullets: ['Full/partial options', 'Design included', 'Pro install'],
  },
  { name: 'Websites', price: 'From $999', bullets: ['Launch fast', 'Mobile-first', 'SEO-ready'] },
];

interface PricingPackagesProps {
  onCTA: () => void;
}

const PricingPackages: React.FC<PricingPackagesProps> = ({ onCTA }) => (
  <Grid container spacing={2}>
    {tiers.map((t, i) => (
      <Grid item xs={12} md={4} key={i}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: '1px solid rgba(255,255,255,0.08)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            {t.name}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
            {t.price}
          </Typography>
          <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
            {t.bullets.map((b, j) => (
              <Typography key={j} variant="caption" color="text.secondary">
                • {b}
              </Typography>
            ))}
          </Stack>
          <Button variant="contained" sx={{ mt: 2 }} onClick={onCTA}>
            Get a Free Mockup
          </Button>
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default PricingPackages;
