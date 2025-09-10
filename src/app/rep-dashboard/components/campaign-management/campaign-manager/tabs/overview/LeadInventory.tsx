'use client';

// EXTRACTED FROM: ../OverviewTab.tsx lines 342-391
// Lead Inventory - 4 clickable cards showing Prospect/Hot/Warm/Active lead counts

import React from 'react';
import { LeadInventoryProps, LeadListData } from './types';

export default function LeadInventory({
  activeLeadList,
  onLeadListChange
}: LeadInventoryProps) {
  
  // EXTRACTED FROM: OverviewTab.tsx lines 67-87
  const leadListData: LeadListData = {
    prospect: {
      name: 'Prospect List',
      color: 'blue',
      icon: '📋'
    },
    hot: {
      name: 'Hot List', 
      color: 'red',
      icon: '🔥'
    },
    warm: {
      name: 'Warm List',
      color: 'orange',
      icon: '🌡️'
    },
    active: {
      name: 'Active List',
      color: 'green',
      icon: '✅'
    }
  };

  // EXTRACTED FROM: OverviewTab.tsx lines 89-98
  const getLeadCount = (listType: 'prospect' | 'hot' | 'warm' | 'active') => {
    const mockCounts = {
      prospect: 3,
      hot: 2, 
      warm: 1,
      active: 2
    };
    return mockCounts[listType];
  };

  // EXTRACTED FROM: OverviewTab.tsx lines 100-103
  const handleOverviewCardClick = (listType: 'prospect' | 'hot' | 'warm' | 'active') => {
    onLeadListChange(listType);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-3 py-2 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-900">Your Lead Inventory</h4>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-4 gap-3">
          {Object.entries(leadListData).map(([key, data]) => {
            const listType = key as 'prospect' | 'hot' | 'warm' | 'active';
            const isActive = activeLeadList === listType;
            const count = getLeadCount(listType);
            
            return (
              <button
                key={key}
                onClick={() => handleOverviewCardClick(listType)}
                className={`rounded-lg p-3 text-center border-2 transition-all duration-200 hover:scale-105 ${
                  data.color === 'blue' 
                    ? `bg-blue-50 border-blue-200 hover:bg-blue-100 ${isActive ? 'ring-2 ring-blue-400 border-blue-400' : ''}` 
                    : data.color === 'red' 
                    ? `bg-red-50 border-red-200 hover:bg-red-100 ${isActive ? 'ring-2 ring-red-400 border-red-400' : ''}` 
                    : data.color === 'orange' 
                    ? `bg-orange-50 border-orange-200 hover:bg-orange-100 ${isActive ? 'ring-2 ring-orange-400 border-orange-400' : ''}` 
                    : `bg-green-50 border-green-200 hover:bg-green-100 ${isActive ? 'ring-2 ring-green-400 border-green-400' : ''}`
                }`}
              >
                <div className={`text-2xl font-bold mb-1 ${
                  data.color === 'blue' ? 'text-blue-600' :
                  data.color === 'red' ? 'text-red-600' :
                  data.color === 'orange' ? 'text-orange-600' :
                  'text-green-600'
                }`}>
                  {count}
                </div>
                <div className={`text-xs font-medium ${
                  data.color === 'blue' ? 'text-blue-700' :
                  data.color === 'red' ? 'text-red-700' :
                  data.color === 'orange' ? 'text-orange-700' :
                  'text-green-700'
                }`}>
                  {listType.charAt(0).toUpperCase() + listType.slice(1)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
