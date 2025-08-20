// Campaign Manager Module Types
import { Campaign, Lead, LeadNotification } from '../../../types';

export interface CampaignManagerProps {
  campaigns: Campaign[];
  selectedCampaignId: string;
  onCampaignChange: (campaignId: string) => void;
  notifications: LeadNotification[];
  onNotificationMarkAsRead: (notificationId: string) => void;
  onNotificationDismiss: (notificationId: string) => void;
  campaignLeads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  selectedLead: Lead | null;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  onLeadListChange: (listType: 'prospect' | 'hot' | 'warm' | 'active') => void;
}

export interface CampaignHeaderProps {
  selectedCampaign?: Campaign;
  notifications: LeadNotification[];
  onNotificationMarkAsRead: (notificationId: string) => void;
  onNotificationDismiss: (notificationId: string) => void;
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
  progressPercentage: number;
  conversionRate: number;
  averagePerDay: number;
  estimatedDaysRemaining: number;
}

export interface CampaignPerformance {
  dailyProcessed: { date: string; count: number }[];
  conversionByList: {
    prospect: number;
    hot: number;
    warm: number;
    active: number;
  };
  timeToConversion: {
    average: number; // in days
    median: number;
    fastest: number;
    slowest: number;
  };
}

// Campaign Actions
export interface CampaignActions {
  pauseCampaign: (campaignId: string) => Promise<void>;
  resumeCampaign: (campaignId: string) => Promise<void>;
  completeCampaign: (campaignId: string) => Promise<void>;
  exportCampaignData: (campaignId: string, format: 'csv' | 'xlsx') => Promise<string>;
  generateReport: (campaignId: string) => Promise<CampaignReport>;
}

// Campaign Report Types
export interface CampaignReport {
  id: string;
  campaignId: string;
  generatedAt: string;
  metrics: CampaignMetrics;
  performance: CampaignPerformance;
  leadBreakdown: {
    byStatus: { [key: string]: number };
    byList: { [key: string]: number };
    byPriority: { [key: string]: number };
  };
  recommendations: string[];
}

// Notification Types (extended)
export interface CampaignNotification extends LeadNotification {
  campaignId: string;
  category: 'lead' | 'performance' | 'system' | 'milestone';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionRequired?: boolean;
  actionUrl?: string;
}

// Campaign State Management
export interface CampaignState {
  selectedCampaign: Campaign | null;
  campaigns: Campaign[];
  notifications: CampaignNotification[];
  metrics: CampaignMetrics | null;
  performance: CampaignPerformance | null;
  isLoading: boolean;
  error: string | null;
}
