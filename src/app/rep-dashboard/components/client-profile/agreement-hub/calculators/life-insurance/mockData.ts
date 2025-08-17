import { ApplicationData } from './types';

export const mockApplicationData: ApplicationData = {
  // Demographics (from application)
  age: 42,
  gender: 'male',
  annualIncome: 85000,
  occupation: 'teacher',
  
  // Health Factors (from application)
  smoking: false,
  diabetes: false,
  heartDisease: false,
  copd: false,
  cancer: false,
  highBloodPressure: true,
  
  // Lifestyle (from application)
  alcoholUse: 'moderate',
  exerciseFrequency: 'regular',
  dangerousHobbies: false,
  
  // Financial (from application)
  existingLifeInsurance: 250000,
  debts: 75000,
  
  // Structured Settlement Details
  monthlyPayment: 2500,
  paymentYears: 15,
  totalPaymentValue: 450000
};
