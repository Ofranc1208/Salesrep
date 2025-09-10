/**
 * useLeadWorkflow Hook
 * 
 * React hook for integrating with the Lead Workflow Service.
 * Provides state management and event handling for workflow operations.
 */

import { useState, useEffect, useCallback } from 'react';
import { leadWorkflowService } from '../services';
import { LeadWorkflowContext, WorkflowEvent, LeadWithContext } from '../types';
import { Lead, Campaign } from '../../types';

interface UseLeadWorkflowReturn {
  // State
  workflowContext: LeadWorkflowContext;
  isProcessingLead: boolean;
  currentStep: string;
  
  // Actions
  setActiveCampaign: (campaignId: string, campaign: Campaign) => void;
  selectLead: (lead: Lead) => void;
  updateLeadStatus: (leadId: string, newStatus: string, details?: any) => void;
  completeLead: (leadId: string) => void;
  acceptLeadAssignment: (assignmentId: string, leads: Lead[]) => void;
  declineLeadAssignment: (assignmentId: string, reason?: string) => void;
  
  // Data
  getCampaignLeads: (campaignLeads: Lead[]) => LeadWithContext[];
  getLeadHistory: (leadId: string) => any[];
  getWorkflowStats: () => any;
  
  // Utilities
  subscribe: (eventType: string, callback: (event: WorkflowEvent) => void) => () => void;
}

export function useLeadWorkflow(): UseLeadWorkflowReturn {
  const [workflowContext, setWorkflowContext] = useState<LeadWorkflowContext>(
    leadWorkflowService.getWorkflowContext()
  );

  // Update context when workflow service changes
  useEffect(() => {
    const updateContext = () => {
      setWorkflowContext(leadWorkflowService.getWorkflowContext());
    };

    // Subscribe to workflow events to update context
    const unsubscribers = [
      leadWorkflowService.subscribe('campaign_switched', updateContext),
      leadWorkflowService.subscribe('lead_selected', updateContext),
      leadWorkflowService.subscribe('status_updated', updateContext),
      leadWorkflowService.subscribe('lead_accepted', updateContext),
      leadWorkflowService.subscribe('lead_declined', updateContext),
      leadWorkflowService.subscribe('lead_completed', updateContext)
    ];

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, []);

  // Memoized actions
  const setActiveCampaign = useCallback((campaignId: string, campaign: Campaign) => {
    leadWorkflowService.setActiveCampaign(campaignId, campaign);
  }, []);

  const selectLead = useCallback((lead: Lead) => {
    leadWorkflowService.selectLead(lead);
  }, []);

  const updateLeadStatus = useCallback((leadId: string, newStatus: string, details?: any) => {
    leadWorkflowService.updateLeadStatus(leadId, newStatus, details);
  }, []);

  const completeLead = useCallback((leadId: string) => {
    leadWorkflowService.completeLead(leadId);
  }, []);

  const acceptLeadAssignment = useCallback((assignmentId: string, leads: Lead[]) => {
    leadWorkflowService.acceptLeadAssignment(assignmentId, leads);
  }, []);

  const declineLeadAssignment = useCallback((assignmentId: string, reason?: string) => {
    leadWorkflowService.declineLeadAssignment(assignmentId, reason);
  }, []);

  // Memoized data functions
  const getCampaignLeads = useCallback((campaignLeads: Lead[]) => {
    return leadWorkflowService.getCampaignLeads(campaignLeads);
  }, []);

  const getLeadHistory = useCallback((leadId: string) => {
    return leadWorkflowService.getLeadHistory(leadId);
  }, []);

  const getWorkflowStats = useCallback(() => {
    return leadWorkflowService.getWorkflowStats();
  }, []);

  const subscribe = useCallback((eventType: string, callback: (event: WorkflowEvent) => void) => {
    return leadWorkflowService.subscribe(eventType, callback);
  }, []);

  return {
    // State
    workflowContext,
    isProcessingLead: workflowContext.workflowState.isProcessingLead,
    currentStep: workflowContext.workflowState.currentStep,
    
    // Actions
    setActiveCampaign,
    selectLead,
    updateLeadStatus,
    completeLead,
    acceptLeadAssignment,
    declineLeadAssignment,
    
    // Data
    getCampaignLeads,
    getLeadHistory,
    getWorkflowStats,
    
    // Utilities
    subscribe
  };
}
