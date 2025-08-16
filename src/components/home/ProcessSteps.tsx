import React from 'react';
import { Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const steps = [
  { title: 'Tell Us Your Goals', desc: 'Share vehicle, colors, budget, and logo assets.' },
  { title: 'Free Mockup', desc: 'We deliver a tailored concept fast.' },
  { title: 'Refine & Approve', desc: 'We revise until you’re thrilled.' },
  { title: 'Install / Launch', desc: 'Pro install or go-live for web in days.' },
];

const ProcessSteps: React.FC = () => (
  <Grid container spacing={2}>
    {steps.map((s, i) => (
      <Grid item xs={12} md={3} key={i}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center',
              height: '100%',
            }}
          >
            <Typography variant="subtitle2" style={{ marginBottom: '4px' }}>
              {s.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {s.desc}
            </Typography>
          </div>
        </motion.div>
      </Grid>
    ))}
  </Grid>
);

export default ProcessSteps;
