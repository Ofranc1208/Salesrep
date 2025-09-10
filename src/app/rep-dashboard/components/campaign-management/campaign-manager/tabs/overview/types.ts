// Overview Types - Extracted from the original OverviewTab.tsx
import { Campaign, Lead } from '../../../../../types';
import { LeadAssignment } from '../../../services/LeadAssignmentService';

// Main Overview Tab Props
export interface OverviewTabProps {
  selectedCampaign: Campaign | undefined;
  campaignLeads: Lead[];
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  onLeadListChange: (listType: 'prospect' | 'hot' | 'warm' | 'active') => void;
  repId?: string;
  onAcceptAssignment?: (assignmentId: string, leads: Lead[]) => void;
  onDeclineAssignment?: (assignmentId: string, reason?: string) => void;
}

// Manager Status Component
export interface ManagerStatusProps {
  selectedCampaign: Campaign | undefined;
  onShowDetails: () => void;
  showDetails: boolean;
}

// Manager Communication Component
export interface ManagerCommunicationProps {
  selectedCampaign: Campaign | undefined;
  activeCommMode: 'chat' | 'email' | 'call' | null;
  onCommModeChange: (mode: 'chat' | 'email' | 'call' | null) => void;
}

// Lead Queue Component
export interface LeadQueueProps {
  queueStats: {
    pending: number;
    accepted: number;
    declined: number;
    totalLeads: number;
  };
}

// Lead Inventory Component
export interface LeadInventoryProps {
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  onLeadListChange: (listType: 'prospect' | 'hot' | 'warm' | 'active') => void;
}

// Lead List Data Structure
export interface LeadListData {
  prospect: LeadListInfo;
  hot: LeadListInfo;
  warm: LeadListInfo;
  active: LeadListInfo;
}

export interface LeadListInfo {
  name: string;
  color: 'blue' | 'red' | 'orange' | 'green';
  icon: string;
}
