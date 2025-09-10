/**
 * Priority AI Coordinator
 * 
 * Lightweight coordinator that manages priority intelligence micro-agents.
 * Routes queries to appropriate micro-agents and coordinates responses.
 * Keeps under 150 lines by delegating to specialized micro-agents.
 */

import { AIAgent, AIResponse } from '../../orchestrator/AIOrchestrator';
import { notificationsAI, leadTrackerAI, calendarAI, emailAI } from './micro-agents';

interface PriorityContext {
  performanceMetrics: any;
  notifications: any;
  calendar: any;
  emailAlerts: any;
  leadTracker: any;
  lastUpdated: string;
}

class PriorityAICoordinator implements AIAgent {
  public readonly name = 'PriorityAI';
  private context: PriorityContext;
  private microAgents = [notificationsAI, leadTrackerAI, calendarAI, emailAI];

  constructor() {
    this.context = {
      performanceMetrics: { contactRate: 92, conversionRate: 18, dailyTarget: 15, currentProgress: 12 },
      notifications: { priority: 2, general: 4, system: 1 },
      calendar: { todayAppointments: 3, upcomingDeadlines: 2, missedFollowUps: 1 },
      emailAlerts: { unreadCount: 5, urgentCount: 2 },
      leadTracker: { hotLeads: 8, warmLeads: 15, activeLeads: 12, prospectLeads: 23, overdueContacts: 3 },
      lastUpdated: new Date().toISOString()
    };
  }

  public canHandle(query: string): boolean {
    // Check if any micro-agent can handle the query
    return this.microAgents.some(agent => agent.canHandle(query));
  }

  public async process(query: string, userContext?: any): Promise<AIResponse> {
    // Update context for all micro-agents
    this.updateContext(userContext);
    this.syncMicroAgentContexts();

    // Find the best micro-agent for this query
    const capableAgent = this.findBestMicroAgent(query);
    
    if (capableAgent) {
      return await capableAgent.process(query, userContext);
    }

    // Fallback response
    return {
      content: "I can help you with notifications, lead tracking, calendar management, or email priorities. What would you like to know?",
      confidence: 0.6,
      source: 'PriorityAI',
      suggestions: [
        'Check notifications',
        'Review lead pipeline',
        'View calendar',
        'Check emails'
      ]
    };
  }

  public getContext(): PriorityContext {
    return { ...this.context };
  }

  public updateContext(newContext?: any): void {
    if (newContext?.performanceMetrics) {
      this.context.performanceMetrics = { ...this.context.performanceMetrics, ...newContext.performanceMetrics };
    }
    
    if (newContext?.notifications) {
      this.context.notifications = { ...this.context.notifications, ...newContext.notifications };
    }
    
    if (newContext?.calendar) {
      this.context.calendar = { ...this.context.calendar, ...newContext.calendar };
    }
    
    if (newContext?.emailAlerts) {
      this.context.emailAlerts = { ...this.context.emailAlerts, ...newContext.emailAlerts };
    }
    
    if (newContext?.leadTracker) {
      this.context.leadTracker = { ...this.context.leadTracker, ...newContext.leadTracker };
    }

    this.context.lastUpdated = new Date().toISOString();
  }

  private findBestMicroAgent(query: string): AIAgent | null {
    // Find micro-agents that can handle the query
    const capableAgents = this.microAgents.filter(agent => agent.canHandle(query));
    
    if (capableAgents.length === 0) return null;
    
    // Return the first capable agent
    return capableAgents[0];
  }

  private syncMicroAgentContexts(): void {
    // Update each micro-agent with relevant context
    notificationsAI.updateContext({
      notifications: this.context.notifications,
      alerts: {
        urgent: this.context.emailAlerts.urgentCount || 0,
        overdue: this.context.leadTracker.overdueContacts || 0,
        deadlines: this.context.calendar.upcomingDeadlines || 0
      }
    });

    leadTrackerAI.updateContext({
      leadTracker: this.context.leadTracker,
      pipelineMetrics: {
        conversionRate: this.context.performanceMetrics.conversionRate || 18,
        averageResponseTime: 2.5,
        pipelineVelocity: 85
      }
    });

    calendarAI.updateContext({
      calendar: this.context.calendar,
      timeManagement: {
        availableHours: 8,
        bookedHours: 6,
        efficiency: 75
      }
    });

    emailAI.updateContext({
      emailAlerts: this.context.emailAlerts,
      communication: {
        responseRate: this.context.performanceMetrics.contactRate || 85,
        averageResponseTime: 4.2,
        pendingResponses: 7
      }
    });
  }
}

export const priorityAI = new PriorityAICoordinator();
export default PriorityAICoordinator;
