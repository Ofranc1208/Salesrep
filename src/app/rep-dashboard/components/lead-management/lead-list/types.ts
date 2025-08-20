import { Lead } from '../../../types';

export interface LeadListProps {
  leads: Lead[];
  selectedLead: Lead | null;
  onLeadSelect: (lead: Lead) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  campaignInfo: {
    name: string;
    totalLeads: number;
    processedLeads: number;
  };
}

export interface LeadListHeaderProps {
  campaignName: string;
  processedCount: number;
  totalLeads: number;
}

export interface LeadTableProps {
  leads: Lead[];
  selectedLead: Lead | null;
  onLeadSelect: (lead: Lead) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

export interface LeadTableRowProps {
  lead: Lead;
  isSelected: boolean;
  onSelect: (lead: Lead) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

export interface LeadPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalLeads: number;
  onPageChange: (page: number) => void;
}

export interface LeadListState {
  currentPage: number;
  leadsPerPage: number;
  sortBy: 'name' | 'crmId' | 'status' | 'nextFollowUp' | 'progress';
  sortOrder: 'asc' | 'desc';
  filterBy: {
    status?: string;
    processed?: boolean;
    searchTerm?: string;
  };
}

export interface LeadListConfig {
  enablePagination: boolean;
  defaultLeadsPerPage: number;
  enableSorting: boolean;
  enableFiltering: boolean;
  enableSearch: boolean;
  showProgressBar: boolean;
}
