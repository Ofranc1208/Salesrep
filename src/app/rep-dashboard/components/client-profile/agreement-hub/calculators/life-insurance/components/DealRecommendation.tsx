import React from 'react';
import { LifeInsuranceResult, ApplicationData } from '../types';
import { getEligibilityColor } from '../utils';

interface DealRecommendationProps {
  assessment: LifeInsuranceResult;
  applicationData: ApplicationData;
  gapCoverage: number;
}

const DealRecommendation: React.FC<DealRecommendationProps> = ({ 
  assessment, 
  applicationData, 
  gapCoverage 
}) => {
  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'Low', color: 'text-green-600' };
    if (score >= 50) return { level: 'Medium', color: 'text-yellow-600' };
    return { level: 'High', color: 'text-red-600' };
  };

  const riskLevel = getRiskLevel(assessment.insurabilityScore);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Deal Recommendation</h3>
      
      <div className={`rounded-lg p-3 border mb-3 ${getEligibilityColor(assessment.eligibility)}`}>
        <h4 className="text-xs font-medium mb-2">Life Insurance Eligibility</h4>
        <div className="text-xs space-y-1">
          {assessment.eligibility === 'Excellent' && (
            <p>✅ Excellent candidate - Proceed with deal. Low insurance risk.</p>
          )}
          {assessment.eligibility === 'Good' && (
            <p>✅ Good candidate - Proceed with deal. Standard insurance rates expected.</p>
          )}
          {assessment.eligibility === 'Fair' && (
            <p>⚠️ Fair candidate - Proceed with caution. Higher insurance premiums likely.</p>
          )}
          {assessment.eligibility === 'Poor' && (
            <p>⚠️ High risk - Consider smaller deal or decline. Insurance may be expensive.</p>
          )}
          {assessment.eligibility === 'Declined' && (
            <p>❌ High risk - Recommend declining deal. Insurance likely unavailable.</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Deal Viability</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Deal Size:</span>
              <span className="font-medium">${(applicationData.totalPaymentValue / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between">
              <span>Insurance Gap:</span>
              <span className={`font-medium ${gapCoverage > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {gapCoverage > 0 ? `$${(gapCoverage / 1000000).toFixed(1)}M needed` : 'Fully covered'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Risk Level:</span>
              <span className={`font-medium ${riskLevel.color}`}>
                {riskLevel.level}
              </span>
            </div>
          </div>
        </div>

        {gapCoverage > 0 && assessment.eligibility !== 'Declined' && (
          <div className="bg-blue-50 rounded-lg p-3">
            <h4 className="text-xs font-medium text-blue-800 mb-1">Next Steps</h4>
            <div className="text-xs text-blue-600">
              <p>• Apply for ${(gapCoverage / 1000000).toFixed(1)}M additional life insurance</p>
              <p>• Expected premium: {assessment.premiumMultiplier}x standard rate</p>
              <p>• Proceed with deal once coverage is secured</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealRecommendation;
