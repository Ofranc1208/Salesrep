/**
 * Lead Workflow Module
 * 
 * Main export file for the lead workflow orchestration system.
 * This module sits between Campaign Management and Lead Management,
 * providing coordination and state management across the workflow.
 */

// Services
export { leadWorkflowService, LeadWorkflowService } from './services';

// Hooks
export { useLeadWorkflow } from './hooks';

// Types
export type {
  LeadWorkflowContext,
  LeadHistoryEntry,
  WorkflowEvent,
  WorkflowAction,
  WorkflowState,
  WorkflowStep,
  LeadWithContext,
  WorkflowConfig
} from './types';

// Utils
export {
  getWorkflowStepName,
  getWorkflowActionName,
  getWorkflowProgress,
  canSelectLead,
  canSwitchCampaign,
  formatWorkflowTimestamp
} from './utils';
