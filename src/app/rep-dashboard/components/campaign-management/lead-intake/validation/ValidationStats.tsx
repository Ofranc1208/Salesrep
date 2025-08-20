'use client';

import React from 'react';
import { ValidationResult } from '../hooks';

interface ValidationStatsProps {
  validationResults: ValidationResult;
}

export default function ValidationStats({ validationResults }: ValidationStatsProps) {
  const { validLeads, errors, warnings } = validationResults;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <div className="text-2xl font-bold text-green-600">{validLeads.length}</div>
        <div className="text-sm text-green-700">Valid Leads</div>
      </div>
      
      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
        <div className="text-2xl font-bold text-red-600">{errors.length}</div>
        <div className="text-sm text-red-700">Critical Errors</div>
      </div>
      
      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div className="text-2xl font-bold text-yellow-600">{warnings.length}</div>
        <div className="text-sm text-yellow-700">Warnings</div>
      </div>
    </div>
  );
}
