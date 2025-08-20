'use client';

import React from 'react';

interface LeadProgressBarProps {
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function LeadProgressBar({ activeLeadList }: LeadProgressBarProps) {
  const getProgressWidth = () => {
    switch (activeLeadList) {
      case 'prospect': return '10%';
      case 'hot': return '60%';
      case 'warm': return '40%';
      case 'active': return '80%';
      default: return '10%';
    }
  };

  const getProgressColor = () => {
    switch (activeLeadList) {
      case 'prospect': return 'bg-blue-600';
      case 'hot': return 'bg-red-600';
      case 'warm': return 'bg-orange-600';
      case 'active': return 'bg-green-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Progress</span>
        <span>{getProgressWidth()}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
          style={{ width: getProgressWidth() }}
        />
      </div>
    </div>
  );
}
