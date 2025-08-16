// src/components/consultation/ConsultationWizard.tsx

import {
  Container,
  Stepper,
  Step,
  StepLabel,
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
import { wizardSchema } from '../../utils/validation';

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
    // Validate entire wizard state
    const result = wizardSchema.safeParse(state);
    if (!result.success) {
      // Extract validation messages
      const messages = result.error.issues.map((issue) => issue.message).join('; ');
      showToast(`Validation error: ${messages}`, 'error');
      console.error('Validation errors:', result.error);
      return;
    }
    try {
      await submitDesignRequest(result.data);
      showToast('Your mockup request is on its way!', 'success');
      navigate('thank-you');
    } catch (err) {
      console.error(err);
      showToast('Sorry, something went wrong. Try again.', 'error');
    }
  };

  const StepIconComponent = ({ active, completed }: { active?: boolean; completed?: boolean }) =>
    completed ? (
      <CheckCircleIcon color="primary" />
    ) : (
      <RadioButtonUncheckedIcon color={active ? 'primary' : 'disabled'} />
    );

  return (
    <Container maxWidth="xl" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
      <div style={{ width: '100%' }}>
        <Stepper
          activeStep={stepIndex}
          alternativeLabel
          connector={null}
          style={{
            width: '100%',
            marginBottom: '32px',
            margin: '0 auto',
            justifyContent: 'center',
          }}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={index < stepIndex}>
              <StepLabel StepIconComponent={StepIconComponent} />
            </Step>
          ))}
        </Stepper>
      </div>

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

      {currentStep === 'Review' ? (
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Review Your Selections
          </Typography>
          <div style={{ marginTop: '16px' }}>
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
                  secondary={
                    <span>
                      <span
                        style={{ display: 'inline-flex', alignItems: 'center', marginRight: 16 }}
                      >
                        <span
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: state.colors.primary,
                            display: 'inline-block',
                            border: '1px solid #ccc',
                            marginRight: 6,
                          }}
                        />
                        Primary
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <span
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: state.colors.accent,
                            display: 'inline-block',
                            border: '1px solid #ccc',
                            marginRight: 6,
                          }}
                        />
                        Accent
                      </span>
                    </span>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Contact"
                  secondary={`${state.contact.businessName}, ${state.contact.email}${
                    state.contact.website ? `, ${state.contact.website}` : ''
                  }`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Timeline"
                  secondary={`${state.timeline.date} ${state.timeline.rush ? '(Rush)' : ''}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Budget" secondary={`$${state.budget.min}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Details" secondary={state.details.notes} />
              </ListItem>
            </List>
          </div>
          <div
            style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '16px' }}
          >
            <Button onClick={back}>Go Back</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Confirm and Send
            </Button>
          </div>
        </div>
      ) : (
        // Non-review steps: show Back button for navigation
        stepIndex > 0 && (
          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-start' }}>
            <Button onClick={back}>Back</Button>
          </div>
        )
      )}
    </Container>
  );
}
