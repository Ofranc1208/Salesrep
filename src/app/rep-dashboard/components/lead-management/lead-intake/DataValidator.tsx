'use client';

import React from 'react';
import { Lead } from '../../../types';
import { ValidationResult } from './hooks';

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
      <div className="text-center py-8">
        <button
          onClick={onValidationComplete}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Validate Data
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Click to validate {leads.length} processed leads
        </p>
      </div>
    );
  }

  const { isValid, errors, warnings, validLeads, invalidLeads } = validationResults;

  return (
    <div className="space-y-6">
      {/* Validation Summary */}
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

      {/* Statistics */}
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

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <h4 className="font-semibold text-red-900 mb-3">❌ Critical Errors</h4>
          <div className="space-y-2">
            {errors.map((error, index) => (
              <div key={index} className="text-sm text-red-700 bg-red-100 rounded px-3 py-2">
                {error}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h4 className="font-semibold text-yellow-900 mb-3">⚠️ Warnings</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {warnings.slice(0, 10).map((warning, index) => (
              <div key={index} className="text-sm text-yellow-700 bg-yellow-100 rounded px-3 py-2">
                {warning}
              </div>
            ))}
            {warnings.length > 10 && (
              <div className="text-sm text-yellow-600 italic">
                ... and {warnings.length - 10} more warnings
              </div>
            )}
          </div>
        </div>
      )}

      {/* Data Quality Summary */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3">📊 Data Quality Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium text-blue-900">Complete Profiles</div>
            <div className="text-blue-700">
              {validLeads.filter(lead => 
                lead.clientInfo?.ssn !== 'Not Available' && 
                lead.clientInfo?.dateOfBirth !== 'Not Available' &&
                lead.phoneNumbers.some(p => p.number !== 'Not Available')
              ).length} / {validLeads.length}
            </div>
          </div>
          
          <div>
            <div className="font-medium text-blue-900">Valid Phone Numbers</div>
            <div className="text-blue-700">
              {validLeads.filter(lead => 
                lead.phoneNumbers.some(p => p.number !== 'Not Available')
              ).length} / {validLeads.length}
            </div>
          </div>
          
          <div>
            <div className="font-medium text-blue-900">Payment Info</div>
            <div className="text-blue-700">
              {validLeads.filter(lead => 
                lead.structuredSettlement.monthlyPayment !== 'Not Available'
              ).length} / {validLeads.length}
            </div>
          </div>
          
          <div>
            <div className="font-medium text-blue-900">High Priority</div>
            <div className="text-blue-700">
              {validLeads.filter(lead => lead.priority === 'High').length} leads
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Start Over
        </button>
        
        {isValid && (
          <button
            onClick={onValidationComplete}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Continue to Preview
          </button>
        )}
      </div>
    </div>
  );
}
