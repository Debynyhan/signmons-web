// src/components/consultation/StyleStep.tsx

import React from 'react';
import { Box, Typography, Grid, CardActionArea, CardContent } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import type { StyleOption } from '../../types/consultation';


interface StyleStepProps {
  selected?: string;
  onSelect: (style: StyleOption) => void;
}

const options: { key: StyleOption; label: string; icon: React.ReactNode }[] = [
  { key: 'Bold', label: 'Bold & Impactful', icon: <span>🎯</span> },
  { key: 'Minimal', label: 'Clean & Minimal', icon: <span>🧼</span> },
  { key: 'Industrial', label: 'Industrial & Rugged', icon: <span>🔧</span> },
  { key: 'Playful', label: 'Playful & Modern', icon: <span>🎨</span> },
  { key: 'Custom', label: 'Custom / Other', icon: <span>✨</span> },
];

const hover: Variants = {
  hover: { scale: 1.03, boxShadow: '0 8px 20px rgba(0,0,0,0.2)' },
};
const tap: Variants = {
  tap: { scale: 0.97 },
};

const StyleStep: React.FC<StyleStepProps> = ({ selected, onSelect }) => (
  <Box>
    <Typography variant="h5" align="center" gutterBottom>
      What visual style fits your brand?
    </Typography>

    <Grid container spacing={2}>
      {options.map(({ key, label, icon }) => {
        const isSelected = selected === key;
        return (
          <Grid item xs={12} sm={6} key={key}>
            <motion.div whileHover="hover" whileTap="tap" variants={{ ...hover, ...tap }}>
              <CardActionArea
                onClick={() => onSelect(key)}
                sx={{
                  border: isSelected ? 2 : 1,
                  borderColor: isSelected ? 'secondary.main' : 'divider',
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box fontSize={40} mb={1}>
                    {icon}
                  </Box>
                  <Typography variant="subtitle1">{label}</Typography>
                </CardContent>
              </CardActionArea>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  </Box>
);

export default StyleStep;
