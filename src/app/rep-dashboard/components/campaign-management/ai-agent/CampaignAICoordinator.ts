/**
 * Campaign AI Coordinator
 * 
 * Lightweight coordinator that manages campaign-related micro-agents.
 * Routes queries to appropriate micro-agents and coordinates responses.
 * Keeps under 150 lines by delegating to specialized micro-agents.
 */

import { AIAgent, AIResponse } from '../../ai-assistant/orchestrator/AIOrchestrator';
import { Campaign, Lead, LeadNotification } from '../../../types';
import { overviewAI, queueAI, leadsAI, analyticsAI } from './micro-agents';

interface CampaignContext {
  activeCampaign?: Campaign;
  campaigns: Campaign[];
  campaignLeads: Lead[];
  notifications: LeadNotification[];
  queueStats: any;
  lastUpdated: string;
}

class CampaignAICoordinator implements AIAgent {
  public readonly name = 'CampaignAI';
  private context: CampaignContext;
  private microAgents = [overviewAI, queueAI, leadsAI, analyticsAI];

  constructor() {
    this.context = {
      campaigns: [],
      campaignLeads: [],
      notifications: [],
      queueStats: { pending: 0, accepted: 0, declined: 0, totalLeads: 0 },
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
      content: "I can help you with campaign overview, lead queue, lead lists, or analytics. What would you like to know?",
      confidence: 0.6,
      source: 'CampaignAI',
      suggestions: [
        'Check campaign status',
        'Review lead queue',
        'View lead lists',
        'Get analytics'
      ]
    };
  }

  public getContext(): CampaignContext {
    return { ...this.context };
  }

  public updateContext(newContext?: any): void {
    if (newContext?.campaigns) {
      this.context.campaigns = newContext.campaigns;
    }
    
    if (newContext?.activeCampaign) {
      this.context.activeCampaign = newContext.activeCampaign;
    }
    
    if (newContext?.campaignLeads) {
      this.context.campaignLeads = newContext.campaignLeads;
    }
    
    if (newContext?.notifications) {
      this.context.notifications = newContext.notifications;
    }
    
    if (newContext?.queueStats) {
      this.context.queueStats = newContext.queueStats;
    }

    this.context.lastUpdated = new Date().toISOString();
  }

  private findBestMicroAgent(query: string): AIAgent | null {
    // Find micro-agents that can handle the query
    const capableAgents = this.microAgents.filter(agent => agent.canHandle(query));
    
    if (capableAgents.length === 0) return null;
    
    // For now, return the first capable agent
    // In the future, could implement more sophisticated routing
    return capableAgents[0];
  }

  private syncMicroAgentContexts(): void {
    // Update each micro-agent with relevant context
    overviewAI.updateContext({
      activeCampaign: this.context.activeCampaign,
      campaigns: this.context.campaigns
    });

    queueAI.updateContext({
      queueStats: this.context.queueStats,
      notifications: this.context.notifications
    });

    leadsAI.updateContext({
      campaignLeads: this.context.campaignLeads,
      leadDistribution: this.calculateLeadDistribution()
    });

    analyticsAI.updateContext({
      activeCampaign: this.context.activeCampaign,
      analytics: this.calculateAnalytics()
    });
  }

  private calculateLeadDistribution() {
    // Calculate lead distribution from campaign leads
    const distribution = { prospect: 0, hot: 0, warm: 0, active: 0 };
    
    this.context.campaignLeads.forEach(lead => {
      const status = lead.status?.toLowerCase();
      if (status?.includes('hot')) distribution.hot++;
      else if (status?.includes('warm')) distribution.warm++;
      else if (status?.includes('active')) distribution.active++;
      else distribution.prospect++;
    });

    return distribution;
  }

  private calculateAnalytics() {
    // Calculate basic analytics from available data
    const totalLeads = this.context.campaignLeads.length;
    const processedLeads = this.context.campaignLeads.filter(lead => lead.processed).length;
    
    return {
      conversionRate: totalLeads > 0 ? Math.round((processedLeads / totalLeads) * 100) : 0,
      responseRate: 85, // Mock data
      averageProcessingTime: 4.5, // Mock data
      trendsData: { daily: [10, 12, 15], weekly: [45, 52, 48] }
    };
  }
}

export const campaignAI = new CampaignAICoordinator();
export default CampaignAICoordinator;
