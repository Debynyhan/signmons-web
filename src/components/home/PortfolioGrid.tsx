import React, { useMemo } from 'react';
import { Box, Chip, Grid, ImageListItem, ImageListItemBar, Stack, Button } from '@mui/material';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';

const images = [
  { src: '/wraps.png', title: 'Wraps', tag: 'Wraps' },
  { src: '/decals.png', title: 'Decals', tag: 'Decals' },
  { src: '/websites.png', title: 'Websites', tag: 'Websites' },
  { src: '/my-branded-truck.png', title: 'Vehicles', tag: 'Wraps' },
];

const tags = ['All', 'Wraps', 'Decals', 'Yard Signs', 'Websites'] as const;

type Tag = (typeof tags)[number];

interface PortfolioGridProps {
  filter: Tag;
  setFilter: (t: Tag) => void;
  onCTA: () => void;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ filter, setFilter, onCTA }) => {
  const list = useMemo(() => {
    if (filter === 'All') return images;
    return images.filter((i) => i.tag === filter);
  }, [filter]);

  return (
    <Box>
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2, flexWrap: 'wrap' }}>
        {tags.map((t) => (
          <Chip key={t} label={t} color={t === filter ? 'primary' : 'default'} onClick={() => setFilter(t)} />
        ))}
      </Stack>
      <Grid container spacing={2}>
        {list.map((img, i) => (
          <Grid item xs={6} sm={4} md={3} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard sx={{ p: 1.5 }}>
                <ImageListItem
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <ImageListItemBar title={img.title} position="below" />
                </ImageListItem>
              </GlassCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button variant="contained" onClick={onCTA}>
          Get your free mockup
        </Button>
      </Box>
    </Box>
  );
};

export default PortfolioGrid;
