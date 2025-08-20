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

interface LeadPreviewEmptyProps {
  currentList: LeadListData;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function LeadPreviewEmpty({
  currentList,
  activeLeadList
}: LeadPreviewEmptyProps) {
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
    <div className="border-t border-gray-200 pt-3">
      <div className={`${getHeaderColor()} text-white p-2 rounded-t-lg`}>
        <div className="flex items-center space-x-2">
          <span>{currentList.icon}</span>
          <h5 className="text-sm font-semibold">
            {currentList.name} Preview
          </h5>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-b-lg border border-t-0">
        <div className="text-center">
          <div className="text-gray-400 text-2xl mb-2">{currentList.icon}</div>
          <p className="text-sm text-gray-600">No leads in this list yet</p>
          <button className={`mt-2 px-3 py-1 ${getHeaderColor()} text-white rounded text-xs hover:opacity-90 transition-opacity`}>
            Add Leads
          </button>
        </div>
      </div>
    </div>
  );
}
