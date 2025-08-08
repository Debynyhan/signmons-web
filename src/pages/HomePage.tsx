import React from 'react';
import { useTheme, useMediaQuery, Container, Typography } from '@mui/material';
import { PageName } from '../types/navigation';
import HeroMobile from '../components/hero/HeroMobile';
import HeroDesktop from '../components/hero/HeroDesktop';
import CredibilityStrip from '../components/home/CredibilityStrip';
import PortfolioGrid from '../components/home/PortfolioGrid';
import Testimonials from '../components/home/Testimonials';
import ProcessSteps from '../components/home/ProcessSteps';
import PricingPackages from '../components/home/PricingPackages';
import FAQ from '../components/home/FAQ';
import FinalCTA from '../components/home/FinalCTA';
import GlassCard from '../components/common/GlassCard';

interface HomePageProps {
  navigate: (page: PageName) => void;
}

const gradientTitleSx = {
  fontWeight: 700,
  mb: 2,
  textAlign: 'center',
  background: 'linear-gradient(90deg, #A0E9FF, #80FFEA)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const goStart = () => navigate('start-design');

  return (
    <main>
      {isMobile ? <HeroMobile navigate={navigate} /> : <HeroDesktop navigate={navigate} />}

      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, md: 6 }, display: 'grid', gap: { xs: 3, md: 4 } }}
      >
        {/* Services Provided (title handled inside component) */}
        <GlassCard>
          <PortfolioGrid filter={'All'} setFilter={() => {}} onCTA={goStart} />
        </GlassCard>

        <GlassCard>
          <Typography variant="h5" sx={gradientTitleSx}>
            What Clients Say
          </Typography>
          <Testimonials />
        </GlassCard>

        <GlassCard>
          <Typography variant="h5" sx={gradientTitleSx}>
            How It Works
          </Typography>
          <ProcessSteps />
        </GlassCard>

        <GlassCard>
          <Typography variant="h5" sx={gradientTitleSx}>
            Transparent Pricing
          </Typography>
          <PricingPackages onCTA={goStart} />
        </GlassCard>

        <GlassCard>
          <Typography variant="h5" sx={gradientTitleSx}>
            Frequently Asked Questions
          </Typography>
          <FAQ />
        </GlassCard>

        <GlassCard sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ ...gradientTitleSx, mb: 1.5 }}>
            Ready to Start?
          </Typography>
          <FinalCTA onClick={goStart} />
        </GlassCard>
      </Container>

      <CredibilityStrip />
    </main>
  );
};

export default HomePage;
