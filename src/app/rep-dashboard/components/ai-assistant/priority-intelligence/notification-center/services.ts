// Notification Center Services - API Ready
import { Notification, NotificationAPIResponse, NotificationUpdatePayload, NotificationFilters } from './types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
const NOTIFICATIONS_ENDPOINT = `${API_BASE_URL}/notifications`;

// Service Class for API Integration
export class NotificationService {
  private static instance: NotificationService;
  private cache: Map<string, NotificationAPIResponse> = new Map();
  private subscribers: Set<(notifications: Notification[]) => void> = new Set();

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Subscribe to real-time updates
  subscribe(callback: (notifications: Notification[]) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  // Notify all subscribers
  private notifySubscribers(notifications: Notification[]) {
    this.subscribers.forEach(callback => callback(notifications));
  }

  // Fetch notifications with filters
  async fetchNotifications(filters: NotificationFilters = {}): Promise<NotificationAPIResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.source) queryParams.append('source', filters.source);
      if (filters.unreadOnly) queryParams.append('unreadOnly', 'true');
      if (filters.actionRequiredOnly) queryParams.append('actionRequiredOnly', 'true');

      const cacheKey = queryParams.toString();
      
      // Check cache first
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey)!;
      }

      // In development, return mock data
      if (process.env.NODE_ENV === 'development') {
        const mockResponse = this.getMockNotifications(filters);
        this.cache.set(cacheKey, mockResponse);
        return mockResponse;
      }

      // Production API call
      const response = await fetch(`${NOTIFICATIONS_ENDPOINT}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch notifications: ${response.statusText}`);
      }

      const data: NotificationAPIResponse = await response.json();
      this.cache.set(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Fallback to mock data on error
      return this.getMockNotifications(filters);
    }
  }

  // Update notification status
  async updateNotification(payload: NotificationUpdatePayload): Promise<boolean> {
    try {
      // In development, simulate update
      if (process.env.NODE_ENV === 'development') {
        // Clear cache to force refresh
        this.cache.clear();
        return true;
      }

      // Production API call
      const response = await fetch(`${NOTIFICATIONS_ENDPOINT}/${payload.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to update notification: ${response.statusText}`);
      }

      // Clear cache to force refresh
      this.cache.clear();
      return true;
    } catch (error) {
      console.error('Error updating notification:', error);
      return false;
    }
  }

  // Mark all as read
  async markAllAsRead(filters: NotificationFilters = {}): Promise<boolean> {
    try {
      // In development, simulate update
      if (process.env.NODE_ENV === 'development') {
        this.cache.clear();
        return true;
      }

      // Production API call
      const response = await fetch(`${NOTIFICATIONS_ENDPOINT}/mark-all-read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error(`Failed to mark all as read: ${response.statusText}`);
      }

      this.cache.clear();
      return true;
    } catch (error) {
      console.error('Error marking all as read:', error);
      return false;
    }
  }

  // WebSocket connection for real-time updates
  connectWebSocket(): void {
    if (typeof window === 'undefined') return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/notifications';
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'notification_update') {
          this.cache.clear(); // Invalidate cache
          this.notifySubscribers(data.notifications);
        }
      };

      ws.onerror = (error) => {
        console.warn('WebSocket connection failed, falling back to polling:', error);
        this.startPolling();
      };
    } catch (error) {
      console.warn('WebSocket not available, using polling:', error);
      this.startPolling();
    }
  }

  // Fallback polling for real-time updates
  private startPolling(): void {
    setInterval(async () => {
      try {
        const response = await this.fetchNotifications();
        this.notifySubscribers(response.notifications);
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 30000); // Poll every 30 seconds
  }

  // Mock data for development
  private getMockNotifications(filters: NotificationFilters): NotificationAPIResponse {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Hot Lead Response Overdue',
        message: 'Sarah Williams has been waiting 24+ hours for response',
        type: 'urgent',
        priority: 'hot',
        timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
        read: false,
        actionRequired: true,
        source: 'lead',
        metadata: {
          leadId: 'lead_001',
          clientName: 'Sarah Williams'
        }
      },
      {
        id: '2',
        title: 'Court Date Scheduled',
        message: 'Michael Johnson - Court hearing set for March 15th',
        type: 'info',
        priority: 'active',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        actionRequired: false,
        source: 'calendar',
        metadata: {
          leadId: 'lead_002',
          clientName: 'Michael Johnson'
        }
      },
      {
        id: '3',
        title: 'Document Signed',
        message: 'Jennifer Davis completed structured settlement agreement',
        type: 'success',
        priority: 'warm',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: true,
        actionRequired: false,
        source: 'document',
        metadata: {
          leadId: 'lead_003',
          clientName: 'Jennifer Davis',
          documentId: 'doc_001'
        }
      }
    ];

    // Apply filters
    let filteredNotifications = mockNotifications;
    
    if (filters.priority) {
      filteredNotifications = filteredNotifications.filter(n => n.priority === filters.priority);
    }
    
    if (filters.type) {
      filteredNotifications = filteredNotifications.filter(n => n.type === filters.type);
    }
    
    if (filters.source) {
      filteredNotifications = filteredNotifications.filter(n => n.source === filters.source);
    }
    
    if (filters.unreadOnly) {
      filteredNotifications = filteredNotifications.filter(n => !n.read);
    }
    
    if (filters.actionRequiredOnly) {
      filteredNotifications = filteredNotifications.filter(n => n.actionRequired);
    }

    const stats = {
      total: filteredNotifications.length,
      unread: filteredNotifications.filter(n => !n.read).length,
      urgent: filteredNotifications.filter(n => n.type === 'urgent').length,
      actionRequired: filteredNotifications.filter(n => n.actionRequired).length,
      byPriority: {
        hot: filteredNotifications.filter(n => n.priority === 'hot').length,
        active: filteredNotifications.filter(n => n.priority === 'active').length,
        warm: filteredNotifications.filter(n => n.priority === 'warm').length,
        prospect: filteredNotifications.filter(n => n.priority === 'prospect').length,
        system: filteredNotifications.filter(n => n.priority === 'system').length,
      }
    };

    return {
      notifications: filteredNotifications,
      stats,
      hasMore: false
    };
  }
}
