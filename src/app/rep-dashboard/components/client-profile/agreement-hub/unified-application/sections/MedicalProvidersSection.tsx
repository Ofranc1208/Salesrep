'use client';

import React from 'react';
import { Lead } from '../../../../../types';
import FormField from '../components/FormField';
import FormSection from '../components/FormSection';

interface MedicalProvidersSectionProps {
  formData: any;
  updateFormData: (section: string, field: string, value: any) => void;
  selectedLead: Lead | null;
}

const MedicalProvidersSection: React.FC<MedicalProvidersSectionProps> = ({ 
  formData, 
  updateFormData, 
  selectedLead 
}) => {
  const providersData = formData.medicalProviders || {};

  const handleFieldChange = (field: string, value: any) => {
    updateFormData('medicalProviders', field, value);
  };

  return (
    <div className="space-y-8">
      <FormSection
        title="Section 7: Medical Providers"
        description="This section collects information about the applicant's healthcare providers."
        icon="👨‍⚕️"
      >
        <div className="space-y-8">
          {/* Primary Care Provider */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Primary Care Provider</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Primary Care Provider Name"
                type="text"
                value={providersData.primaryProviderName || ''}
                onChange={(value) => handleFieldChange('primaryProviderName', value)}
                placeholder="Enter provider name"
              />

              <FormField
                label="Primary Care Provider Phone"
                type="tel"
                value={providersData.primaryProviderPhone || ''}
                onChange={(value) => handleFieldChange('primaryProviderPhone', value)}
                placeholder="(XXX) XXX-XXXX"
              />

              <div className="md:col-span-2">
                <FormField
                  label="Primary Care Provider Full Address"
                  type="textarea"
                  value={providersData.primaryProviderAddress || ''}
                  onChange={(value) => handleFieldChange('primaryProviderAddress', value)}
                  placeholder="Enter complete address"
                  rows={2}
                />
              </div>

              <FormField
                label="Date of last visit to Primary Care Provider"
                type="date"
                value={providersData.primaryLastVisitDate || ''}
                onChange={(value) => handleFieldChange('primaryLastVisitDate', value)}
              />

              <FormField
                label="Reason for last visit"
                type="text"
                value={providersData.primaryLastVisitReason || ''}
                onChange={(value) => handleFieldChange('primaryLastVisitReason', value)}
                placeholder="Reason for visit"
              />
            </div>
          </div>

          {/* Additional Providers */}
          {[1, 2, 3].map((providerNum) => (
            <div key={providerNum}>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Additional Provider #{providerNum}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label={`Provider #${providerNum} Name`}
                  type="text"
                  value={providersData[`provider${providerNum}Name`] || ''}
                  onChange={(value) => handleFieldChange(`provider${providerNum}Name`, value)}
                  placeholder="Enter provider name"
                />

                <FormField
                  label={`Provider #${providerNum} Phone`}
                  type="tel"
                  value={providersData[`provider${providerNum}Phone`] || ''}
                  onChange={(value) => handleFieldChange(`provider${providerNum}Phone`, value)}
                  placeholder="(XXX) XXX-XXXX"
                />

                <div className="md:col-span-2">
                  <FormField
                    label={`Provider #${providerNum} Full Address`}
                    type="textarea"
                    value={providersData[`provider${providerNum}Address`] || ''}
                    onChange={(value) => handleFieldChange(`provider${providerNum}Address`, value)}
                    placeholder="Enter complete address"
                    rows={2}
                  />
                </div>

                <FormField
                  label="Date of last visit"
                  type="date"
                  value={providersData[`provider${providerNum}LastVisitDate`] || ''}
                  onChange={(value) => handleFieldChange(`provider${providerNum}LastVisitDate`, value)}
                />

                <FormField
                  label="Reason for last visit"
                  type="text"
                  value={providersData[`provider${providerNum}LastVisitReason`] || ''}
                  onChange={(value) => handleFieldChange(`provider${providerNum}LastVisitReason`, value)}
                  placeholder="Reason for visit"
                />
              </div>
            </div>
          ))}

          {/* Hospital Visits */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Hospital Visits</h4>
            <FormField
              label="Please list any hospitals you have visited in the last 5 years (include Name, Address, Date, and Condition)"
              type="textarea"
              value={providersData.hospitalVisits || ''}
              onChange={(value) => handleFieldChange('hospitalVisits', value)}
              placeholder="List hospital visits with details"
              rows={4}
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default MedicalProvidersSection;
