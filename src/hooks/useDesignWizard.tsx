// src/hooks/useDesignWizard.ts
import { useState } from 'react';
import { useStorage } from './useStorage';

import type {
  WizardState,
  WizardAssetsInfo,
  VehicleInfo,
  ColorsInfo,
  ContactInfo,
  TimelineInfo,
  BudgetInfo,
  DetailsInfo,
  WizardStep,
} from '../types/consultation';
import { steps } from '../types/consultation';

export function useDesignWizard() {
  // --- 1) track which step we're on ---
  const [stepIndex, setStepIndex] = useState<number>(0);
  // storage options: use sessionStorage and clear on init to reset on refresh
  const storageOpts = { storage: window.sessionStorage, clearOnInit: true };

  // --- 2) persist each slice in sessionStorage and reset on refresh ---
  const [industry, setIndustry] = useStorage<string>('wizard-industry', '', storageOpts);

  const [vehicle, setVehicle] = useStorage<VehicleInfo>(
    'wizard-vehicle',
    {
      type: '',
      make: '',
      model: '',
      year: '',
      color: '',
    },
    storageOpts,
  );

  const [style, setStyle] = useStorage<string>('wizard-style', 'Custom', storageOpts);

  const [assets, setAssets] = useStorage<WizardAssetsInfo>(
    'wizard-assets',
    {
      logos: [],
      tagline: '',
    },
    storageOpts,
  );

  const [colors, setColors] = useStorage<ColorsInfo>(
    'wizard-colors',
    {
      primary: '#000000',
      accent: '#ffffff',
    },
    storageOpts,
  );

  const [contact, setContact] = useStorage<ContactInfo>(
    'wizard-contact',
    {
      businessName: '',
      email: '',
      phone: '',
    },
    storageOpts,
  );

  const [timeline, setTimeline] = useStorage<TimelineInfo>(
    'wizard-timeline',
    {
      date: '',
      rush: false,
    },
    storageOpts,
  );

  const [budget, setBudget] = useStorage<BudgetInfo>(
    'wizard-budget',
    { min: 0, max: 0 },
    storageOpts,
  );

  const [details, setDetails] = useStorage<DetailsInfo>(
    'wizard-details',
    { notes: '' },
    storageOpts,
  );

  // --- 3) step navigation helpers ---
  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));
  const goTo = (i: number) => setStepIndex(Math.min(Math.max(i, 0), steps.length - 1));

  // --- 4) “select+advance” for each slice ---
  const selectIndustry = (v: string) => {
    setIndustry(v);
    next();
  };
  const selectVehicle = (v: VehicleInfo) => {
    setVehicle(v);
    next();
  };
  const selectStyle = (s: string) => {
    setStyle(s);
    next();
  };
  const selectAssets = (a: WizardAssetsInfo) => {
    setAssets(a);
    next();
  };
  const selectColors = (c: ColorsInfo) => {
    setColors(c);
    next();
  };
  const selectContact = (c: ContactInfo) => {
    setContact(c);
    next();
  };
  const selectTimeline = (t: TimelineInfo) => {
    setTimeline(t);
    next();
  };
  const selectBudget = (b: BudgetInfo) => {
    setBudget(b);
    next();
  };
  const selectDetails = (d: DetailsInfo) => {
    setDetails(d);
    next();
  };

  // --- 5) expose everything to your wizard component ---
  return {
    // where are we?
    stepIndex,
    currentStep: steps[stepIndex] as WizardStep,

    // the full in-flow state object
    state: {
      industry,
      vehicle,
      style,
      assets,
      colors,
      contact,
      timeline,
      budget,
      details,
    } as WizardState,

    // raw navigation
    back,
    goTo,

    // select+advance
    selectIndustry,
    selectVehicle,
    selectStyle,
    selectAssets,
    selectColors,
    selectContact,
    selectTimeline,
    selectBudget,
    selectDetails,
  };
}
