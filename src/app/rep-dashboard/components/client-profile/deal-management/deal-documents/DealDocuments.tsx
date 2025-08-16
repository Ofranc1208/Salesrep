'use client';

import React from 'react';
import { Lead } from '../../../../types';

interface DealDocumentsProps {
  selectedLead: Lead | null;
  searchTerm: string;
}

const DealDocuments: React.FC<DealDocumentsProps> = ({ selectedLead, searchTerm }) => {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📁</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Deal Documents</h3>
        <p className="text-gray-600 mb-4">Document integration status and real-time sync</p>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-indigo-700">
            This section shows real-time document integration status with the Document Hub,
            tracking which documents are required for each deal stage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DealDocuments;
