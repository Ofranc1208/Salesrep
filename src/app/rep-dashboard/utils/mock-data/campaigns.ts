// Campaign data for the Rep Dashboard - Structured Settlement Company
import { Campaign } from '../../types';

// Multiple campaigns for the sales rep
export const mockCampaigns: Campaign[] = [
  {
    id: 'q1-2024',
    name: 'Q1 Structured Settlement Buyout',
    totalLeads: 300,
    processedLeads: 0,
    status: 'active' as const,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    managerName: 'Sarah Manager',
    createdAt: '2024-01-01T08:00:00.000Z'
  },
  {
    id: 'december-2023',
    name: 'December Holiday Special',
    totalLeads: 150,
    processedLeads: 120,
    status: 'completed' as const,
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    managerName: 'Mike Director',
    createdAt: '2023-12-01T08:00:00.000Z'
  },
  {
    id: 'november-2023',
    name: 'November Premium Buyouts',
    totalLeads: 200,
    processedLeads: 180,
    status: 'completed' as const,
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    managerName: 'Lisa VP',
    createdAt: '2023-11-01T08:00:00.000Z'
  },
  {
    id: 'february-2024',
    name: 'February Fast Track',
    totalLeads: 75,
    processedLeads: 0,
    status: 'paused' as const,
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    managerName: 'David Senior',
    createdAt: '2024-02-01T08:00:00.000Z'
  }
];
