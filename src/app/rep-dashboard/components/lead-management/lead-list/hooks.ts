import { useState, useCallback, useMemo } from 'react';
import { Lead } from '../../../types';
import { LeadListState, LeadListConfig } from './types';

export interface UseLeadListReturn {
  state: LeadListState;
  config: LeadListConfig;
  filteredLeads: Lead[];
  sortedLeads: Lead[];
  paginatedLeads: Lead[];
  totalPages: number;
  updateConfig: (newConfig: Partial<LeadListConfig>) => void;
  setCurrentPage: (page: number) => void;
  setSortBy: (sortBy: LeadListState['sortBy']) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setFilter: (filter: Partial<LeadListState['filterBy']>) => void;
  clearFilters: () => void;
}

export function useLeadList(
  leads: Lead[],
  initialConfig?: Partial<LeadListConfig>
): UseLeadListReturn {
  const [state, setState] = useState<LeadListState>({
    currentPage: 1,
    leadsPerPage: 3,
    sortBy: 'nextFollowUp',
    sortOrder: 'asc',
    filterBy: {}
  });

  const [config, setConfig] = useState<LeadListConfig>({
    enablePagination: true,
    defaultLeadsPerPage: 3,
    enableSorting: true,
    enableFiltering: true,
    enableSearch: true,
    showProgressBar: true,
    ...initialConfig
  });

  const updateConfig = useCallback((newConfig: Partial<LeadListConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  }, []);

  const setSortBy = useCallback((sortBy: LeadListState['sortBy']) => {
    setState(prev => ({ ...prev, sortBy, currentPage: 1 }));
  }, []);

  const setSortOrder = useCallback((sortOrder: 'asc' | 'desc') => {
    setState(prev => ({ ...prev, sortOrder, currentPage: 1 }));
  }, []);

  const setFilter = useCallback((filter: Partial<LeadListState['filterBy']>) => {
    setState(prev => ({
      ...prev,
      filterBy: { ...prev.filterBy, ...filter },
      currentPage: 1
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      filterBy: {},
      currentPage: 1
    }));
  }, []);

  // Filter leads
  const filteredLeads = useMemo(() => {
    if (!config.enableFiltering) return leads;

    return leads.filter(lead => {
      const { status, processed, searchTerm } = state.filterBy;

      if (status && lead.status !== status) return false;
      if (processed !== undefined && lead.processed !== processed) return false;
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const searchableText = [
          lead.clientName,
          lead.crmId,
          lead.insuranceCompany,
          lead.notes || ''
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(searchLower)) return false;
      }

      return true;
    });
  }, [leads, state.filterBy, config.enableFiltering]);

  // Sort leads
  const sortedLeads = useMemo(() => {
    if (!config.enableSorting) return filteredLeads;

    return [...filteredLeads].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (state.sortBy) {
        case 'name':
          aValue = a.clientName;
          bValue = b.clientName;
          break;
        case 'crmId':
          aValue = a.crmId;
          bValue = b.crmId;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'nextFollowUp':
          aValue = new Date(a.nextFollowUp);
          bValue = new Date(b.nextFollowUp);
          break;
        case 'progress':
          aValue = a.phoneNumbersProcessed / a.phoneNumbers.length;
          bValue = b.phoneNumbersProcessed / b.phoneNumbers.length;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return state.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return state.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredLeads, state.sortBy, state.sortOrder, config.enableSorting]);

  // Paginate leads
  const paginatedLeads = useMemo(() => {
    if (!config.enablePagination) return sortedLeads;

    const startIndex = (state.currentPage - 1) * state.leadsPerPage;
    const endIndex = startIndex + state.leadsPerPage;
    return sortedLeads.slice(startIndex, endIndex);
  }, [sortedLeads, state.currentPage, state.leadsPerPage, config.enablePagination]);

  const totalPages = useMemo(() => {
    if (!config.enablePagination) return 1;
    return Math.ceil(sortedLeads.length / state.leadsPerPage);
  }, [sortedLeads.length, state.leadsPerPage, config.enablePagination]);

  return {
    state,
    config,
    filteredLeads,
    sortedLeads,
    paginatedLeads,
    totalPages,
    updateConfig,
    setCurrentPage,
    setSortBy,
    setSortOrder,
    setFilter,
    clearFilters
  };
}
