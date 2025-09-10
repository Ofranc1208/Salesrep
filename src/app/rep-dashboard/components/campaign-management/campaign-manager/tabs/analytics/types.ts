// Analytics Types - Moved from campaign-manager/types.ts
import { Campaign } from '../../../../../types';

export interface AnalyticsTabProps {
  selectedCampaign: Campaign | undefined;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export interface CampaignSummaryProps {
  campaign?: Campaign;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

// Campaign Analytics Types
export interface CampaignMetrics {
  totalLeads: number;
  processedLeads: number;
  remainingLeads: number;
  conversionRate: number;
  averageResponseTime: number;
  completionRate: number;
}

export interface CampaignMetricsProps {
  campaign: Campaign;
  remainingLeads: number;
}

export interface PerformanceMetricsProps {
  campaign: Campaign;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  remainingLeads: number;
}

export interface CampaignProgressBarProps {
  progressPercentage: number;
}

export interface CampaignStatusProps {
  campaign: Campaign;
}

export interface SummaryHeaderProps {
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}
