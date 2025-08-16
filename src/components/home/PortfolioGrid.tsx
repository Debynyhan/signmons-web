import React, { useMemo } from 'react';
import { Chip, Grid, Stack, Button, Typography } from '@mui/material';
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
    <div>
      {/* Title */}
      <Typography
        variant="h5"
        align="center"
        style={{
          fontWeight: 700,
          marginBottom: 16,
          background: 'linear-gradient(90deg, #A0E9FF, #80FFEA)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Services Provided
      </Typography>

      {/* Filters: single-line, centered; scrollable on mobile */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: 'block',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingInline: 8,
          }}
        >
          <Stack direction="row" spacing={1.2} sx={{ flexWrap: 'nowrap', minWidth: 'max-content' }}>
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
        </div>
      </div>

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
              <GlassCard style={{ padding: 12 }}>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                    aspectRatio: '4 / 3',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease-in-out',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
                      opacity: 1,
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
                </div>
              </GlassCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Button variant="contained" onClick={onCTA}>
          Get your free mockup
        </Button>
      </div>
    </div>
  );
};

export default PortfolioGrid;
