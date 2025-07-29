// src/pages/StartDesignPage.tsx
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  IconButton,
  Grid,
  Paper,
} from '@mui/material';
import React, { useState, useRef } from 'react';

import { styled } from '@mui/system'; // For custom styled components if needed
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Upload icon
import CancelIcon from '@mui/icons-material/Cancel'; // Icon for removing files
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; // Next step icon
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'; // Previous step icon
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For brand personality choice

// Import Firebase services
import { db, storage } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Define props for StartDesignPage
interface StartDesignPageProps {
  userId: string | null; // Firebase user ID passed from App.tsx
  navigate: (page: string) => void; // Navigation function from App.tsx
}

// Custom styled component for file input (hidden input, styled button)
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const StartDesignPage: React.FC<StartDesignPageProps> = ({ userId, navigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleImages, setVehicleImages] = useState<File[]>([]);
  const [vehicleDetails, setVehicleDetails] = useState({
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

  // References for file inputs to trigger click
  const vehicleFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  const brandPersonalities = [
    'Clean & Minimalist',
    'Bold & Eye-Catching',
    'Traditional & Professional',
    'Modern & Techy',
    'Friendly & Approachable',
    'Rugged & Durable',
  ];

  const handleVehicleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setVehicleImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveVehicleImage = (index: number) => {
    setVehicleImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0]);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    if (logoFileInputRef.current) {
      logoFileInputRef.current.value = ''; // Clear the file input
    }
  };

  const handleVehicleDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setVehicleDetails({ ...vehicleDetails, [e.target.name]: e.target.value });
  };

  const isStep1Valid =
    vehicleImages.length > 0 && vehicleDetails.make && vehicleDetails.model && vehicleDetails.year;
  const isStep2Valid = designText && businessType && brandPersonality;

  const handleSubmit = async () => {
    if (!userId) {
      window.showMessage('Authentication error. Please refresh the page.', 'error');
      return;
    }
    if (!isStep1Valid || !isStep2Valid) {
      window.showMessage('Please complete all required fields before submitting.', 'error');
      return;
    }

    setLoading(true);

    try {
      // 1. Upload Vehicle Images to Firebase Storage
      const vehicleImageUrls: string[] = [];
      for (const file of vehicleImages) {
        const fileRef = ref(storage, `user_uploads/${userId}/vehicles/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        vehicleImageUrls.push(url);
      }

      // 2. Upload Logo File to Firebase Storage (if provided)
      let logoUrl: string | null = null;
      if (logoFile) {
        const logoRef = ref(storage, `user_uploads/${userId}/logos/${Date.now()}_${logoFile.name}`);
        await uploadBytes(logoRef, logoFile);
        logoUrl = await getDownloadURL(logoRef);
      }

      // 3. Save Job Request to Firestore
      const jobRequestsCollectionRef = collection(
        db,
        `artifacts/${import.meta.env.VITE_FIREBASE_APP_ID}/users/${userId}/job_requests`,
      );
      await addDoc(jobRequestsCollectionRef, {
        userId: userId,
        vehicleDetails: {
          make: vehicleDetails.make,
          model: vehicleDetails.model,
          year: vehicleDetails.year,
          notes: vehicleDetails.notes,
        },
        vehicleImageUrls: vehicleImageUrls,
        designPreferences: {
          businessType: businessType,
          brandPersonality: brandPersonality,
          designText: designText,
          logoUrl: logoUrl,
        },
        status: 'Pending Review', // Initial status of the job
        createdAt: serverTimestamp(), // Firebase server timestamp
      });

      window.showMessage(
        'Your design request has been submitted successfully! Redirecting...',
        'success',
      );
      navigate('thank-you'); // Redirect to the thank you page
    } catch (error: any) {
      console.error('Error submitting design request:', error);
      window.showMessage(`Failed to submit request: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // --- Render Steps ---
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ color: 'text.primary', fontWeight: 'bold' }}
            >
              Step 1: Tell Us About Your Vehicle
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
              Upload clear photos of your vehicle from multiple angles (side, front, back) and
              provide its basic details.
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Upload Vehicle Images
                <VisuallyHiddenInput
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleVehicleImageUpload}
                  ref={vehicleFileInputRef}
                />
              </Button>
              {vehicleImages.length === 0 && (
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                  *Please upload at least one image. Clear photos from multiple angles help us
                  design better.
                </Typography>
              )}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {vehicleImages.map((file, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Paper
                      sx={{
                        position: 'relative',
                        p: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                      }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Vehicle preview ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                      <Typography variant="caption" noWrap sx={{ mt: 1, color: 'text.secondary' }}>
                        {file.name}
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          bgcolor: 'rgba(255,0,0,0.6)',
                          color: 'white',
                        }}
                        onClick={() => handleRemoveVehicleImage(index)}
                        aria-label="remove image"
                      >
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Vehicle Make"
                  name="make"
                  value={vehicleDetails.make}
                  onChange={handleVehicleDetailsChange}
                  required
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Vehicle Model"
                  name="model"
                  value={vehicleDetails.model}
                  onChange={handleVehicleDetailsChange}
                  required
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Vehicle Year"
                  name="year"
                  type="number"
                  value={vehicleDetails.year}
                  onChange={handleVehicleDetailsChange}
                  required
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Any specific areas for decals or existing issues?"
                  name="notes"
                  value={vehicleDetails.notes}
                  onChange={handleVehicleDetailsChange}
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="e.g., 'toolboxes,' 'faded paint on driver's side,' 'existing decals to remove/cover.'"
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<NavigateNextIcon />}
                onClick={() => setCurrentStep(2)}
                disabled={!isStep1Valid}
              >
                Next: Your Design Ideas
              </Button>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ color: 'text.primary', fontWeight: 'bold' }}
            >
              Step 2: Your Design Ideas
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
              Tell us about your business and your vision for the design.
            </Typography>

            <TextField
              fullWidth
              label="What's your business type?"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              required
              variant="outlined"
              placeholder="e.g., Plumbing, Landscaping, HVAC, Electrical"
              sx={{ mb: 4 }}
            />

            <Typography
              variant="subtitle1"
              sx={{ color: 'text.primary', mb: 2, fontWeight: 'medium' }}
            >
              What's your brand's personality?
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {brandPersonalities.map((personality) => (
                <Grid item xs={6} sm={4} md={3} key={personality}>
                  <Button
                    fullWidth
                    variant={brandPersonality === personality ? 'contained' : 'outlined'}
                    color={brandPersonality === personality ? 'primary' : 'inherit'}
                    onClick={() => setBrandPersonality(personality)}
                    startIcon={brandPersonality === personality ? <CheckCircleOutlineIcon /> : null}
                    sx={{
                      py: 2,
                      borderColor:
                        brandPersonality === personality ? 'primary.main' : 'text.secondary',
                      color: brandPersonality === personality ? 'white' : 'text.primary',
                      '&:hover': {
                        bgcolor:
                          brandPersonality === personality
                            ? 'primary.dark'
                            : 'rgba(255, 255, 255, 0.08)',
                      },
                      textTransform: 'none',
                    }}
                  >
                    {personality}
                  </Button>
                </Grid>
              ))}
            </Grid>

            <TextField
              fullWidth
              label="What text should be on the decal?"
              value={designText}
              onChange={(e) => setDesignText(e.target.value)}
              multiline
              rows={4}
              required
              variant="outlined"
              placeholder="e.g., 'Smith Plumbing & Heating - (555) 123-4567 - smithplumbing.com - Expert Repairs, Installations & Service'"
              sx={{ mb: 4 }}
            />

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: 'text.primary', mb: 1, fontWeight: 'medium' }}
              >
                Upload Your Logo
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Vector files (.SVG, .AI, .EPS) preferred for best quality, but .PNG, .JPG also
                accepted.
              </Typography>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Upload Logo
                <VisuallyHiddenInput
                  type="file"
                  accept=".svg,.ai,.eps,.png,.jpg,.jpeg"
                  onChange={handleLogoUpload}
                  ref={logoFileInputRef}
                />
              </Button>
              {logoFile && (
                <Paper
                  sx={{
                    p: 1,
                    mt: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'background.paper',
                    borderRadius: '8px',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {logoFile.name}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{ color: 'error.main' }}
                    onClick={handleRemoveLogo}
                    aria-label="remove logo"
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </Paper>
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<NavigateBeforeIcon />}
                onClick={() => setCurrentStep(1)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="success" // Using success color for submission button
                endIcon={
                  loading ? <CircularProgress size={20} color="inherit" /> : <NavigateNextIcon />
                }
                onClick={handleSubmit}
                disabled={loading || !isStep2Valid}
              >
                {loading ? 'Submitting...' : 'Submit Design Request'}
              </Button>
            </Box>
          </Box>
        );

      default:
        return null; // Should not happen
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Center vertically on larger screens
        minHeight: 'calc(100vh - 80px)', // Adjust for header height
        bgcolor: 'background.default',
        color: 'text.primary',
        p: { xs: 2, md: 4 }, // Padding for overall page
      }}
    >
      <Paper
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '16px',
          boxShadow: 6,
          width: '100%',
          maxWidth: '800px', // Max width for the form card
          overflow: 'hidden', // To ensure rounded corners clip content
        }}
      >
        {/* Progress Indicator (simple dots for now) */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 2,
            bgcolor: 'background.paper',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {[1, 2].map((step) => (
            <Box
              key={step}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: currentStep >= step ? 'primary.main' : 'grey.700',
                mx: 1,
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
          <Box
            key={3} // Adding the 3rd dot for Thank You page
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: currentStep >= 3 ? 'primary.main' : 'grey.700', // Assumes step 3 for thank you
              mx: 1,
              transition: 'background-color 0.3s ease',
            }}
          />
        </Box>

        {/* Render current step content */}
        {renderStep()}
      </Paper>
    </Box>
  );
};

export default StartDesignPage;
