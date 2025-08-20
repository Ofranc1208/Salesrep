// Email Alerts Services - API Ready
import { EmailAlert, EmailAPIResponse, EmailUpdatePayload, EmailComposePayload, EmailFilters } from './types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
const EMAIL_ENDPOINT = `${API_BASE_URL}/emails`;

// Service Class for API Integration
export class EmailService {
  private static instance: EmailService;
  private cache: Map<string, EmailAPIResponse> = new Map();
  private subscribers: Set<(emails: EmailAlert[]) => void> = new Set();

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  // Subscribe to real-time updates
  subscribe(callback: (emails: EmailAlert[]) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  // Notify all subscribers
  private notifySubscribers(emails: EmailAlert[]) {
    this.subscribers.forEach(callback => callback(emails));
  }

  // Fetch emails with filters
  async fetchEmails(filters: EmailFilters = {}): Promise<EmailAPIResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.unreadOnly) queryParams.append('unreadOnly', 'true');
      if (filters.urgentOnly) queryParams.append('urgentOnly', 'true');
      if (filters.hasAttachments) queryParams.append('hasAttachments', 'true');
      if (filters.dateRange) {
        queryParams.append('startDate', filters.dateRange.start.toISOString());
        queryParams.append('endDate', filters.dateRange.end.toISOString());
      }

      const cacheKey = queryParams.toString();
      
      // Check cache first
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey)!;
      }

      // In development, return mock data
      if (process.env.NODE_ENV === 'development') {
        const mockResponse = this.getMockEmails(filters);
        this.cache.set(cacheKey, mockResponse);
        return mockResponse;
      }

      // Production API call
      const response = await fetch(`${EMAIL_ENDPOINT}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch emails: ${response.statusText}`);
      }

      const data: EmailAPIResponse = await response.json();
      this.cache.set(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching emails:', error);
      // Fallback to mock data on error
      return this.getMockEmails(filters);
    }
  }

  // Update email status
  async updateEmail(payload: EmailUpdatePayload): Promise<boolean> {
    try {
      // In development, simulate update
      if (process.env.NODE_ENV === 'development') {
        // Clear cache to force refresh
        this.cache.clear();
        return true;
      }

      // Production API call
      const response = await fetch(`${EMAIL_ENDPOINT}/${payload.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to update email: ${response.statusText}`);
      }

      // Clear cache to force refresh
      this.cache.clear();
      return true;
    } catch (error) {
      console.error('Error updating email:', error);
      return false;
    }
  }

  // Compose and send email
  async composeEmail(payload: EmailComposePayload): Promise<boolean> {
    try {
      // In development, simulate sending
      if (process.env.NODE_ENV === 'development') {
        console.log('Mock email sent:', payload);
        return true;
      }

      // Production API call
      const formData = new FormData();
      formData.append('to', JSON.stringify(payload.to));
      if (payload.cc) formData.append('cc', JSON.stringify(payload.cc));
      if (payload.bcc) formData.append('bcc', JSON.stringify(payload.bcc));
      formData.append('subject', payload.subject);
      formData.append('body', payload.body);
      formData.append('priority', payload.priority);
      formData.append('type', payload.type);
      
      // Add attachments if any
      if (payload.attachments) {
        payload.attachments.forEach((file, index) => {
          formData.append(`attachment_${index}`, file);
        });
      }

      const response = await fetch(`${EMAIL_ENDPOINT}/compose`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error composing email:', error);
      return false;
    }
  }

  // Mark all as read
  async markAllAsRead(filters: EmailFilters = {}): Promise<boolean> {
    try {
      // In development, simulate update
      if (process.env.NODE_ENV === 'development') {
        this.cache.clear();
        return true;
      }

      // Production API call
      const response = await fetch(`${EMAIL_ENDPOINT}/mark-all-read`, {
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

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/emails';
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'email_update') {
          this.cache.clear(); // Invalidate cache
          this.notifySubscribers(data.emails);
        }
      };

      ws.onerror = (error) => {
        console.warn('Email WebSocket connection failed, falling back to polling:', error);
        this.startPolling();
      };
    } catch (error) {
      console.warn('Email WebSocket not available, using polling:', error);
      this.startPolling();
    }
  }

  // Fallback polling for real-time updates
  private startPolling(): void {
    setInterval(async () => {
      try {
        const response = await this.fetchEmails();
        this.notifySubscribers(response.emails);
      } catch (error) {
        console.error('Email polling error:', error);
      }
    }, 60000); // Poll every minute
  }

  // Mock data for development
  private getMockEmails(filters: EmailFilters): EmailAPIResponse {
    const mockEmails: EmailAlert[] = [
      {
        id: '1',
        from: 'Sarah Williams',
        subject: 'Re: Settlement Payment Question',
        preview: 'Hi, I still haven\'t heard back about my payment timeline...',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        priority: 'hot',
        type: 'client',
        read: false,
        urgent: true,
        metadata: {
          leadId: 'lead_001',
          clientName: 'Sarah Williams'
        }
      },
      {
        id: '2',
        from: 'DocuSign',
        subject: 'Document Completed - Jennifer Davis',
        preview: 'Jennifer Davis has completed signing the structured settlement agreement...',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        priority: 'warm',
        type: 'document',
        read: false,
        urgent: false,
        attachments: 1,
        metadata: {
          leadId: 'lead_003',
          clientName: 'Jennifer Davis',
          documentId: 'doc_001'
        }
      },
      {
        id: '3',
        from: 'Court Clerk',
        subject: 'Hearing Confirmation - Michael Johnson',
        preview: 'This confirms the court hearing scheduled for March 15th at 10:30 AM...',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        priority: 'active',
        type: 'system',
        read: true,
        urgent: false,
        metadata: {
          leadId: 'lead_002',
          clientName: 'Michael Johnson'
        }
      }
    ];

    // Apply filters
    let filteredEmails = mockEmails;
    
    if (filters.priority) {
      filteredEmails = filteredEmails.filter(e => e.priority === filters.priority);
    }
    
    if (filters.type) {
      filteredEmails = filteredEmails.filter(e => e.type === filters.type);
    }
    
    if (filters.unreadOnly) {
      filteredEmails = filteredEmails.filter(e => !e.read);
    }
    
    if (filters.urgentOnly) {
      filteredEmails = filteredEmails.filter(e => e.urgent);
    }

    if (filters.hasAttachments) {
      filteredEmails = filteredEmails.filter(e => e.attachments && e.attachments > 0);
    }

    const stats = {
      total: filteredEmails.length,
      unread: filteredEmails.filter(e => !e.read).length,
      urgent: filteredEmails.filter(e => e.urgent).length,
      withAttachments: filteredEmails.filter(e => e.attachments && e.attachments > 0).length,
      byPriority: {
        hot: filteredEmails.filter(e => e.priority === 'hot').length,
        active: filteredEmails.filter(e => e.priority === 'active').length,
        warm: filteredEmails.filter(e => e.priority === 'warm').length,
        prospect: filteredEmails.filter(e => e.priority === 'prospect').length,
        system: filteredEmails.filter(e => e.priority === 'system').length,
      },
      byType: {
        client: filteredEmails.filter(e => e.type === 'client').length,
        internal: filteredEmails.filter(e => e.type === 'internal').length,
        system: filteredEmails.filter(e => e.type === 'system').length,
        document: filteredEmails.filter(e => e.type === 'document').length,
      }
    };

    return {
      emails: filteredEmails,
      stats,
      hasMore: false
    };
  }
}
