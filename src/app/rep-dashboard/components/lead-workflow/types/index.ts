/**
 * Lead Workflow Types
 * 
 * Defines interfaces and types for the lead workflow orchestration system.
 * This sits between Campaign Management and Lead Management to coordinate
 * lead processing across campaigns.
 */

import { Lead, Campaign } from '../../types';

// Workflow Context - maintains state across campaign switches
export interface LeadWorkflowContext {
  activeCampaignId: string;
  selectedLead: Lead | null;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  leadHistory: LeadHistoryEntry[];
  workflowState: WorkflowState;
}

// Lead History - tracks lead interactions across campaigns
export interface LeadHistoryEntry {
  leadId: string;
  campaignId: string;
  action: WorkflowAction;
  timestamp: string;
  details?: any;
}

// Workflow Actions - all possible actions in the lead workflow
export type WorkflowAction = 
  | 'lead_assigned'
  | 'lead_accepted'
  | 'lead_declined'
  | 'lead_selected'
  | 'lead_processed'
  | 'lead_completed'
  | 'campaign_switched'
  | 'status_updated';

// Workflow State - current state of the workflow
export interface WorkflowState {
  isProcessingLead: boolean;
  currentStep: WorkflowStep;
  pendingActions: string[];
  lastUpdated: string;
}

// Workflow Steps - stages in the lead processing workflow
export type WorkflowStep = 
  | 'campaign_selection'
  | 'lead_assignment_review'
  | 'lead_list_management'
  | 'lead_processing'
  | 'lead_completion';

// Workflow Events - events that trigger workflow changes
export interface WorkflowEvent {
  type: WorkflowAction;
  payload: any;
  timestamp: string;
  source: 'campaign_management' | 'lead_management' | 'external';
}

// Lead Context - enriched lead data with workflow context
export interface LeadWithContext extends Lead {
  workflowHistory: LeadHistoryEntry[];
  currentCampaign: Campaign;
  workflowStatus: WorkflowStep;
  lastInteraction: string;
  processed?: boolean; // Add processed property for compatibility
}

// Workflow Configuration
export interface WorkflowConfig {
  autoSaveInterval: number;
  maxHistoryEntries: number;
  enableCrossCampaignTracking: boolean;
  debugMode: boolean;
}
