import React from 'react';
import { LifeInsuranceResult, ApplicationData } from '../types';
import { getEligibilityColor, formatHealthIssues } from '../utils';

interface InsurabilityAssessmentProps {
  assessment: LifeInsuranceResult;
  applicationData: ApplicationData;
  calculatorData: any;
}

const InsurabilityAssessment: React.FC<InsurabilityAssessmentProps> = ({ 
  assessment, 
  applicationData, 
  calculatorData 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Insurability Assessment</h3>
      
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">{assessment.insurabilityScore}</div>
        <div className="text-xs text-gray-600 mb-2">Insurability Score</div>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getEligibilityColor(assessment.eligibility)}`}>
          {assessment.eligibility}
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Risk Class:</span>
          <span className="font-medium">{assessment.riskClass}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Premium Impact:</span>
          <span className="font-medium">{assessment.premiumMultiplier}x</span>
        </div>
        {calculatorData.bmi && (
          <div className="flex justify-between">
            <span className="text-gray-600">BMI Factor:</span>
            <span className="font-medium">{calculatorData.bmi.category}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Health Issues:</span>
          <span className="font-medium">
            {formatHealthIssues(applicationData)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InsurabilityAssessment;
