// src/components/consultation/ContactStep.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { trimAndClamp, isValidEmail, isValidPhone, stripHtmlTags } from '../../utils/stringUtils';
import type { ContactInfo } from '../../types/consultation';



interface ContactStepProps {
  initialInfo?: ContactInfo;
  onNext: (info: ContactInfo) => void;
}

const ContactStep: React.FC<ContactStepProps> = ({ initialInfo, onNext }) => {
  const [businessName, setBusinessName] = useState(initialInfo?.businessName || '');
  const [email, setEmail] = useState(initialInfo?.email || '');
  const [phone, setPhone] = useState(initialInfo?.phone || '');

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Validate on change
  useEffect(() => {
    const name = trimAndClamp(stripHtmlTags(businessName), 50);
    if (!name) {
      setNameError('Please enter your business name');
    } else {
      setNameError(null);
    }
  }, [businessName]);

  useEffect(() => {
    if (!isValidEmail(email)) {
      setEmailError('Enter a valid email address');
    } else {
      setEmailError(null);
    }
  }, [email]);

  useEffect(() => {
    if (!isValidPhone(phone)) {
      setPhoneError('Enter a valid phone number');
    } else {
      setPhoneError(null);
    }
  }, [phone]);

  const isValid = !nameError && !emailError && !phoneError && businessName && email && phone;

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        Your Contact Info
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
        We’ll reach out to deliver your free design mockup.
      </Typography>

      <Grid container spacing={2}>
        {/* Business Name */}
        <Grid item xs={12}>
          <TextField
            label="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            fullWidth
            error={!!nameError}
            helperText={nameError}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            fullWidth
            error={!!emailError}
            helperText={emailError}
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.trim())}
            fullWidth
            error={!!phoneError}
            helperText={phoneError}
          />
        </Grid>

        {/* Continue */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={() =>
                onNext({
                  businessName: trimAndClamp(stripHtmlTags(businessName), 50),
                  email: email.trim(),
                  phone: phone.trim(),
                })
              }
            >
              Continue
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactStep;
