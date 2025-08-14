// src/router/PageRouter.tsx

import React from 'react';
import HomePage from '../pages/HomePage';
const StartDesignPage = React.lazy(() => import('../pages/StartDesignPage'));
const ThankYouPage = React.lazy(() => import('../pages/ThankYouPage'));
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
      pageContent = (
        <React.Suspense fallback={null}>
          <StartDesignPage navigate={onNavigate} />
        </React.Suspense>
      );
      break;

    case 'thank-you':
      // ThankYouPage still needs navigation to go “home” or restart
      pageContent = (
        <React.Suspense fallback={null}>
          <ThankYouPage navigate={onNavigate} />
        </React.Suspense>
      );
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
