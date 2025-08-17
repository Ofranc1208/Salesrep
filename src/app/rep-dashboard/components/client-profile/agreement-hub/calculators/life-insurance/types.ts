export interface LifeInsuranceResult {
  insurabilityScore: number;
  riskClass: string;
  maxCoverage: number;
  recommendedCoverage: number;
  premiumMultiplier: number;
  eligibility: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Declined';
}

export interface ApplicationData {
  // Demographics
  age: number;
  gender: string;
  annualIncome: number;
  occupation: string;
  
  // Health Factors
  smoking: boolean;
  diabetes: boolean;
  heartDisease: boolean;
  copd: boolean;
  cancer: boolean;
  highBloodPressure: boolean;
  
  // Lifestyle
  alcoholUse: string;
  exerciseFrequency: string;
  dangerousHobbies: boolean;
  
  // Financial
  existingLifeInsurance: number;
  debts: number;
  
  // Structured Settlement Details
  monthlyPayment: number;
  paymentYears: number;
  totalPaymentValue: number;
}

export interface HealthRiskAssessmentProps {
  selectedLead: any;
  calculatorData: any;
  onDataUpdate: (data: any) => void;
}
