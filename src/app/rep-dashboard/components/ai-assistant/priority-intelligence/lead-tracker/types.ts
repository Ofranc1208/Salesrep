// Lead Tracker Types
export interface PriorityItem {
  type: 'hot' | 'active' | 'warm' | 'prospect';
  label: string;
  color: string;
  urgency: 'high' | 'medium' | 'low';
  count: number;
  value?: number; // Pipeline value
  conversionRate?: number;
  lastActivity?: Date;
  metadata?: {
    averageResponseTime?: number;
    completionRate?: number;
    [key: string]: any;
  };
}

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  priority: 'hot' | 'active' | 'warm' | 'prospect';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost';
  value: number;
  source: string;
  assignedDate: Date;
  lastContact?: Date;
  nextFollowUp?: Date;
  notes?: string;
  tags?: string[];
  metadata?: {
    leadScore?: number;
    responseTime?: number;
    touchPoints?: number;
    [key: string]: any;
  };
}

export interface LeadFilters {
  priority?: 'hot' | 'active' | 'warm' | 'prospect' | null;
  status?: Lead['status'] | null;
  source?: string | null;
  assignedDateRange?: {
    start: Date;
    end: Date;
  };
  valueRange?: {
    min: number;
    max: number;
  };
  tags?: string[];
}

export interface LeadStats {
  total: number;
  byPriority: {
    hot: number;
    active: number;
    warm: number;
    prospect: number;
  };
  byStatus: {
    new: number;
    contacted: number;
    qualified: number;
    proposal: number;
    negotiation: number;
    closed: number;
    lost: number;
  };
  totalValue: number;
  averageValue: number;
  conversionRate: number;
  averageResponseTime: number;
}

export interface LeadTrackerProps {
  priorityItems: readonly PriorityItem[];
  selectedPriority: 'hot' | 'active' | 'warm' | 'prospect' | null;
  onPriorityClick: (priority: 'hot' | 'active' | 'warm' | 'prospect') => void;
}

// API Response Types
export interface LeadAPIResponse {
  leads: Lead[];
  priorityItems: PriorityItem[];
  stats: LeadStats;
  hasMore: boolean;
  nextCursor?: string;
}

export interface LeadUpdatePayload {
  id: string;
  priority?: Lead['priority'];
  status?: Lead['status'];
  value?: number;
  notes?: string;
  tags?: string[];
  nextFollowUp?: Date;
}

export interface LeadCreatePayload {
  name: string;
  email?: string;
  phone?: string;
  priority: Lead['priority'];
  value: number;
  source: string;
  notes?: string;
  tags?: string[];
}
