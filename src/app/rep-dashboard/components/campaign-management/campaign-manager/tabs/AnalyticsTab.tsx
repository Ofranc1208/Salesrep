'use client';

import React from 'react';
import { Campaign } from '../../../../types';
import CampaignSummary from '../CampaignSummary';

interface AnalyticsTabProps {
  selectedCampaign: Campaign | undefined;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function AnalyticsTab({
  selectedCampaign,
  activeLeadList
}: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      {/* Campaign Analytics */}
      <CampaignSummary 
        campaign={selectedCampaign}
        activeLeadList={activeLeadList} 
      />
    </div>
  );
}
