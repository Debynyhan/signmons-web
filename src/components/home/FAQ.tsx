import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  { q: 'How fast can I see a mockup?', a: 'Often within 24–48 hours after your brief.' },
  { q: 'What files do you need?', a: 'SVG preferred; PNG/JPG acceptable—we can optimize.' },
  { q: 'Do you install wraps?', a: 'Yes. We schedule install after design approval.' },
  {
    q: 'Can you do websites too?',
    a: 'Yes. We build conversion‑focused sites that match your brand.',
  },
];

const FAQ: React.FC = () => (
  <Box>
    {faqs.map((f, i) => (
      <Accordion key={i}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">{f.q}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            {f.a}
          </Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </Box>
);

export default FAQ;
