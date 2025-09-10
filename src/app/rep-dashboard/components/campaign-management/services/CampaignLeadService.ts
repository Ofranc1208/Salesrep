// REFACTORED: Campaign Lead Service - Now uses small, focused components
// Components: LeadStorage, LeadFiltering, LeadForwarding

import { Lead } from '../../../types';
import { leadStorage, leadFiltering, leadForwarding, LeadListType } from './campaign-leads';

/**
 * Campaign Lead Service - Coordinates small, focused components
 * Uses: LeadStorage + LeadFiltering + LeadForwarding
 */
class CampaignLeadService {
  
  /**
   * Add leads to a campaign (delegates to LeadStorage)
   */
  addLeadsToCampaign(leads: Lead[], campaignId: string): void {
    leadStorage.addLeads(leads, campaignId);
  }

  /**
   * Get leads for a campaign (delegates to LeadStorage)
   */
  getLeadsForCampaign(campaignId: string): Lead[] {
    return leadStorage.getLeads(campaignId);
  }

  /**
   * Get filtered leads (coordinates LeadStorage + LeadFiltering)
   */
  getFilteredLeads(campaignId: string, listType: LeadListType): Lead[] {
    const allLeads = leadStorage.getLeads(campaignId);
    return leadFiltering.filterLeads(allLeads, listType);
  }

  /**
   * Forward leads to Lead Management (delegates to LeadForwarding)
   */
  forwardLeadsToLeadManagement(campaignId: string, listType: LeadListType): Lead[] {
    return leadForwarding.forwardToLeadManagement(campaignId, listType);
  }

  /**
   * Subscribe to lead updates (delegates to LeadStorage)
   */
  onLeadsUpdated(callback: (leads: Lead[], campaignId: string) => void): () => void {
    return leadStorage.onLeadsUpdated(callback);
  }

  /**
   * Update lead status (delegates to LeadStorage)
   */
  updateLeadStatus(leadId: string, status: string, campaignId: string): void {
    leadStorage.updateLeadStatus(leadId, status, campaignId);
  }

  /**
   * Get campaign statistics (coordinates LeadStorage + LeadFiltering)
   */
  getCampaignStats(campaignId: string): {
    total: number;
    prospect: number;
    hot: number;
    warm: number;
    active: number;
  } {
    const leads = leadStorage.getLeads(campaignId);
    return leadFiltering.getLeadCounts(leads);
  }

  /**
   * Clear campaign leads (delegates to LeadStorage)
   */
  clearCampaignLeads(campaignId: string): void {
    leadStorage.clearLeads(campaignId);
  }

  /**
   * Get all campaign summaries (coordinates LeadStorage + LeadForwarding)
   */
  getAllCampaignSummaries(): Array<{
    campaignId: string;
    leadCount: number;
    lastUpdated: string;
  }> {
    // This would iterate through campaigns and get summaries
    // For now, return empty array (can be implemented when needed)
    return [];
  }
}

// Export singleton instance - maintains backward compatibility
export const campaignLeadService = new CampaignLeadService();
