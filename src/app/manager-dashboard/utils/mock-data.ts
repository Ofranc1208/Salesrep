export interface SalesRep {
  id: string;
  name: string;
  activeLeads: number;
}

export interface MessageTemplate {
  id: string;
  name:string;
  content: string;
}

export interface Lead {
  paymentType: 'LCP' | 'Guaranteed';
  CBSI: number;
  repFirstName: string;
  clientFirstName: string;
  clientLastName: string;
  insuranceCompany: string;
  paymentStrtDate: string;
  paymentEndDate: string;
  payment100: number;
  payment50: number;
  offerAt100Low: number;
  offerAt100High: number;
  offerAt50Low: number;
  offerAt50High: number;
  lifeInsurancePayment100: number;
  lifeInsurancePayment50: number;
  phone1: string;
  phone2?: string;
  phone3?: string;
  status: 'New' | 'Assigned' | 'Contacted';
  assignedTo?: string; // SalesRep ID
}

export interface LeadList {
  id: string;
  name: string;
  leads: Lead[];
}

export const mockSalesReps: SalesRep[] = [
  { id: '1', name: 'John Doe', activeLeads: 15 },
  { id: '2', name: 'Jane Smith', activeLeads: 8 },
  { id: '3', name: 'Peter Jones', activeLeads: 12 },
];

export const mockMessageTemplates: MessageTemplate[] = [
    { id: '1', name: 'Opening Text Message (1)', content: 'Hey {{clientFirstName}}, It\'s {{repFirstName}} With Smarter Payouts...' },
    { id: '2', name: 'Opening Text Message (2)', content: 'Hey {{clientFirstName}}, It\'s {{repFirstName}} hope all is well...' },
    { id: '3', name: 'Half Offer - Message (4)', content: 'Hey {{clientFirstName}}, It\'s {{repFirstName}} I hope you are doing well...' },
];

export const mockLeadLists: LeadList[] = [
  {
    id: 'list-1',
    name: 'Metlife Campaign - May',
    leads: [
      { paymentType: 'LCP', CBSI: 784841, repFirstName: 'Scott', clientFirstName: 'James', clientLastName: 'Takori', insuranceCompany: 'Takon', paymentStrtDate: '5/1/2024', paymentEndDate: '7/24/2048', payment100: 7000.00, payment50: 3500.00, offerAt100Low: 541880.21, offerAt100High: 684188.75, offerAt50Low: 289504.70, offerAt50High: 324193.38, lifeInsurancePayment100: 860000.00, lifeInsurancePayment50: 430000.00, phone1: '(800) 568-8087', phone2: '(309) 828-1755', phone3: '(949) 578-7063', status: 'New' },
      { paymentType: 'LCP', CBSI: 786576, repFirstName: 'Scott', clientFirstName: 'Cheryl', clientLastName: 'Doel', insuranceCompany: 'AGS', paymentStrtDate: '5/1/2024', paymentEndDate: '7/23/2053', payment100: 1594.73, payment50: 797.37, offerAt100Low: 184134.94, offerAt100High: 189210.28, offerAt50Low: 82137.41, offerAt50High: 92780.94, lifeInsurancePayment100: 420000.00, lifeInsurancePayment50: 210000.00, phone1: '(714) 508-1002', status: 'New' },
    ]
  },
  {
    id: 'list-2',
    name: 'Q3 High-Value Leads',
    leads: [
      { paymentType: 'LCP', CBSI: 784824, repFirstName: 'Scott', clientFirstName: 'Colon', clientLastName: 'Metlife', insuranceCompany: 'Metlife', paymentStrtDate: '5/14/2024', paymentEndDate: '7/23/2053', payment100: 562.78, payment50: 281.39, offerAt100Low: 57895.82, offerAt100High: 71521.84, offerAt50Low: 23547.51, offerAt50High: 28160.42, lifeInsurancePayment100: 100000.00, lifeInsurancePayment50: 50000.00, phone1: '(502) 342-7577', phone2: '(502) 726-1620', phone3: '(612) 643-6814', status: 'New' },
    ]
  }
];

// We will keep a flat list for initial page load, but the structure above is the goal
export const mockLeads: Lead[] = [
  { paymentType: 'LCP', CBSI: 784841, repFirstName: 'Scott', clientFirstName: 'James', clientLastName: 'Takori', insuranceCompany: 'Takon', paymentStrtDate: '5/1/2024', paymentEndDate: '7/24/2048', payment100: 7000.00, payment50: 3500.00, offerAt100Low: 541880.21, offerAt100High: 684188.75, offerAt50Low: 289504.70, offerAt50High: 324193.38, lifeInsurancePayment100: 860000.00, lifeInsurancePayment50: 430000.00, phone1: '(800) 568-8087', phone2: '(309) 828-1755', phone3: '(949) 578-7063', status: 'New' },
  { paymentType: 'LCP', CBSI: 786576, repFirstName: 'Scott', clientFirstName: 'Cheryl', clientLastName: 'Doel', insuranceCompany: 'AGS', paymentStrtDate: '5/1/2024', paymentEndDate: '7/23/2053', payment100: 1594.73, payment50: 797.37, offerAt100Low: 184134.94, offerAt100High: 189210.28, offerAt50Low: 82137.41, offerAt50High: 92780.94, lifeInsurancePayment100: 420000.00, lifeInsurancePayment50: 210000.00, phone1: '(714) 508-1002', status: 'New' },
  { paymentType: 'LCP', CBSI: 784824, repFirstName: 'Scott', clientFirstName: 'Colon', clientLastName: 'Metlife', insuranceCompany: 'Metlife', paymentStrtDate: '5/14/2024', paymentEndDate: '7/23/2053', payment100: 562.78, payment50: 281.39, offerAt100Low: 57895.82, offerAt100High: 71521.84, offerAt50Low: 23547.51, offerAt50High: 28160.42, lifeInsurancePayment100: 100000.00, lifeInsurancePayment50: 50000.00, phone1: '(502) 342-7577', phone2: '(502) 726-1620', phone3: '(612) 643-6814', status: 'New' },
];
