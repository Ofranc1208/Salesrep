'use client';

import React from 'react';

interface LeadActionsProps {
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function LeadActions({ activeLeadList }: LeadActionsProps) {
  const getActionButtonColor = () => {
    switch (activeLeadList) {
      case 'prospect': return 'bg-blue-600 hover:bg-blue-700';
      case 'hot': return 'bg-red-600 hover:bg-red-700';
      case 'warm': return 'bg-orange-600 hover:bg-orange-700';
      case 'active': return 'bg-green-600 hover:bg-green-700';
      default: return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  return (
    <div className="flex space-x-2">
      <button className={`flex-1 px-3 py-2 text-white rounded-lg transition-colors text-xs font-medium ${getActionButtonColor()}`}>
        Load All Leads
      </button>
      <button className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs font-medium">
        Export List
      </button>
    </div>
  );
}
