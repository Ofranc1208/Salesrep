// Notification data for the Rep Dashboard - Structured Settlement Company

export interface LeadNotification {
  id: string;
  campaignName: string;
  leadCount: number;
  managerName: string;
  timestamp: string;
  isRead: boolean;
  campaignId: string;
}

// Lead notifications for incoming leads
export const mockNotifications: LeadNotification[] = [
  {
    id: '1',
    campaignName: 'Q1 Structured Settlement Buyout',
    leadCount: 25,
    managerName: 'Sarah Manager',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    isRead: false,
    campaignId: 'q1-2024'
  },
  {
    id: '2',
    campaignName: 'February Fast Track',
    leadCount: 15,
    managerName: 'David Senior',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isRead: false,
    campaignId: 'february-2024'
  },
  {
    id: '3',
    campaignName: 'Q1 Structured Settlement Buyout',
    leadCount: 10,
    managerName: 'Sarah Manager',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    isRead: true,
    campaignId: 'q1-2024'
  }
];
