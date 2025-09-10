import { Lead } from '../../../../types';
import { leadStorage } from './LeadStorage';
import { leadFiltering, LeadListType } from './LeadFiltering';

/**
 * Lead Forwarding - Forward leads to Lead Management
 * Focused responsibility: Handle forwarding accepted leads to Lead Management
 */
export class LeadForwarding {
  
  /**
   * Forward filtered leads to Lead Management
   */
  forwardToLeadManagement(campaignId: string, listType: LeadListType): Lead[] {
    const allLeads = leadStorage.getLeads(campaignId);
    const filteredLeads = leadFiltering.filterLeads(allLeads, listType);
    
    // This is where integration with Lead Management would happen
    console.log(`🌉 Forwarding ${filteredLeads.length} ${listType} leads from campaign ${campaignId} to Lead Management`);
    
    // In a real implementation, this would:
    // 1. Call Lead Management API
    // 2. Update lead status to "Forwarded"
    // 3. Handle any errors
    
    return filteredLeads;
  }

  /**
   * Forward specific leads (when rep accepts assignment)
   */
  forwardAcceptedLeads(leads: Lead[], campaignId: string): boolean {
    try {
      console.log(`🌉 Forwarding ${leads.length} accepted leads from campaign ${campaignId} to Lead Management`);
      
      // Update lead status to show they've been forwarded
      leads.forEach(lead => {
        leadStorage.updateLeadStatus(lead.id, 'Contacted', campaignId);
      });
      
      // This would integrate with Lead Management system
      // For now, just log the action
      
      return true;
    } catch (error) {
      console.error('🌉 Error forwarding leads:', error);
      return false;
    }
  }

  /**
   * Get forwarding summary
   */
  getForwardingSummary(campaignId: string): {
    campaignId: string;
    totalLeads: number;
    forwardedLeads: number;
    pendingLeads: number;
  } {
    const allLeads = leadStorage.getLeads(campaignId);
    const forwardedLeads = allLeads.filter(lead => 
      lead.status === 'Contacted' || 
      lead.status === 'In Progress' || 
      lead.status === 'Negotiating'
    );
    const pendingLeads = allLeads.filter(lead => 
      lead.status === 'New' || 
      lead.status === 'Assigned'
    );

    return {
      campaignId,
      totalLeads: allLeads.length,
      forwardedLeads: forwardedLeads.length,
      pendingLeads: pendingLeads.length
    };
  }
}

export const leadForwarding = new LeadForwarding();
