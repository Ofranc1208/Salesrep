'use client';

// Campaign Manager Metrics Calculation Hook
import { useMemo } from 'react';
import { Campaign } from '../../../../types';
import { CampaignMetrics } from '../types';

export const useCampaignMetrics = (campaign: Campaign | null): CampaignMetrics | null => {
  return useMemo(() => {
    if (!campaign) return null;

    const totalLeads = campaign.totalLeads;
    const processedLeads = campaign.processedLeads;
    const remainingLeads = totalLeads - processedLeads;
    const progressPercentage = totalLeads > 0 ? Math.round((processedLeads / totalLeads) * 100) : 0;
    
    // Calculate days since campaign started (mock date)
    const daysSinceStart = Math.ceil(
      (Date.now() - new Date('2024-01-15').getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const averagePerDay = daysSinceStart > 0 ? Math.round(processedLeads / daysSinceStart) : 0;
    const estimatedDaysRemaining = averagePerDay > 0 ? Math.ceil(remainingLeads / averagePerDay) : 0;
    
    // Mock conversion rate based on campaign status
    const conversionRate = campaign.status === 'active' ? 0.75 : 0.60;

    return {
      totalLeads,
      processedLeads,
      remainingLeads,
      progressPercentage,
      conversionRate,
      averagePerDay,
      estimatedDaysRemaining
    };
  }, [campaign]);
};
