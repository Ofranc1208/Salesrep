'use client';

// MOVED FROM: ../CampaignSummary.tsx
// NEW LOCATION: tabs/analytics/CampaignSummary.tsx - Self-contained analytics component

import React from 'react';
import { Campaign } from '../../../../../types';
import { CampaignSummaryProps } from './types';
import CampaignProgressBar from './CampaignProgressBar';
import CampaignMetrics from './CampaignMetrics';
import PerformanceMetrics from './PerformanceMetrics';
import CampaignStatus from './CampaignStatus';
import CampaignActions from './CampaignActions';
import SummaryHeader from './SummaryHeader';
import SummaryEmptyState from './SummaryEmptyState';

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
