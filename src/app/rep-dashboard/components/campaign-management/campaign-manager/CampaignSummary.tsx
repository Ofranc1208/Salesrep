'use client';

import React from 'react';
import { Campaign } from '../../../types';
import {
  CampaignProgressBar,
  CampaignMetrics,
  PerformanceMetrics,
  CampaignStatus,
  CampaignActions,
  SummaryHeader,
  SummaryEmptyState
} from './summary';

interface CampaignSummaryProps {
  campaign?: Campaign;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function CampaignSummary({ campaign, activeLeadList }: CampaignSummaryProps) {
  if (!campaign) {
    return <SummaryEmptyState />;
  }

  // Calculate metrics
  const progressPercentage = campaign.totalLeads > 0 
    ? Math.round((campaign.processedLeads / campaign.totalLeads) * 100) 
    : 0;
  
  const remainingLeads = campaign.totalLeads - campaign.processedLeads;

  return (
    <div className="border-t border-gray-200 pt-2 mt-2">
      <div className="bg-gray-50 rounded-lg p-3">
        <SummaryHeader activeLeadList={activeLeadList} />

        <CampaignProgressBar progressPercentage={progressPercentage} />

        <CampaignMetrics 
          campaign={campaign} 
          remainingLeads={remainingLeads} 
        />

        <PerformanceMetrics 
          campaign={campaign} 
          activeLeadList={activeLeadList}
          remainingLeads={remainingLeads}
        />

        <CampaignStatus campaign={campaign} />

        <CampaignActions />
      </div>
    </div>
  );
}