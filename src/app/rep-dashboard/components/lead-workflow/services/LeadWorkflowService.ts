/**
 * Lead Workflow Service
 * 
 * Orchestrates the workflow between Campaign Management and Lead Management.
 * Maintains state consistency, handles campaign switching, and coordinates
 * lead processing across the entire workflow.
 */

import { 
  LeadWorkflowContext, 
  LeadHistoryEntry, 
  WorkflowEvent, 
  WorkflowAction,
  LeadWithContext,
  WorkflowConfig
} from '../types';
import { Lead, Campaign } from '../../types';

class LeadWorkflowService {
  private context: LeadWorkflowContext;
  private config: WorkflowConfig;
  private eventListeners: Map<string, ((event: WorkflowEvent) => void)[]> = new Map();
  private historyStorage: LeadHistoryEntry[] = [];

  constructor(config: Partial<WorkflowConfig> = {}) {
    this.config = {
      autoSaveInterval: 0, // Disabled for development - no auto-save
      maxHistoryEntries: 1000,
      enableCrossCampaignTracking: true,
      debugMode: false,
      ...config
    };

    this.context = {
      activeCampaignId: '',
      selectedLead: null,
      activeLeadList: 'prospect',
      leadHistory: [],
      workflowState: {
        isProcessingLead: false,
        currentStep: 'campaign_selection',
        pendingActions: [],
        lastUpdated: new Date().toISOString()
      }
    };

    this.initializeWorkflow();
  }

  /**
   * Initialize the workflow service
   */
  private initializeWorkflow(): void {
    if (this.config.debugMode) {
      console.log('🔧 LeadWorkflowService: Initializing workflow service');
    }

    // Set up auto-save interval (only if enabled)
    if (this.config.autoSaveInterval > 0) {
      setInterval(() => {
        this.saveWorkflowState();
      }, this.config.autoSaveInterval);
    } else {
      // Auto-save disabled for development
      console.log('🔧 LeadWorkflowService: Auto-save disabled for development');
    }
  }

  /**
   * Set the active campaign context
   */
  public setActiveCampaign(campaignId: string, campaign: Campaign): void {
    const previousCampaignId = this.context.activeCampaignId;
    
    // Only proceed if campaign actually changed
    if (previousCampaignId === campaignId) {
      return; // No change, exit early
    }
    
    this.context.activeCampaignId = campaignId;
    this.updateWorkflowStep('campaign_selection');
    
    // Record campaign switch in history
    if (previousCampaignId) {
      this.recordAction('campaign_switched', {
        fromCampaign: previousCampaignId,
        toCampaign: campaignId,
        campaignName: campaign.name
      });
    }

    this.emitEvent('campaign_switched', { campaignId, campaign });
  }

  /**
   * Get leads for the current campaign with workflow context
   */
  public getCampaignLeads(campaignLeads: Lead[]): LeadWithContext[] {
    return campaignLeads.map(lead => this.enrichLeadWithContext(lead));
  }

  /**
   * Select a lead for processing
   */
  public selectLead(lead: Lead): void {
    this.context.selectedLead = lead;
    this.context.workflowState.isProcessingLead = true;
    this.updateWorkflowStep('lead_processing');

    this.recordAction('lead_selected', {
      leadId: lead.id,
      leadName: lead.clientName || lead.clientFirstName + ' ' + lead.clientLastName
    });

    this.emitEvent('lead_selected', { lead });
  }

  /**
   * Update lead status and sync back to campaign
   */
  public updateLeadStatus(leadId: string, newStatus: string, details?: any): void {
    if (this.context.selectedLead?.id === leadId) {
      // Update the selected lead status
      this.context.selectedLead = {
        ...this.context.selectedLead,
        status: newStatus
      };
    }

    this.recordAction('status_updated', {
      leadId,
      newStatus,
      details
    });

    this.emitEvent('status_updated', { leadId, newStatus, details });
  }

  /**
   * Handle lead assignment acceptance from campaign management
   */
  public acceptLeadAssignment(assignmentId: string, leads: Lead[]): void {
    this.recordAction('lead_accepted', {
      assignmentId,
      leadCount: leads.length
    });

    this.updateWorkflowStep('lead_list_management');
    this.emitEvent('lead_accepted', { assignmentId, leads });
  }

  /**
   * Handle lead assignment decline from campaign management
   */
  public declineLeadAssignment(assignmentId: string, reason?: string): void {
    this.recordAction('lead_declined', {
      assignmentId,
      reason
    });

    this.emitEvent('lead_declined', { assignmentId, reason });
  }

  /**
   * Complete lead processing
   */
  public completeLead(leadId: string): void {
    this.context.workflowState.isProcessingLead = false;
    this.updateWorkflowStep('lead_completion');

    this.recordAction('lead_completed', {
      leadId
    });

    this.emitEvent('lead_completed', { leadId });
  }

  /**
   * Get current workflow context
   */
  public getWorkflowContext(): LeadWorkflowContext {
    return { ...this.context };
  }

  /**
   * Get lead history for a specific lead
   */
  public getLeadHistory(leadId: string): LeadHistoryEntry[] {
    return this.historyStorage.filter(entry => entry.leadId === leadId);
  }

  /**
   * Get workflow statistics
   */
  public getWorkflowStats() {
    const totalActions = this.historyStorage.length;
    const actionCounts = this.historyStorage.reduce((acc, entry) => {
      acc[entry.action] = (acc[entry.action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalActions,
      actionCounts,
      currentStep: this.context.workflowState.currentStep,
      isProcessingLead: this.context.workflowState.isProcessingLead,
      activeCampaign: this.context.activeCampaignId
    };
  }

  /**
   * Subscribe to workflow events
   */
  public subscribe(eventType: string, callback: (event: WorkflowEvent) => void): () => void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    
    this.eventListeners.get(eventType)!.push(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.eventListeners.get(eventType);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }

  /**
   * Private Methods
   */

  private enrichLeadWithContext(lead: Lead): LeadWithContext {
    const history = this.getLeadHistory(lead.id);
    
    return {
      ...lead,
      workflowHistory: history,
      currentCampaign: { id: this.context.activeCampaignId } as Campaign,
      workflowStatus: this.context.workflowState.currentStep,
      lastInteraction: history.length > 0 ? history[history.length - 1].timestamp : '',
      processed: (lead as any).processed || false // Preserve processed property
    };
  }

  private recordAction(action: WorkflowAction, details: any): void {
    const entry: LeadHistoryEntry = {
      leadId: this.context.selectedLead?.id || '',
      campaignId: this.context.activeCampaignId,
      action,
      timestamp: new Date().toISOString(),
      details
    };

    this.historyStorage.push(entry);
    this.context.leadHistory.push(entry);

    // Limit history size
    if (this.historyStorage.length > this.config.maxHistoryEntries) {
      this.historyStorage = this.historyStorage.slice(-this.config.maxHistoryEntries);
    }

    if (this.config.debugMode) {
      console.log('📝 LeadWorkflowService: Action recorded', entry);
    }
  }

  private updateWorkflowStep(step: typeof this.context.workflowState.currentStep): void {
    this.context.workflowState.currentStep = step;
    this.context.workflowState.lastUpdated = new Date().toISOString();
  }

  private emitEvent(type: string, payload: any): void {
    const event: WorkflowEvent = {
      type: type as WorkflowAction,
      payload,
      timestamp: new Date().toISOString(),
      source: 'lead_management'
    };

    const listeners = this.eventListeners.get(type);
    if (listeners) {
      listeners.forEach(callback => callback(event));
    }

    if (this.config.debugMode) {
      console.log('📡 LeadWorkflowService: Event emitted', event);
    }
  }

  private saveWorkflowState(): void {
    // In a real app, this would save to localStorage or backend
    if (this.config.debugMode) {
      console.log('💾 LeadWorkflowService: Workflow state saved');
    }
    // Autosave disabled for development (autoSaveInterval: 0)
  }
}

// Export singleton instance
export const leadWorkflowService = new LeadWorkflowService({
  debugMode: false // Temporarily disabled to reduce console noise
});

export default LeadWorkflowService;
