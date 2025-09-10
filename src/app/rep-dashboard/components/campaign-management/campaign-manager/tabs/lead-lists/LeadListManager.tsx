'use client';

// MOVED FROM: ../../active-leads/LeadListManager.tsx
// NEW LOCATION: tabs/lead-lists/LeadListManager.tsx - Self-contained lead list management

import React from 'react';
import { Lead } from '../../../../../types';
import { LeadListManagerProps } from './types';
import CollapsibleLeadSection from './CollapsibleLeadSection';

export default function LeadListManager({
  campaignLeads,
  onLeadSelect,
  selectedLead,
  activeLeadList,
  onLeadListChange
}: LeadListManagerProps) {
  // Lead list configuration - centralized data
  const leadListData = {
    prospect: {
      name: 'Prospect List',
      count: 3,
      status: 'New leads from manager',
      color: 'blue' as const,
      icon: '📋',
      description: 'Fresh leads ready for initial contact'
    },
    hot: {
      name: 'Hot List', 
      count: 2,
      status: 'Actively working',
      color: 'red' as const,
      icon: '🔥',
      description: 'High-priority leads requiring immediate attention'
    },
    warm: {
      name: 'Warm List',
      count: 1,
      status: 'Following up',
      color: 'orange' as const,
      icon: '🌡️',
      description: 'Engaged leads in nurturing phase'
    },
    active: {
      name: 'Active List',
      count: 2,
      status: 'In progress/court',
      color: 'green' as const,
      icon: '✅',
      description: 'Leads in active processing or legal review'
    }
  };

  const handleLeadListSelect = (listType: 'prospect' | 'hot' | 'warm' | 'active') => {
    onLeadListChange(listType);
    console.log(`Switched to ${listType} list`);
  };

  // Filter leads based on list type (mock filtering for now)
  const getFilteredLeads = (listType: 'prospect' | 'hot' | 'warm' | 'active') => {
    const leadCount = leadListData[listType].count;
    return campaignLeads.slice(0, leadCount);
  };

  return (
    <div className="space-y-3">
      {/* Collapsible Lead Sections */}
      {Object.entries(leadListData).map(([key, data]) => (
        <CollapsibleLeadSection
          key={key}
          listType={key as 'prospect' | 'hot' | 'warm' | 'active'}
          data={data}
          leads={getFilteredLeads(key as 'prospect' | 'hot' | 'warm' | 'active')}
          selectedLead={selectedLead}
          onLeadSelect={onLeadSelect}
          isActive={activeLeadList === key}
          onClick={() => handleLeadListSelect(key as 'prospect' | 'hot' | 'warm' | 'active')}
        />
      ))}
    </div>
  );
}
