import { Lead } from '../../../types';

export class LeadListService {
  /**
   * Export leads to CSV format
   */
  static exportToCSV(leads: Lead[]): string {
    const headers = [
      'Client Name',
      'CRM ID',
      'Status',
      'Payment',
      'Insurance Company',
      'Next Follow-up',
      'Progress',
      'Processed',
      'Phone Numbers'
    ];

    const rows = leads.map(lead => [
      lead.clientName,
      lead.crmId,
      lead.status,
      lead.payment,
      lead.insuranceCompany,
      lead.nextFollowUp,
      `${lead.phoneNumbersProcessed}/${lead.phoneNumbers.length}`,
      lead.processed ? 'Yes' : 'No',
      lead.phoneNumbers.map(p => p.number).join('; ')
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    return csvContent;
  }

  /**
   * Download CSV file
   */
  static downloadCSV(leads: Lead[], filename: string = 'leads.csv'): void {
    const csvContent = this.exportToCSV(leads);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  /**
   * Calculate lead statistics
   */
  static calculateStats(leads: Lead[]): {
    total: number;
    processed: number;
    inProgress: number;
    notStarted: number;
    completionRate: number;
    averageProgress: number;
  } {
    const total = leads.length;
    const processed = leads.filter(lead => lead.processed).length;
    const inProgress = leads.filter(lead => 
      !lead.processed && lead.phoneNumbersProcessed > 0
    ).length;
    const notStarted = leads.filter(lead => 
      !lead.processed && lead.phoneNumbersProcessed === 0
    ).length;

    const completionRate = total > 0 ? (processed / total) * 100 : 0;
    
    const totalProgress = leads.reduce((sum, lead) => {
      const progress = lead.phoneNumbers.length > 0 
        ? (lead.phoneNumbersProcessed / lead.phoneNumbers.length) * 100 
        : 0;
      return sum + progress;
    }, 0);
    
    const averageProgress = total > 0 ? totalProgress / total : 0;

    return {
      total,
      processed,
      inProgress,
      notStarted,
      completionRate: Math.round(completionRate),
      averageProgress: Math.round(averageProgress)
    };
  }

  /**
   * Get leads by status
   */
  static getLeadsByStatus(leads: Lead[], status: string): Lead[] {
    return leads.filter(lead => lead.status === status);
  }

  /**
   * Get leads by processing status
   */
  static getLeadsByProcessingStatus(leads: Lead[], processed: boolean): Lead[] {
    return leads.filter(lead => lead.processed === processed);
  }

  /**
   * Search leads by term
   */
  static searchLeads(leads: Lead[], searchTerm: string): Lead[] {
    if (!searchTerm || searchTerm.trim() === '') return leads;

    const searchLower = searchTerm.toLowerCase();
    
    return leads.filter(lead => {
      const searchableText = [
        lead.clientName,
        lead.crmId,
        lead.insuranceCompany,
        lead.status,
        lead.payment,
        lead.notes || '',
        ...lead.phoneNumbers.map(p => p.number)
      ].join(' ').toLowerCase();

      return searchableText.includes(searchLower);
    });
  }

  /**
   * Sort leads by field
   */
  static sortLeads(
    leads: Lead[], 
    sortBy: 'name' | 'crmId' | 'status' | 'nextFollowUp' | 'progress',
    order: 'asc' | 'desc' = 'asc'
  ): Lead[] {
    return [...leads].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.clientName;
          bValue = b.clientName;
          break;
        case 'crmId':
          aValue = a.crmId;
          bValue = b.crmId;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'nextFollowUp':
          aValue = new Date(a.nextFollowUp);
          bValue = new Date(b.nextFollowUp);
          break;
        case 'progress':
          aValue = a.phoneNumbers.length > 0 ? a.phoneNumbersProcessed / a.phoneNumbers.length : 0;
          bValue = b.phoneNumbers.length > 0 ? b.phoneNumbersProcessed / b.phoneNumbers.length : 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Paginate leads
   */
  static paginateLeads(leads: Lead[], page: number, perPage: number): {
    leads: Lead[];
    totalPages: number;
    startIndex: number;
    endIndex: number;
  } {
    const totalPages = Math.ceil(leads.length / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedLeads = leads.slice(startIndex, endIndex);

    return {
      leads: paginatedLeads,
      totalPages,
      startIndex,
      endIndex
    };
  }

  /**
   * Validate lead data
   */
  static validateLead(lead: Lead): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!lead.clientName || lead.clientName.trim() === '') {
      errors.push('Client name is required');
    }

    if (!lead.crmId || lead.crmId.trim() === '') {
      errors.push('CRM ID is required');
    }

    if (!lead.phoneNumbers || lead.phoneNumbers.length === 0) {
      errors.push('At least one phone number is required');
    }

    if (!lead.nextFollowUp) {
      errors.push('Next follow-up date is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
