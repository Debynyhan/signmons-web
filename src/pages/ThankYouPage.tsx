// src/pages/ThankYouPage.tsx
import React from 'react';
import { PageName } from '../types/navigation';

interface ThankYouPageProps {
  navigate: (page: PageName) => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ navigate }) => {
  return (
    <div>
      <h1>Thank you for your design request!</h1>
      <button onClick={() => navigate('home')}>Back to Home</button>
    </div>
  );
};

export default ThankYouPage;
