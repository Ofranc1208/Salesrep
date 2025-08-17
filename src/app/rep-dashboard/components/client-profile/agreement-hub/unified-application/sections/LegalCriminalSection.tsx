'use client';

import React from 'react';
import { Lead } from '../../../../../types';
import FormField from '../components/FormField';
import FormSection from '../components/FormSection';

interface LegalCriminalSectionProps {
  formData: any;
  updateFormData: (section: string, field: string, value: any) => void;
  selectedLead: Lead | null;
}

const LegalCriminalSection: React.FC<LegalCriminalSectionProps> = ({ 
  formData, 
  updateFormData, 
  selectedLead 
}) => {
  const legalData = formData.legalCriminal || {};

  const handleFieldChange = (field: string, value: any) => {
    updateFormData('legalCriminal', field, value);
  };

  return (
    <div className="space-y-8">
      <FormSection
        title="Section 8: Legal & Criminal Background"
        description="This section covers the applicant's legal and driving history."
        icon="⚖️"
      >
        <div className="space-y-6">
          {/* Criminal History */}
          <FormField
            label="Have you ever been convicted of a misdemeanor or felony? If yes, please provide details."
            type="textarea"
            value={legalData.criminalConvictions || ''}
            onChange={(value) => handleFieldChange('criminalConvictions', value)}
            placeholder="Provide details of any convictions or enter 'No'"
            rows={3}
          />

          <FormField
            label="Have you ever been declared legally incompetent by a court?"
            type="radio"
            value={legalData.legallyIncompetent || ''}
            onChange={(value) => handleFieldChange('legallyIncompetent', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />

          {/* Driving History */}
          <FormField
            label="In the past 5 years, have you been cited for reckless driving or driving under the influence (DUI/DWI)?"
            type="radio"
            value={legalData.drivingViolations || ''}
            onChange={(value) => handleFieldChange('drivingViolations', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />

          <FormField
            label="Has your driver's license been suspended or revoked in the past 5 years?"
            type="radio"
            value={legalData.licenseSuspended || ''}
            onChange={(value) => handleFieldChange('licenseSuspended', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />

          {/* Insurance History */}
          <FormField
            label="Have you ever had an application for life or disability insurance refused, postponed, or rated up?"
            type="radio"
            value={legalData.insuranceRefused || ''}
            onChange={(value) => handleFieldChange('insuranceRefused', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />

          <FormField
            label="Have you ever requested or received Worker's Compensation or Social Security Disability Income (SSDI) for reasons other than pregnancy?"
            type="radio"
            value={legalData.workersCompSSDI || ''}
            onChange={(value) => handleFieldChange('workersCompSSDI', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />

          <FormField
            label="Do you have any pending applications or inquiries for life insurance?"
            type="radio"
            value={legalData.pendingInsurance || ''}
            onChange={(value) => handleFieldChange('pendingInsurance', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />
        </div>
      </FormSection>
    </div>
  );
};

export default LegalCriminalSection;
