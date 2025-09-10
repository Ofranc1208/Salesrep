/**
 * Priority Lead Tracker AI Micro-Agent
 * 
 * Specialized micro-agent focused solely on lead tracking and pipeline management.
 * Handles lead pipeline health, tracking metrics, and lead-related priorities.
 */

import { AIAgent, AIResponse } from '../../../orchestrator/AIOrchestrator';

interface LeadTrackerContext {
  leadTracker: {
    hotLeads: number;
    warmLeads: number;
    activeLeads: number;
    prospectLeads: number;
    overdueContacts: number;
  };
  pipelineMetrics: {
    conversionRate: number;
    averageResponseTime: number;
    pipelineVelocity: number;
  };
  lastUpdated: string;
}

class LeadTrackerAI implements AIAgent {
  public readonly name = 'LeadTrackerAI';
  private context: LeadTrackerContext;
  private keywords = ['lead', 'pipeline', 'hot', 'warm', 'active', 'prospect', 'overdue', 'tracking'];

  constructor() {
    this.context = {
      leadTracker: {
        hotLeads: 8,
        warmLeads: 15,
        activeLeads: 12,
        prospectLeads: 23,
        overdueContacts: 3
      },
      pipelineMetrics: {
        conversionRate: 18,
        averageResponseTime: 2.5,
        pipelineVelocity: 85
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
    
    const { leadTracker, pipelineMetrics } = this.context;
    const totalLeads = leadTracker.hotLeads + leadTracker.warmLeads + 
                      leadTracker.activeLeads + leadTracker.prospectLeads;
    
    const content = `👥 **Lead Pipeline Tracking**

**Pipeline Distribution:**
🔥 Hot: ${leadTracker.hotLeads} leads
🌡️ Warm: ${leadTracker.warmLeads} leads
⚡ Active: ${leadTracker.activeLeads} leads
📋 Prospect: ${leadTracker.prospectLeads} leads

**Total Pipeline:** ${totalLeads} leads
**Overdue Contacts:** ${leadTracker.overdueContacts} ${leadTracker.overdueContacts > 0 ? '⚠️' : '✅'}

**Pipeline Health:** ${this.getPipelineHealth()}
**Conversion Rate:** ${pipelineMetrics.conversionRate}%
**Avg Response Time:** ${pipelineMetrics.averageResponseTime} hours

**Priority Actions:**
${this.getPriorityActions()}`;

    return {
      content,
      confidence: 0.95,
      source: 'LeadTrackerAI',
      suggestions: this.getLeadTrackerSuggestions(),
      data: { leadTracker, pipelineMetrics, totalLeads }
    };
  }

  public getContext(): LeadTrackerContext {
    return { ...this.context };
  }

  public updateContext(newContext?: any): void {
    if (newContext?.leadTracker) {
      this.context.leadTracker = { ...this.context.leadTracker, ...newContext.leadTracker };
    }
    
    if (newContext?.pipelineMetrics) {
      this.context.pipelineMetrics = { ...this.context.pipelineMetrics, ...newContext.pipelineMetrics };
    }

    this.context.lastUpdated = new Date().toISOString();
  }

  private getPipelineHealth(): string {
    const { leadTracker } = this.context;
    const total = leadTracker.hotLeads + leadTracker.warmLeads + 
                 leadTracker.activeLeads + leadTracker.prospectLeads;
    
    if (total === 0) return '❌ Empty pipeline';
    if (leadTracker.hotLeads >= total * 0.2) return '🔥 Excellent';
    if (leadTracker.hotLeads >= total * 0.1) return '✅ Good';
    return '⚠️ Needs improvement';
  }

  private getPriorityActions(): string {
    const { leadTracker } = this.context;
    const actions = [];
    
    if (leadTracker.overdueContacts > 0) {
      actions.push(`• Contact ${leadTracker.overdueContacts} overdue leads immediately`);
    }
    
    if (leadTracker.hotLeads > 0) {
      actions.push(`• Focus on converting ${leadTracker.hotLeads} hot leads`);
    }
    
    if (leadTracker.warmLeads > leadTracker.hotLeads * 2) {
      actions.push(`• Work on moving warm leads to hot status`);
    }

    return actions.length > 0 ? actions.join('\n') : '• Continue current lead management approach';
  }

  private getLeadTrackerSuggestions(): string[] {
    const { leadTracker } = this.context;
    
    if (leadTracker.overdueContacts > 0) {
      return ['Contact overdue leads', 'Review contact schedule', 'Update lead status'];
    }
    
    if (leadTracker.hotLeads > 0) {
      return ['Focus on hot leads', 'Prioritize conversions', 'Review hot lead strategies'];
    }
    
    return ['Nurture warm leads', 'Qualify prospects', 'Optimize pipeline flow'];
  }
}

export const leadTrackerAI = new LeadTrackerAI();
export default LeadTrackerAI;
