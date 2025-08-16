import { BaseLead, LeadAssignment, AssignmentResult, SalesRep, AssignmentStatus, LeadStatus } from './types';

export class AssignmentEngine {
  private assignments: Map<string, LeadAssignment> = new Map();
  private repQueues: Map<string, string[]> = new Map();

  /**
   * Assign a lead to a sales representative
   */
  assignLead(lead: BaseLead, repId: string, campaignId: string): AssignmentResult {
    console.log('AssignmentEngine: assignLead called', { leadId: lead.id, repId, campaignId });
    
    // Check if lead is already assigned
    if (this.assignments.has(lead.id)) {
      const existingAssignment = this.assignments.get(lead.id);
      console.log('AssignmentEngine: Lead already assigned', { leadId: lead.id, existingAssignment });
      return { ...existingAssignment!, updatedLead: lead };
    }
    
    // Check if rep can handle more leads
    if (!this.canRepHandleMoreLeads(repId)) {
      throw new Error(`Sales rep ${repId} has reached maximum lead capacity`);
    }

    // Create assignment
    const assignment: LeadAssignment = {
      leadId: lead.id,
      repId,
      assignedAt: new Date(),
      campaignId,
      status: AssignmentStatus.PENDING
    };

    console.log('AssignmentEngine: Assignment created', assignment);

    // Store assignment
    this.assignments.set(lead.id, assignment);

    // Add to rep's queue
    this.addToRepQueue(repId, lead.id);
    console.log('AssignmentEngine: Added to rep queue', { repId, leadId: lead.id });

    // Update lead status (create new object to maintain immutability)
    const updatedLead = {
      ...lead,
      status: LeadStatus.ASSIGNED,
      assignedTo: repId,
      campaignId: campaignId
    };

    console.log('AssignmentEngine: Lead status updated', { leadId: lead.id, status: updatedLead.status });

    // Return both the assignment and the updated lead
    return { ...assignment, updatedLead };
  }

  /**
   * Get all leads assigned to a specific sales rep
   */
  getRepQueue(repId: string): string[] {
    const queue = this.repQueues.get(repId) || [];
    console.log('AssignmentEngine: getRepQueue', { repId, queue, allQueues: Array.from(this.repQueues.entries()) });
    return queue;
  }

  /**
   * Get assignment details for a specific lead
   */
  getLeadAssignment(leadId: string): LeadAssignment | undefined {
    return this.assignments.get(leadId);
  }

  /**
   * Update lead status
   */
  updateLeadStatus(leadId: string, status: LeadStatus): void {
    const assignment = this.assignments.get(leadId);
    if (assignment) {
      if (status === LeadStatus.CLOSED || status === LeadStatus.QUALIFIED) {
        assignment.status = AssignmentStatus.COMPLETED;
        this.removeFromRepQueue(assignment.repId, leadId);
      }
    }
  }

  /**
   * Reassign a lead to a different sales rep
   */
  reassignLead(leadId: string, newRepId: string): LeadAssignment {
    const currentAssignment = this.assignments.get(leadId);
    if (!currentAssignment) {
      throw new Error(`Lead ${leadId} is not currently assigned`);
    }

    // Remove from current rep's queue
    this.removeFromRepQueue(currentAssignment.repId, leadId);

    // Create new assignment
    const newAssignment: LeadAssignment = {
      leadId,
      repId: newRepId,
      assignedAt: new Date(),
      campaignId: currentAssignment.campaignId,
      status: AssignmentStatus.REASSIGNED
    };

    // Store new assignment
    this.assignments.set(leadId, newAssignment);

    // Add to new rep's queue
    this.addToRepQueue(newRepId, leadId);

    return newAssignment;
  }

  /**
   * Get all assignments for a campaign
   */
  getCampaignAssignments(campaignId: string): LeadAssignment[] {
    return Array.from(this.assignments.values())
      .filter(assignment => assignment.campaignId === campaignId);
  }

  /**
   * Get assignment statistics
   */
  getAssignmentStats(): {
    totalAssignments: number;
    activeAssignments: number;
    completedAssignments: number;
    repWorkloads: Record<string, number>;
  } {
    const totalAssignments = this.assignments.size;
    const activeAssignments = Array.from(this.assignments.values())
      .filter(a => a.status === AssignmentStatus.ACTIVE || a.status === AssignmentStatus.PENDING).length;
    const completedAssignments = Array.from(this.assignments.values())
      .filter(a => a.status === AssignmentStatus.COMPLETED).length;

    const repWorkloads: Record<string, number> = {};
    this.repQueues.forEach((leads, repId) => {
      repWorkloads[repId] = leads.length;
    });

    return {
      totalAssignments,
      activeAssignments,
      completedAssignments,
      repWorkloads
    };
  }

  /**
   * Check if a sales rep can handle more leads
   */
  private canRepHandleMoreLeads(repId: string): boolean {
    const currentLeads = this.repQueues.get(repId)?.length || 0;
    // For now, assume max 50 leads per rep (can be made configurable)
    return currentLeads < 50;
  }

  /**
   * Add a lead to a rep's queue
   */
  private addToRepQueue(repId: string, leadId: string): void {
    if (!this.repQueues.has(repId)) {
      this.repQueues.set(repId, []);
    }
    
    const queue = this.repQueues.get(repId)!;
    
    // Check if lead is already in queue to prevent duplicates
    if (!queue.includes(leadId)) {
      queue.push(leadId);
      console.log('AssignmentEngine: Added lead to rep queue', { repId, leadId, queueSize: queue.length });
    } else {
      console.log('AssignmentEngine: Lead already in rep queue, skipping', { repId, leadId });
    }
  }

  /**
   * Remove a lead from a rep's queue
   */
  private removeFromRepQueue(repId: string, leadId: string): void {
    const queue = this.repQueues.get(repId);
    if (queue) {
      const index = queue.indexOf(leadId);
      if (index > -1) {
        queue.splice(index, 1);
      }
    }
  }

  /**
   * Import assignment from another instance (for cross-tab sync)
   */
  importAssignment(lead: BaseLead, repId: string, campaignId: string, assignment: LeadAssignment): BaseLead {
    console.log('AssignmentEngine: importAssignment called', { leadId: lead.id, repId, campaignId });
    
    // Store assignment
    this.assignments.set(lead.id, assignment);

    // Add to rep's queue
    this.addToRepQueue(repId, lead.id);
    console.log('AssignmentEngine: Imported assignment to rep queue', { repId, leadId: lead.id });

    // Create updated lead (immutable)
    const updatedLead = {
      ...lead,
      status: LeadStatus.ASSIGNED,
      assignedTo: repId,
      campaignId: campaignId
    };

    console.log('AssignmentEngine: Lead status updated in import', { leadId: lead.id, status: updatedLead.status });
    
    return updatedLead;
  }

  /**
   * Clear all assignments (useful for testing)
   */
  clearAllAssignments(): void {
    this.assignments.clear();
    this.repQueues.clear();
  }
}
