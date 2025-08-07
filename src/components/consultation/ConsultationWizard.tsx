// src/components/consultation/ConsultationWizard.tsx
import React from 'react';
import { Container, MobileStepper, Box, Typography, Button } from '@mui/material';

import { useDesignWizard } from '../../hooks/useDesignWizard';
import { steps } from '../../types/consultation';
import type { WizardState } from '../../types/consultation';
import type { PageName } from '../../types/navigation';

import IndustryStep from './IndustryStep';
import VehicleStep from './VehicleStep';
import StyleStep from './StyleStep';
import AssetsStep from './AssetsStep';
import ColorsStep from './ColorsStep';
import ContactStep from './ContactStep';
import TimelineStep from './TimelineStep';
import BudgetStep from './BudgetStep';
import DetailsStep from './DetailsStep';

import { useToast } from '../../context/ToastContext';
import { submitDesignRequest } from '../../utils/firestoreUtils';

interface ConsultationWizardProps {
  navigate: (page: PageName) => void;
}

export default function ConsultationWizard({ navigate }: ConsultationWizardProps) {
  const {
    stepIndex,
    currentStep,
    state,
    selectIndustry,
    selectVehicle,
    selectStyle,
    selectAssets,
    selectColors,
    selectContact,
    selectTimeline,
    selectBudget,
    selectDetails,
    back,
  } = useDesignWizard();

  const { showToast } = useToast();

  const handleSubmit = async () => {
    try {
      // `state` is your in-flow WizardState;
      // submitDesignRequest will handle uploads + Firestore write
      await submitDesignRequest(state as WizardState);
      showToast('Your mockup request is on its way!', 'success');
      navigate('thank-you');
    } catch (err) {
      console.error(err);
      showToast('Sorry, something went wrong. Try again.', 'error');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <MobileStepper
        variant="dots"
        steps={steps.length}
        position="static"
        activeStep={stepIndex}
        sx={{ mb: 4 }}
        backButton={<Button size="small" disabled />}
        nextButton={<Button size="small" disabled />}
      />

      {currentStep === 'Industry' && (
        <IndustryStep selected={state.industry} onSelect={selectIndustry} />
      )}

      {currentStep === 'Vehicle' && (
        <VehicleStep initialInfo={state.vehicle} onNext={selectVehicle} />
      )}

      {currentStep === 'Style' && <StyleStep selected={state.style} onSelect={selectStyle} />}

      {currentStep === 'Assets' && <AssetsStep initialInfo={state.assets} onNext={selectAssets} />}

      {currentStep === 'Colors' && <ColorsStep initialInfo={state.colors} onNext={selectColors} />}

      {currentStep === 'Contact' && (
        <ContactStep initialInfo={state.contact} onNext={selectContact} />
      )}

      {currentStep === 'Timeline' && (
        <TimelineStep initialInfo={state.timeline} onNext={selectTimeline} />
      )}

      {currentStep === 'Budget' && <BudgetStep initialInfo={state.budget} onNext={selectBudget} />}

      {currentStep === 'Details' && (
        <DetailsStep initialInfo={state.details} onNext={selectDetails} />
      )}

      {currentStep === 'Review' && (
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom>
            Review Your Selections
          </Typography>
          {/* You can render a concise summary of `state` here */}
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <Button onClick={back}>Go Back</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Send My Free Mockup
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
