'use client';

import React from 'react';
import { Lead } from '../../../../../types';
import FormField from '../components/FormField';
import FormSection from '../components/FormSection';

interface SettlementDetailsSectionProps {
  formData: any;
  updateFormData: (section: string, field: string, value: any) => void;
  selectedLead: Lead | null;
}

const SettlementDetailsSection: React.FC<SettlementDetailsSectionProps> = ({ 
  formData, 
  updateFormData, 
  selectedLead 
}) => {
  const settlementData = formData.settlementDetails || {};

  const handleFieldChange = (field: string, value: any) => {
    updateFormData('settlementDetails', field, value);
  };

  return (
    <div className="space-y-8">
      <FormSection
        title="Section 4: Settlement Details"
        description="This section focuses on the specifics of the structured settlement."
        icon="⚖️"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Reason for your Settlement"
            type="textarea"
            value={settlementData.reasonForSettlement || ''}
            onChange={(value) => handleFieldChange('reasonForSettlement', value)}
            required
            placeholder="Describe the reason for your settlement"
            rows={3}
          />

          <FormField
            label="Was the settlement related to a work incident?"
            type="radio"
            value={settlementData.workRelated || ''}
            onChange={(value) => handleFieldChange('workRelated', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />

          <FormField
            label="Nature of your Injury"
            type="textarea"
            value={settlementData.natureOfInjury || ''}
            onChange={(value) => handleFieldChange('natureOfInjury', value)}
            required
            placeholder="Describe the nature of your injury"
            rows={3}
          />

          <FormField
            label="Please provide full details of the accident or cause of injury"
            type="textarea"
            value={settlementData.accidentDetails || ''}
            onChange={(value) => handleFieldChange('accidentDetails', value)}
            placeholder="Provide detailed description of the accident"
            rows={4}
          />

          <FormField
            label="Are your injuries considered permanent?"
            type="radio"
            value={settlementData.permanentInjuries || ''}
            onChange={(value) => handleFieldChange('permanentInjuries', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />

          <FormField
            label="Did you suffer a serious head injury?"
            type="radio"
            value={settlementData.headInjury || ''}
            onChange={(value) => handleFieldChange('headInjury', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />

          <FormField
            label="In what year was the case settled?"
            type="number"
            value={settlementData.settlementYear || ''}
            onChange={(value) => handleFieldChange('settlementYear', value)}
            placeholder="Enter year (e.g., 2020)"
          />

          <FormField
            label="In which State was the case settled?"
            type="text"
            value={settlementData.settlementState || ''}
            onChange={(value) => handleFieldChange('settlementState', value)}
            placeholder="Enter state"
          />

          <FormField
            label="In which County was the case settled?"
            type="text"
            value={settlementData.settlementCounty || ''}
            onChange={(value) => handleFieldChange('settlementCounty', value)}
            placeholder="Enter county"
          />

          <FormField
            label="Was a legal action filed in court?"
            type="radio"
            value={settlementData.legalActionFiled || ''}
            onChange={(value) => handleFieldChange('legalActionFiled', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />

          <FormField
            label="Were you a minor at the time the case was settled?"
            type="radio"
            value={settlementData.minorAtSettlement || ''}
            onChange={(value) => handleFieldChange('minorAtSettlement', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />

          <FormField
            label="Please list the names of any other plaintiffs"
            type="textarea"
            value={settlementData.otherPlaintiffs || ''}
            onChange={(value) => handleFieldChange('otherPlaintiffs', value)}
            placeholder="List other plaintiffs if applicable"
            rows={2}
          />

          <FormField
            label="When did you first receive a payment from your structured settlement?"
            type="date"
            value={settlementData.firstPaymentDate || ''}
            onChange={(value) => handleFieldChange('firstPaymentDate', value)}
          />

          <FormField
            label="How much do you receive in settlement payments?"
            type="text"
            value={settlementData.paymentAmount || ''}
            onChange={(value) => handleFieldChange('paymentAmount', value)}
            placeholder="e.g., $1,000/month, $5,000/year"
          />

          <FormField
            label="Attorney Name and Contact Information for the case"
            type="textarea"
            value={settlementData.attorneyInfo || ''}
            onChange={(value) => handleFieldChange('attorneyInfo', value)}
            placeholder="Enter attorney name, phone, and address"
            rows={3}
          />

          <FormField
            label="Do you have a Will? If yes, who is the named beneficiary?"
            type="text"
            value={settlementData.willBeneficiary || ''}
            onChange={(value) => handleFieldChange('willBeneficiary', value)}
            placeholder="Enter beneficiary name or 'No'"
          />
        </div>
      </FormSection>
    </div>
  );
};

export default SettlementDetailsSection;
