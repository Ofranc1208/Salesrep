/**
 * Priority AI Agent
 * 
 * Specialized AI agent that lives within the priority-intelligence folder.
 * Provides intelligent insights about performance metrics, lead tracking,
 * email alerts, calendar updates, and priority recommendations.
 * Has deep knowledge of rep performance and priority management.
 */

import { AIAgent, AIResponse } from '../../orchestrator/AIOrchestrator';

interface PriorityContext {
  performanceMetrics: {
    contactRate: number;
    conversionRate: number;
    dailyTarget: number;
    currentProgress: number;
    weeklyTrend: 'up' | 'down' | 'stable';
  };
  leadTracker: {
    hotLeads: number;
    warmLeads: number;
    activeLeads: number;
    prospectLeads: number;
    overdueContacts: number;
  };
  emailAlerts: {
    unreadCount: number;
    urgentCount: number;
    lastChecked: string;
  };
  calendarUpdates: {
    todayAppointments: number;
    upcomingDeadlines: number;
    missedFollowUps: number;
  };
  notifications: {
    priority: number;
    general: number;
    system: number;
  };
  lastUpdated: string;
}

class PriorityAI implements AIAgent {
  public readonly name = 'PriorityAI';
  private context: PriorityContext;
  private keywords = [
    'priority', 'performance', 'metrics', 'target', 'progress', 'rate',
    'conversion', 'contact', 'hot', 'warm', 'active', 'prospect',
    'overdue', 'urgent', 'alert', 'notification', 'calendar', 'appointment',
    'deadline', 'followup', 'follow-up', 'email', 'today', 'week', 'daily'
  ];

  constructor() {
    this.context = {
      performanceMetrics: {
        contactRate: 0,
        conversionRate: 0,
        dailyTarget: 0,
        currentProgress: 0,
        weeklyTrend: 'stable'
      },
      leadTracker: {
        hotLeads: 0,
        warmLeads: 0,
        activeLeads: 0,
        prospectLeads: 0,
        overdueContacts: 0
      },
      emailAlerts: {
        unreadCount: 0,
        urgentCount: 0,
        lastChecked: new Date().toISOString()
      },
      calendarUpdates: {
        todayAppointments: 0,
        upcomingDeadlines: 0,
        missedFollowUps: 0
      },
      notifications: {
        priority: 0,
        general: 0,
        system: 0
      },
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
   * Process the query and provide priority-specific insights
   */
  public async process(query: string, userContext?: any): Promise<AIResponse> {
    const lowerQuery = query.toLowerCase();
    
    // Update context before processing
    this.updateContext(userContext);

    // Determine query type and respond accordingly
    if (this.isPerformanceQuery(lowerQuery)) {
      return this.handlePerformanceQuery(query);
    }
    
    if (this.isPriorityQuery(lowerQuery)) {
      return this.handlePriorityQuery(query);
    }
    
    if (this.isTargetQuery(lowerQuery)) {
      return this.handleTargetQuery(query);
    }
    
    if (this.isLeadTrackingQuery(lowerQuery)) {
      return this.handleLeadTrackingQuery(query);
    }

    if (this.isAlertQuery(lowerQuery)) {
      return this.handleAlertQuery(query);
    }

    // General priority query
    return this.handleGeneralQuery(query);
  }

  /**
   * Get current context
   */
  public getContext(): PriorityContext {
    return { ...this.context };
  }

  /**
   * Update context with fresh data
   */
  public updateContext(newContext?: any): void {
    if (newContext?.performanceMetrics) {
      this.context.performanceMetrics = { ...this.context.performanceMetrics, ...newContext.performanceMetrics };
    }
    
    if (newContext?.leadTracker) {
      this.context.leadTracker = { ...this.context.leadTracker, ...newContext.leadTracker };
    }
    
    if (newContext?.emailAlerts) {
      this.context.emailAlerts = { ...this.context.emailAlerts, ...newContext.emailAlerts };
    }

    if (newContext?.calendarUpdates) {
      this.context.calendarUpdates = { ...this.context.calendarUpdates, ...newContext.calendarUpdates };
    }

    if (newContext?.notifications) {
      this.context.notifications = { ...this.context.notifications, ...newContext.notifications };
    }

    this.context.lastUpdated = new Date().toISOString();
  }

  /**
   * Private Methods
   */

  private initializeContext(): void {
    // Initialize with mock data for demonstration
    this.context = {
      performanceMetrics: {
        contactRate: 92,
        conversionRate: 18,
        dailyTarget: 15,
        currentProgress: 12,
        weeklyTrend: 'up'
      },
      leadTracker: {
        hotLeads: 8,
        warmLeads: 15,
        activeLeads: 12,
        prospectLeads: 23,
        overdueContacts: 3
      },
      emailAlerts: {
        unreadCount: 5,
        urgentCount: 2,
        lastChecked: new Date().toISOString()
      },
      calendarUpdates: {
        todayAppointments: 3,
        upcomingDeadlines: 2,
        missedFollowUps: 1
      },
      notifications: {
        priority: 2,
        general: 4,
        system: 1
      },
      lastUpdated: new Date().toISOString()
    };

    console.log('⚡ PriorityAI: Initialized with context');
  }

  private isPerformanceQuery(query: string): boolean {
    return query.includes('performance') || query.includes('doing') || query.includes('metrics') || query.includes('rate');
  }

  private isPriorityQuery(query: string): boolean {
    return query.includes('priority') || query.includes('focus') || query.includes('important') || query.includes('urgent');
  }

  private isTargetQuery(query: string): boolean {
    return query.includes('target') || query.includes('goal') || query.includes('quota') || query.includes('behind') || query.includes('ahead');
  }

  private isLeadTrackingQuery(query: string): boolean {
    return query.includes('hot') || query.includes('warm') || query.includes('active') || query.includes('prospect') || query.includes('overdue');
  }

  private isAlertQuery(query: string): boolean {
    return query.includes('alert') || query.includes('notification') || query.includes('email') || query.includes('calendar');
  }

  private async handlePerformanceQuery(query: string): Promise<AIResponse> {
    const { performanceMetrics, leadTracker } = this.context;
    
    const targetProgress = performanceMetrics.dailyTarget > 0 
      ? Math.round((performanceMetrics.currentProgress / performanceMetrics.dailyTarget) * 100)
      : 0;

    const trendEmoji = performanceMetrics.weeklyTrend === 'up' ? '📈' : 
                      performanceMetrics.weeklyTrend === 'down' ? '📉' : '➡️';

    const content = `📊 **Performance Overview:**

**Contact Rate:** ${performanceMetrics.contactRate}% ${performanceMetrics.contactRate >= 90 ? '🔥 Excellent!' : performanceMetrics.contactRate >= 80 ? '✅ Good' : '⚠️ Needs improvement'}
**Conversion Rate:** ${performanceMetrics.conversionRate}% ${performanceMetrics.conversionRate >= 20 ? '🎯 Outstanding!' : performanceMetrics.conversionRate >= 15 ? '✅ Good' : '📈 Room for growth'}
**Daily Progress:** ${performanceMetrics.currentProgress}/${performanceMetrics.dailyTarget} (${targetProgress}%) ${targetProgress >= 100 ? '🏆 Target exceeded!' : targetProgress >= 80 ? '🎯 On track' : '⚡ Push harder!'}
**Weekly Trend:** ${trendEmoji} ${performanceMetrics.weeklyTrend.toUpperCase()}

**Lead Pipeline Health:**
- 🔥 Hot: ${leadTracker.hotLeads} leads
- 🌡️ Warm: ${leadTracker.warmLeads} leads  
- ⚡ Active: ${leadTracker.activeLeads} leads

${leadTracker.overdueContacts > 0 ? `⚠️ **Action Required:** ${leadTracker.overdueContacts} overdue contacts need immediate attention!` : '✅ All contacts are up to date!'}`;

    return {
      content,
      confidence: 0.95,
      source: 'PriorityAI',
      suggestions: [
        leadTracker.overdueContacts > 0 ? 'Address overdue contacts' : 'Focus on hot leads',
        'Review conversion strategies',
        'Check daily targets'
      ],
      data: { performanceMetrics, leadTracker, targetProgress }
    };
  }

  private async handlePriorityQuery(query: string): Promise<AIResponse> {
    const { leadTracker, calendarUpdates, notifications } = this.context;
    
    const priorities = this.calculatePriorities();
    
    const content = `🎯 **Your Priority Focus:**

**🔥 Immediate Actions:**
${priorities.immediate.map((item, index) => `${index + 1}. ${item}`).join('\n')}

**📋 Today's Focus:**
${priorities.today.map((item, index) => `${index + 1}. ${item}`).join('\n')}

**📅 This Week:**
${priorities.week.map((item, index) => `${index + 1}. ${item}`).join('\n')}

**Priority Score:** ${this.getPriorityScore()}/10 ${this.getPriorityScore() >= 8 ? '🔥 High urgency!' : this.getPriorityScore() >= 5 ? '⚡ Moderate urgency' : '✅ Manageable workload'}`;

    return {
      content,
      confidence: 0.9,
      source: 'PriorityAI',
      suggestions: [
        'Start with immediate actions',
        'Review hot leads',
        'Check calendar appointments'
      ],
      data: { priorities, priorityScore: this.getPriorityScore() }
    };
  }

  private async handleTargetQuery(query: string): Promise<AIResponse> {
    const { performanceMetrics } = this.context;
    
    const progress = performanceMetrics.dailyTarget > 0 
      ? (performanceMetrics.currentProgress / performanceMetrics.dailyTarget) * 100
      : 0;
    
    const remaining = Math.max(0, performanceMetrics.dailyTarget - performanceMetrics.currentProgress);
    const status = progress >= 100 ? 'exceeded' : progress >= 80 ? 'on-track' : 'behind';
    
    const content = `🎯 **Target Analysis:**

**Daily Target:** ${performanceMetrics.dailyTarget} contacts
**Current Progress:** ${performanceMetrics.currentProgress} completed (${Math.round(progress)}%)
**Remaining:** ${remaining} contacts needed

**Status:** ${status === 'exceeded' ? '🏆 Target exceeded! Amazing work!' : 
              status === 'on-track' ? '✅ On track to meet target' : 
              '⚡ Behind target - time to accelerate!'}

**Weekly Trend:** ${performanceMetrics.weeklyTrend === 'up' ? '📈 Improving' : 
                   performanceMetrics.weeklyTrend === 'down' ? '📉 Declining' : 
                   '➡️ Stable'}

${status === 'behind' ? this.getTargetRecoveryPlan(remaining) : 
  status === 'on-track' ? '**Recommendation:** Maintain current pace and focus on quality contacts.' :
  '**Recommendation:** Excellent performance! Consider helping teammates or focusing on lead quality.'}`;

    return {
      content,
      confidence: 0.9,
      source: 'PriorityAI',
      suggestions: [
        status === 'behind' ? 'Implement recovery plan' : 'Maintain current pace',
        'Focus on hot leads',
        'Review contact strategies'
      ],
      data: { progress, remaining, status, trend: performanceMetrics.weeklyTrend }
    };
  }

  private async handleLeadTrackingQuery(query: string): Promise<AIResponse> {
    const { leadTracker } = this.context;
    
    const totalLeads = leadTracker.hotLeads + leadTracker.warmLeads + leadTracker.activeLeads + leadTracker.prospectLeads;
    const hotPercentage = totalLeads > 0 ? Math.round((leadTracker.hotLeads / totalLeads) * 100) : 0;
    
    const content = `👥 **Lead Pipeline Tracking:**

**🔥 Hot Leads:** ${leadTracker.hotLeads} (${hotPercentage}% of pipeline)
**🌡️ Warm Leads:** ${leadTracker.warmLeads}
**⚡ Active Leads:** ${leadTracker.activeLeads}
**📋 Prospect Leads:** ${leadTracker.prospectLeads}

**Total Pipeline:** ${totalLeads} leads
**Overdue Contacts:** ${leadTracker.overdueContacts} ${leadTracker.overdueContacts > 0 ? '⚠️ Needs attention!' : '✅'}

**Pipeline Health:** ${this.getPipelineHealth()}

**Recommendations:**
${this.getLeadTrackingRecommendations()}`;

    return {
      content,
      confidence: 0.9,
      source: 'PriorityAI',
      suggestions: [
        leadTracker.overdueContacts > 0 ? 'Contact overdue leads' : 'Focus on hot leads',
        'Move warm leads to hot',
        'Qualify prospect leads'
      ],
      data: { leadTracker, totalLeads, hotPercentage, pipelineHealth: this.getPipelineHealth() }
    };
  }

  private async handleAlertQuery(query: string): Promise<AIResponse> {
    const { emailAlerts, calendarUpdates, notifications } = this.context;
    
    const totalAlerts = emailAlerts.unreadCount + calendarUpdates.upcomingDeadlines + notifications.priority;
    
    const content = `🔔 **Alerts & Notifications:**

**📧 Email Alerts:** ${emailAlerts.unreadCount} unread (${emailAlerts.urgentCount} urgent)
**📅 Calendar:** ${calendarUpdates.todayAppointments} appointments today, ${calendarUpdates.upcomingDeadlines} deadlines
**🔔 Notifications:** ${notifications.priority} priority, ${notifications.general} general

**Missed Follow-ups:** ${calendarUpdates.missedFollowUps} ${calendarUpdates.missedFollowUps > 0 ? '⚠️ Requires action!' : '✅'}

**Alert Priority:** ${totalAlerts > 10 ? '🔥 High' : totalAlerts > 5 ? '⚡ Medium' : '✅ Low'}

**Immediate Actions:**
${this.getAlertActions()}`;

    return {
      content,
      confidence: 0.85,
      source: 'PriorityAI',
      suggestions: [
        'Check urgent emails',
        'Review calendar appointments',
        'Address missed follow-ups'
      ],
      data: { emailAlerts, calendarUpdates, notifications, totalAlerts }
    };
  }

  private async handleGeneralQuery(query: string): Promise<AIResponse> {
    const { performanceMetrics, leadTracker, notifications } = this.context;
    
    const content = `⚡ **Priority Intelligence Overview:**

**Performance:** ${performanceMetrics.contactRate}% contact rate, ${performanceMetrics.conversionRate}% conversion
**Pipeline:** ${leadTracker.hotLeads} hot, ${leadTracker.warmLeads} warm, ${leadTracker.activeLeads} active leads
**Alerts:** ${notifications.priority} priority notifications

**Current Focus:** ${this.getCurrentFocus()}

I can help you with:
- Performance metrics and targets
- Lead pipeline management
- Priority recommendations
- Alert and notification management
- Calendar and deadline tracking

What would you like to know more about?`;

    return {
      content,
      confidence: 0.7,
      source: 'PriorityAI',
      suggestions: [
        'Check performance metrics',
        'Review priority tasks',
        'Analyze lead pipeline',
        'View alerts and notifications'
      ],
      data: { overview: true }
    };
  }

  private calculatePriorities(): { immediate: string[], today: string[], week: string[] } {
    const { leadTracker, calendarUpdates, notifications } = this.context;
    
    const immediate = [];
    const today = [];
    const week = [];

    if (leadTracker.overdueContacts > 0) {
      immediate.push(`Contact ${leadTracker.overdueContacts} overdue leads`);
    }
    
    if (notifications.priority > 0) {
      immediate.push(`Review ${notifications.priority} priority notifications`);
    }
    
    if (calendarUpdates.missedFollowUps > 0) {
      immediate.push(`Complete ${calendarUpdates.missedFollowUps} missed follow-ups`);
    }

    if (leadTracker.hotLeads > 0) {
      today.push(`Focus on ${leadTracker.hotLeads} hot leads`);
    }
    
    if (calendarUpdates.todayAppointments > 0) {
      today.push(`Prepare for ${calendarUpdates.todayAppointments} appointments`);
    }

    if (leadTracker.warmLeads > 0) {
      week.push(`Nurture ${leadTracker.warmLeads} warm leads`);
    }
    
    if (leadTracker.prospectLeads > 0) {
      week.push(`Qualify ${leadTracker.prospectLeads} prospect leads`);
    }

    return { immediate, today, week };
  }

  private getPriorityScore(): number {
    const { leadTracker, notifications, calendarUpdates } = this.context;
    
    let score = 0;
    score += leadTracker.overdueContacts * 2;
    score += notifications.priority * 1.5;
    score += calendarUpdates.missedFollowUps * 2;
    score += leadTracker.hotLeads * 0.5;
    
    return Math.min(10, Math.round(score));
  }

  private getPipelineHealth(): string {
    const { leadTracker } = this.context;
    const total = leadTracker.hotLeads + leadTracker.warmLeads + leadTracker.activeLeads + leadTracker.prospectLeads;
    
    if (total === 0) return '❌ Empty pipeline';
    if (leadTracker.hotLeads >= total * 0.2) return '🔥 Excellent';
    if (leadTracker.hotLeads >= total * 0.1) return '✅ Good';
    return '⚠️ Needs improvement';
  }

  private getLeadTrackingRecommendations(): string {
    const { leadTracker } = this.context;
    const recommendations = [];
    
    if (leadTracker.overdueContacts > 0) {
      recommendations.push(`• Contact ${leadTracker.overdueContacts} overdue leads immediately`);
    }
    
    if (leadTracker.hotLeads > 0) {
      recommendations.push(`• Prioritize ${leadTracker.hotLeads} hot leads for conversion`);
    }
    
    if (leadTracker.warmLeads > leadTracker.hotLeads * 2) {
      recommendations.push(`• Work on moving warm leads to hot status`);
    }
    
    if (leadTracker.prospectLeads > 20) {
      recommendations.push(`• Qualify prospect leads to reduce pipeline clutter`);
    }

    return recommendations.length > 0 ? recommendations.join('\n') : '• Continue current lead management approach';
  }

  private getTargetRecoveryPlan(remaining: number): string {
    return `**Recovery Plan:**
• Focus on ${Math.min(remaining, 5)} highest-priority leads
• Increase contact frequency for warm leads
• Use proven conversion strategies
• Consider extending work hours if needed
• Review and optimize contact approach`;
  }

  private getCurrentFocus(): string {
    const { leadTracker, performanceMetrics } = this.context;
    
    if (leadTracker.overdueContacts > 0) return 'Overdue contacts (urgent)';
    if (performanceMetrics.currentProgress < performanceMetrics.dailyTarget * 0.8) return 'Meeting daily targets';
    if (leadTracker.hotLeads > 0) return 'Converting hot leads';
    return 'Pipeline management';
  }

  private getAlertActions(): string {
    const { emailAlerts, calendarUpdates, notifications } = this.context;
    const actions = [];
    
    if (emailAlerts.urgentCount > 0) {
      actions.push(`• Review ${emailAlerts.urgentCount} urgent emails`);
    }
    
    if (calendarUpdates.missedFollowUps > 0) {
      actions.push(`• Complete ${calendarUpdates.missedFollowUps} missed follow-ups`);
    }
    
    if (calendarUpdates.upcomingDeadlines > 0) {
      actions.push(`• Prepare for ${calendarUpdates.upcomingDeadlines} upcoming deadlines`);
    }
    
    if (notifications.priority > 0) {
      actions.push(`• Address ${notifications.priority} priority notifications`);
    }

    return actions.length > 0 ? actions.join('\n') : '• No immediate actions required';
  }
}

// Export singleton instance
export const priorityAI = new PriorityAI();
export default PriorityAI;
