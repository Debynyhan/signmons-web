export interface StartDesignPageProps {
  userId: string | null;
  navigate: (page: string) => void;
}

export interface VehicleDetails {
  make: string;
  model: string;
  year: string;
  notes?: string;
}

export interface StepProps {
  vehicleDetails: VehicleDetails;
  setVehicleDetails: (details: VehicleDetails) => void;
  vehicleImages: File[];
  setVehicleImages: (files: File[]) => void;
  onNext: () => void;
  onBack?: () => void;
}
