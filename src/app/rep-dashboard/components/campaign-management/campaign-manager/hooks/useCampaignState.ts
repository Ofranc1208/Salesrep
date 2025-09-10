'use client';

// Campaign Manager State Management Hook - Consolidated from useCampaignManager + useCampaignManagement
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Campaign, LeadNotification } from '../../../../types';

interface UseCampaignStateProps {
  initialCampaigns?: Campaign[];
  initialSelectedId?: string;
}

export const useCampaignState = ({
  initialCampaigns = [],
  initialSelectedId
}: UseCampaignStateProps = {}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [selectedCampaignId, setSelectedCampaignId] = useState(
    initialSelectedId || initialCampaigns[0]?.id || ''
  );
  const [notifications, setNotifications] = useState<LeadNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCampaign = useMemo(() => 
    campaigns.find(c => c.id === selectedCampaignId) || null,
    [campaigns, selectedCampaignId]
  );

  // Handle campaign selection
  const handleCampaignChange = useCallback((campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setError(null);
    console.log(`Switched to campaign: ${campaignId}`);
  }, []);

  // Load campaign data
  const loadCampaignData = useCallback(async (campaignId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Loading data for campaign: ${campaignId}`);
      // In real app, this would fetch campaign details, leads, etc.
      
    } catch (err) {
      setError('Failed to load campaign data');
      console.error('Campaign loading error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update campaigns list
  const updateCampaigns = useCallback((newCampaigns: Campaign[]) => {
    setCampaigns(newCampaigns);
    
    // If selected campaign is no longer available, select first one
    if (!newCampaigns.find(c => c.id === selectedCampaignId)) {
      setSelectedCampaignId(newCampaigns[0]?.id || '');
    }
  }, [selectedCampaignId]);

  // Load initial data when selected campaign changes
  useEffect(() => {
    if (selectedCampaignId) {
      loadCampaignData(selectedCampaignId);
    }
  }, [selectedCampaignId, loadCampaignData]);

  return {
    // State
    campaigns,
    selectedCampaignId,
    selectedCampaign,
    notifications,
    isLoading,
    error,
    
    // Actions
    handleCampaignChange,
    loadCampaignData,
    updateCampaigns,
    setNotifications,
    setError
  };
};
