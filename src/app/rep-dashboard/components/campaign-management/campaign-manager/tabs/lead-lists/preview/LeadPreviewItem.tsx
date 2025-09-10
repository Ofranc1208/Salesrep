'use client';

// MOVED FROM: ../../../active-leads/preview/LeadPreviewItem.tsx
// NEW LOCATION: tabs/lead-lists/preview/LeadPreviewItem.tsx

import React from 'react';
import { Lead } from '../../../../../../types';

interface LeadPreviewItemProps {
  lead: Lead;
  isSelected: boolean;
  isLast: boolean;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  onLeadSelect: (lead: Lead) => void;
}

export default function LeadPreviewItem({
  lead,
  isSelected,
  isLast,
  activeLeadList,
  onLeadSelect
}: LeadPreviewItemProps) {
  const getLeadStatusColor = () => {
    switch (activeLeadList) {
      case 'prospect': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'hot': return 'bg-red-100 text-red-700 border-red-200';
      case 'warm': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityConfig = () => {
    switch (activeLeadList) {
      case 'hot': return { width: '90%', color: 'bg-red-500', label: 'High Priority' };
      case 'warm': return { width: '60%', color: 'bg-orange-500', label: 'Medium Priority' };
      case 'active': return { width: '80%', color: 'bg-green-500', label: 'In Process' };
      default: return { width: '30%', color: 'bg-blue-500', label: 'New Lead' };
    }
  };

  const priorityConfig = getPriorityConfig();

  return (
    <div
      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-blue-50 border-blue-200' : ''
      } ${isLast ? 'border-b-0' : ''}`}
      onClick={() => onLeadSelect(lead)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h6 className="text-sm font-medium text-gray-900 truncate">
              {lead.clientName}
            </h6>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getLeadStatusColor()}`}>
              {activeLeadList}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span>📞 {lead.phoneNumbers?.[0]?.number || 'No phone'}</span>
            <span>💰 ${lead.settlementAmount?.toLocaleString() || '0'}</span>
          </div>
        </div>
        
        {isSelected && (
          <div className="flex-shrink-0 ml-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        )}
      </div>
      
      {/* Lead Priority Indicator */}
      <div className="mt-2 flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-1">
          <div
            className={`h-1 rounded-full ${priorityConfig.color}`}
            style={{ width: priorityConfig.width }}
          />
        </div>
        <span className="text-xs text-gray-400">
          {priorityConfig.label}
        </span>
      </div>
    </div>
  );
}
