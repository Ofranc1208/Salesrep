// Lead Tracker Hooks
import { useState, useEffect, useCallback } from 'react';
import { Lead, LeadFilters, LeadStats, PriorityItem } from './types';
import { LeadService } from './services';

// Main hook for lead management
export const useLeadTracker = (filters: LeadFilters = {}) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [priorityItems, setPriorityItems] = useState<PriorityItem[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const leadService = LeadService.getInstance();

  // Fetch leads
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await leadService.fetchLeads(filters);
      setLeads(response.leads);
      setPriorityItems(response.priorityItems);
      setStats(response.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [filters, leadService]);

  // Update lead priority
  const updateLeadPriority = useCallback(async (leadId: string, priority: Lead['priority']) => {
    try {
      const success = await leadService.updateLead({
        id: leadId,
        priority
      });
      
      if (success) {
        setLeads(prev => 
          prev.map(l => l.id === leadId ? { ...l, priority } : l)
        );
        
        // Refresh to update priority items and stats
        fetchLeads();
      }
    } catch (err) {
      console.error('Failed to update lead priority:', err);
    }
  }, [leadService, fetchLeads]);

  // Update lead status
  const updateLeadStatus = useCallback(async (leadId: string, status: Lead['status']) => {
    try {
      const success = await leadService.updateLead({
        id: leadId,
        status
      });
      
      if (success) {
        setLeads(prev => 
          prev.map(l => l.id === leadId ? { ...l, status } : l)
        );
        
        // Refresh to update stats
        fetchLeads();
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  }, [leadService, fetchLeads]);

  // Add notes to lead
  const addLeadNotes = useCallback(async (leadId: string, notes: string) => {
    try {
      const success = await leadService.updateLead({
        id: leadId,
        notes
      });
      
      if (success) {
        setLeads(prev => 
          prev.map(l => l.id === leadId ? { ...l, notes } : l)
        );
      }
    } catch (err) {
      console.error('Failed to add lead notes:', err);
    }
  }, [leadService]);

  // Schedule follow-up
  const scheduleFollowUp = useCallback(async (leadId: string, followUpDate: Date) => {
    try {
      const success = await leadService.updateLead({
        id: leadId,
        nextFollowUp: followUpDate
      });
      
      if (success) {
        setLeads(prev => 
          prev.map(l => l.id === leadId ? { ...l, nextFollowUp: followUpDate } : l)
        );
      }
    } catch (err) {
      console.error('Failed to schedule follow-up:', err);
    }
  }, [leadService]);

  // Refresh leads
  const refresh = useCallback(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Initial fetch and real-time subscription
  useEffect(() => {
    fetchLeads();

    // Subscribe to real-time updates
    const unsubscribe = leadService.subscribe((updatedLeads) => {
      setLeads(updatedLeads);
    });

    // Connect WebSocket for real-time updates
    leadService.connectWebSocket();

    return unsubscribe;
  }, [fetchLeads, leadService]);

  return {
    leads,
    priorityItems,
    stats,
    loading,
    error,
    updateLeadPriority,
    updateLeadStatus,
    addLeadNotes,
    scheduleFollowUp,
    refresh
  };
};

// Hook for lead filtering
export const useLeadFilters = (initialFilters: LeadFilters = {}) => {
  const [filters, setFilters] = useState<LeadFilters>(initialFilters);

  const updateFilter = useCallback((key: keyof LeadFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const resetToInitial = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return {
    filters,
    updateFilter,
    clearFilters,
    resetToInitial,
    setFilters
  };
};

// Hook for lead stats
export const useLeadStats = () => {
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);

  const leadService = LeadService.getInstance();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await leadService.fetchLeads();
        setStats(response.stats);
      } catch (err) {
        console.error('Failed to fetch lead stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Subscribe to updates
    const unsubscribe = leadService.subscribe(() => {
      fetchStats();
    });

    return unsubscribe;
  }, [leadService]);

  return { stats, loading };
};

// Hook for priority-specific lead count
export const usePriorityLeadCount = (priority: 'hot' | 'active' | 'warm' | 'prospect') => {
  const [count, setCount] = useState(0);
  const [urgentCount, setUrgentCount] = useState(0);

  const { leads, loading } = useLeadTracker({ priority });

  useEffect(() => {
    if (!loading) {
      setCount(leads.length);
      // Count leads that need immediate attention (overdue follow-ups)
      const now = new Date();
      setUrgentCount(leads.filter(l => 
        l.nextFollowUp && l.nextFollowUp < now
      ).length);
    }
  }, [leads, loading]);

  return { count, urgentCount, loading };
};

// Hook for overdue follow-ups
export const useOverdueFollowUps = () => {
  const [overdueLeads, setOverdueLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const { leads } = useLeadTracker();

  useEffect(() => {
    const now = new Date();
    const overdue = leads.filter(lead => 
      lead.nextFollowUp && lead.nextFollowUp < now
    );
    
    setOverdueLeads(overdue);
    setLoading(false);
  }, [leads]);

  return { overdueLeads, loading };
};

// Hook for lead creation
export const useLeadCreator = () => {
  const [creating, setCreating] = useState(false);

  const leadService = LeadService.getInstance();

  const createLead = useCallback(async (payload: any) => {
    try {
      setCreating(true);
      const newLead = await leadService.createLead(payload);
      
      if (newLead) {
        return newLead;
      }
      return null;
    } catch (err) {
      console.error('Failed to create lead:', err);
      return null;
    } finally {
      setCreating(false);
    }
  }, [leadService]);

  return {
    creating,
    createLead
  };
};
