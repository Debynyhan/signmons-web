// // src/types/startDesignTypes.ts
// import { PageName } from './navigation'; 


// export interface StartDesignPageProps {
//   userId: string | null;
//   navigate: (page: PageName) => void;
// }

// export interface VehicleDetails {
//   make: string;
//   model: string;
//   year: string;
//   notes: string;
// }

// export interface Step1VehicleDetailsProps {
//   vehicleImages: File[];
//   setVehicleImages: (files: File[]) => void;
//   vehicleDetails: VehicleDetails;
//   setVehicleDetails: (details: VehicleDetails) => void;
//   handleVehicleImageUpload: (files: File[]) => void;
//   handleRemoveVehicleImage: (index: number) => void;
//   handleVehicleDetailsChange: (field: keyof VehicleDetails, value: string) => void;
//   isStep1Valid: boolean;
//   goToNextStep: () => void;
//   vehicleFileInputRef: React.RefObject<HTMLInputElement>;
//   userId: string | null;
//   setCurrentStep: (step: number) => void;
//   currentStep: number;
//   navigate: (page: string) => void;
//   loading: boolean;
//   setLoading: (value: boolean) => void;
//   // any other shared props can be added here
// }

// export interface Step2DesignIdeasProps {
//   designText: string;
//   setDesignText: (value: string) => void;
//   logoFile: File | null;
//   setLogoFile: (file: File | null) => void;
//   businessType: string;
//   setBusinessType: (value: string) => void;
//   brandPersonality: string;
//   setBrandPersonality: (value: string) => void;
//   isStep2Valid: boolean;
//   goToNextStep: () => void;
//   loading: boolean;
//   userId: string | null;
//   setCurrentStep: (step: number) => void;
//   currentStep: number;
//   navigate: (page: string) => void;
//   setLoading: (value: boolean) => void;
// }

// export interface Step1Props {
//   vehicleImages: File[];
//   vehicleDetails: VehicleDetails;
//   handleVehicleImageUpload: (files: File[]) => void;
//   handleRemoveVehicleImage: (index: number) => void;
//   handleVehicleDetailsChange: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => void;
//   isStep1Valid: boolean;
//   onNext: () => void;
//   vehicleFileInputRef: React.RefObject<HTMLInputElement>;
// }
