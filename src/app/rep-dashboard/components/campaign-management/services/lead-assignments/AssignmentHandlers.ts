import { assignmentChannel } from './AssignmentChannel';
import { assignmentManager, LeadAssignment, AssignmentLead } from './AssignmentManager';
import { leadForwarding } from '../campaign-leads/LeadForwarding';

/**
 * Assignment Handlers - Handle assignment responses and events
 * Focused responsibility: Process assignment events and coordinate responses
 */
export class AssignmentHandlers {

  constructor() {
    this.setupEventHandlers();
  }

  /**
   * Handle incoming assignment (Rep Dashboard)
   */
  private handleIncomingAssignment(data: { assignment: LeadAssignment; leads: AssignmentLead[] }): void {
    const { assignment, leads } = data;
    
    console.log(`📨 Received assignment: ${assignment.id} with ${leads.length} leads`);
    
    // Store the assignment and leads in the local AssignmentManager
    assignmentManager.storeIncomingAssignment(assignment, leads);
    
    console.log(`✅ Assignment ${assignment.id} stored locally for rep ${assignment.assignedTo}`);
  }

  /**
   * Handle assignment response (Manager Dashboard)
   */
  private handleAssignmentResponse(data: { assignmentId: string; response: string; repId: string }): void {
    const { assignmentId, response, repId } = data;
    
    console.log(`📨 Assignment ${assignmentId} ${response} by ${repId}`);
    
    // Update assignment status
    assignmentManager.updateAssignmentStatus(assignmentId, response as LeadAssignment['status']);
    
    // If accepted, forward leads to Lead Management
    if (response === 'accepted') {
      const leads = assignmentManager.getAssignmentLeads(assignmentId);
      const assignment = assignmentManager.getAssignment(assignmentId);
      
      if (leads.length > 0 && assignment) {
        // Convert AssignmentLead to Lead format for forwarding
        const leadsForForwarding = leads.map(lead => ({
          ...lead,
          priority: 'Medium', // Default priority
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastActivity: new Date().toISOString()
        }));
        
        leadForwarding.forwardAcceptedLeads(leadsForForwarding, assignment.campaignId);
      }
    }
  }

  /**
   * Handle lead status update
   */
  private handleLeadStatusUpdate(data: { leadId: string; status: string; repId: string }): void {
    const { leadId, status, repId } = data;
    
    console.log(`📨 Lead ${leadId} status updated to ${status} by ${repId}`);
    
    // This would typically update the lead in the system
    // For now, just log the update
  }

  /**
   * Setup event handlers for different message types
   */
  private setupEventHandlers(): void {
    // Handle incoming assignments (Rep Dashboard)
    assignmentChannel.subscribe('LEAD_ASSIGNMENT', (data) => {
      this.handleIncomingAssignment(data);
    });

    // Handle assignment responses (Manager Dashboard)
    assignmentChannel.subscribe('ASSIGNMENT_RESPONSE', (data) => {
      this.handleAssignmentResponse(data);
    });

    // Handle lead status updates (Manager Dashboard)
    assignmentChannel.subscribe('LEAD_STATUS_UPDATE', (data) => {
      this.handleLeadStatusUpdate(data);
    });
  }

  /**
   * Send assignment to rep (Manager Dashboard)
   */
  assignToRep(
    leads: AssignmentLead[],
    repId: string,
    managerId: string,
    campaignId: string,
    campaignName: string,
    messageTemplate?: string,
    priority: 'high' | 'medium' | 'low' = 'medium'
  ): string {
    // Create assignment
    const assignment = assignmentManager.createAssignment(
      leads, repId, managerId, campaignId, campaignName, messageTemplate, priority
    );

    // Send via channel
    assignmentChannel.sendMessage('LEAD_ASSIGNMENT', {
      assignment,
      leads
    });

    return assignment.id;
  }

  /**
   * Respond to assignment (Rep Dashboard)
   */
  respondToAssignment(assignmentId: string, response: 'accepted' | 'declined', repId: string): void {
    // Update local assignment
    assignmentManager.updateAssignmentStatus(assignmentId, response);

    // Send response via channel
    assignmentChannel.sendMessage('ASSIGNMENT_RESPONSE', {
      assignmentId,
      response,
      repId,
      respondedAt: new Date().toISOString()
    });
  }

  /**
   * Update lead status (Rep Dashboard)
   */
  updateLeadStatus(leadId: string, status: AssignmentLead['status'], repId: string): void {
    // Send status update via channel
    assignmentChannel.sendMessage('LEAD_STATUS_UPDATE', {
      leadId,
      status,
      repId,
      updatedAt: new Date().toISOString()
    });
  }
}

export const assignmentHandlers = new AssignmentHandlers();
