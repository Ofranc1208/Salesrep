// Active Leads Module Hooks
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Lead } from '../../../types';
import { LeadListType, LeadListConfig, LeadListMetrics, LeadListState } from './types';

// Hook for managing lead list state
export const useLeadListManager = (
  initialLeads: Lead[] = [],
  initialActiveList: LeadListType = 'prospect'
) => {
  const [activeList, setActiveList] = useState<LeadListType>(initialActiveList);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lead list configuration
  const leadListConfig: LeadListConfig = useMemo(() => ({
    prospect: {
      name: 'Prospect List',
      count: 3,
      status: 'New leads from manager',
      color: 'blue',
      icon: '📋',
      description: 'Fresh leads ready for initial contact'
    },
    hot: {
      name: 'Hot List', 
      count: 2,
      status: 'Actively working',
      color: 'red',
      icon: '🔥',
      description: 'High-priority leads requiring immediate attention'
    },
    warm: {
      name: 'Warm List',
      count: 1,
      status: 'Following up',
      color: 'orange',
      icon: '🌡️',
      description: 'Engaged leads in nurturing phase'
    },
    active: {
      name: 'Active List',
      count: 2,
      status: 'In progress/court',
      color: 'green',
      icon: '✅',
      description: 'Leads in active processing or legal review'
    }
  }), []);

  // Filter leads based on active list
  const filteredLeads = useMemo(() => {
    // In a real app, this would filter based on lead status/category
    // For now, we'll show a subset based on the active list
    const listConfig = leadListConfig[activeList];
    return initialLeads.slice(0, listConfig.count);
  }, [initialLeads, activeList, leadListConfig]);

  // Handle list change
  const handleListChange = useCallback((listType: LeadListType) => {
    setActiveList(listType);
    setSelectedLead(null); // Clear selection when changing lists
    setError(null);
  }, []);

  // Handle lead selection
  const handleLeadSelect = useCallback((lead: Lead) => {
    setSelectedLead(lead);
  }, []);

  // Load leads for a specific list
  const loadLeadsForList = useCallback(async (listType: LeadListType) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would fetch leads from API
      console.log(`Loading leads for ${listType} list`);
      
      setActiveList(listType);
    } catch (err) {
      setError(`Failed to load ${listType} leads`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // State
    activeList,
    selectedLead,
    filteredLeads,
    leadListConfig,
    isLoading,
    error,
    
    // Actions
    handleListChange,
    handleLeadSelect,
    loadLeadsForList,
    
    // Utilities
    setSelectedLead,
    setError
  };
};

// Hook for calculating lead list metrics
export const useLeadListMetrics = (
  leads: Lead[],
  listType: LeadListType
): LeadListMetrics => {
  return useMemo(() => {
    const total = leads.length;
    
    // Mock calculations based on list type
    let progressPercentage: number;
    let inProgress: number;
    let completed: number;
    
    switch (listType) {
      case 'prospect':
        progressPercentage = 10;
        inProgress = Math.floor(total * 0.1);
        completed = 0;
        break;
      case 'hot':
        progressPercentage = 60;
        inProgress = Math.floor(total * 0.6);
        completed = Math.floor(total * 0.1);
        break;
      case 'warm':
        progressPercentage = 40;
        inProgress = Math.floor(total * 0.4);
        completed = Math.floor(total * 0.2);
        break;
      case 'active':
        progressPercentage = 80;
        inProgress = Math.floor(total * 0.3);
        completed = Math.floor(total * 0.5);
        break;
      default:
        progressPercentage = 0;
        inProgress = 0;
        completed = 0;
    }
    
    const pending = total - inProgress - completed;
    
    return {
      total,
      pending: Math.max(0, pending),
      inProgress,
      completed,
      progressPercentage
    };
  }, [leads, listType]);
};

// Hook for lead list actions
export const useLeadListActions = () => {
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  const exportList = useCallback(async (listType: LeadListType) => {
    setActionLoading(`export-${listType}`);
    
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Exporting ${listType} list`);
      
      // In a real app, this would trigger a download
      alert(`${listType} list exported successfully!`);
    } catch (error) {
      console.error(`Failed to export ${listType} list:`, error);
    } finally {
      setActionLoading(null);
    }
  }, []);
  
  const addLead = useCallback(async (listType: LeadListType, lead: Lead) => {
    setActionLoading(`add-${listType}`);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Adding lead to ${listType} list:`, lead);
      
      // In a real app, this would make an API call
    } catch (error) {
      console.error(`Failed to add lead to ${listType} list:`, error);
    } finally {
      setActionLoading(null);
    }
  }, []);
  
  const moveLead = useCallback(async (
    leadId: string, 
    fromList: LeadListType, 
    toList: LeadListType
  ) => {
    setActionLoading(`move-${leadId}`);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Moving lead ${leadId} from ${fromList} to ${toList}`);
      
      // In a real app, this would make an API call
    } catch (error) {
      console.error(`Failed to move lead ${leadId}:`, error);
    } finally {
      setActionLoading(null);
    }
  }, []);
  
  return {
    actionLoading,
    exportList,
    addLead,
    moveLead
  };
};
