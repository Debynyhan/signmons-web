import React from 'react';
import { Box } from '@mui/material';

interface Props {
  activeIndex: number;
}

const CarouselIndicators: React.FC<Props> = ({ activeIndex }) => {
  return (
    <Box display="flex" gap={1.5} mt={8}>
      {[0, 1, 2, 3].map((i) => (
        <Box
          key={i}
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: i === activeIndex ? 'primary.main' : 'grey.600',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'grey.400',
            },
          }}
        />
      ))}
    </Box>
  );
};

export default CarouselIndicators;
