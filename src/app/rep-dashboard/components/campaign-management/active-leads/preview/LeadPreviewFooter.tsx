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

interface LeadPreviewFooterProps {
  currentList: LeadListData;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function LeadPreviewFooter({
  currentList,
  activeLeadList
}: LeadPreviewFooterProps) {
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
    <div className="p-2 bg-gray-50 rounded-b-lg border border-t-0">
      <button className={`w-full py-2 ${getHeaderColor()} text-white rounded text-xs font-medium hover:opacity-90 transition-opacity`}>
        View All {currentList.name} ({currentList.count} total)
      </button>
    </div>
  );
}
