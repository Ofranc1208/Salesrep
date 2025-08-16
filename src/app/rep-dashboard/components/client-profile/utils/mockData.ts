import { Lead } from '../../../types';

export const getClientData = (selectedLead: Lead) => ({
  firstName: selectedLead.clientName.split(' ')[0] || 'Michael',
  lastName: selectedLead.clientName.split(' ')[1] || 'Johnson',
  age: 45,
  maritalStatus: 'Married',
  dob: '1979-03-15',
  status: 'PROSPECT LIST',
  primaryPhone: selectedLead.phoneNumbers?.[0]?.number || '(555) 123-4567',
  email: 'michael.johnson@email.com',
  address: {
    street: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701'
  },
  emergencyContact: {
    name: 'Sarah Johnson',
    relationship: 'Spouse',
    phone: '(555) 987-6543',
    email: 'sarah.johnson@email.com'
  }
});

export const annuityData = {
  insuranceCompany: 'Farmers',
  amount: '$1,679.90',
  startDate: 'Fidelity',
  endDate: 'MONTHLY PAYMENT'
};

export const offerData = {
  amount: '$1,679.90',
  startDate: 'More',
  endDate: 'SETTLEMENT DETAILS',
  minimumOffer: '$1,679.90',
  maximumOffer: '$2,500.00'
};

export const mockNotes = [
  {
    id: '1',
    date: '2024-01-15',
    time: '2:30 PM',
    salesRep: 'Rep One',
    type: 'call' as const,
    content: 'Initial contact made. Client interested in structured settlement buyout options. Scheduled follow-up call for next week.'
  },
  {
    id: '2',
    date: '2024-01-10',
    time: '10:15 AM',
    salesRep: 'Rep One',
    type: 'note' as const,
    content: 'Client provided documentation. Reviewing settlement details and preparing initial offer.'
  },
  {
    id: '3',
    date: '2024-01-05',
    time: '4:45 PM',
    salesRep: 'Rep One',
    type: 'status-change' as const,
    content: 'Lead imported from manager dashboard. Client has active structured settlement with Farmers Insurance.'
  }
];
