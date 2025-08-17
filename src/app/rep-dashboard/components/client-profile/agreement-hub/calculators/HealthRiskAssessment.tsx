'use client';

import React, { useEffect } from 'react';
import { Lead } from '../../../../types';
import {
  HealthRiskAssessmentProps,
  mockApplicationData,
  calculateLifeInsuranceAssessment,
  calculateDealMetrics,
  ApplicationDataSummary,
  InsurabilityAssessment,
  DealBackingRequirements,
  DealRecommendation
} from './life-insurance';

const HealthRiskAssessment: React.FC<HealthRiskAssessmentProps> = ({ 
  selectedLead, 
  calculatorData, 
  onDataUpdate 
}) => {
  // In a real app, this would come from the completed application form
  const applicationData = mockApplicationData;
  
  // Calculate the life insurance assessment
  const assessment = calculateLifeInsuranceAssessment(applicationData, calculatorData);
  
  // Calculate deal-specific metrics
  const { dealBackingRequired, gapCoverage } = calculateDealMetrics(applicationData);

  // Update parent component with assessment data
  useEffect(() => {
    onDataUpdate({
      ...assessment,
      applicationData
    });
  }, [assessment.insurabilityScore, onDataUpdate]);

  return (
    <div className="flex-1 p-4 overflow-hidden">
      <div className="max-w-6xl mx-auto h-full flex flex-col space-y-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Life Insurance Assessment</h2>
          <p className="text-xs text-gray-600">Structured settlement deal backing analysis from application data</p>
        </div>

        {/* Application Data Summary */}
        <ApplicationDataSummary applicationData={applicationData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
          {/* Insurability Assessment */}
          <InsurabilityAssessment 
            assessment={assessment}
            applicationData={applicationData}
            calculatorData={calculatorData}
          />

          {/* Deal Backing Requirements */}
          <DealBackingRequirements 
            assessment={assessment}
            applicationData={applicationData}
            dealBackingRequired={dealBackingRequired}
            gapCoverage={gapCoverage}
          />

          {/* Deal Recommendation */}
          <DealRecommendation 
            assessment={assessment}
            applicationData={applicationData}
            gapCoverage={gapCoverage}
          />
        </div>
      </div>
    </div>
  );
};

export default HealthRiskAssessment;