'use client';

import React from 'react';
import { Lead } from '../../../../types';
import { LeadListManager } from '../../active-leads';

interface LeadsTabProps {
  campaignLeads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  selectedLead: Lead | null;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  onLeadListChange: (listType: 'prospect' | 'hot' | 'warm' | 'active') => void;
}

export default function LeadsTab({
  campaignLeads,
  onLeadSelect,
  selectedLead,
  activeLeadList,
  onLeadListChange
}: LeadsTabProps) {
  return (
    <div className="space-y-6">
      {/* Lead List Management */}
      <LeadListManager
        campaignLeads={campaignLeads}
        onLeadSelect={onLeadSelect}
        selectedLead={selectedLead}
        activeLeadList={activeLeadList}
        onLeadListChange={onLeadListChange}
      />
    </div>
  );
}
