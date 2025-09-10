'use client';

// Campaign Manager Workflow Integration Hook
import { useCallback } from 'react';
import { Lead } from '../../../../types';
import { useLeadWorkflow } from '../../../lead-workflow';

interface UseCampaignWorkflowProps {
  selectedCampaignId: string;
  onLeadsReceived: (leads: Lead[], campaignId: string) => void;
}

export const useCampaignWorkflow = ({
  selectedCampaignId,
  onLeadsReceived
}: UseCampaignWorkflowProps) => {
  const leadWorkflow = useLeadWorkflow();

  const handleLeadStatusUpdate = useCallback((leadId: string, newStatus: string) => {
    leadWorkflow.updateLeadStatus(leadId, newStatus, { source: 'campaign_management' });
    console.log(`Lead ${leadId} status updated to: ${newStatus}`);
  }, [leadWorkflow]);

  const handleLeadAssignmentAccept = useCallback((assignmentId: string, leads: Lead[]) => {
    leadWorkflow.acceptLeadAssignment(assignmentId, leads);
    onLeadsReceived(leads, selectedCampaignId);
  }, [leadWorkflow, onLeadsReceived, selectedCampaignId]);

  const handleLeadAssignmentDecline = useCallback((assignmentId: string, reason?: string) => {
    leadWorkflow.declineLeadAssignment(assignmentId, reason);
  }, [leadWorkflow]);

  return {
    handleLeadStatusUpdate,
    handleLeadAssignmentAccept,
    handleLeadAssignmentDecline
  };
};
