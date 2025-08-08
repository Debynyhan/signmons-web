import React, { useMemo } from 'react';
import { Box, Chip, Grid, Stack, Button, Typography } from '@mui/material';
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
      {/* Title */}
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: 700,
          mb: 2,
          background: 'linear-gradient(90deg, #A0E9FF, #80FFEA)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Services Provided
      </Typography>

      {/* Filters: single-line, centered; scrollable on mobile */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: { xs: 'block', md: 'flex' },
            justifyContent: { md: 'center' },
            overflowX: { xs: 'auto', md: 'visible' },
            WebkitOverflowScrolling: 'touch',
            px: { xs: 1, md: 0 },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <Stack
            direction="row"
            spacing={1.2}
            sx={{
              flexWrap: 'nowrap',
              minWidth: 'max-content',
              mx: { md: 'auto' },
            }}
          >
            {tags.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                color={t === filter ? 'primary' : 'default'}
                onClick={() => setFilter(t)}
                sx={{
                  px: { xs: 1, sm: 1.25 },
                  py: 0.5,
                  fontWeight: 700,
                  fontSize: { xs: 12, sm: 13 },
                  borderRadius: 999,
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Tiles */}
      <Grid container spacing={2}>
        {list.map((img, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard sx={{ p: 1.5 }}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                    aspectRatio: '4 / 3',
                    bgcolor: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <Box
                    component="img"
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(1)',
                      transition: 'transform 300ms ease',
                      '&:hover': { transform: 'scale(1.03)' },
                      display: 'block',
                    }}
                  />

                  {/* Subtle inner glow */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'radial-gradient(60% 60% at 50% 40%, rgba(128,255,234,0.12) 0%, rgba(0,0,0,0) 70%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Label */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      position: 'absolute',
                      left: 14,
                      bottom: 12,
                      color: 'rgba(255,255,255,0.95)',
                      textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                      fontWeight: 700,
                      letterSpacing: 0.2,
                    }}
                  >
                    {img.title}
                  </Typography>
                </Box>
              </GlassCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="contained" onClick={onCTA}>
          Get your free mockup
        </Button>
      </Box>
    </Box>
  );
};

export default PortfolioGrid;
