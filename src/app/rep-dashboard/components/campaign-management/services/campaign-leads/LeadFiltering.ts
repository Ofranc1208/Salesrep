import { Lead } from '../../../../types';

export type LeadListType = 'prospect' | 'hot' | 'warm' | 'active';

/**
 * Lead Filtering - Simple lead categorization
 * Focused responsibility: Filter leads by type/status
 */
export class LeadFiltering {
  
  /**
   * Filter leads by list type
   */
  filterLeads(leads: Lead[], listType: LeadListType): Lead[] {
    return leads.filter(lead => {
      switch (listType) {
        case 'prospect':
          return lead.status === 'New' || lead.status === 'Assigned';
        case 'hot':
          return lead.priority === 'High' && (lead.status === 'Contacted' || lead.status === 'Follow-up');
        case 'warm':
          return lead.priority === 'Medium' && lead.status === 'Contacted';
        case 'active':
          return lead.status === 'In Progress' || lead.status === 'Negotiating';
        default:
          return true;
      }
    });
  }

  /**
   * Get lead counts by type
   */
  getLeadCounts(leads: Lead[]): {
    total: number;
    prospect: number;
    hot: number;
    warm: number;
    active: number;
  } {
    return {
      total: leads.length,
      prospect: this.filterLeads(leads, 'prospect').length,
      hot: this.filterLeads(leads, 'hot').length,
      warm: this.filterLeads(leads, 'warm').length,
      active: this.filterLeads(leads, 'active').length
    };
  }

  /**
   * Classify a single lead
   */
  classifyLead(lead: Lead): LeadListType {
    if (lead.priority === 'High' && (lead.status === 'Contacted' || lead.status === 'Follow-up')) {
      return 'hot';
    }
    if (lead.status === 'In Progress' || lead.status === 'Negotiating') {
      return 'active';
    }
    if (lead.priority === 'Medium' && lead.status === 'Contacted') {
      return 'warm';
    }
    return 'prospect';
  }
}

export const leadFiltering = new LeadFiltering();
