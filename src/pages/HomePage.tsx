import React from 'react';
import { PageName } from '../types/navigation';
import { Box, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import MotionButton from '../components/MotionButton';

interface HomePageProps {
  navigate: (page: PageName) => void;
}

// ✅ Replace string-based ease with a cubic bezier array
const EASING: [number, number, number, number] = [0.42, 0, 0.58, 1];

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASING },
  },
};

const slideLeftVariant: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASING },
  },
};

const scaleVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASING },
  },
};

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUpVariant}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)',
          background: 'radial-gradient(circle at center, #1C1E24 0%, #121212 100%)',
          color: 'text.primary',
          position: 'relative',
          overflow: 'hidden',
          px: 2,
          py: { xs: 4, md: 8 },
        }}
      >
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: '1200px',
          }}
        >
          {/* Text */}
          <Grid item xs={12} md={6}>
            <motion.div variants={slideLeftVariant}>
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                component="h1"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 2,
                  '& strong': { color: 'primary.main' },
                }}
              >
                MOBILE DECALS & WRAPS <br /> FOR <strong>TRADESMEN</strong>
              </Typography>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 3,
                  maxWidth: '95%',
                  '& strong': { color: 'primary.main' },
                }}
              >
                Professional vehicle decals, window graphics, and yard signs installed
                <strong> on-site in Cleveland</strong>. Boost your brand 24/7.
              </Typography>
            </motion.div>

            {!isMobile && (
              <motion.div variants={scaleVariant}>
                <MotionButton onClick={() => navigate('start-design')}>
                  GET YOUR FREE DESIGN PROOF
                </MotionButton>
              </motion.div>
            )}
          </Grid>

          {/* Image */}
          <Grid item xs={12} md={6}>
            <motion.div variants={scaleVariant}>
              <Box
                component="img"
                src="/my-branded-truck.png"
                alt="Custom wraps for tradesmen"
                sx={{
                  width: '100%',
                  maxWidth: { xs: '300px', sm: '400px', md: '100%' },
                  height: 'auto',
                  mx: 'auto',
                  display: 'block',
                  borderRadius: 2,
                  boxShadow: 4,
                }}
              />
            </motion.div>
          </Grid>
        </Grid>

        {/* Mobile Button */}
        {isMobile && (
          <motion.div variants={scaleVariant}>
            <MotionButton sx={{ mt: 13 }} onClick={() => navigate('start-design')}>
              GET YOUR FREE DESIGN PROOF
            </MotionButton>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default HomePage;
