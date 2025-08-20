// Campaign Manager Module Services
import { Campaign, LeadNotification } from '../../../types';
import { CampaignMetrics, CampaignPerformance, CampaignReport } from './types';

// API endpoints (would be environment-specific in real app)
const API_BASE = '/api/campaign-management';

// Campaign Management Service Class
export class CampaignService {
  // Fetch all campaigns for a user/organization
  static async fetchCampaigns(): Promise<Campaign[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Fetching campaigns from API');
      
      // Mock campaigns data
      return this.getMockCampaigns();
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      throw new Error('Unable to load campaigns. Please try again.');
    }
  }

  // Fetch specific campaign details
  static async fetchCampaignById(campaignId: string): Promise<Campaign> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log(`Fetching campaign details for: ${campaignId}`);
      
      const campaigns = this.getMockCampaigns();
      const campaign = campaigns.find(c => c.id === campaignId);
      
      if (!campaign) {
        throw new Error(`Campaign ${campaignId} not found`);
      }
      
      return campaign;
    } catch (error) {
      console.error(`Failed to fetch campaign ${campaignId}:`, error);
      throw new Error(`Unable to load campaign details. Please try again.`);
    }
  }

  // Update campaign status
  static async updateCampaignStatus(
    campaignId: string, 
    status: 'active' | 'paused' | 'completed'
  ): Promise<Campaign> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      console.log(`Updating campaign ${campaignId} status to: ${status}`);
      
      // Mock updated campaign
      const campaigns = this.getMockCampaigns();
      const campaign = campaigns.find(c => c.id === campaignId);
      
      if (!campaign) {
        throw new Error(`Campaign ${campaignId} not found`);
      }
      
      return {
        ...campaign,
        status
      };
    } catch (error) {
      console.error(`Failed to update campaign ${campaignId} status:`, error);
      throw new Error(`Unable to update campaign status. Please try again.`);
    }
  }

  // Fetch campaign notifications
  static async fetchCampaignNotifications(campaignId: string): Promise<LeadNotification[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Fetching notifications for campaign: ${campaignId}`);
      
      return this.getMockNotifications(campaignId);
    } catch (error) {
      console.error(`Failed to fetch notifications for campaign ${campaignId}:`, error);
      throw new Error('Unable to load notifications. Please try again.');
    }
  }

  // Mark notification as read
  static async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log(`Marking notification ${notificationId} as read`);
      
      // In real app, this would make an API call
    } catch (error) {
      console.error(`Failed to mark notification ${notificationId} as read:`, error);
      throw new Error('Unable to update notification. Please try again.');
    }
  }

  // Dismiss notification
  static async dismissNotification(notificationId: string): Promise<void> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log(`Dismissing notification ${notificationId}`);
      
      // In real app, this would make an API call
    } catch (error) {
      console.error(`Failed to dismiss notification ${notificationId}:`, error);
      throw new Error('Unable to dismiss notification. Please try again.');
    }
  }

  // Generate campaign report
  static async generateCampaignReport(campaignId: string): Promise<CampaignReport> {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log(`Generating comprehensive report for campaign: ${campaignId}`);
      
      const campaign = await this.fetchCampaignById(campaignId);
      const metrics = this.calculateCampaignMetrics(campaign);
      const performance = this.getMockPerformanceData(campaignId);
      
      const report: CampaignReport = {
        id: `report-${Date.now()}`,
        campaignId,
        generatedAt: new Date().toISOString(),
        metrics,
        performance,
        leadBreakdown: {
          byStatus: {
            'new': 15,
            'contacted': 25,
            'interested': 12,
            'qualified': 8,
            'converted': 5
          },
          byList: {
            'prospect': 20,
            'hot': 15,
            'warm': 18,
            'active': 12
          },
          byPriority: {
            'high': 18,
            'medium': 32,
            'low': 15
          }
        },
        recommendations: [
          'Focus on hot leads - they show 85% conversion rate',
          'Increase follow-up frequency for warm leads',
          'Consider additional resources for prospect qualification',
          'Review and optimize messaging templates'
        ]
      };
      
      return report;
    } catch (error) {
      console.error(`Failed to generate report for campaign ${campaignId}:`, error);
      throw new Error('Unable to generate campaign report. Please try again.');
    }
  }

  // Export campaign data
  static async exportCampaignData(
    campaignId: string, 
    format: 'csv' | 'xlsx' = 'csv'
  ): Promise<string> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Exporting campaign ${campaignId} data as ${format}`);
      
      // Mock export URL
      return `https://api.example.com/exports/campaign-${campaignId}-${Date.now()}.${format}`;
    } catch (error) {
      console.error(`Failed to export campaign ${campaignId} data:`, error);
      throw new Error(`Unable to export campaign data. Please try again.`);
    }
  }

  // Private helper methods
  private static getMockCampaigns(): Campaign[] {
    return [
      {
        id: 'campaign-1',
        name: 'Q1 Settlement Outreach',
        status: 'active',
        totalLeads: 150,
        processedLeads: 89,
        managerName: 'Sarah Johnson',
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        createdAt: '2024-01-15T08:00:00.000Z'
      },
      {
        id: 'campaign-2',
        name: 'High-Value Prospects',
        status: 'active',
        totalLeads: 75,
        processedLeads: 45,
        managerName: 'Mike Davis',
        startDate: '2024-01-10',
        endDate: '2024-02-28',
        createdAt: '2024-01-10T09:00:00.000Z'
      },
      {
        id: 'campaign-3',
        name: 'Follow-up Campaign',
        status: 'paused',
        totalLeads: 200,
        processedLeads: 120,
        managerName: 'Lisa Chen',
        startDate: '2023-12-01',
        endDate: '2024-02-01',
        createdAt: '2023-12-01T10:00:00.000Z'
      }
    ];
  }

  private static getMockNotifications(campaignId: string): LeadNotification[] {
    return [
      {
        id: 'notif-1',
        campaignName: 'Q1 Settlement Outreach',
        leadCount: 5,
        managerName: 'Sarah Johnson',
        timestamp: new Date().toISOString(),
        isRead: false,
        campaignId: campaignId
      },
      {
        id: 'notif-2',
        campaignName: 'High-Value Prospects',
        leadCount: 3,
        managerName: 'Mike Davis',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        campaignId: campaignId
      },
      {
        id: 'notif-3',
        campaignName: 'Follow-up Campaign',
        leadCount: 1,
        managerName: 'Lisa Chen',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        campaignId: campaignId
      }
    ];
  }

  private static calculateCampaignMetrics(campaign: Campaign): CampaignMetrics {
    const totalLeads = campaign.totalLeads;
    const processedLeads = campaign.processedLeads;
    const remainingLeads = totalLeads - processedLeads;
    const progressPercentage = totalLeads > 0 ? Math.round((processedLeads / totalLeads) * 100) : 0;
    
    const daysSinceStart = Math.ceil(
      (Date.now() - new Date('2024-01-15').getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const averagePerDay = daysSinceStart > 0 ? Math.round(processedLeads / daysSinceStart) : 0;
    const estimatedDaysRemaining = averagePerDay > 0 ? Math.ceil(remainingLeads / averagePerDay) : 0;
    const conversionRate = campaign.status === 'active' ? 0.75 : 0.60;

    return {
      totalLeads,
      processedLeads,
      remainingLeads,
      progressPercentage,
      conversionRate,
      averagePerDay,
      estimatedDaysRemaining
    };
  }

  private static getMockPerformanceData(campaignId: string): CampaignPerformance {
    return {
      dailyProcessed: [
        { date: '2024-01-15', count: 12 },
        { date: '2024-01-16', count: 15 },
        { date: '2024-01-17', count: 8 },
        { date: '2024-01-18', count: 18 },
        { date: '2024-01-19', count: 14 }
      ],
      conversionByList: {
        prospect: 0.45,
        hot: 0.85,
        warm: 0.65,
        active: 0.92
      },
      timeToConversion: {
        average: 5.2,
        median: 4.0,
        fastest: 1.0,
        slowest: 14.0
      }
    };
  }
}

// Utility functions for campaign management
export const campaignUtils = {
  // Format campaign status for display
  formatCampaignStatus: (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  },

  // Get status color class
  getStatusColorClass: (status: string): string => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  },

  // Calculate campaign health score
  calculateHealthScore: (campaign: Campaign): number => {
    let score = 0;
    
    // Progress factor (0-40 points)
    const progressPercentage = campaign.totalLeads > 0 
      ? (campaign.processedLeads / campaign.totalLeads) * 100 
      : 0;
    score += Math.min(progressPercentage * 0.4, 40);
    
    // Status factor (0-30 points)
    if (campaign.status === 'active') score += 30;
    else if (campaign.status === 'paused') score += 15;
    
    // Recency factor (0-30 points)
    const daysSinceUpdate = Math.floor(
      (Date.now() - new Date('2024-01-20').getTime()) / (1000 * 60 * 60 * 24)
    );
    score += Math.max(0, 30 - daysSinceUpdate);
    
    return Math.min(Math.round(score), 100);
  },

  // Format time duration
  formatDuration: (days: number): string => {
    if (days < 1) return 'Less than a day';
    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    if (days < 30) return `${Math.round(days / 7)} weeks`;
    return `${Math.round(days / 30)} months`;
  }
};
