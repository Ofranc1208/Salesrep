'use client';

import React from 'react';
import { ValidationResult } from '../hooks';

interface ValidationSummaryProps {
  validationResults: ValidationResult;
}

export default function ValidationSummary({ validationResults }: ValidationSummaryProps) {
  const { isValid, validLeads, invalidLeads } = validationResults;

  return (
    <div className={`rounded-lg p-4 ${isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
      <div className="flex items-center">
        <div className={`text-2xl mr-3 ${isValid ? 'text-green-600' : 'text-red-600'}`}>
          {isValid ? '✅' : '❌'}
        </div>
        <div>
          <h3 className={`font-semibold ${isValid ? 'text-green-900' : 'text-red-900'}`}>
            {isValid ? 'Validation Passed' : 'Validation Issues Found'}
          </h3>
          <p className={`text-sm ${isValid ? 'text-green-700' : 'text-red-700'}`}>
            {validLeads.length} valid leads, {invalidLeads.length} leads with issues
          </p>
        </div>
      </div>
    </div>
  );
}
