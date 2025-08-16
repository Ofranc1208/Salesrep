// Type definitions for the Rep Dashboard

export interface PhoneNumber {
  number: string;
  status: string;
  lastUsed: string;
  isPrimary: boolean;
  type: string;
  relationship: string;
  lastVerified: string;
  notes?: string;
  auditTrail?: PhoneNumberAudit[];
}

export interface PhoneNumberAudit {
  id: string;
  field: string;
  oldValue: string;
  newValue: string;
  editedBy: string;
  editedAt: string;
  reason?: string;
}

export interface Message {
  id: number;
  type: string;
  phoneNumber: string;
  message: string;
  sentDate: string;
  status: string;
  response: string | null;
}

export interface StructuredSettlementDetails {
  monthlyPayment: string;
  startDate: string;
  endDate: string;
  totalValue: string;
  insuranceCompany: string;
  offerAmount: string;
}

export interface Lead {
  id: string; // Changed to string to match shared system and prevent duplicate keys
  crmId: string;
  clientName: string;
  campaignName: string;
  phoneNumbers: PhoneNumber[];
  payment: string;
  startDate: string;
  insuranceCompany: string;
  status: string;
  messageHistory: Message[];
  nextFollowUp: string;
  notes?: string;
  processed: boolean;
  phoneNumbersProcessed: number;
  structuredSettlementDetails: StructuredSettlementDetails;
}

export interface CampaignInfo {
  name: string;
  totalLeads: number;
  processedLeads: number;
  startDate: string;
  endDate: string;
}

export interface Campaign {
  id: string;
  name: string;
  totalLeads: number;
  processedLeads: number;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  managerName: string;
}

export interface LeadNotification {
  id: string;
  campaignName: string;
  leadCount: number;
  managerName: string;
  timestamp: string;
  isRead: boolean;
  campaignId: string;
}

export type TabType = 'overview' | 'client-details' | 'lead-list';
