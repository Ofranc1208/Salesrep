// Shared type definitions for both Manager and Sales Rep Dashboards

export interface BaseLead {
  id: string;
  crmId: string;
  clientName: string;
  phoneNumbers: string[];
  status: LeadStatus;
  assignedTo?: string;
  campaignId?: string;
  insuranceCompany: string;
  paymentAmount: number;
  startDate: string;
  endDate: string;
}

export interface LeadAssignment {
  leadId: string;
  repId: string;
  assignedAt: Date;
  campaignId: string;
  status: AssignmentStatus;
}

export interface AssignmentResult extends LeadAssignment {
  updatedLead?: BaseLead;
}

export interface SalesRep {
  id: string;
  name: string;
  email: string;
  activeLeads: number;
  maxLeads: number;
  status: RepStatus;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  totalLeads: number;
  assignedLeads: number;
  status: CampaignStatus;
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
  category: TemplateCategory;
  isActive: boolean;
}

// Enums for type safety
export enum LeadStatus {
  NEW = 'new',
  ASSIGNED = 'assigned',
  CONTACTED = 'contacted',
  RESPONDED = 'responded',
  QUALIFIED = 'qualified',
  CLOSED = 'closed'
}

export enum AssignmentStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  REASSIGNED = 'reassigned'
}

export enum RepStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BUSY = 'busy',
  OFFLINE = 'offline'
}

export enum CampaignStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed'
}

export enum TemplateCategory {
  INITIAL_CONTACT = 'initial_contact',
  FOLLOW_UP = 'follow_up',
  OFFER = 'offer',
  CLOSING = 'closing'
}

// Shared utility types
export type PhoneNumberStatus = 'working' | 'invalid' | 'disconnected' | 'voicemail' | 'business';

export interface PhoneNumberInfo {
  number: string;
  status: PhoneNumberStatus;
  isPrimary: boolean;
  lastVerified: string;
  notes?: string;
}

// Event types for real-time updates
export interface LeadEvent {
  type: 'lead_assigned' | 'lead_status_changed' | 'lead_reassigned';
  leadId: string;
  repId?: string;
  status?: LeadStatus;
  timestamp: Date;
  metadata?: Record<string, any>;
}
