import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { PageName } from '../types/navigation';
import HeroMobile from '../components/hero/HeroMobile';
import HeroDesktop from '../components/hero/HeroDesktop';
// ...other imports as needed (ServicesSection, CTASection, etc.)

interface HomePageProps {
  navigate: (page: PageName) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <main>
      {isMobile ? <HeroMobile navigate={navigate} /> : <HeroDesktop navigate={navigate} />}

      {/* The rest of your homepage goes here */}
      {/* <ServicesSection /> */}
      {/* <CTASection /> */}
      {/* <Footer /> */}
    </main>
  );
};

export default HomePage;
