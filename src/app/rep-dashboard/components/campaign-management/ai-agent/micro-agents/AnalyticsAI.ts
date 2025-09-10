/**
 * Campaign Analytics AI Micro-Agent
 * 
 * Specialized micro-agent focused solely on campaign analytics and metrics.
 * Handles performance analysis, trends, and analytics-related questions.
 */

import { AIAgent, AIResponse } from '../../../ai-assistant/orchestrator/AIOrchestrator';
import { Campaign } from '../../../../types';

interface AnalyticsContext {
  activeCampaign?: Campaign;
  analytics: {
    conversionRate: number;
    responseRate: number;
    averageProcessingTime: number;
    trendsData: {
      daily: number[];
      weekly: number[];
    };
  };
  lastUpdated: string;
}

class AnalyticsAI implements AIAgent {
  public readonly name = 'AnalyticsAI';
  private context: AnalyticsContext;
  private keywords = ['analytics', 'metrics', 'performance', 'conversion', 'trends', 'data'];

  constructor() {
    this.context = {
      analytics: {
        conversionRate: 0,
        responseRate: 0,
        averageProcessingTime: 0,
        trendsData: { daily: [], weekly: [] }
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
    
    const { activeCampaign, analytics } = this.context;
    
    if (!activeCampaign) {
      return {
        content: "I need an active campaign to provide analytics. Please select a campaign first.",
        confidence: 0.8,
        source: 'AnalyticsAI',
        suggestions: ['Select a campaign', 'View campaign overview']
      };
    }

    const content = `📊 **${activeCampaign.name}** Analytics

**Key Metrics:**
📈 Conversion Rate: ${analytics.conversionRate}% ${this.getRateStatus(analytics.conversionRate, 15)}
📞 Response Rate: ${analytics.responseRate}% ${this.getRateStatus(analytics.responseRate, 80)}
⏱️ Avg Processing Time: ${analytics.averageProcessingTime} hours

**Campaign Performance:**
${this.getPerformanceAnalysis()}

**Trends:** ${this.getTrendAnalysis()}

**Recommendations:**
${this.getAnalyticsRecommendations()}`;

    return {
      content,
      confidence: 0.9,
      source: 'AnalyticsAI',
      suggestions: this.getAnalyticsSuggestions(),
      data: { analytics, performance: this.getPerformanceAnalysis() }
    };
  }

  public getContext(): AnalyticsContext {
    return { ...this.context };
  }

  public updateContext(newContext?: any): void {
    if (newContext?.activeCampaign) {
      this.context.activeCampaign = newContext.activeCampaign;
    }
    
    if (newContext?.analytics) {
      this.context.analytics = { ...this.context.analytics, ...newContext.analytics };
    }

    this.context.lastUpdated = new Date().toISOString();
  }

  private getRateStatus(rate: number, benchmark: number): string {
    if (rate >= benchmark * 1.2) return '🔥 Excellent';
    if (rate >= benchmark) return '✅ Good';
    if (rate >= benchmark * 0.8) return '⚡ Average';
    return '⚠️ Below target';
  }

  private getPerformanceAnalysis(): string {
    const { activeCampaign, analytics } = this.context;
    
    if (!activeCampaign) return 'No campaign data available';
    
    const completionRate = activeCampaign.totalLeads > 0 
      ? (activeCampaign.processedLeads / activeCampaign.totalLeads) * 100
      : 0;
    
    return `Campaign is ${Math.round(completionRate)}% complete with ${analytics.conversionRate}% conversion rate`;
  }

  private getTrendAnalysis(): string {
    const { analytics } = this.context;
    
    if (analytics.trendsData.daily.length < 2) return 'Insufficient data for trend analysis';
    
    const recent = analytics.trendsData.daily.slice(-3);
    const average = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    
    if (average > recent[0]) return '📈 Trending upward';
    if (average < recent[0]) return '📉 Trending downward';
    return '➡️ Stable performance';
  }

  private getAnalyticsRecommendations(): string {
    const { analytics } = this.context;
    const recommendations = [];
    
    if (analytics.conversionRate < 15) {
      recommendations.push('• Focus on improving conversion strategies');
    }
    
    if (analytics.responseRate < 80) {
      recommendations.push('• Increase contact frequency and timing optimization');
    }
    
    if (analytics.averageProcessingTime > 24) {
      recommendations.push('• Streamline lead processing workflow');
    }

    return recommendations.length > 0 ? recommendations.join('\n') : '• Continue current performance strategies';
  }

  private getAnalyticsSuggestions(): string[] {
    const { analytics } = this.context;
    
    if (analytics.conversionRate < 15) {
      return ['Improve conversion strategies', 'Review successful approaches', 'Analyze high-performing leads'];
    }
    
    if (analytics.responseRate < 80) {
      return ['Optimize contact timing', 'Review message templates', 'Increase follow-up frequency'];
    }
    
    return ['Maintain current performance', 'Explore growth opportunities', 'Share best practices'];
  }
}

export const analyticsAI = new AnalyticsAI();
export default AnalyticsAI;
