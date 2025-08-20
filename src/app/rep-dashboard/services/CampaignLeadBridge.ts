import { Lead } from '../types';
import { campaignLeadService } from '../components/campaign-management/services/CampaignLeadService';

/**
 * Bridge service to connect Campaign Management with Lead Management
 * Handles the data flow from campaign selection to lead processing
 */
class CampaignLeadBridge {
  private leadManagementCallbacks: ((leads: Lead[]) => void)[] = [];

  /**
   * Subscribe Lead Management to receive leads from Campaign Management
   */
  subscribeToLeadUpdates(callback: (leads: Lead[]) => void): () => void {
    this.leadManagementCallbacks.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.leadManagementCallbacks.indexOf(callback);
      if (index > -1) {
        this.leadManagementCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Forward selected campaign leads to Lead Management
   */
  forwardCampaignLeadsToLeadManagement(
    campaignId: string, 
    listType: 'prospect' | 'hot' | 'warm' | 'active'
  ): void {
    const leads = campaignLeadService.forwardLeadsToLeadManagement(campaignId, listType);
    
    // Notify Lead Management about the new leads
    this.leadManagementCallbacks.forEach(callback => {
      try {
        callback(leads);
      } catch (error) {
        console.error('Error forwarding leads to Lead Management:', error);
      }
    });

    console.log(`Forwarded ${leads.length} ${listType} leads from campaign ${campaignId} to Lead Management`);
  }

  /**
   * Update lead status from Lead Management back to Campaign Management
   */
  updateLeadStatusFromLeadManagement(
    leadId: string, 
    status: string, 
    campaignId: string
  ): void {
    campaignLeadService.updateLeadStatus(leadId, status, campaignId);
  }

  /**
   * Get current leads for a campaign and list type
   */
  getCurrentLeads(campaignId: string, listType: 'prospect' | 'hot' | 'warm' | 'active'): Lead[] {
    return campaignLeadService.getFilteredLeads(campaignId, listType);
  }

  /**
   * Add leads to campaign (from manager dashboard or intake)
   */
  addLeadsToCampaign(leads: Lead[], campaignId: string): void {
    campaignLeadService.addLeadsToCampaign(leads, campaignId);
  }

  /**
   * Get campaign statistics
   */
  getCampaignStats(campaignId: string) {
    return campaignLeadService.getCampaignStats(campaignId);
  }
}

// Export singleton instance
export const campaignLeadBridge = new CampaignLeadBridge();
