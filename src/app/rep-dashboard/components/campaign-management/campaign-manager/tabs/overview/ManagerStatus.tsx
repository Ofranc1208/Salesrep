'use client';

// EXTRACTED FROM: ../OverviewTab.tsx lines 110-130
// Manager Status - Simple manager name + online status + view details button

import React from 'react';
import { ManagerStatusProps } from './types';

export default function ManagerStatus({
  selectedCampaign,
  onShowDetails,
  showDetails
}: ManagerStatusProps) {
  if (!selectedCampaign) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium text-gray-900">{selectedCampaign.managerName}</span>
          <span className="text-xs text-green-600 font-medium">Online</span>
        </div>
        <button 
          onClick={onShowDetails}
          className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>
    </div>
  );
}
