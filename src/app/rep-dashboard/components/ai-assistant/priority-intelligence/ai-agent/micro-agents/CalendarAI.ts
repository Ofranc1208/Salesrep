/**
 * Priority Calendar AI Micro-Agent
 * 
 * Specialized micro-agent focused solely on calendar management and scheduling.
 * Handles appointments, deadlines, follow-ups, and time management.
 */

import { AIAgent, AIResponse } from '../../../orchestrator/AIOrchestrator';

interface CalendarContext {
  calendar: {
    todayAppointments: number;
    upcomingDeadlines: number;
    missedFollowUps: number;
    scheduledCalls: number;
  };
  timeManagement: {
    availableHours: number;
    bookedHours: number;
    efficiency: number;
  };
  lastUpdated: string;
}

class CalendarAI implements AIAgent {
  public readonly name = 'CalendarAI';
  private context: CalendarContext;
  private keywords = ['calendar', 'appointment', 'schedule', 'deadline', 'followup', 'follow-up', 'meeting'];

  constructor() {
    this.context = {
      calendar: {
        todayAppointments: 3,
        upcomingDeadlines: 2,
        missedFollowUps: 1,
        scheduledCalls: 5
      },
      timeManagement: {
        availableHours: 8,
        bookedHours: 6,
        efficiency: 75
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
    
    const { calendar, timeManagement } = this.context;
    
    const content = `📅 **Calendar & Schedule Management**

**Today's Schedule:**
📋 Appointments: ${calendar.todayAppointments}
📞 Scheduled Calls: ${calendar.scheduledCalls}
⏰ Upcoming Deadlines: ${calendar.upcomingDeadlines}
❗ Missed Follow-ups: ${calendar.missedFollowUps} ${calendar.missedFollowUps > 0 ? '⚠️' : '✅'}

**Time Management:**
⏱️ Available Hours: ${timeManagement.availableHours}
📊 Booked Hours: ${timeManagement.bookedHours}
📈 Efficiency: ${timeManagement.efficiency}%

**Schedule Status:** ${this.getScheduleStatus()}

**Time Optimization:**
${this.getTimeOptimization()}`;

    return {
      content,
      confidence: 0.9,
      source: 'CalendarAI',
      suggestions: this.getCalendarSuggestions(),
      data: { calendar, timeManagement }
    };
  }

  public getContext(): CalendarContext {
    return { ...this.context };
  }

  public updateContext(newContext?: any): void {
    if (newContext?.calendar) {
      this.context.calendar = { ...this.context.calendar, ...newContext.calendar };
    }
    
    if (newContext?.timeManagement) {
      this.context.timeManagement = { ...this.context.timeManagement, ...newContext.timeManagement };
    }

    this.context.lastUpdated = new Date().toISOString();
  }

  private getScheduleStatus(): string {
    const { calendar, timeManagement } = this.context;
    
    if (calendar.missedFollowUps > 0) return '⚠️ Needs attention - missed follow-ups';
    if (timeManagement.bookedHours >= timeManagement.availableHours) return '🔥 Fully booked';
    if (timeManagement.efficiency >= 80) return '✅ Well organized';
    return '⚡ Room for optimization';
  }

  private getTimeOptimization(): string {
    const { calendar, timeManagement } = this.context;
    const recommendations = [];
    
    if (calendar.missedFollowUps > 0) {
      recommendations.push(`• Schedule ${calendar.missedFollowUps} missed follow-ups immediately`);
    }
    
    if (calendar.upcomingDeadlines > 0) {
      recommendations.push(`• Prepare for ${calendar.upcomingDeadlines} upcoming deadlines`);
    }
    
    if (timeManagement.efficiency < 75) {
      recommendations.push('• Review time allocation and optimize schedule');
    }
    
    const utilization = (timeManagement.bookedHours / timeManagement.availableHours) * 100;
    if (utilization < 70) {
      recommendations.push('• Consider booking more appointments to maximize productivity');
    }

    return recommendations.length > 0 ? recommendations.join('\n') : '• Schedule is well optimized';
  }

  private getCalendarSuggestions(): string[] {
    const { calendar, timeManagement } = this.context;
    
    if (calendar.missedFollowUps > 0) {
      return ['Schedule missed follow-ups', 'Review follow-up process', 'Set follow-up reminders'];
    }
    
    if (calendar.upcomingDeadlines > 0) {
      return ['Prepare for deadlines', 'Review deadline priorities', 'Allocate preparation time'];
    }
    
    if (timeManagement.efficiency < 75) {
      return ['Optimize schedule', 'Review time allocation', 'Improve time management'];
    }
    
    return ['Review today\'s appointments', 'Plan tomorrow\'s schedule', 'Optimize calendar efficiency'];
  }
}

export const calendarAI = new CalendarAI();
export default CalendarAI;
