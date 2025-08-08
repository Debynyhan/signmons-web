import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const CredibilityStrip: React.FC = () => {
  const items = [
    '5,000+ Vehicles Wrapped',
    '4.9★ Google Rated',
    'Trusted by Local Businesses',
  ];
  return (
    <Box sx={{
      bgcolor: 'rgba(10,18,30,0.9)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      py: 1,
      px: 2,
    }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
        {items.map((text, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>{text}</Typography>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};

export default CredibilityStrip;
