// src/router/PageRouter.tsx
import React from 'react';
import HomePage from '../pages/HomePage';
import StartDesignPage from '../pages/StartDesignPage';
import ThankYouPage from '../pages/ThankYouPage';
import { PageName } from '../types/navigation';

interface PageRouterProps {
  userId: string | null;
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
}

const PageRouter: React.FC<PageRouterProps> = ({ userId, currentPage, onNavigate }) => {
  switch (currentPage) {
    case 'start-design':
      return <StartDesignPage userId={userId} navigate={onNavigate} />;
    case 'thank-you':
      return <ThankYouPage navigate={onNavigate} />;
    case 'home':
    default:
      return <HomePage navigate={onNavigate} />;
  }
};

export default PageRouter;
