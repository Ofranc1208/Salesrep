/**
 * Campaign Queue AI Micro-Agent
 * 
 * Specialized micro-agent focused solely on lead queue management.
 * Handles queue status, pending assignments, and queue-related questions.
 */

import { AIAgent, AIResponse } from '../../../ai-assistant/orchestrator/AIOrchestrator';
import { LeadNotification } from '../../../../types';

interface QueueContext {
  queueStats: {
    pending: number;
    accepted: number;
    declined: number;
    totalLeads: number;
  };
  notifications: LeadNotification[];
  lastUpdated: string;
}

class QueueAI implements AIAgent {
  public readonly name = 'QueueAI';
  private context: QueueContext;
  private keywords = ['queue', 'pending', 'assignment', 'waiting', 'accept', 'decline'];

  constructor() {
    this.context = {
      queueStats: { pending: 0, accepted: 0, declined: 0, totalLeads: 0 },
      notifications: [],
      lastUpdated: new Date().toISOString()
    };
  }

  public canHandle(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return this.keywords.some(keyword => lowerQuery.includes(keyword));
  }

  public async process(query: string, userContext?: any): Promise<AIResponse> {
    this.updateContext(userContext);
    
    const { queueStats, notifications } = this.context;
    const urgentNotifications = notifications.filter(n => !n.isRead).length;
    
    const content = `📬 **Lead Queue Status**

**Pending Assignments:** ${queueStats.pending} ${queueStats.pending > 0 ? '⚠️' : '✅'}
**Accepted & Active:** ${queueStats.accepted}
**Total Leads:** ${queueStats.totalLeads}

${queueStats.pending > 0 
  ? `🔥 **Action Needed:** ${queueStats.pending} assignments waiting for your response.`
  : '✅ **All Clear:** No pending assignments.'
}

${urgentNotifications > 0 
  ? `🔔 You also have ${urgentNotifications} unread notifications.`
  : ''
}

**Next Steps:** ${this.getNextSteps()}`;

    return {
      content,
      confidence: 0.9,
      source: 'QueueAI',
      suggestions: this.getSuggestions(),
      data: { queueStats, urgentNotifications }
    };
  }

  public getContext(): QueueContext {
    return { ...this.context };
  }

  public updateContext(newContext?: any): void {
    if (newContext?.queueStats) {
      this.context.queueStats = newContext.queueStats;
    }
    
    if (newContext?.notifications) {
      this.context.notifications = newContext.notifications;
    }

    this.context.lastUpdated = new Date().toISOString();
  }

  private getNextSteps(): string {
    const { queueStats } = this.context;
    
    if (queueStats.pending > 0) {
      return 'Review and accept high-priority assignments';
    }
    
    if (queueStats.accepted > 0) {
      return 'Process your accepted leads';
    }
    
    return 'Check for new assignments or focus on lead processing';
  }

  private getSuggestions(): string[] {
    const { queueStats } = this.context;
    
    if (queueStats.pending > 0) {
      return ['Go to Lead Queue', 'Accept priority assignments', 'Review assignment details'];
    }
    
    if (queueStats.accepted > 0) {
      return ['Process accepted leads', 'Check lead progress', 'Update lead status'];
    }
    
    return ['Check for new assignments', 'Review queue analytics', 'View completed leads'];
  }
}

export const queueAI = new QueueAI();
export default QueueAI;
