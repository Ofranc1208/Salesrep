// Calendar Updates Types
export interface CalendarEvent {
  id: string;
  title: string;
  type: 'meeting' | 'deadline' | 'follow-up' | 'court' | 'call';
  time: string;
  date: string;
  priority: 'hot' | 'active' | 'warm' | 'prospect' | 'system';
  status: 'upcoming' | 'overdue' | 'completed';
  client?: string;
  description?: string;
  location?: string;
  attendees?: string[];
  metadata?: {
    leadId?: string;
    dealId?: string;
    documentId?: string;
    [key: string]: any;
  };
}

export interface CalendarFilters {
  priority?: 'hot' | 'active' | 'warm' | 'prospect' | null;
  type?: 'meeting' | 'deadline' | 'follow-up' | 'court' | 'call' | null;
  status?: 'upcoming' | 'overdue' | 'completed' | null;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface CalendarStats {
  total: number;
  upcoming: number;
  overdue: number;
  completed: number;
  byPriority: {
    hot: number;
    active: number;
    warm: number;
    prospect: number;
    system: number;
  };
  byType: {
    meeting: number;
    deadline: number;
    'follow-up': number;
    court: number;
    call: number;
  };
}

export interface CalendarUpdatesProps {
  selectedPriority: 'hot' | 'active' | 'warm' | 'prospect' | null;
}

// API Response Types
export interface CalendarAPIResponse {
  events: CalendarEvent[];
  stats: CalendarStats;
  hasMore: boolean;
  nextCursor?: string;
}

export interface CalendarEventPayload {
  title: string;
  type: CalendarEvent['type'];
  time: string;
  date: string;
  priority: CalendarEvent['priority'];
  client?: string;
  description?: string;
  location?: string;
  attendees?: string[];
}

export interface CalendarUpdatePayload {
  id: string;
  status?: CalendarEvent['status'];
  time?: string;
  date?: string;
  title?: string;
  description?: string;
}
