import { ApplicationData, LifeInsuranceResult } from './types';

export const calculateLifeInsuranceAssessment = (
  applicationData: ApplicationData,
  calculatorData: any
): LifeInsuranceResult => {
  let baseScore = 100;
  let riskMultiplier = 1.0;
  
  // Age factor (younger = better)
  if (applicationData.age < 30) baseScore += 20;
  else if (applicationData.age < 40) baseScore += 10;
  else if (applicationData.age < 50) baseScore += 0;
  else if (applicationData.age < 60) baseScore -= 15;
  else baseScore -= 30;
  
  // Gender factor (women typically live longer)
  if (applicationData.gender === 'female') baseScore += 5;
  
  // Health conditions (major impact)
  if (applicationData.smoking) { baseScore -= 40; riskMultiplier += 1.5; }
  if (applicationData.diabetes) { baseScore -= 25; riskMultiplier += 0.8; }
  if (applicationData.heartDisease) { baseScore -= 35; riskMultiplier += 1.2; }
  if (applicationData.copd) { baseScore -= 45; riskMultiplier += 1.8; }
  if (applicationData.cancer) { baseScore -= 50; riskMultiplier += 2.0; }
  if (applicationData.highBloodPressure) { baseScore -= 15; riskMultiplier += 0.4; }
  
  // Lifestyle factors
  if (applicationData.alcoholUse === 'heavy') { baseScore -= 20; riskMultiplier += 0.6; }
  if (applicationData.exerciseFrequency === 'regular') baseScore += 10;
  if (applicationData.dangerousHobbies) { baseScore -= 15; riskMultiplier += 0.5; }
  
  // Occupation risk
  const occupationRisk = {
    'office-worker': 0,
    'healthcare': -5,
    'construction': -20,
    'pilot': -25,
    'police': -15,
    'teacher': 5
  };
  baseScore += occupationRisk[applicationData.occupation as keyof typeof occupationRisk] || 0;
  
  // BMI factor (if available from BMI calculator)
  if (calculatorData.bmi) {
    if (calculatorData.bmi.mortalityRating > 200) baseScore -= 25;
    else if (calculatorData.bmi.mortalityRating > 150) baseScore -= 15;
    else if (calculatorData.bmi.mortalityRating > 120) baseScore -= 8;
  }
  
  // Determine risk class and eligibility
  let riskClass: string;
  let eligibility: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Declined';
  let premiumMultiplier: number;
  
  if (baseScore >= 85) {
    riskClass = 'Super Preferred Plus';
    eligibility = 'Excellent';
    premiumMultiplier = 0.8;
  } else if (baseScore >= 70) {
    riskClass = 'Preferred Plus';
    eligibility = 'Good';
    premiumMultiplier = 1.0;
  } else if (baseScore >= 55) {
    riskClass = 'Standard Plus';
    eligibility = 'Fair';
    premiumMultiplier = 1.3;
  } else if (baseScore >= 40) {
    riskClass = 'Standard';
    eligibility = 'Poor';
    premiumMultiplier = 1.8;
  } else {
    riskClass = 'Substandard/Declined';
    eligibility = 'Declined';
    premiumMultiplier = 3.0;
  }
  
  // Calculate coverage amounts for structured settlement backing
  const dealBackingRequired = applicationData.totalPaymentValue * 1.2; // 120% of deal value
  const incomeMultiplier = applicationData.age < 40 ? 20 : applicationData.age < 50 ? 15 : 10;
  const maxCoverage = applicationData.annualIncome * incomeMultiplier;
  const recommendedCoverage = Math.max(
    dealBackingRequired,
    Math.min((applicationData.annualIncome * 10) + applicationData.debts, maxCoverage)
  );
  
  return {
    insurabilityScore: Math.max(0, Math.min(100, baseScore)),
    riskClass,
    maxCoverage,
    recommendedCoverage,
    premiumMultiplier,
    eligibility
  };
};

export const getEligibilityColor = (eligibility: string): string => {
  switch (eligibility) {
    case 'Excellent': return 'text-green-600 bg-green-50 border-green-200';
    case 'Good': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'Fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'Poor': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Declined': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const calculateDealMetrics = (applicationData: ApplicationData) => {
  const dealBackingRequired = applicationData.totalPaymentValue * 1.2;
  const gapCoverage = Math.max(0, dealBackingRequired - applicationData.existingLifeInsurance);
  
  return {
    dealBackingRequired,
    gapCoverage
  };
};

export const formatHealthIssues = (applicationData: ApplicationData): string => {
  const issues = [
    applicationData.smoking && 'Smoking',
    applicationData.diabetes && 'Diabetes', 
    applicationData.heartDisease && 'Heart',
    applicationData.copd && 'COPD', 
    applicationData.cancer && 'Cancer',
    applicationData.highBloodPressure && 'High BP'
  ].filter(Boolean);
  
  return issues.join(', ') || 'None';
};
