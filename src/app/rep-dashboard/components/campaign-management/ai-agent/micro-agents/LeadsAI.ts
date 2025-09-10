/**
 * Campaign Leads AI Micro-Agent
 * 
 * Specialized micro-agent focused solely on lead list management.
 * Handles lead lists, lead distribution, and lead-related questions.
 */

import { AIAgent, AIResponse } from '../../../ai-assistant/orchestrator/AIOrchestrator';
import { Lead } from '../../../../types';

interface LeadsContext {
  campaignLeads: Lead[];
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  leadDistribution: {
    prospect: number;
    hot: number;
    warm: number;
    active: number;
  };
  lastUpdated: string;
}

class LeadsAI implements AIAgent {
  public readonly name = 'LeadsAI';
  private context: LeadsContext;
  private keywords = ['leads', 'list', 'prospect', 'hot', 'warm', 'active', 'distribution'];

  constructor() {
    this.context = {
      campaignLeads: [],
      activeLeadList: 'prospect',
      leadDistribution: { prospect: 0, hot: 0, warm: 0, active: 0 },
      lastUpdated: new Date().toISOString()
    };
  }

  public canHandle(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return this.keywords.some(keyword => lowerQuery.includes(keyword));
  }

  public async process(query: string, userContext?: any): Promise<AIResponse> {
    this.updateContext(userContext);
    
    const { leadDistribution, activeLeadList, campaignLeads } = this.context;
    const totalLeads = Object.values(leadDistribution).reduce((sum, count) => sum + count, 0);
    
    const content = `👥 **Lead Lists Overview**

**Current Focus:** ${activeLeadList.charAt(0).toUpperCase() + activeLeadList.slice(1)} List

**Lead Distribution:**
🔥 Hot: ${leadDistribution.hot} leads
🌡️ Warm: ${leadDistribution.warm} leads  
⚡ Active: ${leadDistribution.active} leads
📋 Prospect: ${leadDistribution.prospect} leads

**Total Pipeline:** ${totalLeads} leads
**Pipeline Health:** ${this.getPipelineHealth()}

**Recommendations:**
${this.getLeadRecommendations()}`;

    return {
      content,
      confidence: 0.9,
      source: 'LeadsAI',
      suggestions: this.getLeadSuggestions(),
      data: { leadDistribution, totalLeads, pipelineHealth: this.getPipelineHealth() }
    };
  }

  public getContext(): LeadsContext {
    return { ...this.context };
  }

  public updateContext(newContext?: any): void {
    if (newContext?.campaignLeads) {
      this.context.campaignLeads = newContext.campaignLeads;
    }
    
    if (newContext?.activeLeadList) {
      this.context.activeLeadList = newContext.activeLeadList;
    }
    
    if (newContext?.leadDistribution) {
      this.context.leadDistribution = newContext.leadDistribution;
    }

    this.context.lastUpdated = new Date().toISOString();
  }

  private getPipelineHealth(): string {
    const { leadDistribution } = this.context;
    const total = Object.values(leadDistribution).reduce((sum, count) => sum + count, 0);
    
    if (total === 0) return '❌ Empty pipeline';
    if (leadDistribution.hot >= total * 0.2) return '🔥 Excellent';
    if (leadDistribution.hot >= total * 0.1) return '✅ Good';
    return '⚠️ Needs improvement';
  }

  private getLeadRecommendations(): string {
    const { leadDistribution } = this.context;
    const recommendations = [];
    
    if (leadDistribution.hot > 0) {
      recommendations.push(`• Prioritize ${leadDistribution.hot} hot leads for conversion`);
    }
    
    if (leadDistribution.warm > leadDistribution.hot * 2) {
      recommendations.push(`• Work on moving warm leads to hot status`);
    }
    
    if (leadDistribution.prospect > 20) {
      recommendations.push(`• Qualify prospect leads to reduce pipeline clutter`);
    }

    return recommendations.length > 0 ? recommendations.join('\n') : '• Continue current lead management approach';
  }

  private getLeadSuggestions(): string[] {
    const { leadDistribution, activeLeadList } = this.context;
    
    if (leadDistribution.hot > 0) {
      return ['Focus on hot leads', 'Review conversion strategies', 'Contact high-priority prospects'];
    }
    
    if (leadDistribution.warm > 0) {
      return ['Nurture warm leads', 'Move warm to hot', 'Increase contact frequency'];
    }
    
    return [`Review ${activeLeadList} list`, 'Qualify prospects', 'Update lead statuses'];
  }
}

export const leadsAI = new LeadsAI();
export default LeadsAI;
