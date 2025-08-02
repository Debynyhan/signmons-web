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
        {/* The main section container. It will now take up the full viewport height */}
        <section
          aria-label="Hero"
          style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}
        >
          {/* 3D background shapes */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <HeroShapes />
          </div>

          {/* Conditional rendering for mobile and desktop layouts */}
          {isMobile ? (
            // MOBILE & TABLET LAYOUT
            <Box
              component="div"
              sx={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                // This is the key change: it spaces out the children vertically
                justifyContent: 'center',
                // Keep minHeight to ensure it takes up the full screen height
                minHeight: '100vh',
                background:
                  'radial-gradient(circle at center, rgba(43, 45, 59, 0.8) 0%, rgba(17, 17, 17, 0.8) 100%)',
                color: 'text.primary',
                px: 2,
                py: 4, // Add padding to the top and bottom of the container
              }}
            >
              {/* Text container pushed to the top */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center', // Center text horizontally
                  textAlign: 'center',
                  // Add top margin to push content down
                  
                }}
              >
                <motion.div variants={slideIn}>
                  <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1.2,
                      mb: 2,
                      maxWidth: '100%',
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
                    align="center"
                    sx={{
                      color: 'common.white',
                      mb: 2,
                      maxWidth: '95%',
                      fontWeight: 500,
                      fontSize: '1.125rem',
                    }}
                  >
                    Professional vehicle decals, window graphics, websites, and yard signs installed{' '}
                    <strong
                      style={{
                        color: theme.palette.secondary.main,
                        fontWeight: 800,
                      }}
                    >
                      on-site in Cleveland
                    </strong>
                    . Boost your brand 24/7.
                  </Typography>
                </motion.div>
              </Box>

              {/* Van container centered vertically */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  margin: 'auto', // Center the van image
                  
                }}
              >
                <AnimatedTruck
                  src="/my-branded-truck.png"
                  alt="Custom wraps for tradesmen"
                  speed={13}
                />
              </Box>

              {/* Button container pushed to the bottom */}
              <Box sx={{ width: '100%', maxWidth: 360, margin: 'auto', mt: 4 }}>
                <motion.div variants={popIn}>
                  <MotionButton
                    fullWidth
                    onClick={() => navigate('start-design')}
                    sx={{ bgcolor: 'secondary.main', color: '#fff', py: 2 }}
                  >
                    GET YOUR FREE DESIGN
                  </MotionButton>
                </motion.div>
              </Box>
            </Box>
          ) : (
            // DESKTOP LAYOUT
            <Box
              component="div"
              sx={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 64px)',
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
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: { xs: 'center', md: 'flex-start' },
                      width: '100%',
                      maxWidth: 520,
                      mx: { xs: 'auto', md: 0 },
                    }}
                  >
                    <motion.div variants={slideIn}>
                      <Typography
                        component="h1"
                        variant="h3"
                        align="left"
                        sx={{
                          fontWeight: 800,
                          lineHeight: 1.2,
                          mb: 2,
                          maxWidth: '100%',
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
                        align="left"
                        sx={{
                          color: 'common.white',
                          mb: 2,
                          maxWidth: '80%',
                          fontWeight: 500,
                          fontSize: '1.25rem',
                        }}
                      >
                        Professional vehicle decals, window graphics, websites, and yard signs
                        installed{' '}
                        <strong
                          style={{
                            color: theme.palette.secondary.main,
                            fontWeight: 800,
                          }}
                        >
                          on-site in Cleveland
                        </strong>
                        . Boost your brand 24/7.
                      </Typography>
                    </motion.div>
                    <motion.div variants={popIn}>
                      <MotionButton
                        onClick={() => navigate('start-design')}
                        sx={{
                          bgcolor: 'secondary.main',
                          color: '#fff',
                        }}
                      >
                        GET YOUR FREE DESIGN
                      </MotionButton>
                    </motion.div>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <AnimatedTruck
                    src="/my-branded-truck.png"
                    alt="Custom wraps for tradesmen"
                    speed={13}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </section>
      </motion.div>
    </main>
  );
};

export default HomePage;
