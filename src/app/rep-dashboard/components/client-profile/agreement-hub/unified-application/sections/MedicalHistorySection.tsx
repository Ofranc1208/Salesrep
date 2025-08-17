'use client';

import React from 'react';
import { Lead } from '../../../../../types';
import FormField from '../components/FormField';
import FormSection from '../components/FormSection';

interface MedicalHistorySectionProps {
  formData: any;
  updateFormData: (section: string, field: string, value: any) => void;
  selectedLead: Lead | null;
}

const MedicalHistorySection: React.FC<MedicalHistorySectionProps> = ({ 
  formData, 
  updateFormData, 
  selectedLead 
}) => {
  const medicalData = formData.medicalHistory || {};

  const handleFieldChange = (field: string, value: any) => {
    updateFormData('medicalHistory', field, value);
  };

  return (
    <div className="space-y-8">
      <FormSection
        title="Section 6: Medical History"
        description="This is a comprehensive section regarding the applicant's health. Please answer all questions honestly."
        icon="🏥"
      >
        <div className="space-y-6">
          {/* Physical Limitations */}
          <FormField
            label="Do you have any limitations on your physical activity? If yes, please describe."
            type="textarea"
            value={medicalData.physicalLimitations || ''}
            onChange={(value) => handleFieldChange('physicalLimitations', value)}
            placeholder="Describe any physical limitations or enter 'None'"
            rows={2}
          />

          {/* Disability */}
          <FormField
            label="Are you disabled or currently receiving disability benefits? If yes, please provide details."
            type="textarea"
            value={medicalData.disabilityDetails || ''}
            onChange={(value) => handleFieldChange('disabilityDetails', value)}
            placeholder="Provide disability details or enter 'No'"
            rows={2}
          />

          {/* Substance Use */}
          <FormField
            label="Have you ever used non-prescription drugs such as marijuana, cocaine, or heroin? If yes, please provide details."
            type="textarea"
            value={medicalData.drugUse || ''}
            onChange={(value) => handleFieldChange('drugUse', value)}
            placeholder="Provide details or enter 'No'"
            rows={2}
          />

          <FormField
            label="Have you ever received treatment for drug or alcohol abuse, or participated in a program like AA? If yes, please provide details."
            type="textarea"
            value={medicalData.substanceAbuseTreatment || ''}
            onChange={(value) => handleFieldChange('substanceAbuseTreatment', value)}
            placeholder="Provide treatment details or enter 'No'"
            rows={2}
          />

          <FormField
            label="Do you drink alcohol? If yes, how much per day or week?"
            type="text"
            value={medicalData.alcoholConsumption || ''}
            onChange={(value) => handleFieldChange('alcoholConsumption', value)}
            placeholder="e.g., '2 drinks per week' or 'No'"
          />

          <FormField
            label="Do you currently use nicotine in any form (e.g., smoking, chewing)? If yes, how much and how often?"
            type="text"
            value={medicalData.nicotineUse || ''}
            onChange={(value) => handleFieldChange('nicotineUse', value)}
            placeholder="e.g., '1 pack per day' or 'No'"
          />

          {/* Medical Conditions */}
          <FormField
            label="Are you currently taking any prescription pain medication (e.g., Oxycodone)? If yes, please provide details."
            type="textarea"
            value={medicalData.painMedication || ''}
            onChange={(value) => handleFieldChange('painMedication', value)}
            placeholder="List medications and dosages or enter 'No'"
            rows={2}
          />

          <FormField
            label="Please list all prescription medications you take regularly"
            type="textarea"
            value={medicalData.prescriptionMedications || ''}
            onChange={(value) => handleFieldChange('prescriptionMedications', value)}
            placeholder="List all current medications with dosages"
            rows={4}
          />

          {/* Major Medical Conditions - Simplified for now */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Major Medical Conditions</h4>
            <p className="text-sm text-yellow-700 mb-4">
              Please indicate if you have ever been diagnosed with or treated for any of the following conditions:
            </p>
            
            <FormField
              label="Major Medical Conditions and Treatments"
              type="textarea"
              value={medicalData.majorConditions || ''}
              onChange={(value) => handleFieldChange('majorConditions', value)}
              placeholder="List any major medical conditions, surgeries, or treatments including: heart conditions, cancer, diabetes, mental health conditions, etc."
              rows={6}
              helpText="Include details such as dates, treatments received, and current status"
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default MedicalHistorySection;
