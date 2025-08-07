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
  logos: File[]; // <-- must be File[] here
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

/** The full wizard state during the UI flow */
export interface WizardState {
  industry: string;
  vehicle: VehicleInfo;
  style: string; // your StyleOption
  assets: WizardAssetsInfo;
  colors: ColorsInfo;
  contact: ContactInfo;
  timeline: TimelineInfo;
  budget: BudgetInfo;
  details: DetailsInfo;
}

/** What actually lands in Firestore */
export interface FirestoreRequest {
  industry: string;
  vehicle: VehicleInfo;
  style: string;
  assets: { logos: string[]; tagline: string };
  colors: ColorsInfo;
  contact: ContactInfo;
  timeline: TimelineInfo;
  budget: BudgetInfo;
  details: DetailsInfo;
  createdAt: string;
}

/** The payload you pass in just before adding createdAt */
export type DesignWizardState = Omit<FirestoreRequest, 'createdAt'>;
