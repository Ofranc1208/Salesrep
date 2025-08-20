'use client';

import React from 'react';
import {
  LeadListHeader,
  LeadMetricsGrid,
  LeadProgressBar,
  LeadActions,
  LeadListDescription
} from './details';

interface LeadListData {
  name: string;
  count: number;
  status: string;
  color: string;
  icon: string;
  description?: string;
}

interface ActiveLeadListDetailsProps {
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  leadListData: {
    [key: string]: LeadListData;
  };
}

export default function ActiveLeadListDetails({ 
  activeLeadList, 
  leadListData 
}: ActiveLeadListDetailsProps) {
  const currentList = leadListData[activeLeadList];
  
  // Calculate metrics based on lead count
  const totalLeads = currentList.count;
  const inProgress = Math.floor(totalLeads * 0.6);
  const completed = Math.floor(totalLeads * 0.2);
  const pending = totalLeads - inProgress - completed;

  return (
    <div className="border-t border-gray-200 pt-3 bg-gray-50 rounded-b-lg p-3">
      <LeadListHeader 
        currentList={currentList} 
        activeLeadList={activeLeadList} 
      />
      
      <LeadMetricsGrid 
        totalLeads={totalLeads}
        pending={pending}
        inProgress={inProgress}
        completed={completed}
      />

      <LeadProgressBar activeLeadList={activeLeadList} />

      <LeadActions activeLeadList={activeLeadList} />

      <LeadListDescription description={currentList.description} />
    </div>
  );
}