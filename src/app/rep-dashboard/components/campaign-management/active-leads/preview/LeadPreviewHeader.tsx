'use client';

import React from 'react';

interface LeadListData {
  name: string;
  count: number;
  status: string;
  color: string;
  icon: string;
  description?: string;
}

interface LeadPreviewHeaderProps {
  currentList: LeadListData;
  leadCount: number;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function LeadPreviewHeader({
  currentList,
  leadCount,
  activeLeadList
}: LeadPreviewHeaderProps) {
  const getHeaderColor = () => {
    switch (activeLeadList) {
      case 'prospect': return 'bg-blue-600';
      case 'hot': return 'bg-red-600';
      case 'warm': return 'bg-orange-600';
      case 'active': return 'bg-green-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className={`${getHeaderColor()} text-white p-2 rounded-t-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span>{currentList.icon}</span>
          <h5 className="text-sm font-semibold">
            {currentList.name} Preview
          </h5>
        </div>
        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
          {leadCount} leads
        </span>
      </div>
    </div>
  );
}
