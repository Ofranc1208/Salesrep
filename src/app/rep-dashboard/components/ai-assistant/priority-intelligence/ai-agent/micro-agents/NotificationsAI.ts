/**
 * Priority Notifications AI Micro-Agent
 * 
 * Specialized micro-agent focused solely on notifications and alerts.
 * Handles notification management, alerts, and urgent communications.
 */

import { AIAgent, AIResponse } from '../../../orchestrator/AIOrchestrator';

interface NotificationsContext {
  notifications: {
    priority: number;
    general: number;
    system: number;
    unread: number;
  };
  alerts: {
    urgent: number;
    overdue: number;
    deadlines: number;
  };
  lastUpdated: string;
}

class NotificationsAI implements AIAgent {
  public readonly name = 'NotificationsAI';
  private context: NotificationsContext;
  private keywords = ['notification', 'alert', 'urgent', 'reminder', 'deadline', 'overdue'];

  constructor() {
    this.context = {
      notifications: { priority: 0, general: 0, system: 0, unread: 0 },
      alerts: { urgent: 0, overdue: 0, deadlines: 0 },
      lastUpdated: new Date().toISOString()
    };
  }

  public canHandle(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return this.keywords.some(keyword => lowerQuery.includes(keyword));
  }

  public async process(query: string, userContext?: any): Promise<AIResponse> {
    this.updateContext(userContext);
    
    const { notifications, alerts } = this.context;
    const totalAlerts = notifications.priority + alerts.urgent + alerts.overdue;
    
    const content = `🔔 **Notifications & Alerts**

**Notifications:**
🔥 Priority: ${notifications.priority}
📋 General: ${notifications.general}  
⚙️ System: ${notifications.system}
📬 Unread: ${notifications.unread}

**Alerts:**
⚠️ Urgent: ${alerts.urgent}
⏰ Overdue: ${alerts.overdue}
📅 Deadlines: ${alerts.deadlines}

**Alert Level:** ${this.getAlertLevel(totalAlerts)}

**Immediate Actions:**
${this.getImmediateActions()}`;

    return {
      content,
      confidence: 0.9,
      source: 'NotificationsAI',
      suggestions: this.getNotificationSuggestions(),
      data: { notifications, alerts, totalAlerts }
    };
  }

  public getContext(): NotificationsContext {
    return { ...this.context };
  }

  public updateContext(newContext?: any): void {
    if (newContext?.notifications) {
      this.context.notifications = { ...this.context.notifications, ...newContext.notifications };
    }
    
    if (newContext?.alerts) {
      this.context.alerts = { ...this.context.alerts, ...newContext.alerts };
    }

    this.context.lastUpdated = new Date().toISOString();
  }

  private getAlertLevel(totalAlerts: number): string {
    if (totalAlerts > 10) return '🔥 High Priority';
    if (totalAlerts > 5) return '⚡ Medium Priority';
    if (totalAlerts > 0) return '✅ Low Priority';
    return '🟢 All Clear';
  }

  private getImmediateActions(): string {
    const { notifications, alerts } = this.context;
    const actions = [];
    
    if (alerts.urgent > 0) {
      actions.push(`• Address ${alerts.urgent} urgent alerts immediately`);
    }
    
    if (alerts.overdue > 0) {
      actions.push(`• Complete ${alerts.overdue} overdue tasks`);
    }
    
    if (notifications.priority > 0) {
      actions.push(`• Review ${notifications.priority} priority notifications`);
    }
    
    if (alerts.deadlines > 0) {
      actions.push(`• Prepare for ${alerts.deadlines} upcoming deadlines`);
    }

    return actions.length > 0 ? actions.join('\n') : '• No immediate actions required';
  }

  private getNotificationSuggestions(): string[] {
    const { notifications, alerts } = this.context;
    
    if (alerts.urgent > 0) {
      return ['Handle urgent alerts', 'Review critical notifications', 'Check system alerts'];
    }
    
    if (notifications.priority > 0) {
      return ['Review priority notifications', 'Clear unread messages', 'Update notification settings'];
    }
    
    return ['Check for new notifications', 'Review notification history', 'Manage alert preferences'];
  }
}

export const notificationsAI = new NotificationsAI();
export default NotificationsAI;
