'use client';

import React from 'react';
import { Lead } from '../../../../types';

interface AgreementHeaderProps {
  selectedLead: Lead | null;
  onClose: () => void;
  formProgress: number;
}

const AgreementHeader: React.FC<AgreementHeaderProps> = ({ 
  selectedLead, 
  onClose, 
  formProgress 
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Agreement Hub</h2>
          <p className="text-xs text-gray-500">
            {selectedLead?.clientName} • CRM: {selectedLead?.crmId}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Progress Indicator */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Progress:</span>
          <div className="w-24 bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
          <span className="text-xs font-medium text-gray-700">{formProgress}%</span>
        </div>

        {/* DocuSign Status */}
        <div className="flex items-center space-x-1 px-2 py-1 bg-blue-50 rounded-full">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <span className="text-xs font-medium text-blue-700">DocuSign Ready</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AgreementHeader;
