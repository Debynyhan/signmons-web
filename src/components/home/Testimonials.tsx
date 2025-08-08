import React from 'react';
import { Avatar, Box, Grid, Rating, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Bakery Owner',
    text: 'Our new wrap turned heads day one. We booked 3 new orders that week!',
  },
  {
    name: 'Mike R.',
    role: 'Contractor',
    text: 'Clean install and the design pops. Great communication start to finish.',
  },
  {
    name: 'Jenna P.',
    role: 'Realtor',
    text: 'Yard signs and website look cohesive—brand feels premium now.',
  },
];

const Testimonials: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {testimonials.map((t, i) => (
        <Grid item xs={12} md={4} key={i}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.08)',
                bgcolor: 'rgba(10,18,30,0.6)',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>{t.name.charAt(0)}</Avatar>
                <Box>
                  <Typography variant="subtitle2">{t.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t.role}
                  </Typography>
                </Box>
              </Stack>
              <Rating value={5} readOnly size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {t.text}
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default Testimonials;
