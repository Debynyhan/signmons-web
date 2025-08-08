// src/types/consultation.ts

/** Every named step in order */
export const steps = [
  'Industry',
  'Vehicle',
  'Style',
  'Assets',
  'Colors',
  'Contact',
  'Timeline',
  'Budget',
  'Details',
  'Review',
] as const;
export type WizardStep = (typeof steps)[number];

/** Raw in-flow assets (before upload) */
export interface WizardAssetsInfo {
  logos: File[];
  tagline: string;
}

/** Typed slices for each step */
export interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  color: string;
  type: string;
}
// ——— Export the data shape ———
export interface ColorsInfo {
  primary: string;
  accent: string;
}

export interface ContactInfo {
  businessName: string;
  email: string;
  phone: string;
  website?: string; // optional website URL
}

// ——— Export the data shape ———
export interface TimelineInfo {
  date: string;
  rush: boolean;
}

// ——— Export the data shape ———
export interface BudgetInfo {
  min: number;
  max: number;
}

// ——— Export the data shape ———
export interface DetailsInfo {
  notes: string;
}

export type StyleOption = 'Bold' | 'Minimal' | 'Industrial' | 'Playful' | 'Custom';

/** Wizard state during the UI flow */
export interface WizardState {
  industry: string;
  vehicle: {
    type: string;
    make: string;
    model: string;
    year: string;
    color: string;
  };
  style: string;
  assets: WizardAssetsInfo;
  colors: { primary: string; accent: string };
  contact: { businessName: string; email: string; phone: string; website?: string };
  timeline: { date: string; rush: boolean };
  budget: { min: number; max: number };
  details: { notes: string };
}

/** What actually lands in Firestore */
export interface FirestoreRequest {
  industry: string;
  vehicle: WizardState['vehicle'];
  style: string;
  assets: { logos: string[]; tagline: string };
  colors: WizardState['colors'];
  contact: WizardState['contact'];
  timeline: WizardState['timeline'];
  budget: WizardState['budget'];
  details: WizardState['details'];
  createdAt: string;
}

/** The payload you pass in just before adding createdAt */
export type DesignWizardState = Omit<FirestoreRequest, 'createdAt'>;
