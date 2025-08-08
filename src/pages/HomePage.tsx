import React from 'react';
import { useTheme, useMediaQuery, Container, Box } from '@mui/material';
import { PageName } from '../types/navigation';
import HeroMobile from '../components/hero/HeroMobile';
import HeroDesktop from '../components/hero/HeroDesktop';
import CredibilityStrip from '../components/home/CredibilityStrip';
import StickyCTA from '../components/home/StickyCTA';
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

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const goStart = () => navigate('start-design');

  return (
    <main>
      {isMobile ? <HeroMobile navigate={navigate} /> : <HeroDesktop navigate={navigate} />}
      <CredibilityStrip />
      <StickyCTA onPrimaryClick={goStart} />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, display: 'grid', gap: { xs: 3, md: 4 } }}>
        <GlassCard>
          <PortfolioGrid filter={'All'} setFilter={() => {}} onCTA={goStart} />
        </GlassCard>

        <GlassCard>
          <Testimonials />
        </GlassCard>

        <GlassCard>
          <ProcessSteps />
        </GlassCard>

        <GlassCard>
          <PricingPackages onCTA={goStart} />
        </GlassCard>

        <GlassCard>
          <FAQ />
        </GlassCard>

        <GlassCard sx={{ textAlign: 'center' }}>
          <FinalCTA onClick={goStart} />
        </GlassCard>
      </Container>
    </main>
  );
};

export default HomePage;
