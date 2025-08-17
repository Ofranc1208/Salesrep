import React from 'react';
import { LifeInsuranceResult, ApplicationData } from '../types';

interface DealBackingRequirementsProps {
  assessment: LifeInsuranceResult;
  applicationData: ApplicationData;
  dealBackingRequired: number;
  gapCoverage: number;
}

const DealBackingRequirements: React.FC<DealBackingRequirementsProps> = ({ 
  assessment, 
  applicationData, 
  dealBackingRequired, 
  gapCoverage 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Deal Backing Requirements</h3>
      
      <div className="space-y-3">
        <div className="bg-purple-50 rounded-lg p-3">
          <h4 className="text-xs font-medium text-purple-800 mb-2">Structured Settlement Deal</h4>
          <div className="text-xs text-purple-600 space-y-1">
            <div className="flex justify-between">
              <span>Total Deal Value:</span>
              <span className="font-semibold">${applicationData.totalPaymentValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Required Backing (120%):</span>
              <span className="font-semibold">${dealBackingRequired.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Existing Coverage:</span>
              <span className="font-semibold">${applicationData.existingLifeInsurance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-1">
              <span>Coverage Gap:</span>
              <span className={`font-semibold ${gapCoverage > 0 ? 'text-red-600' : 'text-green-600'}`}>
                ${gapCoverage.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-3">
          <h4 className="text-xs font-medium text-green-800 mb-2">Coverage Recommendation</h4>
          <div className="text-xs text-green-600 space-y-1">
            <div className="flex justify-between">
              <span>Recommended Coverage:</span>
              <span className="font-semibold">${assessment.recommendedCoverage.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Maximum Eligible:</span>
              <span className="font-semibold">${assessment.maxCoverage.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealBackingRequirements;
