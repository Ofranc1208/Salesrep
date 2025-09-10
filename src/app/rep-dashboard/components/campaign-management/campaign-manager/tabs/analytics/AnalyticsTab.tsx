'use client';

// MOVED FROM: ../AnalyticsTab.tsx
// NEW LOCATION: tabs/analytics/AnalyticsTab.tsx - Self-contained analytics module

import React from 'react';
import { AnalyticsTabProps } from './types';
import CampaignSummary from './CampaignSummary';

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
