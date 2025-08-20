import { Lead } from '../../../types';

/**
 * Utility functions for Lead Management
 */

export const leadUtils = {
  /**
   * Check if a lead needs enrichment
   */
  needsEnrichment: (lead: Lead): boolean => {
    return (
      lead.clientInfo?.ssn === 'Not Available' ||
      lead.clientInfo?.dateOfBirth === 'Not Available' ||
      lead.structuredSettlement.monthlyPayment === 'Not Available' ||
      !lead.phoneNumbers.some(p => p.number !== 'Not Available')
    );
  },

  /**
   * Calculate lead completeness score (0-100)
   */
  getCompletenessScore: (lead: Lead): number => {
    const fields = [
      lead.clientName !== 'Unknown Client',
      lead.clientInfo?.ssn !== 'Not Available',
      lead.clientInfo?.dateOfBirth !== 'Not Available',
      lead.structuredSettlement.monthlyPayment !== 'Not Available',
      lead.structuredSettlement.totalValue !== 'Not Available',
      lead.structuredSettlement.insuranceCompany !== 'Not Available',
      lead.phoneNumbers.some(p => p.number !== 'Not Available'),
      lead.clientInfo?.futureNPV !== 'Not Available',
      lead.clientInfo?.currentOffers !== 'Not Available'
    ];
    
    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  },

  /**
   * Get missing fields for a lead
   */
  getMissingFields: (lead: Lead): string[] => {
    const missing: string[] = [];
    
    if (lead.clientName === 'Unknown Client') missing.push('Client Name');
    if (lead.clientInfo?.ssn === 'Not Available') missing.push('SSN');
    if (lead.clientInfo?.dateOfBirth === 'Not Available') missing.push('Date of Birth');
    if (lead.structuredSettlement.monthlyPayment === 'Not Available') missing.push('Monthly Payment');
    if (lead.structuredSettlement.totalValue === 'Not Available') missing.push('Total Value');
    if (lead.structuredSettlement.insuranceCompany === 'Not Available') missing.push('Insurance Company');
    if (!lead.phoneNumbers.some(p => p.number !== 'Not Available')) missing.push('Valid Phone Number');
    if (lead.clientInfo?.futureNPV === 'Not Available') missing.push('Future NPV');
    if (lead.clientInfo?.currentOffers === 'Not Available') missing.push('Current Offers');
    
    return missing;
  },

  /**
   * Filter leads based on criteria
   */
  filterLeads: (leads: Lead[], filters: any): Lead[] => {
    return leads.filter(lead => {
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(lead.status)) return false;
      }
      
      // Priority filter
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(lead.priority)) return false;
      }
      
      // Assigned to filter
      if (filters.assignedTo && filters.assignedTo.length > 0) {
        if (!lead.assignedTo || !filters.assignedTo.includes(lead.assignedTo)) return false;
      }
      
      // Search term
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const searchableText = [
          lead.clientName,
          lead.crmId,
          lead.campaignName,
          lead.insuranceCompany,
          lead.notes || ''
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(searchLower)) return false;
      }
      
      // Date range
      if (filters.dateRange) {
        const leadDate = new Date(lead.createdAt);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        
        if (leadDate < startDate || leadDate > endDate) return false;
      }
      
      return true;
    });
  },

  /**
   * Sort leads by various criteria
   */
  sortLeads: (leads: Lead[], sortBy: string, sortOrder: 'asc' | 'desc' = 'desc'): Lead[] => {
    return [...leads].sort((a, b) => {
      let aValue: any;
      let bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.clientName;
          bValue = b.clientName;
          break;
        case 'priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
          break;
        case 'created':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'updated':
          aValue = new Date(a.updatedAt);
          bValue = new Date(b.updatedAt);
          break;
        case 'amount':
          aValue = parseFloat(a.structuredSettlement.monthlyPayment.replace(/[^0-9.-]+/g, '')) || 0;
          bValue = parseFloat(b.structuredSettlement.monthlyPayment.replace(/[^0-9.-]+/g, '')) || 0;
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  },

  /**
   * Generate lead statistics
   */
  generateStats: (leads: Lead[]): any => {
    const total = leads.length;
    const unassigned = leads.filter(lead => !lead.assignedTo).length;
    const incomplete = leads.filter(lead => leadUtils.needsEnrichment(lead)).length;
    const active = leads.filter(lead => ['New', 'Assigned', 'In Progress'].includes(lead.status)).length;
    const completed = leads.filter(lead => lead.processed).length;
    
    const priorityBreakdown = {
      high: leads.filter(lead => lead.priority === 'High').length,
      medium: leads.filter(lead => lead.priority === 'Medium').length,
      low: leads.filter(lead => lead.priority === 'Low').length
    };
    
    const statusBreakdown = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total,
      unassigned,
      incomplete,
      active,
      completed,
      priorityBreakdown,
      statusBreakdown,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      assignmentRate: total > 0 ? Math.round(((total - unassigned) / total) * 100) : 0,
      enrichmentRate: total > 0 ? Math.round(((total - incomplete) / total) * 100) : 0
    };
  }
};
