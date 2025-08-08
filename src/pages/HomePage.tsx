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

      <Container sx={{ py: 4 }}>
        <Box sx={{ mb: 5 }}>
          <PortfolioGrid filter={'All'} setFilter={() => {}} onCTA={goStart} />
        </Box>
        <Box sx={{ mb: 5 }}>
          <Testimonials />
        </Box>
        <Box sx={{ mb: 5 }}>
          <ProcessSteps />
        </Box>
        <Box sx={{ mb: 5 }}>
          <PricingPackages onCTA={goStart} />
        </Box>
        <Box sx={{ mb: 5 }}>
          <FAQ />
        </Box>
        <FinalCTA onClick={goStart} />
      </Container>
    </main>
  );
};

export default HomePage;
