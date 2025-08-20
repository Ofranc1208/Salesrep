// Calendar Updates Services - API Ready
import { CalendarEvent, CalendarAPIResponse, CalendarEventPayload, CalendarUpdatePayload, CalendarFilters } from './types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
const CALENDAR_ENDPOINT = `${API_BASE_URL}/calendar`;

// Service Class for API Integration
export class CalendarService {
  private static instance: CalendarService;
  private cache: Map<string, CalendarAPIResponse> = new Map();
  private subscribers: Set<(events: CalendarEvent[]) => void> = new Set();

  static getInstance(): CalendarService {
    if (!CalendarService.instance) {
      CalendarService.instance = new CalendarService();
    }
    return CalendarService.instance;
  }

  // Subscribe to real-time updates
  subscribe(callback: (events: CalendarEvent[]) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  // Notify all subscribers
  private notifySubscribers(events: CalendarEvent[]) {
    this.subscribers.forEach(callback => callback(events));
  }

  // Fetch calendar events with filters
  async fetchEvents(filters: CalendarFilters = {}): Promise<CalendarAPIResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.status) queryParams.append('status', filters.status);
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
        const mockResponse = this.getMockEvents(filters);
        this.cache.set(cacheKey, mockResponse);
        return mockResponse;
      }

      // Production API call
      const response = await fetch(`${CALENDAR_ENDPOINT}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch calendar events: ${response.statusText}`);
      }

      const data: CalendarAPIResponse = await response.json();
      this.cache.set(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      // Fallback to mock data on error
      return this.getMockEvents(filters);
    }
  }

  // Create new calendar event
  async createEvent(payload: CalendarEventPayload): Promise<CalendarEvent | null> {
    try {
      // In development, simulate creation
      if (process.env.NODE_ENV === 'development') {
        const newEvent: CalendarEvent = {
          id: Date.now().toString(),
          ...payload,
          status: 'upcoming'
        };
        
        // Clear cache to force refresh
        this.cache.clear();
        return newEvent;
      }

      // Production API call
      const response = await fetch(CALENDAR_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to create calendar event: ${response.statusText}`);
      }

      const newEvent: CalendarEvent = await response.json();
      
      // Clear cache to force refresh
      this.cache.clear();
      return newEvent;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      return null;
    }
  }

  // Update calendar event
  async updateEvent(payload: CalendarUpdatePayload): Promise<boolean> {
    try {
      // In development, simulate update
      if (process.env.NODE_ENV === 'development') {
        // Clear cache to force refresh
        this.cache.clear();
        return true;
      }

      // Production API call
      const response = await fetch(`${CALENDAR_ENDPOINT}/${payload.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to update calendar event: ${response.statusText}`);
      }

      // Clear cache to force refresh
      this.cache.clear();
      return true;
    } catch (error) {
      console.error('Error updating calendar event:', error);
      return false;
    }
  }

  // Delete calendar event
  async deleteEvent(eventId: string): Promise<boolean> {
    try {
      // In development, simulate deletion
      if (process.env.NODE_ENV === 'development') {
        this.cache.clear();
        return true;
      }

      // Production API call
      const response = await fetch(`${CALENDAR_ENDPOINT}/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete calendar event: ${response.statusText}`);
      }

      this.cache.clear();
      return true;
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      return false;
    }
  }

  // WebSocket connection for real-time updates
  connectWebSocket(): void {
    if (typeof window === 'undefined') return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/calendar';
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'calendar_update') {
          this.cache.clear(); // Invalidate cache
          this.notifySubscribers(data.events);
        }
      };

      ws.onerror = (error) => {
        console.warn('Calendar WebSocket connection failed, falling back to polling:', error);
        this.startPolling();
      };
    } catch (error) {
      console.warn('Calendar WebSocket not available, using polling:', error);
      this.startPolling();
    }
  }

  // Fallback polling for real-time updates
  private startPolling(): void {
    setInterval(async () => {
      try {
        const response = await this.fetchEvents();
        this.notifySubscribers(response.events);
      } catch (error) {
        console.error('Calendar polling error:', error);
      }
    }, 60000); // Poll every minute
  }

  // Mock data for development
  private getMockEvents(filters: CalendarFilters): CalendarAPIResponse {
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Follow-up Call - Sarah Williams',
        type: 'follow-up',
        time: '2:00 PM',
        date: 'Today',
        priority: 'hot',
        status: 'overdue',
        client: 'Sarah Williams',
        metadata: {
          leadId: 'lead_001',
        }
      },
      {
        id: '2',
        title: 'Court Hearing - Michael Johnson',
        type: 'court',
        time: '10:30 AM',
        date: 'Mar 15',
        priority: 'active',
        status: 'upcoming',
        client: 'Michael Johnson',
        location: 'County Courthouse',
        metadata: {
          leadId: 'lead_002',
          dealId: 'deal_001'
        }
      },
      {
        id: '3',
        title: 'Document Review Meeting',
        type: 'meeting',
        time: '3:30 PM',
        date: 'Tomorrow',
        priority: 'active',
        status: 'upcoming',
        attendees: ['Legal Team', 'Client Rep']
      },
      {
        id: '4',
        title: 'Prospect Outreach - New Leads',
        type: 'call',
        time: '11:00 AM',
        date: 'Mar 12',
        priority: 'prospect',
        status: 'upcoming'
      },
      {
        id: '5',
        title: 'Jennifer Davis - Nurture Call',
        type: 'follow-up',
        time: '1:00 PM',
        date: 'Mar 13',
        priority: 'warm',
        status: 'upcoming',
        client: 'Jennifer Davis',
        metadata: {
          leadId: 'lead_003'
        }
      }
    ];

    // Apply filters
    let filteredEvents = mockEvents;
    
    if (filters.priority) {
      filteredEvents = filteredEvents.filter(e => e.priority === filters.priority);
    }
    
    if (filters.type) {
      filteredEvents = filteredEvents.filter(e => e.type === filters.type);
    }
    
    if (filters.status) {
      filteredEvents = filteredEvents.filter(e => e.status === filters.status);
    }

    const stats = {
      total: filteredEvents.length,
      upcoming: filteredEvents.filter(e => e.status === 'upcoming').length,
      overdue: filteredEvents.filter(e => e.status === 'overdue').length,
      completed: filteredEvents.filter(e => e.status === 'completed').length,
      byPriority: {
        hot: filteredEvents.filter(e => e.priority === 'hot').length,
        active: filteredEvents.filter(e => e.priority === 'active').length,
        warm: filteredEvents.filter(e => e.priority === 'warm').length,
        prospect: filteredEvents.filter(e => e.priority === 'prospect').length,
        system: filteredEvents.filter(e => e.priority === 'system').length,
      },
      byType: {
        meeting: filteredEvents.filter(e => e.type === 'meeting').length,
        deadline: filteredEvents.filter(e => e.type === 'deadline').length,
        'follow-up': filteredEvents.filter(e => e.type === 'follow-up').length,
        court: filteredEvents.filter(e => e.type === 'court').length,
        call: filteredEvents.filter(e => e.type === 'call').length,
      }
    };

    return {
      events: filteredEvents,
      stats,
      hasMore: false
    };
  }
}
