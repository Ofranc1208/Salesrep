// Lead Lists Types - Moved from active-leads/types.ts
import { Lead } from '../../../../../types';

export interface LeadListData {
  name: string;
  count: number;
  status: string;
  color: 'blue' | 'red' | 'orange' | 'green';
  icon: string;
  description?: string;
}

export interface LeadListConfig {
  prospect: LeadListData;
  hot: LeadListData;
  warm: LeadListData;
  active: LeadListData;
}

export type LeadListType = 'prospect' | 'hot' | 'warm' | 'active';

export interface LeadListManagerProps {
  campaignLeads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  selectedLead: Lead | null;
  activeLeadList: LeadListType;
  onLeadListChange: (listType: LeadListType) => void;
}

export interface LeadListCardProps {
  listType: LeadListType;
  data: LeadListData;
  isActive: boolean;
}

export interface LeadListMetrics {
  totalLeads: number;
  activeLeads: number;
  completedToday: number;
  responseRate: number;
}

export interface LeadListState {
  activeList: LeadListType;
  selectedLead: Lead | null;
  isLoading: boolean;
  error: string | null;
  metrics: LeadListMetrics;
}
