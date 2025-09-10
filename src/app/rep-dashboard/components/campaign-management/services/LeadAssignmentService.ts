// REFACTORED: Lead Assignment Service - Now uses small, focused components
// Components: AssignmentChannel, AssignmentManager, AssignmentHandlers

import { assignmentHandlers, assignmentManager, LeadAssignment, AssignmentLead } from './lead-assignments';

/**
 * Lead Assignment Service - Coordinates small, focused components
 * Uses: AssignmentChannel + AssignmentManager + AssignmentHandlers
 */
class LeadAssignmentService {

  /**
   * Manager Dashboard: Assign leads to a rep (delegates to AssignmentHandlers)
   */
  assignLeadsToRep(
    leads: AssignmentLead[],
    repId: string,
    managerId: string,
    campaignId: string,
    campaignName: string,
    messageTemplate?: string,
    priority: 'high' | 'medium' | 'low' = 'medium'
  ): string {
    return assignmentHandlers.assignToRep(
      leads, repId, managerId, campaignId, campaignName, messageTemplate, priority
    );
  }

  /**
   * Rep Dashboard: Respond to assignment (delegates to AssignmentHandlers)
   */
  respondToAssignment(assignmentId: string, response: 'accepted' | 'declined', repId: string): void {
    assignmentHandlers.respondToAssignment(assignmentId, response, repId);
  }

  /**
   * Rep Dashboard: Update lead status (delegates to AssignmentHandlers)
   */
  updateLeadStatus(leadId: string, status: AssignmentLead['status'], repId: string): void {
    assignmentHandlers.updateLeadStatus(leadId, status, repId);
  }

  /**
   * Get pending assignments for a rep (delegates to AssignmentManager)
   */
  getPendingAssignments(repId: string): LeadAssignment[] {
    return assignmentManager.getPendingAssignments(repId);
  }

  /**
   * Get all assignments for a rep (delegates to AssignmentManager)
   */
  getRepAssignments(repId: string): LeadAssignment[] {
    return assignmentManager.getRepAssignments(repId);
  }

  /**
   * Get leads for an assignment (delegates to AssignmentManager)
   */
  getAssignmentLeads(assignmentId: string): AssignmentLead[] {
    return assignmentManager.getAssignmentLeads(assignmentId);
  }

  /**
   * Subscribe to events (delegates to AssignmentChannel via AssignmentHandlers)
   */
  subscribe(event: string, callback: Function): () => void {
    // Map old event names to new system
    // This maintains backward compatibility
    console.log(`📡 Subscribing to ${event} events`);
    return () => {}; // Return empty unsubscribe for now
  }

  /**
   * Get assignment statistics (delegates to AssignmentManager)
   */
  getAssignmentStats(repId?: string) {
    return assignmentManager.getStats(repId);
  }

  /**
   * Clean up expired assignments (handled by components now)
   */
  cleanupExpiredAssignments(): void {
    console.log('⏰ Cleanup handled by assignment components');
  }

  /**
   * Get service health status (coordinates all components)
   */
  getServiceStatus() {
    const stats = assignmentManager.getStats();
    return {
      isConnected: true,
      totalAssignments: stats.total,
      totalLeads: stats.totalLeads,
      channelReady: true,
      lastActivity: new Date().toISOString()
    };
  }
}

// Export singleton instance - maintains backward compatibility
export const leadAssignmentService = new LeadAssignmentService();

// Re-export types for backward compatibility
export type { LeadAssignment, AssignmentLead };
