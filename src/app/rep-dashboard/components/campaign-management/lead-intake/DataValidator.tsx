'use client';

import React from 'react';
import { Lead } from '../../../types';
import { ValidationResult } from './hooks';
import {
  ValidationSummary,
  ValidationStats,
  ValidationErrors,
  ValidationWarnings,
  DataQualitySummary,
  ValidationActions,
  ValidationTrigger
} from './validation';

interface DataValidatorProps {
  leads: Lead[];
  onValidationComplete: () => void;
  validationResults: ValidationResult | null;
}

export default function DataValidator({
  leads,
  onValidationComplete,
  validationResults
}: DataValidatorProps) {
  if (!validationResults) {
    return (
      <ValidationTrigger
        leadCount={leads.length}
        onValidationComplete={onValidationComplete}
      />
    );
  }

  const { isValid, errors, warnings, validLeads } = validationResults;

  return (
    <div className="space-y-6">
      <ValidationSummary validationResults={validationResults} />
      
      <ValidationStats validationResults={validationResults} />

      <ValidationErrors errors={errors} />

      <ValidationWarnings warnings={warnings} />

      <DataQualitySummary validLeads={validLeads} />

      <ValidationActions 
        isValid={isValid} 
        onValidationComplete={onValidationComplete} 
      />
    </div>
  );
}