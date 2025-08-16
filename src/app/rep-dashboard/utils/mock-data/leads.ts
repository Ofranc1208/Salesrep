// Lead data for the Rep Dashboard - Structured Settlement Company
import type { Lead } from '../../types';

export const mockLeads: Lead[] = [
  {
    id: '1',
    crmId: '784841',
    clientName: 'Michael Johnson',
    campaignName: 'Q1 Structured Settlement Buyout',
    phoneNumbers: [
      {
        number: '(800) 568-8087',
        status: 'working',
        lastUsed: '2024-01-15',
        isPrimary: true,
        type: 'mobile',
        relationship: 'primary',
        lastVerified: '2024-01-15',
        notes: 'Direct line, responds quickly',
        auditTrail: [
          {
            id: '1',
            field: 'status',
            oldValue: 'voicemail',
            newValue: 'working',
            editedBy: 'Client Relations Rep One',
            editedAt: '2024-01-15T10:30:00Z'
          }
        ]
      },
      {
        number: '(555) 123-4567',
        status: 'disconnected',
        lastUsed: '2024-01-10',
        isPrimary: false,
        type: 'landline',
        relationship: 'home',
        lastVerified: '2024-01-10',
        notes: 'Number no longer in service',
        auditTrail: []
      }
    ],
    payment: '$8,889.88 monthly',
    startDate: '5/11/2024',
    insuranceCompany: 'Metlife',
    status: 'in-progress',
    messageHistory: [
      {
        id: 1,
        type: 'initial',
        phoneNumber: '(800) 568-8087',
        message: 'Hey Michael, It\'s Scott with Smarter Payouts. Your Metlife payments allow you to take advantage of our Early payout program to buy a house, start a business, pay off debt and a lot more. Would you like to see how much you might be entitled to with zero obligation?',
        sentDate: '2024-01-15',
        status: 'sent',
        response: null
      }
    ],
    nextFollowUp: '2024-01-25',
    notes: 'Client seems interested in early payout, needs to discuss family protection options',
    processed: false,
    phoneNumbersProcessed: 0,
    structuredSettlementDetails: {
      monthlyPayment: '$8,889.88',
      startDate: '5/11/2024',
      endDate: '7/23/2053',
      totalValue: '$3,700,000.00',
      insuranceCompany: 'Metlife',
      offerAmount: '$1,336,993.12 - $1,480,248.29'
    }
  },
  {
    id: '2',
    crmId: '786576',
    clientName: 'Sarah Williams',
    campaignName: 'Q1 Structured Settlement Buyout',
    phoneNumbers: [
      {
        number: '(714) 508-1002',
        status: 'working',
        lastUsed: '2024-01-18',
        isPrimary: true,
        type: 'mobile',
        relationship: 'primary',
        lastVerified: '2024-01-18',
        notes: 'Main contact number',
        auditTrail: []
      },
      {
        number: '(555) 111-2222',
        status: 'business',
        lastUsed: '2024-01-16',
        isPrimary: false,
        type: 'landline',
        relationship: 'work',
        lastVerified: '2024-01-16',
        notes: 'Office number, best during business hours',
        auditTrail: []
      }
    ],
    payment: '$4,444.94 monthly',
    startDate: '3/15/2024',
    insuranceCompany: 'Prudential',
    status: 'pending',
    messageHistory: [],
    nextFollowUp: '2024-01-23',
    notes: 'No response yet, will try alternate number',
    processed: false,
    phoneNumbersProcessed: 0,
    structuredSettlementDetails: {
      monthlyPayment: '$4,444.94',
      startDate: '3/15/2024',
      endDate: '12/31/2040',
      totalValue: '$1,850,000.00',
      insuranceCompany: 'Prudential',
      offerAmount: '$663,496.56 - $732,624.15'
    }
  },
  {
    id: '3',
    crmId: '784824',
    clientName: 'Robert Chen',
    campaignName: 'Q1 Structured Settlement Buyout',
    phoneNumbers: [
      {
        number: '(502) 342-7577',
        status: 'invalid',
        lastUsed: '2024-01-14',
        isPrimary: true,
        type: 'landline',
        relationship: 'primary',
        lastVerified: '2024-01-14',
        notes: 'Number format invalid, needs verification',
        auditTrail: []
      },
      {
        number: '(555) 333-4444',
        status: 'working',
        lastUsed: '2024-01-16',
        isPrimary: false,
        type: 'mobile',
        relationship: 'alternate',
        lastVerified: '2024-01-16',
        notes: 'Backup number, may be family member',
        auditTrail: []
      }
    ],
    payment: '$6,225.50 monthly',
    startDate: '8/12/2024',
    insuranceCompany: 'AIG',
    status: 'pending',
    messageHistory: [],
    nextFollowUp: '2024-01-21',
    notes: 'Need to verify contact information',
    processed: false,
    phoneNumbersProcessed: 0,
    structuredSettlementDetails: {
      monthlyPayment: '$6,225.50',
      startDate: '8/12/2024',
      endDate: '3/15/2045',
      totalValue: '$2,200,000.00',
      insuranceCompany: 'AIG',
      offerAmount: '$945,678.23 - $1,034,245.67'
    }
  },
  {
    id: '4',
    crmId: '789123',
    clientName: 'Jennifer Martinez',
    campaignName: 'Q1 Structured Settlement Buyout',
    phoneNumbers: [
      {
        number: '(312) 555-7890',
        status: 'working',
        lastUsed: '2024-01-20',
        isPrimary: true,
        type: 'mobile',
        relationship: 'primary',
        lastVerified: '2024-01-20',
        notes: 'Prefers text messages',
        auditTrail: []
      }
    ],
    payment: '$3,100.75 monthly',
    startDate: '1/05/2024',
    insuranceCompany: 'Hartford',
    status: 'pending',
    messageHistory: [],
    nextFollowUp: '2024-01-26',
    notes: 'Interested in lump sum option for home purchase',
    processed: false,
    phoneNumbersProcessed: 0,
    structuredSettlementDetails: {
      monthlyPayment: '$3,100.75',
      startDate: '1/05/2024',
      endDate: '6/30/2035',
      totalValue: '$1,400,000.00',
      insuranceCompany: 'Hartford',
      offerAmount: '$425,890.12 - $467,479.13'
    }
  },
  {
    id: '5',
    crmId: '791234',
    clientName: 'David Thompson',
    campaignName: 'Q1 Structured Settlement Buyout',
    phoneNumbers: [
      {
        number: '(555) 444-5555',
        status: 'voicemail',
        lastUsed: '2024-01-17',
        isPrimary: true,
        type: 'landline',
        relationship: 'primary',
        lastVerified: '2024-01-17',
        notes: 'Always goes to voicemail',
        auditTrail: []
      },
      {
        number: '(555) 666-7777',
        status: 'working',
        lastUsed: '2024-01-19',
        isPrimary: false,
        type: 'mobile',
        relationship: 'alternate',
        lastVerified: '2024-01-19',
        notes: 'Work phone, answers during business hours',
        auditTrail: []
      }
    ],
    payment: '$7,500.00 monthly',
    startDate: '9/20/2024',
    insuranceCompany: 'Allstate',
    status: 'pending',
    messageHistory: [],
    nextFollowUp: '2024-01-24',
    notes: 'Considering early payout for business investment',
    processed: false,
    phoneNumbersProcessed: 0,
    structuredSettlementDetails: {
      monthlyPayment: '$7,500.00',
      startDate: '9/20/2024',
      endDate: '12/31/2050',
      totalValue: '$2,800,000.00',
      insuranceCompany: 'Allstate',
      offerAmount: '$1,125,000.00 - $1,237,500.00'
    }
  }
];