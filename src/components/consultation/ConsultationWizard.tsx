// src/components/consultation/ConsultationWizard.tsx

import { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // `state` is your in-flow WizardState;
      // submitDesignRequest will handle uploads + Firestore write
      await submitDesignRequest(state as WizardState);
      showToast('Your mockup request is on its way!', 'success');
      navigate('thank-you');
    } catch (err) {
      console.error(err);
      showToast('Sorry, something went wrong. Try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamically render the current step component
  const renderStep = () => {
    switch (currentStep) {
      case 'Industry':
        return <IndustryStep selected={state.industry} onSelect={selectIndustry} />;
      case 'Vehicle':
        return <VehicleStep initialInfo={state.vehicle} onNext={selectVehicle} />;
      case 'Style':
        return <StyleStep selected={state.style} onSelect={selectStyle} />;
      case 'Assets':
        return <AssetsStep initialInfo={state.assets} onNext={selectAssets} />;
      case 'Colors':
        return <ColorsStep initialInfo={state.colors} onNext={selectColors} />;
      case 'Contact':
        return <ContactStep initialInfo={state.contact} onNext={selectContact} />;
      case 'Timeline':
        return <TimelineStep initialInfo={state.timeline} onNext={selectTimeline} />;
      case 'Budget':
        return <BudgetStep initialInfo={state.budget} onNext={selectBudget} />;
      case 'Details':
        return <DetailsStep initialInfo={state.details} onNext={selectDetails} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Stepper activeStep={stepIndex} alternativeLabel>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>{renderStep()}</Box>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button disabled={stepIndex === 0} onClick={back}>
          Back
        </Button>

        {stepIndex < steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={() => {
              /* handled inside step */
            }}
            disabled={isSubmitting}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={20} /> : 'Submit'}
          </Button>
        )}
      </Box>
    </Box>
  );
}
