/**
 * Campaign Overview AI Micro-Agent
 * 
 * Specialized micro-agent focused solely on campaign overview insights.
 * Handles campaign status, progress, and general overview questions.
 */

import { AIAgent, AIResponse } from '../../../ai-assistant/orchestrator/AIOrchestrator';
import { Campaign } from '../../../../types';

interface OverviewContext {
  activeCampaign?: Campaign;
  campaigns: Campaign[];
  lastUpdated: string;
}

class OverviewAI implements AIAgent {
  public readonly name = 'OverviewAI';
  private context: OverviewContext;
  private keywords = ['overview', 'status', 'progress', 'campaign', 'doing', 'summary'];

  constructor() {
    this.context = {
      campaigns: [],
      lastUpdated: new Date().toISOString()
    };
  }

  public canHandle(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return this.keywords.some(keyword => lowerQuery.includes(keyword));
  }

  public async process(query: string, userContext?: any): Promise<AIResponse> {
    this.updateContext(userContext);
    
    const { activeCampaign } = this.context;
    
    if (!activeCampaign) {
      return {
        content: "I don't see an active campaign selected. Please select a campaign to get overview information.",
        confidence: 0.8,
        source: 'OverviewAI',
        suggestions: ['Select a campaign', 'View campaign list']
      };
    }

    const completionRate = activeCampaign.totalLeads > 0 
      ? Math.round((activeCampaign.processedLeads / activeCampaign.totalLeads) * 100)
      : 0;

    const content = `📊 **${activeCampaign.name}** Overview

**Progress:** ${completionRate}% complete (${activeCampaign.processedLeads}/${activeCampaign.totalLeads} leads)
**Status:** ${activeCampaign.status}
**Timeline:** ${activeCampaign.startDate} to ${activeCampaign.endDate}
**Manager:** ${activeCampaign.managerName}

${completionRate >= 80 ? '🎯 Excellent progress!' : 
  completionRate >= 50 ? '✅ On track' : 
  '⚡ Needs attention'}`;

    return {
      content,
      confidence: 0.95,
      source: 'OverviewAI',
      suggestions: [
        'Check lead queue',
        'View detailed analytics',
        'Review lead lists'
      ],
      data: { activeCampaign, completionRate }
    };
  }

  public getContext(): OverviewContext {
    return { ...this.context };
  }

  public updateContext(newContext?: any): void {
    if (newContext?.campaigns) {
      this.context.campaigns = newContext.campaigns;
    }
    
    if (newContext?.activeCampaign) {
      this.context.activeCampaign = newContext.activeCampaign;
    }

    this.context.lastUpdated = new Date().toISOString();
  }
}

export const overviewAI = new OverviewAI();
export default OverviewAI;
