import { useState, useEffect, useCallback } from 'react';
import { dataFlowService } from './DataFlowService';
import { BaseLead, LeadStatus, LeadAssignment } from './types';
import { useSharedState } from './hooks/useSharedState';
import { useAssignmentSync } from './hooks/useAssignmentSync';

export const useDataFlow = () => {
  const [loading, setLoading] = useState(false);
  
  // Use shared state hook
  const { leads, stats, updateSharedState, setLeads, setStats } = useSharedState();
  
  // Handle data changes for assignment sync
  const handleDataChange = useCallback(() => {
    const allLeads = dataFlowService.getAllLeads();
    const newStats = dataFlowService.getAssignmentStats();
    updateSharedState(allLeads, newStats);
    setLeads(allLeads);
    setStats(newStats);
  }, [updateSharedState, setLeads, setStats]);
  
  // Use assignment sync hook
  const { broadcastAssignment } = useAssignmentSync(handleDataChange);

  // Load all leads
  const loadLeads = useCallback(() => {
    // console.log('useDataFlow: loadLeads called'); // Commented out to reduce console noise
    setLoading(true);
    try {
      const allLeads = dataFlowService.getAllLeads();
      const newStats = dataFlowService.getAssignmentStats();
      // console.log('useDataFlow: loadLeads result', { allLeads, newStats }); // Commented out to reduce console noise

      // Update shared state and broadcast
      updateSharedState(allLeads, newStats);
      
      // Update local state
      setLeads(allLeads);
      setStats(newStats);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  }, [updateSharedState, setLeads, setStats]);

  // Add a new lead
  const addLead = useCallback((lead: BaseLead) => {
    try {
      dataFlowService.addLead(lead);
      handleDataChange();
    } catch (error) {
      console.error('Error adding lead:', error);
      throw error;
    }
  }, [handleDataChange]);

  // Assign a lead
  const assignLead = useCallback((leadId: string, repId: string, campaignId: string) => {
    try {
      const assignment = dataFlowService.assignLead(leadId, repId, campaignId);
      
      // Broadcast assignment to other tabs
      broadcastAssignment(leadId, repId, campaignId, assignment.assignedAt);
      
      // Update shared state
      handleDataChange();
      
      return assignment;
    } catch (error) {
      console.error('Error assigning lead:', error);
      throw error;
    }
  }, [broadcastAssignment, handleDataChange]);

  // Update lead status
  const updateLeadStatus = useCallback((leadId: string, status: LeadStatus) => {
    try {
      dataFlowService.updateLeadStatus(leadId, status);
      handleDataChange();
    } catch (error) {
      console.error('Error updating lead status:', error);
      throw error;
    }
  }, [handleDataChange]);

  // Get leads by status
  const getLeadsByStatus = useCallback((status: LeadStatus) => {
    return dataFlowService.getLeadsByStatus(status);
  }, []);

  // Get leads by rep
  const getLeadsByRep = useCallback((repId: string) => {
    return dataFlowService.getLeadsByRep(repId);
  }, []);

  // Load initial data on mount
  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  return {
    leads,
    stats,
    loading,
    addLead,
    assignLead,
    updateLeadStatus,
    getLeadsByStatus,
    getLeadsByRep,
    loadLeads
  };
};
