// Lead Lists Service - Moved from active-leads/services.ts
import { Lead } from '../../../../../types';
import { LeadListType, LeadListMetrics } from './types';

// Mock API base URL - updated path
const API_BASE = '/api/campaign-management/lead-lists';

export class LeadListService {
  private static instance: LeadListService;
  private cache: Map<string, any> = new Map();

  static getInstance(): LeadListService {
    if (!LeadListService.instance) {
      LeadListService.instance = new LeadListService();
    }
    return LeadListService.instance;
  }

  // Get leads for a specific list type
  async getLeadsByType(listType: LeadListType, campaignId?: string): Promise<Lead[]> {
    const cacheKey = `leads-${listType}-${campaignId || 'default'}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Mock API call - in real app, this would be an actual API request
      const mockLeads = this.generateMockLeads(listType);
      this.cache.set(cacheKey, mockLeads);
      return mockLeads;
    } catch (error) {
      console.error(`Failed to fetch ${listType} leads:`, error);
      return [];
    }
  }

  // Get metrics for lead lists
  async getLeadListMetrics(campaignId?: string): Promise<LeadListMetrics> {
    try {
      // Mock metrics - in real app, this would be an API call
      return {
        totalLeads: 8,
        activeLeads: 6,
        completedToday: 3,
        responseRate: 0.75
      };
    } catch (error) {
      console.error('Failed to fetch lead list metrics:', error);
      return {
        totalLeads: 0,
        activeLeads: 0,
        completedToday: 0,
        responseRate: 0
      };
    }
  }

  // Update lead status/list type
  async updateLeadListType(leadId: string, newListType: LeadListType): Promise<boolean> {
    try {
      // Mock API call
      console.log(`Moving lead ${leadId} to ${newListType} list`);
      
      // Clear relevant cache entries
      this.clearCacheByPattern(`leads-`);
      
      return true;
    } catch (error) {
      console.error('Failed to update lead list type:', error);
      return false;
    }
  }

  // Private helper methods
  private generateMockLeads(listType: LeadListType): Lead[] {
    const counts = { prospect: 3, hot: 2, warm: 1, active: 2 };
    const count = counts[listType];
    
    return Array.from({ length: count }, (_, index) => ({
      id: `${listType}-lead-${index + 1}`,
      clientName: `${listType.charAt(0).toUpperCase() + listType.slice(1)} Client ${index + 1}`,
      phoneNumbers: [{ number: `555-${listType.length}${index}${index}${index}`, type: 'mobile' as const }],
      settlementAmount: Math.floor(Math.random() * 100000) + 10000,
      status: listType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })) as Lead[];
  }

  private clearCacheByPattern(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}

// Export singleton instance
export const leadListService = LeadListService.getInstance();
