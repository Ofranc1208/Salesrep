'use client';

import React from 'react';
import { Lead } from '../../../types';
import LeadListCard from './LeadListCard';
import ActiveLeadListDetails from './ActiveLeadListDetails';
import LeadListPreview from './LeadListPreview';

interface LeadListManagerProps {
  campaignLeads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  selectedLead: Lead | null;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  onLeadListChange: (listType: 'prospect' | 'hot' | 'warm' | 'active') => void;
}

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
      color: 'blue',
      icon: '📋',
      description: 'Fresh leads ready for initial contact'
    },
    hot: {
      name: 'Hot List', 
      count: 2,
      status: 'Actively working',
      color: 'red',
      icon: '🔥',
      description: 'High-priority leads requiring immediate attention'
    },
    warm: {
      name: 'Warm List',
      count: 1,
      status: 'Following up',
      color: 'orange',
      icon: '🌡️',
      description: 'Engaged leads in nurturing phase'
    },
    active: {
      name: 'Active List',
      count: 2,
      status: 'In progress/court',
      color: 'green',
      icon: '✅',
      description: 'Leads in active processing or legal review'
    }
  };

  const handleLeadListSelect = (listType: 'prospect' | 'hot' | 'warm' | 'active') => {
    onLeadListChange(listType);
    console.log(`Switched to ${listType} list`);
  };

  return (
    <div className="space-y-1">
      {/* Four Lead List Cards Grid */}
      <div className="grid grid-cols-2 gap-1">
        {Object.entries(leadListData).map(([key, data]) => (
          <LeadListCard
            key={key}
            data={data}
            isActive={activeLeadList === key}
            onClick={() => handleLeadListSelect(key as 'prospect' | 'hot' | 'warm' | 'active')}
          />
        ))}
      </div>

      {/* Active Lead List Details */}
      <ActiveLeadListDetails
        activeLeadList={activeLeadList}
        leadListData={leadListData}
      />

      {/* Lead Preview for Current List */}
      <LeadListPreview
        campaignLeads={campaignLeads}
        selectedLead={selectedLead}
        onLeadSelect={onLeadSelect}
        activeLeadList={activeLeadList}
        leadListData={leadListData}
      />
    </div>
  );
}
