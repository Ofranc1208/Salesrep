'use client';

import React from 'react';
import { Lead } from '../../../../../types';
import FormField from '../components/FormField';
import FormSection from '../components/FormSection';

interface MaritalStatusSectionProps {
  formData: any;
  updateFormData: (section: string, field: string, value: any) => void;
  selectedLead: Lead | null;
}

const MaritalStatusSection: React.FC<MaritalStatusSectionProps> = ({ 
  formData, 
  updateFormData, 
  selectedLead 
}) => {
  const maritalData = formData.maritalStatus || {};

  const handleFieldChange = (field: string, value: any) => {
    updateFormData('maritalStatus', field, value);
  };

  const maritalStatusOptions = [
    { value: '', label: 'Select Marital Status' },
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' }
  ];

  return (
    <div className="space-y-8">
      <FormSection
        title="Section 2: Marital Status & Dependents"
        description="This section gathers information about the applicant's marital history and responsibilities regarding any children."
        icon="💑"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Current Marital Status"
            type="select"
            value={maritalData.maritalStatus || ''}
            onChange={(value) => handleFieldChange('maritalStatus', value)}
            required
            options={maritalStatusOptions}
          />
        </div>

        {/* Spouse Information - Show if married or separated */}
        {(maritalData.maritalStatus === 'married' || maritalData.maritalStatus === 'separated') && (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Spouse Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Spouse's Full Name"
                type="text"
                value={maritalData.spouseName || ''}
                onChange={(value) => handleFieldChange('spouseName', value)}
                placeholder="Enter spouse's full name"
              />

              <FormField
                label="Spouse's Date of Birth"
                type="date"
                value={maritalData.spouseDOB || ''}
                onChange={(value) => handleFieldChange('spouseDOB', value)}
                placeholder="MM/DD/YYYY"
              />

              <FormField
                label="Spouse's Social Security Number"
                type="text"
                value={maritalData.spouseSSN || ''}
                onChange={(value) => handleFieldChange('spouseSSN', value)}
                placeholder="XXX-XX-XXXX"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
              />

              {maritalData.maritalStatus === 'separated' && (
                <FormField
                  label="Spouse's Address (if separated)"
                  type="text"
                  value={maritalData.spouseAddress || ''}
                  onChange={(value) => handleFieldChange('spouseAddress', value)}
                  placeholder="Enter spouse's current address"
                />
              )}
            </div>
          </div>
        )}

        {/* Ex-Spouse Information - Show if divorced */}
        {maritalData.maritalStatus === 'divorced' && (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Divorce Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Ex-Spouse's Full Name"
                type="text"
                value={maritalData.exSpouseName || ''}
                onChange={(value) => handleFieldChange('exSpouseName', value)}
                placeholder="Enter ex-spouse's full name"
              />

              <FormField
                label="Date of Divorce"
                type="date"
                value={maritalData.divorceDate || ''}
                onChange={(value) => handleFieldChange('divorceDate', value)}
                placeholder="MM/DD/YYYY"
              />

              <FormField
                label="State where divorce was filed"
                type="text"
                value={maritalData.divorceState || ''}
                onChange={(value) => handleFieldChange('divorceState', value)}
                placeholder="Enter state"
              />

              <FormField
                label="County where divorce was filed"
                type="text"
                value={maritalData.divorceCounty || ''}
                onChange={(value) => handleFieldChange('divorceCounty', value)}
                placeholder="Enter county"
              />
            </div>
          </div>
        )}

        {/* Children Information */}
        <div className="mt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Children & Dependents</h4>
          <div className="space-y-6">
            <FormField
              label="Please list any children residing with you (include their names and dates of birth)"
              type="textarea"
              value={maritalData.childrenResiding || ''}
              onChange={(value) => handleFieldChange('childrenResiding', value)}
              placeholder="List children's names and dates of birth"
              rows={3}
            />

            <FormField
              label="Do you pay child support for children not residing with you?"
              type="radio"
              value={maritalData.paysChildSupport || ''}
              onChange={(value) => handleFieldChange('paysChildSupport', value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]}
            />

            {maritalData.paysChildSupport === 'yes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-6">
                <FormField
                  label="To whom is the child support paid?"
                  type="text"
                  value={maritalData.childSupportRecipient || ''}
                  onChange={(value) => handleFieldChange('childSupportRecipient', value)}
                  placeholder="Enter recipient name"
                />

                <FormField
                  label="Is the child support court-ordered?"
                  type="radio"
                  value={maritalData.childSupportCourtOrdered || ''}
                  onChange={(value) => handleFieldChange('childSupportCourtOrdered', value)}
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' }
                  ]}
                />

                <FormField
                  label="What is the weekly child support amount?"
                  type="number"
                  value={maritalData.childSupportAmount || ''}
                  onChange={(value) => handleFieldChange('childSupportAmount', value)}
                  placeholder="Enter weekly amount"
                />

                <FormField
                  label="Are you in arrears on your child support? If yes, by how much?"
                  type="text"
                  value={maritalData.childSupportArrears || ''}
                  onChange={(value) => handleFieldChange('childSupportArrears', value)}
                  placeholder="Enter amount if in arrears, or 'No'"
                />
              </div>
            )}
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default MaritalStatusSection;
