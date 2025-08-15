// Mock lead data for each campaign type - MVP version with realistic numbers
import { Lead } from '../../types';

// Prospect List - New leads from manager (10 leads)
export const prospectLeads: Lead[] = [
  {
    id: 'p1',
    crmId: 'P001',
    clientName: 'Sarah Johnson',
    campaignName: 'Prospect List',
    phoneNumbers: [
      { number: '(555) 123-4567', status: 'working', lastUsed: '2024-02-25', isPrimary: true, type: 'mobile', relationship: 'client', lastVerified: '2024-02-25', notes: '', auditTrail: [] },
      { number: '(555) 987-6543', status: 'working', lastUsed: '2024-02-25', isPrimary: false, type: 'home', relationship: 'client', lastVerified: '2024-02-25', notes: '', auditTrail: [] }
    ],
    payment: '2500.00',
    startDate: '2024-01-15',
    insuranceCompany: 'MetLife',
    status: 'pending',
    messageHistory: [],
    nextFollowUp: '2024-02-28',
    notes: 'Initial contact needed',
    processed: false,
    phoneNumbersProcessed: 0,
    structuredSettlementDetails: {
      monthlyPayment: '2500.00',
      startDate: '2024-01-15',
      endDate: '2040-01-15',
      totalValue: '480000.00',
      insuranceCompany: 'MetLife',
      offerAmount: '180000.00'
    }
  },
  {
    id: 'p2',
    crmId: 'P002',
    clientName: 'Michael Chen',
    campaignName: 'Prospect List',
    phoneNumbers: [
      { number: '(555) 234-5678', status: 'working', lastUsed: '2024-02-25', isPrimary: true, type: 'mobile', relationship: 'client', lastVerified: '2024-02-25', notes: '', auditTrail: [] }
    ],
    payment: '1800.00',
    startDate: '2024-02-01',
    insuranceCompany: 'Prudential',
    status: 'pending',
    messageHistory: [],
    nextFollowUp: '2024-02-27',
    notes: 'Qualified prospect',
    processed: false,
    phoneNumbersProcessed: 0,
    structuredSettlementDetails: {
      monthlyPayment: '1800.00',
      startDate: '2024-02-01',
      endDate: '2035-02-01',
      totalValue: '324000.00',
      insuranceCompany: 'Prudential',
      offerAmount: '120000.00'
    }
  },
  {
    id: 'p3',
    crmId: 'P003',
    clientName: 'Lisa Rodriguez',
    campaignName: 'Prospect List',
    phoneNumbers: [
      { number: '(555) 345-6789', status: 'working', lastUsed: '2024-02-25', isPrimary: true, type: 'mobile', relationship: 'client', lastVerified: '2024-02-25', notes: '', auditTrail: [] },
      { number: '(555) 456-7890', status: 'working', lastUsed: '2024-02-25', isPrimary: false, type: 'work', relationship: 'client', lastVerified: '2024-02-25', notes: '', auditTrail: [] }
    ],
    payment: '3200.00',
    startDate: '2023-12-01',
    insuranceCompany: 'AIG',
    status: 'pending',
    messageHistory: [],
    nextFollowUp: '2024-02-26',
    notes: 'High-value prospect',
    processed: false,
    phoneNumbersProcessed: 0,
    structuredSettlementDetails: {
      monthlyPayment: '3200.00',
      startDate: '2023-12-01',
      endDate: '2045-12-01',
      totalValue: '768000.00',
      insuranceCompany: 'AIG',
      offerAmount: '250000.00'
    }
  }
];

// Hot List - Actively working leads (6 leads)
export const hotLeads: Lead[] = [
  {
    id: 'h1',
    crmId: 'H001',
    clientName: 'David Thompson',
    campaignName: 'Hot List',
    phoneNumbers: [
      { number: '(555) 567-8901', status: 'working', lastUsed: '2024-02-25', isPrimary: true, type: 'mobile', relationship: 'client', lastVerified: '2024-02-25', notes: 'Responded to initial contact', auditTrail: [] }
    ],
    payment: '2800.00',
    startDate: '2024-01-01',
    insuranceCompany: 'State Farm',
    status: 'in-progress',
    messageHistory: [
      { id: 1, type: 'outbound', phoneNumber: '(555) 567-8901', message: 'Hi David, following up on our conversation about your structured settlement', sentDate: '2024-02-24', status: 'sent', response: 'Yes, I\'m interested in learning more' }
    ],
    nextFollowUp: '2024-02-26',
    notes: 'Very interested, ready to move forward',
    processed: false,
    phoneNumbersProcessed: 1,
    structuredSettlementDetails: {
      monthlyPayment: '2800.00',
      startDate: '2024-01-01',
      endDate: '2038-01-01',
      totalValue: '537600.00',
      insuranceCompany: 'State Farm',
      offerAmount: '200000.00'
    }
  },
  {
    id: 'h2',
    crmId: 'H002',
    clientName: 'Jennifer Williams',
    campaignName: 'Hot List',
    phoneNumbers: [
      { number: '(555) 678-9012', status: 'working', lastUsed: '2024-02-25', isPrimary: true, type: 'mobile', relationship: 'client', lastVerified: '2024-02-25', notes: 'Active communication', auditTrail: [] }
    ],
    payment: '1500.00',
    startDate: '2024-02-01',
    insuranceCompany: 'Allstate',
    status: 'in-progress',
    messageHistory: [
      { id: 1, type: 'inbound', phoneNumber: '(555) 678-9012', message: 'I want to discuss my settlement options', sentDate: '2024-02-23', status: 'received', response: null }
    ],
    nextFollowUp: '2024-02-25',
    notes: 'Called us directly, high engagement',
    processed: false,
    phoneNumbersProcessed: 1,
    structuredSettlementDetails: {
      monthlyPayment: '1500.00',
      startDate: '2024-02-01',
      endDate: '2030-02-01',
      totalValue: '270000.00',
      insuranceCompany: 'Allstate',
      offerAmount: '90000.00'
    }
  }
];

// Warm List - Following up leads (4 leads)
export const warmLeads: Lead[] = [
  {
    id: 'w1',
    crmId: 'W001',
    clientName: 'Robert Davis',
    campaignName: 'Warm List',
    phoneNumbers: [
      { number: '(555) 789-0123', status: 'working', lastUsed: '2024-02-20', isPrimary: true, type: 'mobile', relationship: 'client', lastVerified: '2024-02-20', notes: 'Last contact 5 days ago', auditTrail: [] }
    ],
    payment: '2200.00',
    startDate: '2023-11-01',
    insuranceCompany: 'Liberty Mutual',
    status: 'pending',
    messageHistory: [
      { id: 1, type: 'outbound', phoneNumber: '(555) 789-0123', message: 'Hi Robert, checking in on your settlement options', sentDate: '2024-02-20', status: 'sent', response: 'I\'ll think about it' }
    ],
    nextFollowUp: '2024-02-27',
    notes: 'Showed initial interest, needs follow-up',
    processed: false,
    phoneNumbersProcessed: 1,
    structuredSettlementDetails: {
      monthlyPayment: '2200.00',
      startDate: '2023-11-01',
      endDate: '2035-11-01',
      totalValue: '396000.00',
      insuranceCompany: 'Liberty Mutual',
      offerAmount: '140000.00'
    }
  }
];

// Active List - In progress/court cases (5 leads)
export const activeLeads: Lead[] = [
  {
    id: 'a1',
    crmId: 'A001',
    clientName: 'Amanda Wilson',
    campaignName: 'Active List',
    phoneNumbers: [
      { number: '(555) 890-1234', status: 'working', lastUsed: '2024-02-25', isPrimary: true, type: 'mobile', relationship: 'client', lastVerified: '2024-02-25', notes: 'Court date scheduled', auditTrail: [] }
    ],
    payment: '3500.00',
    startDate: '2023-10-01',
    insuranceCompany: 'Farmers',
    status: 'in-progress',
    messageHistory: [
      { id: 1, type: 'outbound', phoneNumber: '(555) 890-1234', message: 'Court documents submitted, waiting for approval', sentDate: '2024-02-24', status: 'sent', response: 'Great, keep me updated' }
    ],
    nextFollowUp: '2024-02-28',
    notes: 'Court hearing scheduled for March 15',
    processed: false,
    phoneNumbersProcessed: 1,
    structuredSettlementDetails: {
      monthlyPayment: '3500.00',
      startDate: '2023-10-01',
      endDate: '2040-10-01',
      totalValue: '672000.00',
      insuranceCompany: 'Farmers',
      offerAmount: '280000.00'
    }
  },
  {
    id: 'a2',
    crmId: 'A002',
    clientName: 'James Brown',
    campaignName: 'Active List',
    phoneNumbers: [
      { number: '(555) 901-2345', status: 'working', lastUsed: '2024-02-25', isPrimary: true, type: 'mobile', relationship: 'client', lastVerified: '2024-02-25', notes: 'Life insurance exam completed', auditTrail: [] }
    ],
    payment: '4200.00',
    startDate: '2023-09-01',
    insuranceCompany: 'Nationwide',
    status: 'in-progress',
    messageHistory: [
      { id: 1, type: 'outbound', phoneNumber: '(555) 901-2345', message: 'Life insurance approval received, moving to next stage', sentDate: '2024-02-23', status: 'sent', response: 'Excellent news!' }
    ],
    nextFollowUp: '2024-02-26',
    notes: 'Life insurance approved, preparing court documents',
    processed: false,
    phoneNumbersProcessed: 1,
    structuredSettlementDetails: {
      monthlyPayment: '4200.00',
      startDate: '2023-09-01',
      endDate: '2042-09-01',
      totalValue: '806400.00',
      insuranceCompany: 'Nationwide',
      offerAmount: '320000.00'
    }
  }
];

// Export all leads by campaign type
export const campaignLeads = {
  prospect: prospectLeads,
  hot: hotLeads,
  warm: warmLeads,
  active: activeLeads
};
