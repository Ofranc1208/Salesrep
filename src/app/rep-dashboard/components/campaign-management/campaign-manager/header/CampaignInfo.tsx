'use client';

import React from 'react';
import { Campaign } from '../../../../types';

interface CampaignInfoProps {
  selectedCampaign?: Campaign;
}

export default function CampaignInfo({ selectedCampaign }: CampaignInfoProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusDot = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${getStatusDot(selectedCampaign?.status)}`} />
        <h3 className="text-sm font-semibold text-gray-900">
          {selectedCampaign?.name || 'No Campaign Selected'}
        </h3>
      </div>
      
      {selectedCampaign && (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedCampaign.status)}`}>
          {selectedCampaign.status}
        </span>
      )}
    </div>
  );
}
