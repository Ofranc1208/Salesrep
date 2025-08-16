/**
 * useSharedState - Manages shared state across tabs
 * Extracted from useDataFlow.ts for better separation of concerns
 */

import { useState, useEffect, useCallback } from 'react';
import { BaseLead } from '../types';
import broadcastService from '../services/BroadcastService';

// Shared state across all instances
let sharedLeads: BaseLead[] = [];
let sharedStats: any = null;
let listeners: (() => void)[] = [];

export const useSharedState = () => {
  const [leads, setLeads] = useState<BaseLead[]>(sharedLeads);
  const [stats, setStats] = useState<any>(sharedStats);

  /**
   * Update shared state and notify all instances
   */
  const updateSharedState = useCallback((newLeads: BaseLead[], newStats: any) => {
    console.log('useSharedState: Updating shared state:', { 
      newLeadsCount: newLeads.length, 
      newLeads: newLeads.map(l => ({ id: l.id, status: l.status })), 
      newStats 
    });
    
    // Update local shared state
    sharedLeads = newLeads;
    sharedStats = newStats;
    
    // Broadcast to other tabs
    broadcastService.broadcastDataUpdate(newLeads, newStats);
    
    // Notify local listeners
    listeners.forEach(listener => listener());
  }, []);

  /**
   * Subscribe to shared state changes
   */
  useEffect(() => {
    // Add this instance to listeners
    const listener = () => {
      console.log('useSharedState: Shared state updated, syncing local state');
      setLeads([...sharedLeads]);
      setStats({...sharedStats});
    };
    
    listeners.push(listener);

    // Subscribe to broadcast updates
    const unsubscribeData = broadcastService.subscribe('DATA_UPDATE', (data: { leads: BaseLead[]; stats: any }) => {
      console.log('useSharedState: Received data update from other tab:', { 
        leadsCount: data.leads.length,
        leads: data.leads.map(l => ({ id: l.id, status: l.status })),
        stats: data.stats 
      });
      
      // Update local shared state
      sharedLeads = data.leads;
      sharedStats = data.stats;
      
      // Update local React state
      setLeads([...data.leads]);
      setStats({...data.stats});
    });

    return () => {
      // Remove this instance from listeners
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
      
      // Unsubscribe from broadcasts
      unsubscribeData();
    };
  }, []);

  return {
    leads,
    stats,
    sharedLeads,
    sharedStats,
    updateSharedState,
    setLeads,
    setStats
  };
};
