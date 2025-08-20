// Active Leads Module Services
import { Lead } from '../../../types';
import { LeadListType, LeadListMetrics } from './types';

// API endpoints (would be environment-specific in real app)
const API_BASE = '/api/campaign-management/active-leads';

// Lead List Service Class
export class LeadListService {
  // Fetch leads for a specific list
  static async fetchLeadsForList(
    campaignId: string, 
    listType: LeadListType
  ): Promise<Lead[]> {
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data - in real app, this would be an actual API call
      console.log(`Fetching ${listType} leads for campaign ${campaignId}`);
      
      // Return mock leads based on list type
      return this.getMockLeadsForList(listType);
    } catch (error) {
      console.error(`Failed to fetch ${listType} leads:`, error);
      throw new Error(`Unable to load ${listType} leads. Please try again.`);
    }
  }

  // Update lead list assignment
  static async moveLeadToList(
    leadId: string,
    fromList: LeadListType,
    toList: LeadListType,
    campaignId: string
  ): Promise<boolean> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Moving lead ${leadId} from ${fromList} to ${toList} in campaign ${campaignId}`);
      
      // Mock success
      return true;
    } catch (error) {
      console.error(`Failed to move lead ${leadId}:`, error);
      throw new Error(`Unable to move lead to ${toList} list. Please try again.`);
    }
  }

  // Add new lead to specific list
  static async addLeadToList(
    lead: Partial<Lead>,
    listType: LeadListType,
    campaignId: string
  ): Promise<Lead> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      console.log(`Adding new lead to ${listType} list in campaign ${campaignId}:`, lead);
      
      // Mock created lead
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        clientName: lead.clientName || 'New Lead',
        settlementAmount: lead.settlementAmount || 0,
        phoneNumbers: lead.phoneNumbers || [],
        status: 'new',
        priority: listType === 'hot' ? 'high' : listType === 'warm' ? 'medium' : 'low',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return newLead;
    } catch (error) {
      console.error(`Failed to add lead to ${listType} list:`, error);
      throw new Error(`Unable to add lead to ${listType} list. Please try again.`);
    }
  }

  // Export leads from a specific list
  static async exportLeadList(
    campaignId: string,
    listType: LeadListType,
    format: 'csv' | 'xlsx' = 'csv'
  ): Promise<string> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Exporting ${listType} leads for campaign ${campaignId} as ${format}`);
      
      // Mock export URL
      return `https://api.example.com/exports/campaign-${campaignId}-${listType}-leads.${format}`;
    } catch (error) {
      console.error(`Failed to export ${listType} leads:`, error);
      throw new Error(`Unable to export ${listType} leads. Please try again.`);
    }
  }

  // Get lead list metrics
  static async getLeadListMetrics(
    campaignId: string,
    listType: LeadListType
  ): Promise<LeadListMetrics> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Fetching metrics for ${listType} list in campaign ${campaignId}`);
      
      // Mock metrics based on list type
      return this.getMockMetricsForList(listType);
    } catch (error) {
      console.error(`Failed to fetch ${listType} metrics:`, error);
      throw new Error(`Unable to load ${listType} metrics. Please try again.`);
    }
  }

  // Bulk update lead assignments
  static async bulkMoveLeads(
    leadIds: string[],
    fromList: LeadListType,
    toList: LeadListType,
    campaignId: string
  ): Promise<{ success: string[]; failed: string[] }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Bulk moving ${leadIds.length} leads from ${fromList} to ${toList}`);
      
      // Mock bulk operation result
      const successCount = Math.floor(leadIds.length * 0.9); // 90% success rate
      const success = leadIds.slice(0, successCount);
      const failed = leadIds.slice(successCount);
      
      return { success, failed };
    } catch (error) {
      console.error(`Failed to bulk move leads:`, error);
      throw new Error(`Unable to move leads to ${toList} list. Please try again.`);
    }
  }

  // Private helper methods
  private static getMockLeadsForList(listType: LeadListType): Lead[] {
    const baseLeads: Partial<Lead>[] = [
      {
        clientName: 'John Smith',
        settlementAmount: 45000,
        phoneNumbers: [{ number: '555-0123', type: 'mobile', status: 'active', relationship: 'primary' }]
      },
      {
        clientName: 'Sarah Johnson',
        settlementAmount: 67000,
        phoneNumbers: [{ number: '555-0456', type: 'home', status: 'active', relationship: 'primary' }]
      },
      {
        clientName: 'Mike Davis',
        settlementAmount: 32000,
        phoneNumbers: [{ number: '555-0789', type: 'mobile', status: 'active', relationship: 'primary' }]
      }
    ];

    return baseLeads.map((lead, index) => ({
      id: `${listType}-lead-${index + 1}`,
      clientName: lead.clientName!,
      settlementAmount: lead.settlementAmount!,
      phoneNumbers: lead.phoneNumbers!,
      status: 'active',
      priority: listType === 'hot' ? 'high' : listType === 'warm' ? 'medium' : 'low',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }

  private static getMockMetricsForList(listType: LeadListType): LeadListMetrics {
    const baseCounts = {
      prospect: { total: 3, inProgress: 0, completed: 0 },
      hot: { total: 2, inProgress: 1, completed: 0 },
      warm: { total: 1, inProgress: 1, completed: 0 },
      active: { total: 2, inProgress: 1, completed: 1 }
    };

    const counts = baseCounts[listType];
    const pending = counts.total - counts.inProgress - counts.completed;
    const progressPercentage = counts.total > 0 
      ? Math.round(((counts.inProgress + counts.completed) / counts.total) * 100)
      : 0;

    return {
      total: counts.total,
      pending: Math.max(0, pending),
      inProgress: counts.inProgress,
      completed: counts.completed,
      progressPercentage
    };
  }
}

// Utility functions for lead list operations
export const leadListUtils = {
  // Validate lead data before adding to list
  validateLeadForList: (lead: Partial<Lead>, listType: LeadListType): string[] => {
    const errors: string[] = [];
    
    if (!lead.clientName?.trim()) {
      errors.push('Client name is required');
    }
    
    if (!lead.phoneNumbers?.length) {
      errors.push('At least one phone number is required');
    }
    
    if (listType === 'active' && !lead.settlementAmount) {
      errors.push('Settlement amount is required for active leads');
    }
    
    return errors;
  },

  // Get recommended list for a lead based on criteria
  getRecommendedList: (lead: Lead): LeadListType => {
    // Mock logic for list recommendation
    if (lead.settlementAmount && lead.settlementAmount > 50000) {
      return 'hot';
    } else if (lead.phoneNumbers?.some(p => p.status === 'contacted')) {
      return 'warm';
    } else if (lead.status === 'in-progress') {
      return 'active';
    } else {
      return 'prospect';
    }
  },

  // Calculate lead score for prioritization
  calculateLeadScore: (lead: Lead): number => {
    let score = 0;
    
    // Settlement amount factor
    if (lead.settlementAmount) {
      score += Math.min(lead.settlementAmount / 1000, 100);
    }
    
    // Phone number quality
    const activePhones = lead.phoneNumbers?.filter(p => p.status === 'active').length || 0;
    score += activePhones * 10;
    
    // Recency factor
    const daysSinceUpdate = lead.updatedAt 
      ? Math.floor((Date.now() - new Date(lead.updatedAt).getTime()) / (1000 * 60 * 60 * 24))
      : 30;
    score += Math.max(0, 30 - daysSinceUpdate);
    
    return Math.round(score);
  }
};
