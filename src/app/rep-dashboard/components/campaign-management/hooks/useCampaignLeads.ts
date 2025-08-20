import { useState, useEffect, useCallback } from 'react';
import { Lead } from '../../../types';
import { campaignLeadService } from '../services/CampaignLeadService';

export interface UseCampaignLeadsReturn {
  // Lead data
  campaignLeads: Lead[];
  filteredLeads: Lead[];
  campaignStats: {
    total: number;
    prospect: number;
    hot: number;
    warm: number;
    active: number;
  };
  
  // Actions
  addLeadsToCampaign: (leads: Lead[], campaignId: string) => void;
  forwardLeadsToLeadManagement: (campaignId: string, listType: 'prospect' | 'hot' | 'warm' | 'active') => Lead[];
  updateLeadStatus: (leadId: string, status: string, campaignId: string) => void;
  refreshCampaignData: () => void;
  
  // State
  isLoading: boolean;
  error: string | null;
}

export function useCampaignLeads(
  selectedCampaignId: string,
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active'
): UseCampaignLeadsReturn {
  const [campaignLeads, setCampaignLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [campaignStats, setCampaignStats] = useState({
    total: 0,
    prospect: 0,
    hot: 0,
    warm: 0,
    active: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load campaign data
  const loadCampaignData = useCallback(() => {
    try {
      setIsLoading(true);
      setError(null);

      // Get all leads for the campaign
      const leads = campaignLeadService.getLeadsForCampaign(selectedCampaignId);
      setCampaignLeads(leads);

      // Get filtered leads based on active list
      const filtered = campaignLeadService.getFilteredLeads(selectedCampaignId, activeLeadList);
      setFilteredLeads(filtered);

      // Get campaign statistics
      const stats = campaignLeadService.getCampaignStats(selectedCampaignId);
      setCampaignStats(stats);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load campaign data');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCampaignId, activeLeadList]);

  // Subscribe to lead updates
  useEffect(() => {
    const unsubscribe = campaignLeadService.onLeadsUpdated((leads, campaignId) => {
      if (campaignId === selectedCampaignId) {
        loadCampaignData();
      }
    });

    return unsubscribe;
  }, [selectedCampaignId, loadCampaignData]);

  // Load data when campaign or list type changes
  useEffect(() => {
    loadCampaignData();
  }, [loadCampaignData]);

  // Actions
  const addLeadsToCampaign = useCallback((leads: Lead[], campaignId: string) => {
    try {
      campaignLeadService.addLeadsToCampaign(leads, campaignId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add leads');
    }
  }, []);

  const forwardLeadsToLeadManagement = useCallback((campaignId: string, listType: 'prospect' | 'hot' | 'warm' | 'active') => {
    try {
      return campaignLeadService.forwardLeadsToLeadManagement(campaignId, listType);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to forward leads');
      return [];
    }
  }, []);

  const updateLeadStatus = useCallback((leadId: string, status: string, campaignId: string) => {
    try {
      campaignLeadService.updateLeadStatus(leadId, status, campaignId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lead status');
    }
  }, []);

  const refreshCampaignData = useCallback(() => {
    loadCampaignData();
  }, [loadCampaignData]);

  return {
    campaignLeads,
    filteredLeads,
    campaignStats,
    addLeadsToCampaign,
    forwardLeadsToLeadManagement,
    updateLeadStatus,
    refreshCampaignData,
    isLoading,
    error
  };
}
