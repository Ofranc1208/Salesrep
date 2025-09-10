/**
 * Campaign AI Agent
 * 
 * Specialized AI agent that lives within the campaign-management folder.
 * Provides intelligent insights about campaigns, assignments, queue status,
 * and workflow guidance. Has deep knowledge of campaign-specific data and processes.
 */

import { AIAgent, AIResponse } from '../../ai-assistant/orchestrator/AIOrchestrator';
import { Campaign, Lead, LeadNotification } from '../../../types';
// Note: leadWorkflowService import removed - will be provided via context

interface CampaignContext {
  activeCampaign?: Campaign;
  campaigns: Campaign[];
  queueStats: {
    pending: number;
    accepted: number;
    declined: number;
    totalLeads: number;
  };
  notifications: LeadNotification[];
  workflowState: any;
  lastUpdated: string;
}

class CampaignAI implements AIAgent {
  public readonly name = 'CampaignAI';
  private context: CampaignContext;
  private keywords = [
    'campaign', 'assignment', 'queue', 'workflow', 'leads', 'pending',
    'accepted', 'declined', 'status', 'progress', 'manager', 'notification',
    'q1', 'buyout', 'structured', 'settlement'
  ];

  constructor() {
    this.context = {
      campaigns: [],
      queueStats: { pending: 0, accepted: 0, declined: 0, totalLeads: 0 },
      notifications: [],
      workflowState: null,
      lastUpdated: new Date().toISOString()
    };

    this.initializeContext();
  }

  /**
   * Determine if this agent can handle the query
   */
  public canHandle(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return this.keywords.some(keyword => lowerQuery.includes(keyword));
  }

  /**
   * Process the query and provide campaign-specific insights
   */
  public async process(query: string, userContext?: any): Promise<AIResponse> {
    const lowerQuery = query.toLowerCase();
    
    // Update context before processing
    this.updateContext(userContext);

    // Determine query type and respond accordingly
    if (this.isStatusQuery(lowerQuery)) {
      return this.handleStatusQuery(query);
    }
    
    if (this.isQueueQuery(lowerQuery)) {
      return this.handleQueueQuery(query);
    }
    
    if (this.isAssignmentQuery(lowerQuery)) {
      return this.handleAssignmentQuery(query);
    }
    
    if (this.isWorkflowQuery(lowerQuery)) {
      return this.handleWorkflowQuery(query);
    }

    // General campaign query
    return this.handleGeneralQuery(query);
  }

  /**
   * Get current context
   */
  public getContext(): CampaignContext {
    return { ...this.context };
  }

  /**
   * Update context with fresh data
   */
  public updateContext(newContext?: any): void {
    if (newContext?.campaigns) {
      this.context.campaigns = newContext.campaigns;
    }
    
    if (newContext?.activeCampaign) {
      this.context.activeCampaign = newContext.activeCampaign;
    }
    
    if (newContext?.queueStats) {
      this.context.queueStats = newContext.queueStats;
    }
    
    if (newContext?.notifications) {
      this.context.notifications = newContext.notifications;
    }

    this.context.lastUpdated = new Date().toISOString();
  }

  /**
   * Private Methods
   */

  private initializeContext(): void {
    // Initialize with any available data
    // This would typically connect to your existing campaign management state
    console.log('🏗️ CampaignAI: Initialized with context');
  }

  private isStatusQuery(query: string): boolean {
    return query.includes('status') || query.includes('how') || query.includes('doing');
  }

  private isQueueQuery(query: string): boolean {
    return query.includes('queue') || query.includes('pending') || query.includes('waiting');
  }

  private isAssignmentQuery(query: string): boolean {
    return query.includes('assignment') || query.includes('assigned') || query.includes('new');
  }

  private isWorkflowQuery(query: string): boolean {
    return query.includes('workflow') || query.includes('process') || query.includes('next');
  }

  private async handleStatusQuery(query: string): Promise<AIResponse> {
    const { activeCampaign, queueStats } = this.context;
    
    if (!activeCampaign) {
      return {
        content: "I don't see an active campaign selected. Please select a campaign to get status information.",
        confidence: 0.8,
        source: 'CampaignAI',
        suggestions: ['Select a campaign', 'View campaign list']
      };
    }

    const completionRate = activeCampaign.totalLeads > 0 
      ? Math.round((activeCampaign.processedLeads / activeCampaign.totalLeads) * 100)
      : 0;

    const content = `📊 **${activeCampaign.name}** is ${completionRate}% complete.

**Progress:** ${activeCampaign.processedLeads}/${activeCampaign.totalLeads} leads processed
**Queue Status:** ${queueStats.pending} pending, ${queueStats.accepted} accepted
**Status:** ${activeCampaign.status}

${queueStats.pending > 0 ? `⚠️ You have ${queueStats.pending} pending assignments that need attention.` : '✅ No pending assignments - great job!'}`;

    return {
      content,
      confidence: 0.95,
      source: 'CampaignAI',
      suggestions: [
        'Review pending assignments',
        'Check lead queue',
        'View campaign analytics'
      ],
      data: { activeCampaign, queueStats }
    };
  }

  private async handleQueueQuery(query: string): Promise<AIResponse> {
    const { queueStats, notifications } = this.context;
    
    const urgentNotifications = notifications.filter(n => !n.isRead).length;
    
    const content = `📬 **Queue Status:**

**Pending Assignments:** ${queueStats.pending}
**Accepted & Active:** ${queueStats.accepted}
**Total Leads:** ${queueStats.totalLeads}

${queueStats.pending > 0 
  ? `🔥 **Action Needed:** ${queueStats.pending} assignments waiting for your response.`
  : '✅ **All Clear:** No pending assignments.'
}

${urgentNotifications > 0 
  ? `🔔 You also have ${urgentNotifications} unread notifications.`
  : ''
}`;

    return {
      content,
      confidence: 0.9,
      source: 'CampaignAI',
      suggestions: [
        queueStats.pending > 0 ? 'Accept pending assignments' : 'Review accepted leads',
        'Check notifications',
        'View queue analytics'
      ],
      data: { queueStats, urgentNotifications }
    };
  }

  private async handleAssignmentQuery(query: string): Promise<AIResponse> {
    const { queueStats, activeCampaign } = this.context;
    
    if (queueStats.pending === 0) {
      return {
        content: "✅ No new assignments right now. All caught up! You can focus on processing your accepted leads or check back later for new assignments.",
        confidence: 0.85,
        source: 'CampaignAI',
        suggestions: [
          'Process accepted leads',
          'Review lead progress',
          'Check performance metrics'
        ]
      };
    }

    const content = `📋 **New Assignments Available:**

**${queueStats.pending} assignments** waiting for your review from **${activeCampaign?.name || 'your campaigns'}**.

**Recommendation:** Review and accept high-priority assignments first. The system will help you prioritize based on lead quality and urgency.

**Next Steps:**
1. Go to Lead Queue tab
2. Review assignment details
3. Accept assignments that match your capacity
4. Start processing accepted leads`;

    return {
      content,
      confidence: 0.9,
      source: 'CampaignAI',
      suggestions: [
        'Go to Lead Queue',
        'Accept high-priority assignments',
        'Review assignment details'
      ],
      data: { pendingCount: queueStats.pending }
    };
  }

  private async handleWorkflowQuery(query: string): Promise<AIResponse> {
    const { activeCampaign, queueStats, workflowState } = this.context;
    
    const content = `🔄 **Workflow Guidance:**

**Current Focus:** ${activeCampaign?.name || 'No active campaign'}
**Your Position:** ${this.getWorkflowStage()}

**Recommended Next Actions:**
${this.getWorkflowRecommendations()}

**Workflow Status:**
- Pending Review: ${queueStats.pending}
- In Progress: ${queueStats.accepted}
- Completed: ${queueStats.declined}`;

    return {
      content,
      confidence: 0.85,
      source: 'CampaignAI',
      suggestions: this.getWorkflowSuggestions(),
      data: { workflowState, recommendations: this.getWorkflowRecommendations() }
    };
  }

  private async handleGeneralQuery(query: string): Promise<AIResponse> {
    const { activeCampaign, campaigns, queueStats } = this.context;
    
    const content = `🎯 **Campaign Overview:**

**Active Campaign:** ${activeCampaign?.name || 'None selected'}
**Available Campaigns:** ${campaigns.length}
**Queue Summary:** ${queueStats.pending} pending, ${queueStats.accepted} active

I can help you with:
- Campaign status and progress
- Lead queue management
- Assignment handling
- Workflow guidance
- Performance insights

What would you like to know more about?`;

    return {
      content,
      confidence: 0.7,
      source: 'CampaignAI',
      suggestions: [
        'Check campaign status',
        'Review lead queue',
        'Get workflow guidance',
        'View assignments'
      ],
      data: { overview: true }
    };
  }

  private getWorkflowStage(): string {
    const { queueStats } = this.context;
    
    if (queueStats.pending > 0) {
      return 'Assignment Review Stage';
    }
    
    if (queueStats.accepted > 0) {
      return 'Lead Processing Stage';
    }
    
    return 'Ready for New Assignments';
  }

  private getWorkflowRecommendations(): string {
    const { queueStats } = this.context;
    
    if (queueStats.pending > 0) {
      return `1. Review ${queueStats.pending} pending assignments\n2. Accept high-priority leads\n3. Begin processing accepted leads`;
    }
    
    if (queueStats.accepted > 0) {
      return `1. Focus on ${queueStats.accepted} accepted leads\n2. Contact high-priority prospects\n3. Update lead statuses`;
    }
    
    return '1. Check for new assignments\n2. Review completed leads\n3. Analyze performance metrics';
  }

  private getWorkflowSuggestions(): string[] {
    const { queueStats } = this.context;
    
    if (queueStats.pending > 0) {
      return ['Review pending assignments', 'Accept priority leads', 'Check assignment details'];
    }
    
    if (queueStats.accepted > 0) {
      return ['Process accepted leads', 'Contact prospects', 'Update lead status'];
    }
    
    return ['Check for new assignments', 'Review performance', 'Analyze completed leads'];
  }
}

// Export singleton instance
export const campaignAI = new CampaignAI();
export default CampaignAI;
