'use client';

import React from 'react';
import { Lead } from '../../../../../types';
import FormField from '../components/FormField';
import FormSection from '../components/FormSection';

interface PersonalDetailsSectionProps {
  formData: any;
  updateFormData: (section: string, field: string, value: any) => void;
  selectedLead: Lead | null;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({ 
  formData, 
  updateFormData, 
  selectedLead 
}) => {
  const personalData = formData.personalDetails || {};

  const handleFieldChange = (field: string, value: any) => {
    updateFormData('personalDetails', field, value);
  };

  return (
    <div className="space-y-4">
      <FormSection
        title="Section 1: Applicant Personal Details"
        description="This section captures the primary identifying and contact information for the individual applying."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Full Legal Name"
            type="text"
            value={personalData.fullName || selectedLead?.clientName || ''}
            onChange={(value) => handleFieldChange('fullName', value)}
            required
            placeholder="Enter full legal name"
          />

          <FormField
            label="Date of Birth"
            type="date"
            value={personalData.dateOfBirth || ''}
            onChange={(value) => handleFieldChange('dateOfBirth', value)}
            required
            placeholder="MM/DD/YYYY"
          />

          <FormField
            label="Social Security Number"
            type="text"
            value={personalData.ssn || ''}
            onChange={(value) => handleFieldChange('ssn', value)}
            required
            placeholder="XXX-XX-XXXX"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
          />

          <FormField
            label="Gender"
            type="select"
            value={personalData.gender || ''}
            onChange={(value) => handleFieldChange('gender', value)}
            required
            options={[
              { value: '', label: 'Select Gender' },
              { value: 'M', label: 'Male' },
              { value: 'F', label: 'Female' }
            ]}
          />

          <FormField
            label="Height (ft/in)"
            type="text"
            value={personalData.height || ''}
            onChange={(value) => handleFieldChange('height', value)}
            placeholder="e.g., 5'10&quot;"
          />

          <FormField
            label="Weight (lbs)"
            type="number"
            value={personalData.weight || ''}
            onChange={(value) => handleFieldChange('weight', value)}
            placeholder="Enter weight in pounds"
          />

          <FormField
            label="Driver's License (State and Number)"
            type="text"
            value={personalData.driversLicense || ''}
            onChange={(value) => handleFieldChange('driversLicense', value)}
            placeholder="e.g., CA D1234567"
          />

          <FormField
            label="Primary Telephone Number"
            type="tel"
            value={personalData.primaryPhone || selectedLead?.phoneNumbers?.[0]?.number || ''}
            onChange={(value) => handleFieldChange('primaryPhone', value)}
            required
            placeholder="(XXX) XXX-XXXX"
          />

          <FormField
            label="Cell Phone Number"
            type="tel"
            value={personalData.cellPhone || ''}
            onChange={(value) => handleFieldChange('cellPhone', value)}
            placeholder="(XXX) XXX-XXXX"
          />

          <FormField
            label="Email Address"
            type="email"
            value={personalData.email || ''}
            onChange={(value) => handleFieldChange('email', value)}
            required
            placeholder="email@example.com"
          />
        </div>

        {/* Address Section */}
        <div className="mt-6">
          <h4 className="text-base font-medium text-gray-900 mb-3">Current Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <FormField
                label="Current Street Address"
                type="text"
                value={personalData.streetAddress || ''}
                onChange={(value) => handleFieldChange('streetAddress', value)}
                required
                placeholder="Enter street address"
              />
            </div>

            <FormField
              label="City"
              type="text"
              value={personalData.city || ''}
              onChange={(value) => handleFieldChange('city', value)}
              required
              placeholder="Enter city"
            />

            <FormField
              label="State"
              type="text"
              value={personalData.state || ''}
              onChange={(value) => handleFieldChange('state', value)}
              required
              placeholder="Enter state"
            />

            <FormField
              label="Zip Code"
              type="text"
              value={personalData.zipCode || ''}
              onChange={(value) => handleFieldChange('zipCode', value)}
              required
              placeholder="Enter zip code"
            />

            <FormField
              label="County"
              type="text"
              value={personalData.county || ''}
              onChange={(value) => handleFieldChange('county', value)}
              placeholder="Enter county"
            />

            <FormField
              label="How long have you lived at your current address?"
              type="text"
              value={personalData.timeAtAddress || ''}
              onChange={(value) => handleFieldChange('timeAtAddress', value)}
              placeholder="e.g., 2 years, 6 months"
            />

            <FormField
              label="Do you Rent or Own?"
              type="select"
              value={personalData.rentOrOwn || ''}
              onChange={(value) => handleFieldChange('rentOrOwn', value)}
              options={[
                { value: '', label: 'Select Option' },
                { value: 'rent', label: 'Rent' },
                { value: 'own', label: 'Own' }
              ]}
            />
          </div>

          {/* Conditional Prior Address */}
          <div className="mt-6">
            <FormField
              label="If you have been at your current address for less than 5 years, please list your prior addresses and the dates you lived there."
              type="textarea"
              value={personalData.priorAddresses || ''}
              onChange={(value) => handleFieldChange('priorAddresses', value)}
              placeholder="List prior addresses with dates if applicable"
              rows={3}
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default PersonalDetailsSection;
