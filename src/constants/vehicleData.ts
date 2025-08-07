// src/constants/vehicleData.ts

export const vehicleTypes = [
  'Cargo Van',
  'Box Truck',
  'Pickup Truck',
  'Sedan',
  'SUV',
  'Trailer',
] as const;

export const vehicleMakes = [
  'Ford',
  'Chevrolet',
  'GMC',
  'Ram',
  'Toyota',
  'Nissan',
  'Honda',
  'Mercedes-Benz',
  'Volkswagen',
  'BMW',
  'Jeep',
  'Lexus',
  'Isuzu',
  'Dodge',
  'Freightliner',
] as const;

export const vehicleModels: Record<(typeof vehicleMakes)[number], string[]> = {
  Ford: ['F-150', 'Transit', 'Ranger', 'Explorer'],
  Chevrolet: ['Silverado', 'Colorado', 'Express', 'Tahoe'],
  GMC: ['Sierra', 'Savana', 'Yukon'],
  Ram: ['1500', '2500', 'ProMaster'],
  Toyota: ['Tacoma', 'Tundra', 'Sienna', 'Camry', 'Corolla'],
  Nissan: ['Titan', 'Frontier', 'NV Cargo', 'Altima', 'Rogue'],
  Honda: ['Ridgeline', 'Odyssey', 'Civic', 'Accord', 'CR-V'],
  'Mercedes-Benz': ['Sprinter', 'Metris', 'C-Class', 'E-Class'],
  Volkswagen: ['Transporter', 'Golf', 'Jetta', 'Tiguan'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5'],
  Jeep: ['Wrangler', 'Cherokee', 'Grand Cherokee'],
  Lexus: ['RX', 'ES', 'NX'],
  Isuzu: ['NPR', 'NQR', 'FRR'],
  Dodge: ['Ram 1500', 'Ram 2500', 'Durango'],
  Freightliner: ['Sprinter (by Mercedes)', 'M2 106'],
};
