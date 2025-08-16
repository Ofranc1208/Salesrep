import { useState, useEffect, useCallback } from 'react';
import { useDataFlow, LeadStatus } from '../../shared';
import { Lead, PhoneNumber, StructuredSettlementDetails } from '../types';

// Convert shared BaseLead to Rep Dashboard Lead format
const convertBaseLeadToRepLead = (baseLead: any): Lead => {
  console.log('convertBaseLeadToRepLead: Converting baseLead', baseLead);
  
  const converted = {
    id: baseLead.id, // Keep as string to prevent duplicate keys
    crmId: baseLead.crmId,
    clientName: baseLead.clientName,
    campaignName: baseLead.campaignId || 'Default Campaign',
    phoneNumbers: baseLead.phoneNumbers.map((phone: string, index: number) => ({
      number: phone,
      status: 'working', // Default status
      lastUsed: new Date().toISOString(),
      isPrimary: index === 0,
      type: 'mobile',
      relationship: 'client',
      lastVerified: new Date().toISOString(),
      notes: '',
      auditTrail: []
    })),
    payment: baseLead.paymentAmount?.toString() || '0',
    startDate: baseLead.startDate,
    insuranceCompany: baseLead.insuranceCompany,
    status: baseLead.status || 'pending',
    messageHistory: [],
    nextFollowUp: '',
    notes: '',
    processed: false,
    phoneNumbersProcessed: 0,
    structuredSettlementDetails: {
      monthlyPayment: baseLead.paymentAmount?.toString() || '0',
      startDate: baseLead.startDate,
      endDate: baseLead.endDate,
      totalValue: baseLead.paymentAmount?.toString() || '0',
      insuranceCompany: baseLead.insuranceCompany,
      offerAmount: baseLead.paymentAmount?.toString() || '0'
    }
  };
  
  console.log('convertBaseLeadToRepLead: Converted result', converted);
  return converted;
};

export const useSharedDataFlow = (repId: string) => {
  const { leads: sharedLeads, stats, assignLead, updateLeadStatus, getLeadsByRep } = useDataFlow();
  const [repLeads, setRepLeads] = useState<Lead[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Convert and sync shared leads to rep dashboard format
  useEffect(() => {
    // Always consider connected if the shared service is available
    setIsConnected(true);
    
    console.log('useSharedDataFlow: sharedLeads changed', { 
      sharedLeadsCount: sharedLeads.length, 
      repId, 
      stats,
      sharedLeads: sharedLeads // Log the actual shared leads data
    });
    
    if (sharedLeads.length > 0) {
      // Small delay to ensure assignment is complete
      setTimeout(() => {
        // Get leads assigned to this specific rep
        const assignedLeads = getLeadsByRep(repId);
        console.log('useSharedDataFlow: assignedLeads for rep', { repId, assignedLeads });
        
        // Convert to rep dashboard format
        const convertedLeads = assignedLeads.map(convertBaseLeadToRepLead);
        console.log('useSharedDataFlow: convertedLeads', convertedLeads);
        
        setRepLeads(convertedLeads);
      }, 100); // 100ms delay
    } else {
      // Clear leads when no shared leads exist
      setRepLeads([]);
    }
  }, [sharedLeads, repId, getLeadsByRep, stats]);

  // Update lead status in shared system when rep processes it
  const updateLeadStatusInShared = useCallback((leadId: string, newStatus: string) => {
    try {
      // Map rep dashboard status to shared status
      let sharedStatus: LeadStatus;
      switch (newStatus) {
        case 'pending':
          sharedStatus = LeadStatus.ASSIGNED;
          break;
        case 'in-progress':
          sharedStatus = LeadStatus.CONTACTED;
          break;
        case 'completed':
          sharedStatus = LeadStatus.CLOSED;
          break;
        default:
          sharedStatus = LeadStatus.ASSIGNED;
      }
      
      updateLeadStatus(leadId, sharedStatus);
    } catch (error) {
      console.error('Failed to update lead status in shared system:', error);
    }
  }, [updateLeadStatus]);

  // Get real-time stats for this rep
  const getRepStats = useCallback(() => {
    if (stats && stats.repWorkloads) {
      return {
        totalLeads: stats.repWorkloads[repId] || 0,
        pendingLeads: repLeads.filter(l => l.status === 'pending').length,
        inProgressLeads: repLeads.filter(l => l.status === 'in-progress').length,
        completedLeads: repLeads.filter(l => l.processed).length
      };
    }
    return {
      totalLeads: repLeads.length,
      pendingLeads: repLeads.filter(l => l.status === 'pending').length,
      inProgressLeads: repLeads.filter(l => l.status === 'in-progress').length,
      completedLeads: repLeads.filter(l => l.processed).length
    };
  }, [stats, repId, repLeads]);

  return {
    leads: repLeads,
    stats: getRepStats(),
    isConnected,
    updateLeadStatusInShared,
    // Expose shared service methods for advanced operations
    sharedService: {
      assignLead,
      updateLeadStatus,
      getLeadsByRep
    }
  };
};
