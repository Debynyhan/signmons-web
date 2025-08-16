import React from 'react';
import { Avatar, Grid, Stack, Typography, Rating } from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Bakery Owner',
    quote: 'Our new wrap turned heads day one. We booked 3 new orders that week!',
  },
  {
    name: 'Mike R.',
    role: 'Contractor',
    quote: 'Clean install and the design pops. Great communication start to finish.',
  },
  {
    name: 'Jenna P.',
    role: 'Realtor',
    quote: 'Yard signs and website look cohesive—brand feels premium now.',
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
            <div
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(10,18,30,0.6)',
                height: '100%',
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                style={{ marginBottom: '8px' }}
              >
                <Avatar style={{ backgroundColor: '#00BFA5' }}>{t.name.charAt(0)}</Avatar>
                <div>
                  <Typography variant="subtitle2">{t.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t.role}
                  </Typography>
                </div>
              </Stack>
              <Rating value={5} readOnly size="small" style={{ marginBottom: '8px' }} />
              <Typography variant="body2" color="text.secondary">
                {`"${t.quote}"`}
              </Typography>
            </div>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default Testimonials;
