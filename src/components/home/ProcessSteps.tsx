import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const steps = [
  { title: 'Tell Us Your Goals', text: 'Share vehicle, colors, budget, and logo assets.' },
  { title: 'Free Mockup', text: 'We deliver a tailored concept fast.' },
  { title: 'Refine & Approve', text: 'We revise until you’re thrilled.' },
  { title: 'Install / Launch', text: 'Pro install or go-live for web in days.' },
];

const ProcessSteps: React.FC = () => (
  <Grid container spacing={2}>
    {steps.map((s, i) => (
      <Grid item xs={12} md={3} key={i}>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
          <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>{s.title}</Typography>
            <Typography variant="caption" color="text.secondary">{s.text}</Typography>
          </Box>
        </motion.div>
      </Grid>
    ))}
  </Grid>
);

export default ProcessSteps;
