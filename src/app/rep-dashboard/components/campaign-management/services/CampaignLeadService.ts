import { Lead } from '../../../types';

/**
 * Service to manage leads within campaigns and forward them to Lead Management
 */
class CampaignLeadService {
  private campaignLeads: Map<string, Lead[]> = new Map();
  private leadListeners: ((leads: Lead[], campaignId: string) => void)[] = [];

  /**
   * Add leads to a specific campaign
   */
  addLeadsToCampaign(leads: Lead[], campaignId: string): void {
    const existingLeads = this.campaignLeads.get(campaignId) || [];
    const updatedLeads = [...existingLeads, ...leads];
    
    this.campaignLeads.set(campaignId, updatedLeads);
    
    // Notify listeners (Lead Management) about new leads
    this.notifyLeadListeners(updatedLeads, campaignId);
    
    console.log(`Added ${leads.length} leads to campaign ${campaignId}. Total: ${updatedLeads.length}`);
  }

  /**
   * Get leads for a specific campaign
   */
  getLeadsForCampaign(campaignId: string): Lead[] {
    return this.campaignLeads.get(campaignId) || [];
  }

  /**
   * Get leads filtered by campaign and list type
   */
  getFilteredLeads(campaignId: string, listType: 'prospect' | 'hot' | 'warm' | 'active'): Lead[] {
    const campaignLeads = this.getLeadsForCampaign(campaignId);
    
    // Filter leads based on list type
    return campaignLeads.filter(lead => {
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
   * Forward selected leads to Lead Management
   */
  forwardLeadsToLeadManagement(campaignId: string, listType: 'prospect' | 'hot' | 'warm' | 'active'): Lead[] {
    const filteredLeads = this.getFilteredLeads(campaignId, listType);
    
    // This would typically integrate with Lead Management's data service
    console.log(`Forwarding ${filteredLeads.length} ${listType} leads from campaign ${campaignId} to Lead Management`);
    
    return filteredLeads;
  }

  /**
   * Subscribe to lead updates
   */
  onLeadsUpdated(callback: (leads: Lead[], campaignId: string) => void): () => void {
    this.leadListeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.leadListeners.indexOf(callback);
      if (index > -1) {
        this.leadListeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners about lead updates
   */
  private notifyLeadListeners(leads: Lead[], campaignId: string): void {
    this.leadListeners.forEach(listener => {
      try {
        listener(leads, campaignId);
      } catch (error) {
        console.error('Error notifying lead listener:', error);
      }
    });
  }

  /**
   * Update lead status (when Lead Management processes leads)
   */
  updateLeadStatus(leadId: string, status: string, campaignId: string): void {
    const campaignLeads = this.campaignLeads.get(campaignId);
    if (!campaignLeads) return;

    const leadIndex = campaignLeads.findIndex(lead => lead.id === leadId);
    if (leadIndex === -1) return;

    campaignLeads[leadIndex] = {
      ...campaignLeads[leadIndex],
      status,
      updatedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    this.campaignLeads.set(campaignId, campaignLeads);
    this.notifyLeadListeners(campaignLeads, campaignId);
  }

  /**
   * Get campaign statistics
   */
  getCampaignStats(campaignId: string): {
    total: number;
    prospect: number;
    hot: number;
    warm: number;
    active: number;
  } {
    const leads = this.getLeadsForCampaign(campaignId);
    
    return {
      total: leads.length,
      prospect: this.getFilteredLeads(campaignId, 'prospect').length,
      hot: this.getFilteredLeads(campaignId, 'hot').length,
      warm: this.getFilteredLeads(campaignId, 'warm').length,
      active: this.getFilteredLeads(campaignId, 'active').length
    };
  }

  /**
   * Clear all leads for a campaign
   */
  clearCampaignLeads(campaignId: string): void {
    this.campaignLeads.delete(campaignId);
    this.notifyLeadListeners([], campaignId);
  }

  /**
   * Get all campaigns with lead counts
   */
  getAllCampaignSummaries(): Array<{
    campaignId: string;
    leadCount: number;
    lastUpdated: string;
  }> {
    const summaries: Array<{
      campaignId: string;
      leadCount: number;
      lastUpdated: string;
    }> = [];

    this.campaignLeads.forEach((leads, campaignId) => {
      const lastUpdated = leads.length > 0 
        ? Math.max(...leads.map(lead => new Date(lead.updatedAt).getTime()))
        : Date.now();

      summaries.push({
        campaignId,
        leadCount: leads.length,
        lastUpdated: new Date(lastUpdated).toISOString()
      });
    });

    return summaries;
  }
}

// Export singleton instance
export const campaignLeadService = new CampaignLeadService();
