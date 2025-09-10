'use client';

// MOVED FROM: ../../summary/SummaryHeader.tsx
// NEW LOCATION: tabs/analytics/SummaryHeader.tsx

import React from 'react';
import { SummaryHeaderProps } from './types';

export default function SummaryHeader({ activeLeadList }: SummaryHeaderProps) {
  const getListColor = () => {
    switch (activeLeadList) {
      case 'hot': return 'text-red-600';
      case 'warm': return 'text-orange-600';
      case 'active': return 'text-green-600';
      case 'prospect': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <h4 className="text-sm font-semibold text-gray-900">Campaign Summary</h4>
      <span className={`text-xs font-medium ${getListColor()}`}>
        Viewing: {activeLeadList.charAt(0).toUpperCase() + activeLeadList.slice(1)} List
      </span>
    </div>
  );
}
