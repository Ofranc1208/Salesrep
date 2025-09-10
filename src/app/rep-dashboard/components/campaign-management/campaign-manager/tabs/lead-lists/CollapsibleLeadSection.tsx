'use client';

// MOVED FROM: ../../active-leads/CollapsibleLeadSection.tsx
// NEW LOCATION: tabs/lead-lists/CollapsibleLeadSection.tsx

import React, { useState } from 'react';
import { Lead } from '../../../../../types';
import { LeadListData } from './types';
import { LeadPreviewItem } from './preview';

interface CollapsibleLeadSectionProps {
  listType: 'prospect' | 'hot' | 'warm' | 'active';
  data: LeadListData;
  leads: Lead[];
  selectedLead: Lead | null;
  onLeadSelect: (lead: Lead) => void;
  isActive: boolean;
  onClick: () => void;
}

export default function CollapsibleLeadSection({
  listType,
  data,
  leads,
  selectedLead,
  onLeadSelect,
  isActive,
  onClick
}: CollapsibleLeadSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getColorClasses = (color: string, isActive: boolean) => {
    const colorMap = {
      blue: isActive 
        ? 'bg-blue-50 border-blue-200 text-blue-800' 
        : 'bg-white border-gray-200 text-gray-700 hover:bg-blue-50',
      red: isActive 
        ? 'bg-red-50 border-red-200 text-red-800' 
        : 'bg-white border-gray-200 text-gray-700 hover:bg-red-50',
      orange: isActive 
        ? 'bg-orange-50 border-orange-200 text-orange-800' 
        : 'bg-white border-gray-200 text-gray-700 hover:bg-orange-50',
      green: isActive 
        ? 'bg-green-50 border-green-200 text-green-800' 
        : 'bg-white border-gray-200 text-gray-700 hover:bg-green-50'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const handleToggle = () => {
    onClick(); // Select this list as active
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Collapsible Header Button */}
      <button
        onClick={handleToggle}
        className={`w-full px-4 py-3 text-left transition-colors duration-200 ${getColorClasses(data.color, isActive)}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-lg">{data.icon}</span>
            <div>
              <div className="font-medium text-sm">{data.name}</div>
              <div className="text-xs opacity-75">{data.status}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-white bg-opacity-50 px-2 py-1 rounded-full text-xs font-medium">
              {data.count}
            </span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-white">
          {leads.length > 0 ? (
            <div>
              {leads.slice(0, 3).map((lead, index) => (
                <LeadPreviewItem
                  key={lead.id}
                  lead={lead}
                  isSelected={selectedLead?.id === lead.id}
                  isLast={index === Math.min(leads.length - 1, 2)}
                  activeLeadList={listType}
                  onLeadSelect={onLeadSelect}
                />
              ))}
              {leads.length > 3 && (
                <div className="px-4 py-2 text-center text-sm text-gray-500 border-t border-gray-100">
                  +{leads.length - 3} more leads
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">
              <div className="text-2xl mb-2">📭</div>
              <div className="text-sm">No leads in {data.name.toLowerCase()}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
