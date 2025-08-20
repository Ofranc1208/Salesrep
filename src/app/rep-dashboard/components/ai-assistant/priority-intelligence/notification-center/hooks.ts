// Notification Center Hooks
import { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationFilters, NotificationStats } from './types';
import { NotificationService } from './services';

// Main hook for notification management
export const useNotifications = (filters: NotificationFilters = {}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState<NotificationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const notificationService = NotificationService.getInstance();

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await notificationService.fetchNotifications(filters);
      setNotifications(response.notifications);
      setStats(response.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  }, [filters, notificationService]);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const success = await notificationService.updateNotification({
        id: notificationId,
        read: true
      });
      
      if (success) {
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
        
        // Update stats
        if (stats) {
          setStats(prev => prev ? { ...prev, unread: prev.unread - 1 } : null);
        }
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }, [notificationService, stats]);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    try {
      const success = await notificationService.markAllAsRead(filters);
      
      if (success) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        
        // Update stats
        if (stats) {
          setStats(prev => prev ? { ...prev, unread: 0 } : null);
        }
      }
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  }, [notificationService, filters, stats]);

  // Refresh notifications
  const refresh = useCallback(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Initial fetch and real-time subscription
  useEffect(() => {
    fetchNotifications();

    // Subscribe to real-time updates
    const unsubscribe = notificationService.subscribe((updatedNotifications) => {
      setNotifications(updatedNotifications);
    });

    // Connect WebSocket for real-time updates
    notificationService.connectWebSocket();

    return unsubscribe;
  }, [fetchNotifications, notificationService]);

  return {
    notifications,
    stats,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refresh
  };
};

// Hook for notification filtering
export const useNotificationFilters = (initialFilters: NotificationFilters = {}) => {
  const [filters, setFilters] = useState<NotificationFilters>(initialFilters);

  const updateFilter = useCallback((key: keyof NotificationFilters, value: any) => {
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

// Hook for notification stats
export const useNotificationStats = () => {
  const [stats, setStats] = useState<NotificationStats | null>(null);
  const [loading, setLoading] = useState(true);

  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await notificationService.fetchNotifications();
        setStats(response.stats);
      } catch (err) {
        console.error('Failed to fetch notification stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Subscribe to updates
    const unsubscribe = notificationService.subscribe(() => {
      fetchStats();
    });

    return unsubscribe;
  }, [notificationService]);

  return { stats, loading };
};

// Hook for real-time notification count
export const useNotificationCount = (priority?: 'hot' | 'active' | 'warm' | 'prospect') => {
  const [count, setCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  const { notifications, loading } = useNotifications(
    priority ? { priority } : {}
  );

  useEffect(() => {
    if (!loading) {
      setCount(notifications.length);
      setUnreadCount(notifications.filter(n => !n.read).length);
    }
  }, [notifications, loading]);

  return { count, unreadCount, loading };
};
