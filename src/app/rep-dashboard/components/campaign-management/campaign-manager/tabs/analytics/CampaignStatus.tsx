'use client';

// MOVED FROM: ../../summary/CampaignStatus.tsx
// NEW LOCATION: tabs/analytics/CampaignStatus.tsx

import React from 'react';
import { CampaignStatusProps } from './types';

export default function CampaignStatus({ campaign }: CampaignStatusProps) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${
          campaign.status === 'active' ? 'bg-green-500' :
          campaign.status === 'paused' ? 'bg-yellow-500' :
          'bg-gray-500'
        }`} />
        <span className="text-gray-600">
          Status: <span className="font-medium">{campaign.status}</span>
        </span>
      </div>
      
      <div className="text-gray-500">
        Manager: <span className="font-medium">{campaign.managerName}</span>
      </div>
    </div>
  );
}
