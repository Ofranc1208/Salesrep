'use client';

// Campaign Manager Notifications Hook
import { useState, useCallback, useMemo, useEffect } from 'react';
import { LeadNotification } from '../../../../types';

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
