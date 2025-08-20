// Notification Center Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'info' | 'warning' | 'success';
  priority: 'hot' | 'active' | 'warm' | 'prospect' | 'system';
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
  source: 'lead' | 'calendar' | 'email' | 'document' | 'system';
  metadata?: {
    leadId?: string;
    clientName?: string;
    dealId?: string;
    documentId?: string;
    [key: string]: any;
  };
}

export interface NotificationFilters {
  priority?: 'hot' | 'active' | 'warm' | 'prospect' | null;
  type?: 'urgent' | 'info' | 'warning' | 'success' | null;
  source?: 'lead' | 'calendar' | 'email' | 'document' | 'system' | null;
  unreadOnly?: boolean;
  actionRequiredOnly?: boolean;
}

export interface NotificationStats {
  total: number;
  unread: number;
  urgent: number;
  actionRequired: number;
  byPriority: {
    hot: number;
    active: number;
    warm: number;
    prospect: number;
    system: number;
  };
}

export interface NotificationCenterProps {
  selectedPriority: 'hot' | 'active' | 'warm' | 'prospect' | null;
}

// API Response Types
export interface NotificationAPIResponse {
  notifications: Notification[];
  stats: NotificationStats;
  hasMore: boolean;
  nextCursor?: string;
}

export interface NotificationUpdatePayload {
  id: string;
  read?: boolean;
  archived?: boolean;
}
