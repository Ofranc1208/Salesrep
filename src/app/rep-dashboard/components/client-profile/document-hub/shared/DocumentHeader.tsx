'use client';

import React from 'react';
import { Lead } from '../../../../types';

interface DocumentHeaderProps {
  selectedLead: Lead | null;
  onClose: () => void;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ selectedLead, onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
          <span className="text-3xl">📁</span>
          <span>Document Hub</span>
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Client: <span className="font-medium">{selectedLead?.clientName || 'No client selected'}</span> • 
          CRM: <span className="font-medium">{selectedLead?.crmId || 'N/A'}</span> • 
          Status: <span className="font-medium capitalize">{selectedLead?.status || 'Unknown'}</span>
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default DocumentHeader;
