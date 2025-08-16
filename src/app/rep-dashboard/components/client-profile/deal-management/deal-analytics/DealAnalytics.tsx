'use client';

import React from 'react';
import { Lead } from '../../../../types';

interface DealAnalyticsProps {
  selectedLead: Lead | null;
  searchTerm: string;
}

const DealAnalytics: React.FC<DealAnalyticsProps> = ({ selectedLead, searchTerm }) => {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Deal Analytics</h3>
        <p className="text-gray-600 mb-4">Performance metrics, insights, and commission tracking</p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-purple-700">
            This section will show deal performance metrics, commission analytics, 
            and insights for optimization. Mobile app integration ready.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DealAnalytics;
