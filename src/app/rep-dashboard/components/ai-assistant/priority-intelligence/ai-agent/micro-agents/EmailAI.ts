/**
 * Priority Email AI Micro-Agent
 * 
 * Specialized micro-agent focused solely on email management and communication.
 * Handles email alerts, communication priorities, and email-related tasks.
 */

import { AIAgent, AIResponse } from '../../../orchestrator/AIOrchestrator';

interface EmailContext {
  emailAlerts: {
    unreadCount: number;
    urgentCount: number;
    lastChecked: string;
    highPriorityCount: number;
  };
  communication: {
    responseRate: number;
    averageResponseTime: number;
    pendingResponses: number;
  };
  lastUpdated: string;
}

class EmailAI implements AIAgent {
  public readonly name = 'EmailAI';
  private context: EmailContext;
  private keywords = ['email', 'message', 'communication', 'response', 'inbox', 'urgent'];

  constructor() {
    this.context = {
      emailAlerts: {
        unreadCount: 5,
        urgentCount: 2,
        lastChecked: new Date().toISOString(),
        highPriorityCount: 3
      },
      communication: {
        responseRate: 85,
        averageResponseTime: 4.2,
        pendingResponses: 7
      },
      lastUpdated: new Date().toISOString()
    };
  }

  public canHandle(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return this.keywords.some(keyword => lowerQuery.includes(keyword));
  }

  public async process(query: string, userContext?: any): Promise<AIResponse> {
    this.updateContext(userContext);
    
    const { emailAlerts, communication } = this.context;
    
    const content = `📧 **Email & Communication Management**

**Email Status:**
📬 Unread: ${emailAlerts.unreadCount}
🔥 Urgent: ${emailAlerts.urgentCount}
⭐ High Priority: ${emailAlerts.highPriorityCount}
⏰ Pending Responses: ${communication.pendingResponses}

**Communication Metrics:**
📈 Response Rate: ${communication.responseRate}% ${this.getResponseRateStatus()}
⏱️ Avg Response Time: ${communication.averageResponseTime} hours
📊 Communication Health: ${this.getCommunicationHealth()}

**Priority Actions:**
${this.getEmailActions()}

**Recommendations:**
${this.getEmailRecommendations()}`;

    return {
      content,
      confidence: 0.9,
      source: 'EmailAI',
      suggestions: this.getEmailSuggestions(),
      data: { emailAlerts, communication }
    };
  }

  public getContext(): EmailContext {
    return { ...this.context };
  }

  public updateContext(newContext?: any): void {
    if (newContext?.emailAlerts) {
      this.context.emailAlerts = { ...this.context.emailAlerts, ...newContext.emailAlerts };
    }
    
    if (newContext?.communication) {
      this.context.communication = { ...this.context.communication, ...newContext.communication };
    }

    this.context.lastUpdated = new Date().toISOString();
  }

  private getResponseRateStatus(): string {
    const rate = this.context.communication.responseRate;
    if (rate >= 90) return '🔥 Excellent';
    if (rate >= 80) return '✅ Good';
    if (rate >= 70) return '⚡ Average';
    return '⚠️ Needs improvement';
  }

  private getCommunicationHealth(): string {
    const { emailAlerts, communication } = this.context;
    
    if (emailAlerts.urgentCount > 3) return '🔥 Critical - urgent emails need attention';
    if (communication.pendingResponses > 10) return '⚠️ Overloaded - too many pending responses';
    if (communication.responseRate >= 85) return '✅ Healthy';
    return '⚡ Needs optimization';
  }

  private getEmailActions(): string {
    const { emailAlerts, communication } = this.context;
    const actions = [];
    
    if (emailAlerts.urgentCount > 0) {
      actions.push(`• Respond to ${emailAlerts.urgentCount} urgent emails immediately`);
    }
    
    if (emailAlerts.highPriorityCount > 0) {
      actions.push(`• Review ${emailAlerts.highPriorityCount} high-priority messages`);
    }
    
    if (communication.pendingResponses > 5) {
      actions.push(`• Address ${communication.pendingResponses} pending responses`);
    }

    return actions.length > 0 ? actions.join('\n') : '• Email inbox is well managed';
  }

  private getEmailRecommendations(): string {
    const { communication } = this.context;
    const recommendations = [];
    
    if (communication.responseRate < 80) {
      recommendations.push('• Set up email response time goals');
    }
    
    if (communication.averageResponseTime > 6) {
      recommendations.push('• Implement faster response workflows');
    }
    
    if (communication.pendingResponses > 10) {
      recommendations.push('• Consider email management tools or templates');
    }

    return recommendations.length > 0 ? recommendations.join('\n') : '• Continue current email management practices';
  }

  private getEmailSuggestions(): string[] {
    const { emailAlerts, communication } = this.context;
    
    if (emailAlerts.urgentCount > 0) {
      return ['Handle urgent emails', 'Review high-priority messages', 'Set up email filters'];
    }
    
    if (communication.pendingResponses > 5) {
      return ['Clear pending responses', 'Use email templates', 'Batch process emails'];
    }
    
    return ['Check inbox regularly', 'Maintain response rate', 'Optimize email workflow'];
  }
}

export const emailAI = new EmailAI();
export default EmailAI;
