'use client';

import React from 'react';

interface CampaignProgressBarProps {
  progressPercentage: number;
}

export default function CampaignProgressBar({ progressPercentage }: CampaignProgressBarProps) {
  const getProgressBarColor = () => {
    if (progressPercentage >= 80) return 'bg-green-500';
    if (progressPercentage >= 60) return 'bg-blue-500';
    if (progressPercentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Overall Progress</span>
        <span>{progressPercentage}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor()}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
