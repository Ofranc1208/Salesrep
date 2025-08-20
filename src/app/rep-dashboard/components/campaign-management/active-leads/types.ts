// Active Leads Module Types
import { Lead } from '../../../types';

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
  data: LeadListData;
  isActive: boolean;
  onClick: () => void;
}

export interface ActiveLeadListDetailsProps {
  activeLeadList: LeadListType;
  leadListData: LeadListConfig;
}

export interface LeadListPreviewProps {
  campaignLeads: Lead[];
  selectedLead: Lead | null;
  onLeadSelect: (lead: Lead) => void;
  activeLeadList: LeadListType;
  leadListData: LeadListConfig;
}

// Lead List Metrics
export interface LeadListMetrics {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  progressPercentage: number;
}

// Lead List Actions
export interface LeadListActions {
  loadLeads: (listType: LeadListType) => void;
  exportList: (listType: LeadListType) => void;
  addLead: (listType: LeadListType, lead: Lead) => void;
  moveLead: (leadId: string, fromList: LeadListType, toList: LeadListType) => void;
}

// Lead List State
export interface LeadListState {
  activeList: LeadListType;
  lists: LeadListConfig;
  selectedLead: Lead | null;
  filteredLeads: Lead[];
  isLoading: boolean;
  error: string | null;
}
