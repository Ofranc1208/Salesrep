import { BaseLead, LeadAssignment, AssignmentResult, LeadStatus, AssignmentStatus } from './types';
import { AssignmentEngine } from './AssignmentEngine';

export class DataFlowService {
  private assignmentEngine: AssignmentEngine;
  private leads: Map<string, BaseLead> = new Map();

  constructor() {
    this.assignmentEngine = new AssignmentEngine();
  }

  /**
   * Add a new lead to the system
   */
  addLead(lead: BaseLead): void {
    this.leads.set(lead.id, lead);
    console.log('DataFlowService: Lead added', { leadId: lead.id, lead });
  }

  /**
   * Get a lead by ID
   */
  getLead(leadId: string): BaseLead | undefined {
    return this.leads.get(leadId);
  }

  /**
   * Get all leads
   */
  getAllLeads(): BaseLead[] {
    return Array.from(this.leads.values());
  }

  /**
   * Get leads by status
   */
  getLeadsByStatus(status: LeadStatus): BaseLead[] {
    return Array.from(this.leads.values()).filter(lead => lead.status === status);
  }

  /**
   * Get leads assigned to a specific sales rep
   */
  getLeadsByRep(repId: string): BaseLead[] {
    console.log('DataFlowService: getLeadsByRep called', { repId });
    const leadIds = this.assignmentEngine.getRepQueue(repId);
    console.log('DataFlowService: getLeadsByRep leadIds', { repId, leadIds });
    const leads = leadIds.map(id => this.leads.get(id)).filter(Boolean) as BaseLead[];
    console.log('DataFlowService: getLeadsByRep result', { repId, leadIds, leads });
    return leads;
  }

    /**
   * Assign a lead to a sales rep
   */
  assignLead(leadId: string, repId: string, campaignId: string): AssignmentResult {
    console.log('DataFlowService: assignLead called', { leadId, repId, campaignId });
    
    const lead = this.leads.get(leadId);
    if (!lead) {
      throw new Error(`Lead ${leadId} not found`);
    }

    console.log('DataFlowService: Found lead', lead);
    const result = this.assignmentEngine.assignLead(lead, repId, campaignId);
    console.log('DataFlowService: Assignment created', result);

    // Update the lead in our data store with the immutably updated version
    if (result.updatedLead) {
      this.leads.set(leadId, result.updatedLead);
      console.log('DataFlowService: Lead updated immutably', { leadId, newStatus: result.updatedLead.status });
    }

    return result;
  }

  /**
   * Import assignment from another tab/instance
   */
  importAssignment(leadId: string, repId: string, campaignId: string, assignedAt: Date): void {
    console.log('DataFlowService: importAssignment called', { leadId, repId, campaignId });
    
    const lead = this.leads.get(leadId);
    if (!lead) {
      console.warn('DataFlowService: Lead not found for import assignment', leadId);
      return;
    }

    // Create assignment without triggering events (to avoid loops)
    const assignment = {
      leadId,
      repId,
      assignedAt,
      campaignId,
      status: 'pending' as any
    };

    // Update assignment engine and get the immutably updated lead
    const updatedLead = this.assignmentEngine.importAssignment(lead, repId, campaignId, assignment);
    
    // Replace the lead in our data store with the updated version
    this.leads.set(leadId, updatedLead);
    
    console.log('DataFlowService: Assignment imported', assignment);
  }

  /**
   * Update lead status
   */
  updateLeadStatus(leadId: string, status: LeadStatus): void {
    const lead = this.leads.get(leadId);
    if (!lead) {
      throw new Error(`Lead ${leadId} not found`);
    }

    lead.status = status;
    this.assignmentEngine.updateLeadStatus(leadId, status);
    console.log('DataFlowService: Lead status updated', { leadId, status });
  }

  /**
   * Reassign a lead
   */
  reassignLead(leadId: string, newRepId: string): LeadAssignment {
    const assignment = this.assignmentEngine.reassignLead(leadId, newRepId);
    console.log('DataFlowService: Lead reassigned', { leadId, newRepId, assignment });
    return assignment;
  }

  /**
   * Get assignment statistics
   */
  getAssignmentStats() {
    return this.assignmentEngine.getAssignmentStats();
  }

  /**
   * Get campaign assignments
   */
  getCampaignAssignments(campaignId: string): LeadAssignment[] {
    return this.assignmentEngine.getCampaignAssignments(campaignId);
  }

    // Legacy event system removed - now using BroadcastChannel for cross-tab communication

  /**
   * Clear all data (useful for testing)
   */
  clearAllData(): void {
    this.leads.clear();
    this.assignmentEngine.clearAllAssignments();
  }
}

// Create a singleton instance
export const dataFlowService = new DataFlowService();
