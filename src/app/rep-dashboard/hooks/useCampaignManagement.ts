// DEPRECATED: Consolidated into campaign-manager/hooks/useCampaignState.ts
// This hook is now a simple wrapper for backward compatibility

import { mockCampaigns, mockNotifications } from '../utils/mock-data/index';
import { useCampaignState } from '../components/campaign-management/campaign-manager/hooks/useCampaignState';

export function useCampaignManagement() {
  // Use the consolidated hook with mock data
  const campaignState = useCampaignState({
    initialCampaigns: mockCampaigns,
    initialSelectedId: 'q1-2024'
  });

  // Initialize notifications with mock data if empty
  if (campaignState.notifications.length === 0) {
    campaignState.setNotifications(mockNotifications);
  }

  return {
    // State
    campaigns: campaignState.campaigns,
    selectedCampaignId: campaignState.selectedCampaignId,
    notifications: campaignState.notifications,
    
    // Computed
    selectedCampaign: campaignState.selectedCampaign,
    
    // Actions
    handleCampaignChange: campaignState.handleCampaignChange,
    handleNotificationMarkAsRead: (notificationId: string) => {
      const updatedNotifications = campaignState.notifications.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      );
      campaignState.setNotifications(updatedNotifications);
    },
    handleNotificationDismiss: (notificationId: string) => {
      const updatedNotifications = campaignState.notifications.filter(n => n.id !== notificationId);
      campaignState.setNotifications(updatedNotifications);
    }
  };
}
