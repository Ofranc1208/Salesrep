'use client';

import React from 'react';
import { Campaign } from '../../../../types';

interface CampaignMetricsProps {
  campaign: Campaign;
  remainingLeads: number;
}

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
