// Centralized exports for all mock data - Rep Dashboard

// Export lead data
export { mockLeads } from './leads';
export type { Lead } from '../../types';

// Export campaign data  
export { mockCampaigns } from './campaigns';
export type { Campaign } from './campaigns';

// Export notification data
export { mockNotifications } from './notifications';
export type { LeadNotification } from './notifications';

// Campaign info helper (derived from active campaign)
export const campaignInfo = {
  name: 'Q1 Structured Settlement Buyout',
  totalLeads: 300,
  processedLeads: 2
};
