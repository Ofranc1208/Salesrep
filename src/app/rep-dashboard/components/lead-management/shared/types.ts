// Shared types for Lead Management modules
export interface LeadManagementConfig {
  enableIntake: boolean;
  enableEnrichment: boolean;
  enableAssignment: boolean;
  enableTracking: boolean;
  enableValidation: boolean;
}

export interface LeadManagementStats {
  totalLeads: number;
  unassignedLeads: number;
  incompleteLeads: number;
  activeLeads: number;
  completedLeads: number;
}

export interface LeadManagementFilters {
  status?: string[];
  priority?: string[];
  assignedTo?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  searchTerm?: string;
}

export interface LeadManagementActions {
  onLeadUpdated: (lead: any) => void;
  onLeadAssigned: (leadId: string, repId: string) => void;
  onLeadStatusChanged: (leadId: string, status: string) => void;
  onBulkUpdate: (updates: any[]) => void;
}
