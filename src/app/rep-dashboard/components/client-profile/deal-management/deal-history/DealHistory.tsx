'use client';

import React from 'react';
import { Lead } from '../../../../types';

interface DealHistoryProps {
  selectedLead: Lead | null;
  searchTerm: string;
}

const DealHistory: React.FC<DealHistoryProps> = ({ selectedLead, searchTerm }) => {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Deal History</h3>
        <p className="text-gray-600 mb-4">Track completed deals and historical performance</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-blue-700">
            This section will show completed deals, timelines, and historical analytics.
            Integration with manager dashboard pending.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DealHistory;
