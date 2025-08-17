'use client';

import React from 'react';
import { Lead } from '../../../../../types';
import FormField from '../components/FormField';
import FormSection from '../components/FormSection';

interface FinancialTransactionSectionProps {
  formData: any;
  updateFormData: (section: string, field: string, value: any) => void;
  selectedLead: Lead | null;
}

const FinancialTransactionSection: React.FC<FinancialTransactionSectionProps> = ({ 
  formData, 
  updateFormData, 
  selectedLead 
}) => {
  const financialData = formData.financialTransaction || {};

  const handleFieldChange = (field: string, value: any) => {
    updateFormData('financialTransaction', field, value);
  };

  return (
    <div className="space-y-8">
      <FormSection
        title="Section 5: Financial & Transaction Information"
        description="This section covers the applicant's financial history and the details of the current transaction request."
        icon="💰"
      >
        <div className="space-y-6">
          <FormField
            label="What is the reason for this transaction? Why is it important to you and your family?"
            type="textarea"
            value={financialData.reasonForTransaction || ''}
            onChange={(value) => handleFieldChange('reasonForTransaction', value)}
            required
            placeholder="Explain why you need this transaction and its importance"
            rows={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="What is the amount of money you need to raise?"
              type="number"
              value={financialData.amountNeeded || ''}
              onChange={(value) => handleFieldChange('amountNeeded', value)}
              required
              placeholder="Enter dollar amount"
            />

            <FormField
              label="Which annuity payments do you wish to transfer?"
              type="textarea"
              value={financialData.paymentsToTransfer || ''}
              onChange={(value) => handleFieldChange('paymentsToTransfer', value)}
              placeholder="Describe which payments you want to transfer"
              rows={3}
            />
          </div>

          <FormField
            label="If paying off debts, please list each creditor, the balance owed, and the interest rate"
            type="textarea"
            value={financialData.creditorList || ''}
            onChange={(value) => handleFieldChange('creditorList', value)}
            placeholder="List creditors, balances, and interest rates"
            rows={4}
          />

          {/* Financial History Questions */}
          <div className="grid grid-cols-1 gap-6">
            <FormField
              label="Have you previously tried to sell or use your structured settlement as collateral for a loan?"
              type="radio"
              value={financialData.previousSaleAttempt || ''}
              onChange={(value) => handleFieldChange('previousSaleAttempt', value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]}
            />

            <FormField
              label="Have your structured settlement payments ever been garnished?"
              type="radio"
              value={financialData.paymentsGarnished || ''}
              onChange={(value) => handleFieldChange('paymentsGarnished', value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]}
            />

            <FormField
              label="Are you currently involved in any litigation?"
              type="radio"
              value={financialData.currentLitigation || ''}
              onChange={(value) => handleFieldChange('currentLitigation', value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]}
            />

            <FormField
              label="Do you have any unpaid taxes? If yes, how much?"
              type="text"
              value={financialData.unpaidTaxes || ''}
              onChange={(value) => handleFieldChange('unpaidTaxes', value)}
              placeholder="Enter amount owed or 'No'"
            />

            <FormField
              label="Are there any liens or judgments against you?"
              type="radio"
              value={financialData.liensJudgments || ''}
              onChange={(value) => handleFieldChange('liensJudgments', value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]}
            />

            <FormField
              label="Have you ever filed for bankruptcy? If yes, has it been discharged?"
              type="text"
              value={financialData.bankruptcy || ''}
              onChange={(value) => handleFieldChange('bankruptcy', value)}
              placeholder="Enter details or 'No'"
            />

            <FormField
              label="In the last 12 months, have you attempted to sell your structured settlement and been denied?"
              type="radio"
              value={financialData.recentDenial || ''}
              onChange={(value) => handleFieldChange('recentDenial', value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]}
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default FinancialTransactionSection;
