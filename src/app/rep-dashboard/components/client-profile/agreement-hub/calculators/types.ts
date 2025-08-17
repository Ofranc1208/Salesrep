// Shared calculator types for the Agreement Hub

export interface BMIResult {
  value: number;
  category: string;
  riskLevel: string;
  mortalityRating: number;
  recommendations: string[];
}

export interface LifeInsuranceResult {
  insurabilityScore: number;
  riskClass: string;
  maxCoverage: number;
  recommendedCoverage: number;
  premiumMultiplier: number;
  eligibility: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Declined';
  applicationData?: any; // Will be properly typed when form data is finalized
  // Legacy compatibility
  score?: number; // Same as insurabilityScore for backward compatibility
}

export interface NPVResult {
  presentValue: number;
  futureValue: number;
  discountRate: number;
  paymentSchedule: PaymentScheduleItem[];
  totalPayments: number;
}

export interface PaymentScheduleItem {
  date: string;
  amount: number;
  presentValue: number;
}

export interface PrequalificationResult {
  isQualified: boolean;
  qualificationScore: number;
  riskFactors: string[];
  recommendations: string[];
  estimatedApprovalChance: number;
  requiredDocuments: string[];
  // Legacy compatibility
  recommendation?: 'approve' | 'review' | 'decline'; // Single recommendation status
}

export interface CalculatorData {
  bmi: BMIResult | null;
  healthRisk: LifeInsuranceResult | null;
  npv: NPVResult | null;
  prequalification: PrequalificationResult | null;
}

export interface CalculatorProps {
  selectedLead: any; // Will be properly typed from main types
  calculatorData: CalculatorData;
  onDataUpdate: (data: any) => void;
}
