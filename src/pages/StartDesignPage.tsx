// src/pages/StartDesignPage.tsx
import React, { useState, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import Step1VehicleDetails from '../components/StartDesign/Step1VehicleDetails';
import Step2DesignIdeas from '../components/StartDesign/Step2DesignIdeas';
import ProgressDots from '../components/StartDesign/ProgressDots';
import { StartDesignPageProps, VehicleDetails } from '../types/startDesignTypes';

// ... imports remain unchanged

const StartDesignPage: React.FC<StartDesignPageProps> = ({ userId, navigate }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [vehicleImages, setVehicleImages] = useState<File[]>([]);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    make: '',
    model: '',
    year: '',
    notes: '',
  });

  const [designText, setDesignText] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [businessType, setBusinessType] = useState('');
  const [brandPersonality, setBrandPersonality] = useState('');
  const [loading, setLoading] = useState(false);

  const vehicleFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  const isStep1Valid =
    vehicleImages.length > 0 &&
    vehicleDetails.make.trim() !== '' &&
    vehicleDetails.model.trim() !== '' &&
    vehicleDetails.year.trim() !== '';

  const isStep2Valid =
    designText.trim() !== '' && businessType.trim() !== '' && brandPersonality.trim() !== '';

  const goToNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleVehicleImageUpload = (files: File[]) => {
    setVehicleImages((prev) => [...prev, ...files]);
  };

  const handleRemoveVehicleImage = (index: number) => {
    setVehicleImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVehicleDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setVehicleDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Dedicated submit handler
  const handleSubmitDesign = async () => {
    setLoading(true);

    try {
      // Basic validation guard
      if (!userId || !isStep1Valid || !isStep2Valid) {
        throw new Error('Missing required information.');
      }

      // Construct payload
      const submissionData = {
        userId,
        vehicleDetails,
        businessType,
        brandPersonality,
        designText,
        submittedAt: new Date().toISOString(),
      };

      // Optional: Use FormData to include files
      const formData = new FormData();
      formData.append('payload', JSON.stringify(submissionData));

      vehicleImages.forEach((file, index) => {
        formData.append(`vehicleImage${index}`, file);
      });

      if (logoFile) {
        formData.append('logoFile', logoFile);
      }

      // Simulate submission or integrate with Firebase/API here
      await new Promise((res) => setTimeout(res, 1500));
      console.log('Submitted Data:', submissionData);
      console.log('Files uploaded:', vehicleImages.length, logoFile?.name);

      // ✅ On success
      navigate('thank-you');
    } catch (error: any) {
      console.error('Submission error:', error.message);
      alert('There was a problem submitting your design. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: { xs: 2, md: 4 },
      }}
    >
      <Paper
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '16px',
          boxShadow: 6,
          width: '100%',
          maxWidth: '800px',
          overflow: 'hidden',
        }}
      >
        <ProgressDots currentStep={currentStep} />

        {currentStep === 1 && (
          <Step1VehicleDetails
            vehicleImages={vehicleImages}
            vehicleDetails={vehicleDetails}
            handleVehicleImageUpload={handleVehicleImageUpload}
            handleRemoveVehicleImage={handleRemoveVehicleImage}
            handleVehicleDetailsChange={handleVehicleDetailsChange}
            isStep1Valid={isStep1Valid}
            onNext={goToNextStep}
            vehicleFileInputRef={vehicleFileInputRef}
          />
        )}

        {currentStep === 2 && (
          <Step2DesignIdeas
            designText={designText}
            setDesignText={setDesignText}
            logoFile={logoFile}
            setLogoFile={setLogoFile}
            businessType={businessType}
            setBusinessType={setBusinessType}
            brandPersonality={brandPersonality}
            setBrandPersonality={setBrandPersonality}
            isStep2Valid={isStep2Valid}
            onBack={() => setCurrentStep(1)}
            onSubmit={handleSubmitDesign}
            loading={loading}
            logoFileInputRef={logoFileInputRef}
          />
        )}
      </Paper>
    </Box>
  );
};

export default StartDesignPage;
