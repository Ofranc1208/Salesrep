// Email Alerts Types
export interface EmailAlert {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: Date;
  priority: 'hot' | 'active' | 'warm' | 'prospect' | 'system';
  type: 'client' | 'internal' | 'system' | 'document';
  read: boolean;
  urgent: boolean;
  attachments?: number;
  metadata?: {
    leadId?: string;
    clientName?: string;
    dealId?: string;
    documentId?: string;
    threadId?: string;
    [key: string]: any;
  };
}

export interface EmailFilters {
  priority?: 'hot' | 'active' | 'warm' | 'prospect' | 'system' | null;
  type?: 'client' | 'internal' | 'system' | 'document' | null;
  unreadOnly?: boolean;
  urgentOnly?: boolean;
  hasAttachments?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface EmailStats {
  total: number;
  unread: number;
  urgent: number;
  withAttachments: number;
  byPriority: {
    hot: number;
    active: number;
    warm: number;
    prospect: number;
    system: number;
  };
  byType: {
    client: number;
    internal: number;
    system: number;
    document: number;
  };
}

export interface EmailAlertsProps {
  selectedPriority: 'hot' | 'active' | 'warm' | 'prospect' | null;
}

// API Response Types
export interface EmailAPIResponse {
  emails: EmailAlert[];
  stats: EmailStats;
  hasMore: boolean;
  nextCursor?: string;
}

export interface EmailUpdatePayload {
  id: string;
  read?: boolean;
  archived?: boolean;
  starred?: boolean;
}

export interface EmailComposePayload {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  priority: EmailAlert['priority'];
  type: EmailAlert['type'];
  attachments?: File[];
}
