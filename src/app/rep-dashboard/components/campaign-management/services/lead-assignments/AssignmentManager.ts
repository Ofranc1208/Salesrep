export interface LeadAssignment {
  id: string;
  leadIds: string[];
  assignedTo: string; // Rep ID
  assignedBy: string; // Manager ID
  campaignId: string;
  campaignName: string;
  messageTemplate?: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  assignedAt: string;
  respondedAt?: string;
  leadCount: number;
  priority: 'high' | 'medium' | 'low';
}

export interface AssignmentLead {
  id: string;
  clientFirstName: string;
  clientLastName: string;
  phone1: string;
  insuranceCompany: string;
  payment100: number;
  status: 'New' | 'Assigned' | 'Contacted' | 'Qualified' | 'Closed';
  assignedTo?: string;
  assignedDate?: string;
}

/**
 * Assignment Manager - Create and manage assignments
 * Focused responsibility: Handle assignment creation and status management
 */
export class AssignmentManager {
  private assignments: Map<string, LeadAssignment> = new Map();
  private leads: Map<string, AssignmentLead> = new Map();

  /**
   * Create new assignment
   */
  createAssignment(
    leads: AssignmentLead[],
    repId: string,
    managerId: string,
    campaignId: string,
    campaignName: string,
    messageTemplate?: string,
    priority: 'high' | 'medium' | 'low' = 'medium'
  ): LeadAssignment {
    const assignmentId = `assignment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const assignment: LeadAssignment = {
      id: assignmentId,
      leadIds: leads.map(lead => lead.id),
      assignedTo: repId,
      assignedBy: managerId,
      campaignId,
      campaignName,
      messageTemplate,
      status: 'pending',
      assignedAt: new Date().toISOString(),
      leadCount: leads.length,
      priority
    };

    // Store assignment and leads
    this.assignments.set(assignmentId, assignment);
    leads.forEach(lead => {
      lead.status = 'Assigned';
      lead.assignedTo = repId;
      lead.assignedDate = assignment.assignedAt;
      this.leads.set(lead.id, lead);
    });

    console.log(`📋 Created assignment ${assignmentId} for ${leads.length} leads`);
    return assignment;
  }

  /**
   * Update assignment status
   */
  updateAssignmentStatus(assignmentId: string, status: LeadAssignment['status']): boolean {
    const assignment = this.assignments.get(assignmentId);
    if (!assignment) return false;

    assignment.status = status;
    assignment.respondedAt = new Date().toISOString();

    // Update lead statuses based on response
    if (status === 'accepted') {
      assignment.leadIds.forEach(leadId => {
        const lead = this.leads.get(leadId);
        if (lead) {
          lead.status = 'Contacted';
        }
      });
    } else if (status === 'declined') {
      assignment.leadIds.forEach(leadId => {
        const lead = this.leads.get(leadId);
        if (lead) {
          lead.status = 'New';
          lead.assignedTo = undefined;
          lead.assignedDate = undefined;
        }
      });
    }

    console.log(`📋 Updated assignment ${assignmentId} to ${status}`);
    return true;
  }

  /**
   * Store incoming assignment from manager (Rep Dashboard)
   */
  storeIncomingAssignment(assignment: LeadAssignment, leads: AssignmentLead[]): void {
    // Store the assignment
    this.assignments.set(assignment.id, assignment);
    
    // Store the leads
    leads.forEach(lead => {
      this.leads.set(lead.id, lead);
    });
    
    console.log(`📋 Stored incoming assignment ${assignment.id} with ${leads.length} leads`);
  }

  /**
   * Get assignment by ID
   */
  getAssignment(assignmentId: string): LeadAssignment | undefined {
    return this.assignments.get(assignmentId);
  }

  /**
   * Get assignments for rep
   */
  getRepAssignments(repId: string): LeadAssignment[] {
    return Array.from(this.assignments.values())
      .filter(assignment => assignment.assignedTo === repId);
  }

  /**
   * Get pending assignments for rep
   */
  getPendingAssignments(repId: string): LeadAssignment[] {
    return this.getRepAssignments(repId)
      .filter(assignment => assignment.status === 'pending');
  }

  /**
   * Get leads for assignment
   */
  getAssignmentLeads(assignmentId: string): AssignmentLead[] {
    const assignment = this.assignments.get(assignmentId);
    if (!assignment) return [];

    return assignment.leadIds
      .map(leadId => this.leads.get(leadId))
      .filter(lead => lead !== undefined) as AssignmentLead[];
  }

  /**
   * Get assignment stats
   */
  getStats(repId?: string): {
    total: number;
    pending: number;
    accepted: number;
    declined: number;
    totalLeads: number;
  } {
    const assignments = repId 
      ? this.getRepAssignments(repId)
      : Array.from(this.assignments.values());

    return {
      total: assignments.length,
      pending: assignments.filter(a => a.status === 'pending').length,
      accepted: assignments.filter(a => a.status === 'accepted').length,
      declined: assignments.filter(a => a.status === 'declined').length,
      totalLeads: assignments.reduce((sum, a) => sum + a.leadCount, 0)
    };
  }
}

export const assignmentManager = new AssignmentManager();
