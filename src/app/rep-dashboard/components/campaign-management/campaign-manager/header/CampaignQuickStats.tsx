'use client';

import React from 'react';
import { Campaign } from '../../../../types';

interface CampaignQuickStatsProps {
  selectedCampaign?: Campaign;
}

export default function CampaignQuickStats({ selectedCampaign }: CampaignQuickStatsProps) {
  if (!selectedCampaign) return null;

  return (
    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-600">
      <span>📊 {selectedCampaign.totalLeads} total leads</span>
      <span>✅ {selectedCampaign.processedLeads} processed</span>
      <span>👤 {selectedCampaign.managerName}</span>
      <span>📅 {new Date(selectedCampaign.createdAt).toLocaleDateString()}</span>
    </div>
  );
}
