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
        <section aria-label="Hero" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* 3D background shapes */}
          <HeroShapes />

          {/* Content container with semi-transparent gradient */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: { xs: 'flex-start', md: 'space-between' },
              alignItems: 'center',
              minHeight: { xs: 'auto', md: '100vh' },
              background:
                'radial-gradient(circle at center, rgba(49,52,70,0.8) 0%, rgba(43,43,43,0.8) 100%)',
              color: 'text.primary',
              px: 2,
              py: { xs: 4, md: 8 },
            }}
          >
            <Grid
              container
              rowSpacing={{ xs: 6, md: 4 }}
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
                      color: 'text.secondary',
                      mb: 2,
                      maxWidth: { xs: '95%', md: '80%' },
                    }}
                  >
                    Professional vehicle decals, window graphics, websites, and yard signs installed{' '}
                    <strong>on-site in Cleveland</strong>. Boost your brand 24/7.
                  </Typography>
                </motion.div>

                {!isMobile && (
                  <motion.div variants={popIn}>
                    <MotionButton
                      onClick={() => navigate('start-design')}
                      sx={{
                        bgcolor: 'secondary.main',
                        color: '#fff',
                        mt: 2,
                        mb: 14,
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
              <motion.div
                variants={popIn}
                style={{ width: '100%', maxWidth: 360, margin: '32px auto 0' }}
              >
                <MotionButton
                  fullWidth
                  onClick={() => navigate('start-design')}
                  sx={{ bgcolor: 'secondary.main', color: '#fff', py: 2 }}
                >
                  GET YOUR FREE DESIGN PROOF
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
