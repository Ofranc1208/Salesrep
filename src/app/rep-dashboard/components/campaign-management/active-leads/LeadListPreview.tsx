'use client';

import React from 'react';
import { Lead } from '../../../types';
import { 
  LeadPreviewHeader, 
  LeadPreviewItem, 
  LeadPreviewEmpty, 
  LeadPreviewFooter 
} from './preview';

interface LeadListData {
  name: string;
  count: number;
  status: string;
  color: string;
  icon: string;
  description?: string;
}

interface LeadListPreviewProps {
  campaignLeads: Lead[];
  selectedLead: Lead | null;
  onLeadSelect: (lead: Lead) => void;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  leadListData: {
    [key: string]: LeadListData;
  };
}

export default function LeadListPreview({
  campaignLeads,
  selectedLead,
  onLeadSelect,
  activeLeadList,
  leadListData
}: LeadListPreviewProps) {
  const currentList = leadListData[activeLeadList];
  
  // Filter leads based on active list (mock filtering for now)
  const getFilteredLeads = () => {
    // In a real app, this would filter based on lead status/category
    // For now, we'll show a subset based on the active list
    const leadCount = currentList.count;
    return campaignLeads.slice(0, leadCount);
  };

  const filteredLeads = getFilteredLeads();

  if (filteredLeads.length === 0) {
    return (
      <LeadPreviewEmpty
        currentList={currentList}
        activeLeadList={activeLeadList}
      />
    );
  }

  return (
    <div className="border-t border-gray-200 pt-3">
      <LeadPreviewHeader
        currentList={currentList}
        leadCount={filteredLeads.length}
        activeLeadList={activeLeadList}
      />
      
      <div className="bg-white border border-t-0 rounded-b-lg max-h-48 overflow-y-auto">
        {filteredLeads.map((lead, index) => (
          <LeadPreviewItem
            key={lead.id}
            lead={lead}
            isSelected={selectedLead?.id === lead.id}
            isLast={index === filteredLeads.length - 1}
            activeLeadList={activeLeadList}
            onLeadSelect={onLeadSelect}
          />
        ))}
      </div>
      
      <LeadPreviewFooter
        currentList={currentList}
        activeLeadList={activeLeadList}
      />
    </div>
  );
}