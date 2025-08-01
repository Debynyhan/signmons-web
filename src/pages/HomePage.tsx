// src/pages/HomePage.tsx
import React from 'react';
import { PageName } from '../types/navigation';
import { Box, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import HeroShapes from '../components/common/HeroShapes';
import MotionButton from '../components/MotionButton';
import AnimatedTruck from '../components/common/AnimatedTruck';
import AnimatedHeadline from '../components/common/AnimatedHeadline';

interface HomePageProps {
  navigate: (page: PageName) => void;
}

const EASING: [number, number, number, number] = [0.42, 0, 0.58, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING } },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASING } },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASING } },
};

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <main>
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        {/* Hero section wrapper with relative positioning */}
        <section
          aria-label="Hero"
          style={{ position: 'relative', overflow: 'hidden', height: 'calc(100vh - 64px)' }}
        >
          {/* 3D background shapes */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <HeroShapes />
          </div>

          {/* Content container with semi-transparent gradient */}
          <Box
            component="div"
            sx={{
              position: 'relative',
              zIndex: 1,

              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: 'calc(100vh - 64px)',
              background:
                'radial-gradient(circle at center, rgba(43, 45, 59, 0.8) 0%, rgba(17, 17, 17, 0.8) 100%)',
              color: 'text.primary',
              px: 2,
              py: 4,
            }}
          >
            <Grid
              container
              rowSpacing={{ xs: 10, md: 2 }}
              columnSpacing={{ xs: 0, md: 4 }}
              alignItems="center"
              justifyContent="center"
              sx={{
                flexDirection: { xs: 'column', md: 'row' },
                width: '100%',
                maxWidth: 1200,
              }}
            >
              <Grid item xs={12} md={6}>
                <motion.div variants={slideIn}>
                  <Typography
                    component="h1"
                    variant={isMobile ? 'h4' : 'h3'}
                    align={isMobile ? 'center' : 'left'}
                    sx={{
                      width: '100%',
                      fontWeight: 800,
                      lineHeight: 1.2,
                      mb: 2,
                      maxWidth: '95%',
                    }}
                  >
                    <AnimatedHeadline
                      words={['MOBILE', 'DECALS', '&', 'WEBSITES', 'FOR', 'TRADESMEN']}
                    />
                  </Typography>
                </motion.div>

                <motion.div variants={fadeUp}>
  <Typography
    variant="body1"
    align={isMobile ? 'center' : 'left'}
    sx={{
      color: 'common.white', // high-contrast
      mb: 2,
      maxWidth: { xs: '95%', md: '80%' },
      fontWeight: 500,
      fontSize: { xs: '1.125rem', md: '1.25rem' },
    }}
  >
    Professional vehicle decals, window graphics, websites, and yard signs installed{' '}
    <strong
      style={{
        color: theme.palette.secondary.main, // use your accent or purple/blue
        fontWeight: 800,
      }}
    >
      on-site in Cleveland
    </strong>
    . Boost your brand 24/7.
  </Typography>
</motion.div>

                {!isMobile && (
                  <motion.div variants={popIn}>
                    <MotionButton
                      onClick={() => navigate('start-design')}
                      sx={{
                        bgcolor: 'secondary.main',
                        color: '#fff',
                        mt: 4,
                        mb: 4,
                      }}
                    >
                      GET YOUR FREE DESIGN PROOF
                    </MotionButton>
                  </motion.div>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <AnimatedTruck
                  src="/my-branded-truck.png"
                  alt="Custom wraps for tradesmen"
                  speed={13}
                />
              </Grid>
            </Grid>

            {isMobile && (
              <motion.div variants={popIn} style={{ width: '100%', maxWidth: 360, margin: 'auto' }}>
                <MotionButton
                  fullWidth
                  onClick={() => navigate('start-design')}
                  sx={{ bgcolor: 'secondary.main', color: '#fff', py: 2 }}
                >
                  GET YOUR FREE DESIGN
                </MotionButton>
              </motion.div>
            )}
          </Box>
        </section>
      </motion.div>
    </main>
  );
};

export default HomePage;
