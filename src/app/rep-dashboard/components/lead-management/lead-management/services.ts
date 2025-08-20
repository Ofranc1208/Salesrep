import { Lead, TabType } from '../../../types';
import { MessageTemplate } from '../../../../shared/TemplateService';

export class LeadManagementService {
  /**
   * Save lead management state to localStorage
   */
  static saveState(state: any): void {
    try {
      localStorage.setItem('leadManagementState', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save lead management state:', error);
    }
  }

  /**
   * Load lead management state from localStorage
   */
  static loadState(): any {
    try {
      const saved = localStorage.getItem('leadManagementState');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load lead management state:', error);
      return null;
    }
  }

  /**
   * Clear saved state
   */
  static clearState(): void {
    try {
      localStorage.removeItem('leadManagementState');
    } catch (error) {
      console.error('Failed to clear lead management state:', error);
    }
  }

  /**
   * Validate lead data before processing
   */
  static validateLead(lead: Lead): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!lead.clientName || lead.clientName.trim() === '') {
      errors.push('Client name is required');
    }

    if (!lead.phoneNumbers || lead.phoneNumbers.length === 0) {
      errors.push('At least one phone number is required');
    }

    if (!lead.crmId || lead.crmId.trim() === '') {
      errors.push('CRM ID is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Format lead data for display
   */
  static formatLeadForDisplay(lead: Lead): any {
    return {
      ...lead,
      formattedPayment: this.formatCurrency(lead.payment),
      formattedNextFollowUp: this.formatDate(lead.nextFollowUp),
      primaryPhone: lead.phoneNumbers.find(p => p.isPrimary)?.number || lead.phoneNumbers[0]?.number,
      completionPercentage: this.calculateCompletionPercentage(lead)
    };
  }

  /**
   * Calculate lead completion percentage
   */
  private static calculateCompletionPercentage(lead: Lead): number {
    const fields = [
      lead.clientName,
      lead.payment,
      lead.insuranceCompany,
      lead.nextFollowUp,
      lead.phoneNumbers.length > 0 ? 'phones' : null,
      lead.notes
    ];

    const completedFields = fields.filter(field => field && field !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  }

  /**
   * Format currency values
   */
  private static formatCurrency(value: string): string {
    if (!value) return 'N/A';
    
    // Remove any existing formatting
    const numericValue = value.replace(/[^0-9.-]+/g, '');
    const number = parseFloat(numericValue);
    
    if (isNaN(number)) return value;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(number);
  }

  /**
   * Format date values
   */
  private static formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  /**
   * Export leads to CSV
   */
  static exportToCSV(leads: Lead[]): string {
    const headers = [
      'Client Name',
      'CRM ID',
      'Payment',
      'Insurance Company',
      'Status',
      'Next Follow-up',
      'Primary Phone',
      'Processed'
    ];

    const rows = leads.map(lead => [
      lead.clientName,
      lead.crmId,
      lead.payment,
      lead.insuranceCompany,
      lead.status,
      lead.nextFollowUp,
      lead.phoneNumbers.find(p => p.isPrimary)?.number || lead.phoneNumbers[0]?.number || '',
      lead.processed ? 'Yes' : 'No'
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    return csvContent;
  }

  /**
   * Filter leads based on criteria
   */
  static filterLeads(
    leads: Lead[],
    filters: {
      status?: string;
      processed?: boolean;
      searchTerm?: string;
    }
  ): Lead[] {
    return leads.filter(lead => {
      if (filters.status && lead.status !== filters.status) {
        return false;
      }

      if (filters.processed !== undefined && lead.processed !== filters.processed) {
        return false;
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const searchableText = [
          lead.clientName,
          lead.crmId,
          lead.insuranceCompany,
          lead.notes || ''
        ].join(' ').toLowerCase();

        if (!searchableText.includes(searchLower)) {
          return false;
        }
      }

      return true;
    });
  }
}
