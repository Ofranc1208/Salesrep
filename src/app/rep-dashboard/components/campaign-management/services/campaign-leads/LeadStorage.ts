import { Lead } from '../../../../types';

/**
 * Lead Storage - Simple lead storage and retrieval
 * Focused responsibility: Store and retrieve campaign leads
 */
export class LeadStorage {
  private campaignLeads: Map<string, Lead[]> = new Map();
  private leadListeners: ((leads: Lead[], campaignId: string) => void)[] = [];

  /**
   * Add leads to a campaign
   */
  addLeads(leads: Lead[], campaignId: string): void {
    const existingLeads = this.campaignLeads.get(campaignId) || [];
    const updatedLeads = [...existingLeads, ...leads];
    
    this.campaignLeads.set(campaignId, updatedLeads);
    this.notifyListeners(updatedLeads, campaignId);
    
    console.log(`📦 Added ${leads.length} leads to campaign ${campaignId}`);
  }

  /**
   * Get all leads for a campaign
   */
  getLeads(campaignId: string): Lead[] {
    return this.campaignLeads.get(campaignId) || [];
  }

  /**
   * Update a lead's status
   */
  updateLeadStatus(leadId: string, status: string, campaignId: string): boolean {
    const campaignLeads = this.campaignLeads.get(campaignId);
    if (!campaignLeads) return false;

    const leadIndex = campaignLeads.findIndex(lead => lead.id === leadId);
    if (leadIndex === -1) return false;

    campaignLeads[leadIndex] = {
      ...campaignLeads[leadIndex],
      status,
      updatedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    this.campaignLeads.set(campaignId, campaignLeads);
    this.notifyListeners(campaignLeads, campaignId);
    return true;
  }

  /**
   * Clear campaign leads
   */
  clearLeads(campaignId: string): void {
    this.campaignLeads.delete(campaignId);
    this.notifyListeners([], campaignId);
  }

  /**
   * Subscribe to lead updates
   */
  onLeadsUpdated(callback: (leads: Lead[], campaignId: string) => void): () => void {
    this.leadListeners.push(callback);
    
    return () => {
      const index = this.leadListeners.indexOf(callback);
      if (index > -1) {
        this.leadListeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(leads: Lead[], campaignId: string): void {
    this.leadListeners.forEach(listener => {
      try {
        listener(leads, campaignId);
      } catch (error) {
        console.error('📦 Error notifying listener:', error);
      }
    });
  }
}

export const leadStorage = new LeadStorage();
