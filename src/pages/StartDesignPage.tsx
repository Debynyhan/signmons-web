// src/pages/StartDesignPage.tsx

import React from 'react';
import { Container } from '@mui/material';
import ConsultationWizard from '../components/consultation/ConsultationWizard';
import type { PageName } from '../types/navigation';

interface StartDesignPageProps {
  navigate: (page: PageName) => void;
}

const StartDesignPage: React.FC<StartDesignPageProps> = ({ navigate }) => (
  <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
    <Container
      maxWidth="sm"
      style={{ position: 'relative', zIndex: 1, paddingTop: '64px', paddingBottom: '64px' }}
    >
      {/* Wizard panel */}
      <div
        style={{
          position: 'relative',
          padding: '32px',
          borderRadius: '24px',
          background: 'rgba(17,17,27,0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        {/* Accent stripe */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: 'linear-gradient(180deg, #A259FF, #17EAD9)',
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
        />

        {/* Glowing ring behind */}
        <div
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: 4,
            background: 'radial-gradient(circle, rgba(162,89,255,0.2) 0%, transparent 70%)',
            filter: 'blur(16px)',
            zIndex: -1,
          }}
        />

        {/* Pass navigate into the wizard */}
        <ConsultationWizard navigate={navigate} />
      </div>
    </Container>
  </div>
);

export default StartDesignPage;
