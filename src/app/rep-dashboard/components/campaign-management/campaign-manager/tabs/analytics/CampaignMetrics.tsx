'use client';

// MOVED FROM: ../../summary/CampaignMetrics.tsx
// NEW LOCATION: tabs/analytics/CampaignMetrics.tsx

import React from 'react';
import { CampaignMetricsProps } from './types';

export default function CampaignMetrics({ campaign, remainingLeads }: CampaignMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="bg-white p-2 rounded border text-center">
        <div className="text-lg font-bold text-gray-900">{campaign.processedLeads}</div>
        <div className="text-xs text-gray-600">Processed</div>
      </div>
      <div className="bg-white p-2 rounded border text-center">
        <div className="text-lg font-bold text-gray-900">{remainingLeads}</div>
        <div className="text-xs text-gray-600">Remaining</div>
      </div>
    </div>
  );
}
