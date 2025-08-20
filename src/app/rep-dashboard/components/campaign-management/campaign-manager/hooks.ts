// Campaign Manager Module Hooks
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Campaign, LeadNotification } from '../../../types';
import { CampaignMetrics, CampaignPerformance, CampaignState } from './types';

// Re-export campaign lead management hook
export { useCampaignLeads } from '../hooks/useCampaignLeads';

// Hook for managing campaign state
export const useCampaignManager = (
  initialCampaigns: Campaign[] = [],
  initialSelectedId?: string
) => {
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

// Hook for campaign notifications
export const useCampaignNotifications = (campaignId: string) => {
  const [notifications, setNotifications] = useState<LeadNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mark notification as read
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
    
    // In real app, this would make an API call
    console.log(`Marked notification ${notificationId} as read`);
  }, []);

  // Dismiss notification
  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== notificationId)
    );
    
    // In real app, this would make an API call
    console.log(`Dismissed notification ${notificationId}`);
  }, []);

  // Load notifications for campaign
  const loadNotifications = useCallback(async () => {
    if (!campaignId) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock notifications
      const mockNotifications: LeadNotification[] = [
        {
          id: 'notif-1',
          campaignName: 'Q1 Settlement Outreach',
          leadCount: 3,
          managerName: 'Sarah Johnson',
          timestamp: new Date().toISOString(),
          isRead: false,
          campaignId: 'campaign-1'
        },
        {
          id: 'notif-2',
          campaignName: 'High-Value Prospects',
          leadCount: 2,
          managerName: 'Mike Davis',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isRead: false,
          campaignId: 'campaign-2'
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [campaignId]);

  // Load notifications when campaign changes
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.isRead).length,
    [notifications]
  );

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    dismissNotification,
    loadNotifications
  };
};

// Hook for campaign metrics calculation
export const useCampaignMetrics = (campaign: Campaign | null): CampaignMetrics | null => {
  return useMemo(() => {
    if (!campaign) return null;

    const totalLeads = campaign.totalLeads;
    const processedLeads = campaign.processedLeads;
    const remainingLeads = totalLeads - processedLeads;
    const progressPercentage = totalLeads > 0 ? Math.round((processedLeads / totalLeads) * 100) : 0;
    
    // Calculate days since campaign started (mock date)
    const daysSinceStart = Math.ceil(
      (Date.now() - new Date('2024-01-15').getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const averagePerDay = daysSinceStart > 0 ? Math.round(processedLeads / daysSinceStart) : 0;
    const estimatedDaysRemaining = averagePerDay > 0 ? Math.ceil(remainingLeads / averagePerDay) : 0;
    
    // Mock conversion rate based on campaign status
    const conversionRate = campaign.status === 'active' ? 0.75 : 0.60;

    return {
      totalLeads,
      processedLeads,
      remainingLeads,
      progressPercentage,
      conversionRate,
      averagePerDay,
      estimatedDaysRemaining
    };
  }, [campaign]);
};

// Hook for campaign actions
export const useCampaignActions = () => {
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const pauseCampaign = useCallback(async (campaignId: string) => {
    setActionLoading(`pause-${campaignId}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Pausing campaign: ${campaignId}`);
      
      // In real app, this would make an API call
      alert('Campaign paused successfully!');
    } catch (error) {
      console.error(`Failed to pause campaign ${campaignId}:`, error);
    } finally {
      setActionLoading(null);
    }
  }, []);

  const resumeCampaign = useCallback(async (campaignId: string) => {
    setActionLoading(`resume-${campaignId}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Resuming campaign: ${campaignId}`);
      
      // In real app, this would make an API call
      alert('Campaign resumed successfully!');
    } catch (error) {
      console.error(`Failed to resume campaign ${campaignId}:`, error);
    } finally {
      setActionLoading(null);
    }
  }, []);

  const exportCampaignData = useCallback(async (
    campaignId: string, 
    format: 'csv' | 'xlsx' = 'csv'
  ) => {
    setActionLoading(`export-${campaignId}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Exporting campaign ${campaignId} as ${format}`);
      
      // Mock export URL
      const exportUrl = `https://api.example.com/exports/campaign-${campaignId}.${format}`;
      
      // In real app, this would trigger a download
      alert(`Campaign data exported! Download: ${exportUrl}`);
      
      return exportUrl;
    } catch (error) {
      console.error(`Failed to export campaign ${campaignId}:`, error);
      throw error;
    } finally {
      setActionLoading(null);
    }
  }, []);

  const generateReport = useCallback(async (campaignId: string) => {
    setActionLoading(`report-${campaignId}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log(`Generating report for campaign: ${campaignId}`);
      
      // In real app, this would generate and return a comprehensive report
      alert('Campaign report generated successfully!');
    } catch (error) {
      console.error(`Failed to generate report for campaign ${campaignId}:`, error);
    } finally {
      setActionLoading(null);
    }
  }, []);

  return {
    actionLoading,
    pauseCampaign,
    resumeCampaign,
    exportCampaignData,
    generateReport
  };
};
