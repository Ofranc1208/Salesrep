import { useState } from 'react';
import { mockCampaigns, mockNotifications, Campaign, LeadNotification } from '../utils/mock-data/index';

export function useCampaignManagement() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedCampaignId, setSelectedCampaignId] = useState('q1-2024');
  const [notifications, setNotifications] = useState<LeadNotification[]>(mockNotifications);

  const handleCampaignChange = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    console.log(`Switched to campaign: ${campaignId}`);
  };

  const handleNotificationMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
  };

  const handleNotificationDismiss = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getSelectedCampaign = () => {
    return campaigns.find(c => c.id === selectedCampaignId) || null;
  };

  return {
    // State
    campaigns,
    selectedCampaignId,
    notifications,
    
    // Computed
    selectedCampaign: getSelectedCampaign(),
    
    // Actions
    handleCampaignChange,
    handleNotificationMarkAsRead,
    handleNotificationDismiss
  };
}
