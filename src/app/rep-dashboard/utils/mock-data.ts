// Mock data for the Rep Dashboard - Structured Settlement Company

export const mockLeads = [
  {
    id: 1,
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
          },
          {
            id: '2',
            field: 'notes',
            oldValue: 'Goes to voicemail',
            newValue: 'Direct line, responds quickly',
            editedBy: 'Client Relations Rep One',
            editedAt: '2024-01-15T14:45:00Z'
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
        auditTrail: [
          {
            id: '3',
            field: 'status',
            oldValue: 'working',
            newValue: 'disconnected',
            editedBy: 'Client Relations Rep One',
            editedAt: '2024-01-10T09:15:00Z'
          },
          {
            id: '4',
            field: 'notes',
            oldValue: 'Main home number',
            newValue: 'Number no longer in service',
            editedBy: 'Client Relations Rep One',
            editedAt: '2024-01-10T09:20:00Z'
          }
        ]
      },
      {
        number: '(555) 987-6543',
        status: 'voicemail',
        lastUsed: '2024-01-12',
        isPrimary: false,
        type: 'mobile',
        relationship: 'alternate',
        lastVerified: '2024-01-12',
        notes: 'Goes to voicemail, may be wife\'s number',
        auditTrail: [
          {
            id: '5',
            field: 'relationship',
            oldValue: 'emergency',
            newValue: 'alternate',
            editedBy: 'Client Relations Rep One',
            editedAt: '2024-01-12T16:30:00Z'
          }
        ]
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
      },
      {
        id: 2,
        type: 'follow-up',
        phoneNumber: '(800) 568-8087',
        message: 'Hey Michael, It\'s Scott hope all is well. Ins Company Metlife Early Payout $1,336,993.12 up to $1,480,248.29. $8,889.88 monthly. 5/11/2024 till 7/23/2053. Family Protection $3,700,000.00. Hurry offer expires 7/28/23. Funding as quick as in 30 days',
        sentDate: '2024-01-20',
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
    id: 2,
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
        notes: 'Main contact number'
      },
      {
        number: '(555) 111-2222',
        status: 'business',
        lastUsed: '2024-01-16',
        isPrimary: false,
        type: 'landline',
        relationship: 'work',
        lastVerified: '2024-01-16',
        notes: 'Office number, best during business hours'
      }
    ],
    payment: '$4,444.94 monthly',
    startDate: '3/15/2024',
    insuranceCompany: 'Prudential',
    status: 'pending',
    messageHistory: [
      {
        id: 1,
        type: 'initial',
        phoneNumber: '(714) 508-1002',
        message: 'Hey Sarah, It\'s Scott with Smarter Payouts. Your Prudential structured settlement payments could be converted to an upfront lump sum. Would you like to see how much you might be entitled to?',
        sentDate: '2024-01-18',
        status: 'sent',
        response: null
      }
    ],
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
    id: 3,
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
        notes: 'Number format invalid, needs verification'
      },
      {
        number: '(555) 333-4444',
        status: 'working',
        lastUsed: '2024-01-16',
        isPrimary: false,
        type: 'mobile',
        relationship: 'alternate',
        lastVerified: '2024-01-16',
        notes: 'Backup number, may be family member'
      }
    ],
    payment: '$2,222.47 monthly',
    startDate: '6/20/2024',
    insuranceCompany: 'AIG',
    status: 'pending',
    messageHistory: [],
    nextFollowUp: '2024-01-21',
    notes: 'Primary number disconnected, using alternate',
    processed: false,
    phoneNumbersProcessed: 0,
    structuredSettlementDetails: {
      monthlyPayment: '$2,222.47',
      startDate: '6/20/2024',
      endDate: '8/15/2045',
      totalValue: '$925,000.00',
      insuranceCompany: 'AIG',
      offerAmount: '$331,748.28 - $366,312.08'
    }
  }
];

// Campaign information
export const campaignInfo = {
  name: 'Q1 Structured Settlement Buyout',
  totalLeads: 300,
  processedLeads: 0,
  startDate: '2024-01-01',
  endDate: '2024-03-31'
};
