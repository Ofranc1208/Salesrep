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

interface LeadListHeaderProps {
  currentList: LeadListData;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function LeadListHeader({ currentList, activeLeadList }: LeadListHeaderProps) {
  const getStatusColor = () => {
    switch (activeLeadList) {
      case 'prospect': return 'bg-blue-100 text-blue-700';
      case 'hot': return 'bg-red-100 text-red-700';
      case 'warm': return 'bg-orange-100 text-orange-700';
      case 'active': return 'bg-green-100 text-green-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{currentList.icon}</span>
        <h4 className="text-sm font-semibold text-gray-900">
          {currentList.name} Details
        </h4>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
        {currentList.status}
      </span>
    </div>
  );
}
