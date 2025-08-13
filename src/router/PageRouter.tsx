// src/router/PageRouter.tsx

import React from 'react';
import HomePage from '../pages/HomePage';
import StartDesignPage from '../pages/StartDesignPage';
import ThankYouPage from '../pages/ThankYouPage';
import { PageName } from '../types/navigation';

interface PageRouterProps {
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
}

/**
 * PageRouter decides which page component to render based on the current route.
 * The home page is wrapped with HeroShapes to display animated geometry
 * in the background; other pages render their content full-bleed.
 */
const PageRouter: React.FC<PageRouterProps> = ({ currentPage, onNavigate }) => {
  let pageContent: React.ReactNode;

  switch (currentPage) {
    case 'start-design':
      // our new ConsultationWizard lives inside StartDesignPage
      pageContent = <StartDesignPage navigate={onNavigate} />;
      break;

    case 'thank-you':
      // ThankYouPage still needs navigation to go “home” or restart
      pageContent = <ThankYouPage navigate={onNavigate} />;
      break;

    case 'home':
    default:
      // HomePage needs the navigate prop for its CTA
      pageContent = <HomePage navigate={onNavigate} />;
      break;
  }

  return <>{pageContent}</>;
};

export default PageRouter;
