// src/router/PageRouter.tsx
import React from 'react';
import HomePage from '../pages/HomePage';
import StartDesignPage from '../pages/StartDesignPage';
import ThankYouPage from '../pages/ThankYouPage';
import HeroShapes from '../components/common/HeroShapes';
import { PageName } from '../types/navigation';

interface PageRouterProps {
  userId: string | null;
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
}

/**
 * PageRouter decides which page component to render based on the current route.
 * The home page is wrapped with HeroShapes to display animated geometry
 * in the background, while other pages remain unaffected.
 */
const PageRouter: React.FC<PageRouterProps> = ({ userId, currentPage, onNavigate }) => {
  // Resolve which page to show
  let pageContent: React.ReactNode;
  switch (currentPage) {
    case 'start-design':
      pageContent = <StartDesignPage userId={userId} navigate={onNavigate} />;
      break;
    case 'thank-you':
      pageContent = <ThankYouPage navigate={onNavigate} />;
      break;
    case 'home':
    default:
      pageContent = <HomePage navigate={onNavigate} />;
      break;
  }

  // Add HeroShapes only for the home page
  if (currentPage === 'home' || currentPage === undefined) {
    return (
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        <HeroShapes />
        <div style={{ position: 'relative', zIndex: 1 }}>{pageContent}</div>
      </div>
    );
  }

  return <>{pageContent}</>;
};

export default PageRouter;
