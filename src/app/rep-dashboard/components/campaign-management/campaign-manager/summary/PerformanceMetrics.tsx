'use client';

import React from 'react';
import { Campaign } from '../../../../types';

interface PerformanceMetricsProps {
  campaign: Campaign;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  remainingLeads: number;
}

export default function PerformanceMetrics({ campaign, activeLeadList, remainingLeads }: PerformanceMetricsProps) {
  // Mock conversion rates based on active list
  const getConversionRate = () => {
    switch (activeLeadList) {
      case 'hot': return '85%';
      case 'warm': return '65%';
      case 'active': return '92%';
      case 'prospect': return '45%';
      default: return '60%';
    }
  };

  // Safe calculation for leads per day
  const getLeadsPerDay = () => {
    if (!campaign.createdAt || campaign.processedLeads === 0) return '0';
    
    const daysSinceStart = Math.max(1, Math.ceil((Date.now() - new Date(campaign.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
    const leadsPerDay = Math.round(campaign.processedLeads / daysSinceStart);
    
    return isNaN(leadsPerDay) ? '0' : leadsPerDay.toString();
  };

  // Safe calculation for days left
  const getDaysLeft = () => {
    if (!campaign.createdAt || campaign.processedLeads === 0 || remainingLeads <= 0) return '0';
    
    const daysSinceStart = Math.max(1, Math.ceil((Date.now() - new Date(campaign.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
    const leadsPerDay = Math.max(1, Math.round(campaign.processedLeads / daysSinceStart));
    const daysLeft = Math.ceil(remainingLeads / leadsPerDay);
    
    return isNaN(daysLeft) ? '∞' : daysLeft.toString();
  };

  return (
    <div className="grid grid-cols-3 gap-2 mb-3">
      <div className="bg-white p-2 rounded border text-center">
        <div className="text-sm font-bold text-green-600">{getConversionRate()}</div>
        <div className="text-xs text-gray-600">Conversion</div>
      </div>
      <div className="bg-white p-2 rounded border text-center">
        <div className="text-sm font-bold text-blue-600">
          {getLeadsPerDay()}
        </div>
        <div className="text-xs text-gray-600">Per Day</div>
      </div>
      <div className="bg-white p-2 rounded border text-center">
        <div className="text-sm font-bold text-purple-600">
          {getDaysLeft()}
        </div>
        <div className="text-xs text-gray-600">Days Left</div>
      </div>
    </div>
  );
}
