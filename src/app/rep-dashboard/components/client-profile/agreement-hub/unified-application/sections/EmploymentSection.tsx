'use client';

import React from 'react';
import { Lead } from '../../../../../types';
import FormField from '../components/FormField';
import FormSection from '../components/FormSection';

interface EmploymentSectionProps {
  formData: any;
  updateFormData: (section: string, field: string, value: any) => void;
  selectedLead: Lead | null;
}

const EmploymentSection: React.FC<EmploymentSectionProps> = ({ 
  formData, 
  updateFormData, 
  selectedLead 
}) => {
  const employmentData = formData.employment || {};

  const handleFieldChange = (field: string, value: any) => {
    updateFormData('employment', field, value);
  };

  return (
    <div className="space-y-8">
      <FormSection
        title="Section 3: Employment & Income"
        description="This section details the applicant's and their spouse's current employment and other sources of income."
        icon="💼"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Are you currently working?"
            type="radio"
            value={employmentData.currentlyWorking || ''}
            onChange={(value) => handleFieldChange('currentlyWorking', value)}
            required
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />

          {employmentData.currentlyWorking === 'no' && (
            <>
              <FormField
                label="If not working, do you have a disability that prevents you from working?"
                type="radio"
                value={employmentData.disabilityPreventsWork || ''}
                onChange={(value) => handleFieldChange('disabilityPreventsWork', value)}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
              />

              <FormField
                label="If you are not working, please state why"
                type="textarea"
                value={employmentData.reasonNotWorking || ''}
                onChange={(value) => handleFieldChange('reasonNotWorking', value)}
                placeholder="Explain why you are not currently working"
                rows={2}
              />
            </>
          )}

          <FormField
            label="Do you receive disability income? If yes, how much?"
            type="text"
            value={employmentData.disabilityIncome || ''}
            onChange={(value) => handleFieldChange('disabilityIncome', value)}
            placeholder="Enter amount or 'No'"
          />
        </div>

        {/* Current Employment Details */}
        {employmentData.currentlyWorking === 'yes' && (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Current Employment</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Employer Name"
                type="text"
                value={employmentData.employerName || ''}
                onChange={(value) => handleFieldChange('employerName', value)}
                placeholder="Enter employer name"
              />

              <FormField
                label="Employer Address"
                type="text"
                value={employmentData.employerAddress || ''}
                onChange={(value) => handleFieldChange('employerAddress', value)}
                placeholder="Enter employer address"
              />

              <FormField
                label="Your Title/Position"
                type="text"
                value={employmentData.jobTitle || ''}
                onChange={(value) => handleFieldChange('jobTitle', value)}
                placeholder="Enter your job title"
              />

              <FormField
                label="How long have you been employed at this job?"
                type="text"
                value={employmentData.employmentDuration || ''}
                onChange={(value) => handleFieldChange('employmentDuration', value)}
                placeholder="e.g., 2 years, 6 months"
              />

              <FormField
                label="Is this position Full-time or Part-time?"
                type="select"
                value={employmentData.employmentType || ''}
                onChange={(value) => handleFieldChange('employmentType', value)}
                options={[
                  { value: '', label: 'Select Type' },
                  { value: 'full-time', label: 'Full-time' },
                  { value: 'part-time', label: 'Part-time' }
                ]}
              />

              <FormField
                label="What is your rate of pay?"
                type="text"
                value={employmentData.payRate || ''}
                onChange={(value) => handleFieldChange('payRate', value)}
                placeholder="e.g., $20/hour, $50,000/year"
              />
            </div>
          </div>
        )}

        {/* Previous Employment (if unemployed) */}
        {employmentData.currentlyWorking === 'no' && (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Previous Employment</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="If unemployed, what was your last job?"
                type="text"
                value={employmentData.lastJob || ''}
                onChange={(value) => handleFieldChange('lastJob', value)}
                placeholder="Enter last job title/employer"
              />

              <FormField
                label="Why was your employment terminated?"
                type="text"
                value={employmentData.terminationReason || ''}
                onChange={(value) => handleFieldChange('terminationReason', value)}
                placeholder="Reason for leaving last job"
              />

              <FormField
                label="When was your employment terminated?"
                type="date"
                value={employmentData.terminationDate || ''}
                onChange={(value) => handleFieldChange('terminationDate', value)}
              />
            </div>
          </div>
        )}

        {/* Spouse Employment */}
        <div className="mt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Spouse Employment (if applicable)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Spouse's Employer Name"
              type="text"
              value={employmentData.spouseEmployer || ''}
              onChange={(value) => handleFieldChange('spouseEmployer', value)}
              placeholder="Enter spouse's employer"
            />

            <FormField
              label="Spouse's Employer Address"
              type="text"
              value={employmentData.spouseEmployerAddress || ''}
              onChange={(value) => handleFieldChange('spouseEmployerAddress', value)}
              placeholder="Enter spouse's employer address"
            />

            <FormField
              label="Spouse's Title/Position"
              type="text"
              value={employmentData.spouseJobTitle || ''}
              onChange={(value) => handleFieldChange('spouseJobTitle', value)}
              placeholder="Enter spouse's job title"
            />

            <FormField
              label="Please list any other sources of income you receive"
              type="textarea"
              value={employmentData.otherIncome || ''}
              onChange={(value) => handleFieldChange('otherIncome', value)}
              placeholder="List other income sources (rental, investments, etc.)"
              rows={3}
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default EmploymentSection;
