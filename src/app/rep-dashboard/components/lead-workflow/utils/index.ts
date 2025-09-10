/**
 * Lead Workflow Utilities
 * 
 * Utility functions for lead workflow operations
 */

import { WorkflowStep, WorkflowAction } from '../types';

/**
 * Get human-readable workflow step name
 */
export function getWorkflowStepName(step: WorkflowStep): string {
  const stepNames: Record<WorkflowStep, string> = {
    'campaign_selection': 'Campaign Selection',
    'lead_assignment_review': 'Assignment Review',
    'lead_list_management': 'Lead List Management',
    'lead_processing': 'Lead Processing',
    'lead_completion': 'Lead Completion'
  };
  
  return stepNames[step] || step;
}

/**
 * Get human-readable workflow action name
 */
export function getWorkflowActionName(action: WorkflowAction): string {
  const actionNames: Record<WorkflowAction, string> = {
    'lead_assigned': 'Lead Assigned',
    'lead_accepted': 'Lead Accepted',
    'lead_declined': 'Lead Declined',
    'lead_selected': 'Lead Selected',
    'lead_processed': 'Lead Processed',
    'lead_completed': 'Lead Completed',
    'campaign_switched': 'Campaign Switched',
    'status_updated': 'Status Updated'
  };
  
  return actionNames[action] || action;
}

/**
 * Get workflow step progress percentage
 */
export function getWorkflowProgress(step: WorkflowStep): number {
  const stepProgress: Record<WorkflowStep, number> = {
    'campaign_selection': 0,
    'lead_assignment_review': 25,
    'lead_list_management': 50,
    'lead_processing': 75,
    'lead_completion': 100
  };
  
  return stepProgress[step] || 0;
}

/**
 * Check if workflow step allows lead selection
 */
export function canSelectLead(step: WorkflowStep): boolean {
  return ['lead_list_management', 'lead_processing'].includes(step);
}

/**
 * Check if workflow step allows campaign switching
 */
export function canSwitchCampaign(step: WorkflowStep): boolean {
  return !['lead_processing'].includes(step);
}

/**
 * Format workflow timestamp for display
 */
export function formatWorkflowTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours === 1) return '1 hour ago';
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return date.toLocaleDateString();
}
