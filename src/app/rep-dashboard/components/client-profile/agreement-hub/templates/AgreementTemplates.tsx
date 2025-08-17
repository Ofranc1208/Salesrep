'use client';

import React from 'react';
import { Lead } from '../../../../types';

interface AgreementTemplatesProps {
  selectedLead: Lead | null;
  onProgressUpdate: (progress: number) => void;
}

const AgreementTemplates: React.FC<AgreementTemplatesProps> = ({ 
  selectedLead, 
  onProgressUpdate 
}) => {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Agreement Templates</h3>
        <p className="text-gray-500">Form templates and versions management will be implemented here.</p>
      </div>
    </div>
  );
};

export default AgreementTemplates;
