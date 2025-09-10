// Lead Lists Module Hooks - Moved from active-leads/hooks.ts
import { useState, useCallback, useMemo } from 'react';
import { Lead } from '../../../../../types';
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
    const listConfig = leadListConfig[activeList];
    return initialLeads.slice(0, listConfig.count);
  }, [initialLeads, activeList, leadListConfig]);

  // Handle list change
  const handleListChange = useCallback((newList: LeadListType) => {
    setActiveList(newList);
    setSelectedLead(null); // Clear selection when switching lists
  }, []);

  // Handle lead selection
  const handleLeadSelect = useCallback((lead: Lead) => {
    setSelectedLead(lead);
  }, []);

  return {
    activeList,
    selectedLead,
    isLoading,
    error,
    leadListConfig,
    filteredLeads,
    handleListChange,
    handleLeadSelect,
    setIsLoading,
    setError
  };
};
