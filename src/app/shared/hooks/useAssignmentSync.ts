/**
 * useAssignmentSync - Handles assignment synchronization across tabs
 * Extracted from useDataFlow.ts for better separation of concerns
 */

import { useEffect } from 'react';
import { dataFlowService } from '../DataFlowService';
import broadcastService from '../services/BroadcastService';
import { BaseLead } from '../types';

interface AssignmentData {
  leadId: string;
  repId: string;
  campaignId: string;
  assignedAt: string;
  leadData?: BaseLead;
}

export const useAssignmentSync = (onDataChange: () => void) => {
  
  useEffect(() => {
    // Subscribe to assignment updates from other tabs
    const unsubscribeAssignment = broadcastService.subscribe('ASSIGNMENT_UPDATE', (data: AssignmentData) => {
      console.log('useAssignmentSync: Received assignment update:', data);
      
      const { leadId, repId, campaignId, assignedAt, leadData } = data;
      
      // Ensure the lead exists in local data service
      if (leadData) {
        // Add the lead if it doesn't exist
        const existingLead = dataFlowService.getAllLeads().find(lead => lead.id === leadId);
        if (!existingLead) {
          console.log('useAssignmentSync: Adding missing lead before assignment:', leadData);
          dataFlowService.addLead(leadData);
        }
      }
      
      // Import assignment to local data service
      dataFlowService.importAssignment(leadId, repId, campaignId, new Date(assignedAt));
      
      console.log('useAssignmentSync: Assignment imported successfully');
      
      // Notify parent component of data change
      onDataChange();
    });

    return () => {
      unsubscribeAssignment();
    };
  }, [onDataChange]);

  /**
   * Broadcast assignment to other tabs
   */
  const broadcastAssignment = (leadId: string, repId: string, campaignId: string, assignedAt: Date) => {
    // Get the lead data to include in the broadcast
    const leadData = dataFlowService.getAllLeads().find(lead => lead.id === leadId);
    
    console.log('useAssignmentSync: Broadcasting assignment:', { leadId, repId, campaignId, leadData });
    
    // Broadcast assignment data to other tabs
    broadcastService.broadcastAssignmentUpdate(leadId, repId, campaignId, assignedAt, leadData);
  };

  return {
    broadcastAssignment
  };
};
