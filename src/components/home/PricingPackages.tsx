import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

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
        <div
          style={{
            padding: 16,
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.08)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="subtitle1" style={{ marginBottom: '4px' }}>
            {t.name}
          </Typography>
          <Typography variant="h6" color="primary" style={{ marginBottom: '8px' }}>
            {t.price}
          </Typography>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px', flexGrow: 1 }}>
            {t.bullets.map((f) => (
              <li key={f}>
                <Typography variant="body2">{f}</Typography>
              </li>
            ))}
          </ul>
          <Button variant="contained" onClick={() => onCTA()} style={{ marginTop: 'auto' }}>
            Get Started
          </Button>
        </div>
      </Grid>
    ))}
  </Grid>
);

export default PricingPackages;
