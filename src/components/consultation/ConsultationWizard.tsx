// src/components/consultation/ConsultationWizard.tsx
import React from 'react';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

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

  // Custom step icon: check for completed, dot for others
  const StepIconComponent = ({ active, completed }: { active?: boolean; completed?: boolean }) =>
    completed ? (
      <CheckCircleIcon color="primary" />
    ) : (
      <RadioButtonUncheckedIcon color={active ? 'primary' : 'disabled'} />
    );

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stepper activeStep={stepIndex} alternativeLabel sx={{ mb: 4 }} connector={null}>
        {steps.map((label, index) => (
          <Step key={label} completed={index < stepIndex}>
            <StepLabel StepIconComponent={StepIconComponent} />
          </Step>
        ))}
      </Stepper>

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
            Review and Confirm Your Selections
          </Typography>
          <Box mt={2}>
            <List>
              <ListItem>
                <ListItemText primary="Industry" secondary={state.industry} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Vehicle"
                  secondary={`${state.vehicle.year} ${state.vehicle.make} ${state.vehicle.model}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Style" secondary={state.style} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Colors"
                  secondary={`Primary: ${state.colors.primary}, Accent: ${state.colors.accent}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Contact"
                  secondary={`${state.contact.businessName}, ${state.contact.email}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Timeline"
                  secondary={`${state.timeline.date} ${state.timeline.rush ? '(Rush)' : ''}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Budget"
                  secondary={`$${state.budget.min} - $${state.budget.max}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Details" secondary={state.details.notes} />
              </ListItem>
            </List>
          </Box>
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <Button onClick={back}>Go Back</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Confirm and Send
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
