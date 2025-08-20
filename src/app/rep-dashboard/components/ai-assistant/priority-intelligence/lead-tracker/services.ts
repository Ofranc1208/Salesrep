// Lead Tracker Services - API Ready
import { Lead, LeadAPIResponse, LeadUpdatePayload, LeadCreatePayload, LeadFilters, PriorityItem } from './types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
const LEADS_ENDPOINT = `${API_BASE_URL}/leads`;

// Service Class for API Integration
export class LeadService {
  private static instance: LeadService;
  private cache: Map<string, LeadAPIResponse> = new Map();
  private subscribers: Set<(leads: Lead[]) => void> = new Set();

  static getInstance(): LeadService {
    if (!LeadService.instance) {
      LeadService.instance = new LeadService();
    }
    return LeadService.instance;
  }

  // Subscribe to real-time updates
  subscribe(callback: (leads: Lead[]) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  // Notify all subscribers
  private notifySubscribers(leads: Lead[]) {
    this.subscribers.forEach(callback => callback(leads));
  }

  // Fetch leads with filters
  async fetchLeads(filters: LeadFilters = {}): Promise<LeadAPIResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.source) queryParams.append('source', filters.source);
      if (filters.assignedDateRange) {
        queryParams.append('startDate', filters.assignedDateRange.start.toISOString());
        queryParams.append('endDate', filters.assignedDateRange.end.toISOString());
      }
      if (filters.valueRange) {
        queryParams.append('minValue', filters.valueRange.min.toString());
        queryParams.append('maxValue', filters.valueRange.max.toString());
      }
      if (filters.tags) {
        queryParams.append('tags', filters.tags.join(','));
      }

      const cacheKey = queryParams.toString();
      
      // Check cache first
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey)!;
      }

      // In development, return mock data
      if (process.env.NODE_ENV === 'development') {
        const mockResponse = this.getMockLeads(filters);
        this.cache.set(cacheKey, mockResponse);
        return mockResponse;
      }

      // Production API call
      const response = await fetch(`${LEADS_ENDPOINT}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch leads: ${response.statusText}`);
      }

      const data: LeadAPIResponse = await response.json();
      this.cache.set(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching leads:', error);
      // Fallback to mock data on error
      return this.getMockLeads(filters);
    }
  }

  // Update lead
  async updateLead(payload: LeadUpdatePayload): Promise<boolean> {
    try {
      // In development, simulate update
      if (process.env.NODE_ENV === 'development') {
        // Clear cache to force refresh
        this.cache.clear();
        return true;
      }

      // Production API call
      const response = await fetch(`${LEADS_ENDPOINT}/${payload.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to update lead: ${response.statusText}`);
      }

      // Clear cache to force refresh
      this.cache.clear();
      return true;
    } catch (error) {
      console.error('Error updating lead:', error);
      return false;
    }
  }

  // Create new lead
  async createLead(payload: LeadCreatePayload): Promise<Lead | null> {
    try {
      // In development, simulate creation
      if (process.env.NODE_ENV === 'development') {
        const newLead: Lead = {
          id: Date.now().toString(),
          ...payload,
          status: 'new',
          assignedDate: new Date(),
          metadata: {
            leadScore: Math.floor(Math.random() * 100),
            touchPoints: 0
          }
        };
        
        // Clear cache to force refresh
        this.cache.clear();
        return newLead;
      }

      // Production API call
      const response = await fetch(LEADS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to create lead: ${response.statusText}`);
      }

      const newLead: Lead = await response.json();
      
      // Clear cache to force refresh
      this.cache.clear();
      return newLead;
    } catch (error) {
      console.error('Error creating lead:', error);
      return null;
    }
  }

  // Delete lead
  async deleteLead(leadId: string): Promise<boolean> {
    try {
      // In development, simulate deletion
      if (process.env.NODE_ENV === 'development') {
        this.cache.clear();
        return true;
      }

      // Production API call
      const response = await fetch(`${LEADS_ENDPOINT}/${leadId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete lead: ${response.statusText}`);
      }

      this.cache.clear();
      return true;
    } catch (error) {
      console.error('Error deleting lead:', error);
      return false;
    }
  }

  // WebSocket connection for real-time updates
  connectWebSocket(): void {
    if (typeof window === 'undefined') return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/leads';
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'lead_update') {
          this.cache.clear(); // Invalidate cache
          this.notifySubscribers(data.leads);
        }
      };

      ws.onerror = (error) => {
        console.warn('Lead WebSocket connection failed, falling back to polling:', error);
        this.startPolling();
      };
    } catch (error) {
      console.warn('Lead WebSocket not available, using polling:', error);
      this.startPolling();
    }
  }

  // Fallback polling for real-time updates
  private startPolling(): void {
    setInterval(async () => {
      try {
        const response = await this.fetchLeads();
        this.notifySubscribers(response.leads);
      } catch (error) {
        console.error('Lead polling error:', error);
      }
    }, 120000); // Poll every 2 minutes
  }

  // Mock data for development
  private getMockLeads(filters: LeadFilters): LeadAPIResponse {
    const mockLeads: Lead[] = [
      {
        id: 'lead_001',
        name: 'Sarah Williams',
        email: 'sarah.williams@email.com',
        phone: '+1-555-0123',
        priority: 'hot',
        status: 'contacted',
        value: 125000,
        source: 'Website',
        assignedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        lastContact: new Date(Date.now() - 24 * 60 * 60 * 1000),
        nextFollowUp: new Date(Date.now() + 2 * 60 * 60 * 1000),
        notes: '24hr response overdue - urgent follow-up needed',
        tags: ['high-value', 'urgent'],
        metadata: {
          leadScore: 95,
          responseTime: 24,
          touchPoints: 3
        }
      },
      {
        id: 'lead_002',
        name: 'Michael Johnson',
        email: 'michael.j@email.com',
        phone: '+1-555-0456',
        priority: 'active',
        status: 'proposal',
        value: 87500,
        source: 'Referral',
        assignedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        nextFollowUp: new Date(Date.now() + 24 * 60 * 60 * 1000),
        notes: 'Court hearing scheduled for March 15th',
        tags: ['court-case', 'active-deal'],
        metadata: {
          leadScore: 78,
          responseTime: 4,
          touchPoints: 8
        }
      },
      {
        id: 'lead_003',
        name: 'Jennifer Davis',
        email: 'jennifer.davis@email.com',
        priority: 'warm',
        status: 'qualified',
        value: 65000,
        source: 'Cold Call',
        assignedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        nextFollowUp: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        notes: 'Interested but needs time to consider',
        tags: ['nurture', 'qualified'],
        metadata: {
          leadScore: 65,
          responseTime: 8,
          touchPoints: 5
        }
      }
    ];

    const mockPriorityItems: PriorityItem[] = [
      {
        type: 'hot',
        label: 'Hot List: 2 leads need immediate attention',
        color: 'red',
        urgency: 'high',
        count: 2,
        value: 212500,
        conversionRate: 45
      },
      {
        type: 'active',
        label: 'Active List: 2 deals progressing well',
        color: 'green',
        urgency: 'medium',
        count: 2,
        value: 175000,
        conversionRate: 78
      },
      {
        type: 'warm',
        label: 'Warm List: 1 lead ready for nurturing',
        color: 'orange',
        urgency: 'low',
        count: 1,
        value: 65000,
        conversionRate: 35
      },
      {
        type: 'prospect',
        label: 'Prospect List: 3 leads for initial contact',
        color: 'blue',
        urgency: 'medium',
        count: 3,
        value: 180000,
        conversionRate: 15
      }
    ];

    // Apply filters
    let filteredLeads = mockLeads;
    
    if (filters.priority) {
      filteredLeads = filteredLeads.filter(l => l.priority === filters.priority);
    }
    
    if (filters.status) {
      filteredLeads = filteredLeads.filter(l => l.status === filters.status);
    }
    
    if (filters.source) {
      filteredLeads = filteredLeads.filter(l => l.source === filters.source);
    }

    if (filters.valueRange) {
      filteredLeads = filteredLeads.filter(l => 
        l.value >= filters.valueRange!.min && l.value <= filters.valueRange!.max
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredLeads = filteredLeads.filter(l => 
        l.tags && l.tags.some(tag => filters.tags!.includes(tag))
      );
    }

    const stats = {
      total: filteredLeads.length,
      byPriority: {
        hot: filteredLeads.filter(l => l.priority === 'hot').length,
        active: filteredLeads.filter(l => l.priority === 'active').length,
        warm: filteredLeads.filter(l => l.priority === 'warm').length,
        prospect: filteredLeads.filter(l => l.priority === 'prospect').length,
      },
      byStatus: {
        new: filteredLeads.filter(l => l.status === 'new').length,
        contacted: filteredLeads.filter(l => l.status === 'contacted').length,
        qualified: filteredLeads.filter(l => l.status === 'qualified').length,
        proposal: filteredLeads.filter(l => l.status === 'proposal').length,
        negotiation: filteredLeads.filter(l => l.status === 'negotiation').length,
        closed: filteredLeads.filter(l => l.status === 'closed').length,
        lost: filteredLeads.filter(l => l.status === 'lost').length,
      },
      totalValue: filteredLeads.reduce((sum, l) => sum + l.value, 0),
      averageValue: filteredLeads.length > 0 ? filteredLeads.reduce((sum, l) => sum + l.value, 0) / filteredLeads.length : 0,
      conversionRate: 42, // Mock conversion rate
      averageResponseTime: 6.5 // Mock average response time in hours
    };

    return {
      leads: filteredLeads,
      priorityItems: mockPriorityItems,
      stats,
      hasMore: false
    };
  }
}
