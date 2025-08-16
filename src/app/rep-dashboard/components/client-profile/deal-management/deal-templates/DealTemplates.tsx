'use client';

import React from 'react';
import { Lead } from '../../../../types';

interface DealTemplatesProps {
  selectedLead: Lead | null;
  searchTerm: string;
}

const DealTemplates: React.FC<DealTemplatesProps> = ({ selectedLead, searchTerm }) => {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Deal Templates</h3>
        <p className="text-gray-600 mb-4">Contract templates, forms, and document automation</p>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-orange-700">
            This section will provide contract templates, automated forms, 
            and integration with DocuSign for streamlined document processing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DealTemplates;
