export interface Document {
  id: string;
  name: string;
  category: string;
  type: string;
  status: 'uploaded' | 'pending' | 'approved' | 'rejected';
  uploadDate: string;
  size: string;
  uploadedBy: string;
  required: boolean;
  description?: string;
  fileUrl?: string;
}

export interface DocumentType {
  name: string;
  required: boolean;
  description: string;
}

export interface DocumentCategory {
  name: string;
  icon: string;
  color: string;
  types: DocumentType[];
}

export const documentCategories: Record<string, DocumentCategory> = {
  legal: {
    name: 'Legal Documents',
    icon: '⚖️',
    color: 'blue',
    types: [
      { name: 'Court Order', required: true, description: 'Required court approval for transaction' },
      { name: 'Assignment Agreement', required: true, description: 'Transfer of payment rights document' },
      { name: 'Annuity Contract', required: true, description: 'Original structured settlement contract' },
      { name: 'Settlement Agreement', required: true, description: 'Original settlement documentation' },
      { name: 'Power of Attorney', required: false, description: 'If client has legal representation' },
      { name: 'Court Approval Letter', required: true, description: 'State-required approval documentation' }
    ]
  },
  financial: {
    name: 'Financial Documents',
    icon: '💰',
    color: 'green',
    types: [
      { name: 'Benefits Letter', required: true, description: 'Payment verification from insurance company' },
      { name: 'Payment Schedule', required: true, description: 'Detailed payment timeline documentation' },
      { name: 'Tax Documents', required: true, description: '1099s and tax implication documents' },
      { name: 'Bank Statements', required: true, description: 'Financial verification documents' },
      { name: 'Prior Orders', required: false, description: 'Previous transaction history' },
      { name: 'Cash Advance Receipt', required: false, description: 'If cash advance was provided' }
    ]
  },
  identification: {
    name: 'Client ID',
    icon: '👤',
    color: 'purple',
    types: [
      { name: 'Government ID', required: true, description: 'Driver\'s license or passport' },
      { name: 'Social Security Card', required: true, description: 'Identity verification' },
      { name: 'Proof of Address', required: true, description: 'Utility bill or lease agreement' },
      { name: 'Medical Records', required: false, description: 'If injury-related settlement' }
    ]
  },
  transaction: {
    name: 'Transaction',
    icon: '📄',
    color: 'orange',
    types: [
      { name: 'Application', required: true, description: 'Client application for buyout' },
      { name: 'Disclosure Statement', required: true, description: 'Required legal disclosures' },
      { name: 'K-Contract', required: true, description: 'Purchase agreement contract' },
      { name: 'Fasano Document', required: true, description: 'Specific legal requirement document' },
      { name: 'Invoice', required: false, description: 'Transaction invoice documentation' }
    ]
  },
  communication: {
    name: 'Communications',
    icon: '📨',
    color: 'indigo',
    types: [
      { name: 'Overnight Labels', required: false, description: 'Shipping and delivery documentation' },
      { name: 'Email Correspondence', required: false, description: 'Client email communications' },
      { name: 'Attorney Letters', required: false, description: 'Legal correspondence' }
    ]
  }
};

export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Court_Order_Smith_2024.pdf',
    category: 'legal',
    type: 'Court Order',
    status: 'approved',
    uploadDate: '2024-01-15',
    size: '2.4 MB',
    uploadedBy: 'Rep One',
    required: true,
    fileUrl: '/mock-pdfs/court-order-sample.pdf'
  },
  {
    id: '2',
    name: 'Benefits_Letter_Farmers_Insurance.pdf',
    category: 'financial',
    type: 'Benefits Letter',
    status: 'approved',
    uploadDate: '2024-01-14',
    size: '1.8 MB',
    uploadedBy: 'Rep One',
    required: true,
    fileUrl: '/mock-pdfs/benefits-letter-sample.pdf'
  },
  {
    id: '3',
    name: 'Client_Application_Form.pdf',
    category: 'transaction',
    type: 'Application',
    status: 'pending',
    uploadDate: '2024-01-13',
    size: '3.2 MB',
    uploadedBy: 'Rep One',
    required: true,
    fileUrl: '/mock-pdfs/application-sample.pdf'
  },
  {
    id: '4',
    name: 'Assignment_Agreement_Final.pdf',
    category: 'legal',
    type: 'Assignment Agreement',
    status: 'uploaded',
    uploadDate: '2024-01-12',
    size: '2.1 MB',
    uploadedBy: 'Rep One',
    required: true,
    fileUrl: '/mock-pdfs/assignment-agreement-sample.pdf'
  },
  {
    id: '5',
    name: 'Drivers_License_Copy.pdf',
    category: 'identification',
    type: 'Government ID',
    status: 'approved',
    uploadDate: '2024-01-11',
    size: '0.8 MB',
    uploadedBy: 'Rep One',
    required: true,
    fileUrl: '/mock-pdfs/government-id-sample.pdf'
  },
  {
    id: '6',
    name: 'Payment_Schedule_Detailed.pdf',
    category: 'financial',
    type: 'Payment Schedule',
    status: 'approved',
    uploadDate: '2024-01-10',
    size: '1.5 MB',
    uploadedBy: 'Rep One',
    required: true,
    fileUrl: '/mock-pdfs/payment-schedule-sample.pdf'
  },
  {
    id: '7',
    name: 'Disclosure_Statement_2024.pdf',
    category: 'transaction',
    type: 'Disclosure Statement',
    status: 'rejected',
    uploadDate: '2024-01-09',
    size: '2.7 MB',
    uploadedBy: 'Rep One',
    required: true,
    fileUrl: '/mock-pdfs/disclosure-statement-sample.pdf'
  },
  {
    id: '8',
    name: 'Social_Security_Card_Copy.pdf',
    category: 'identification',
    type: 'Social Security Card',
    status: 'approved',
    uploadDate: '2024-01-08',
    size: '0.5 MB',
    uploadedBy: 'Rep One',
    required: true,
    fileUrl: '/mock-pdfs/ssn-card-sample.pdf'
  },
  {
    id: '9',
    name: 'Utility_Bill_Address_Proof.pdf',
    category: 'identification',
    type: 'Proof of Address',
    status: 'approved',
    uploadDate: '2024-01-07',
    size: '1.2 MB',
    uploadedBy: 'Rep One',
    required: true,
    fileUrl: '/mock-pdfs/address-proof-sample.pdf'
  },
  {
    id: '10',
    name: 'K_Contract_Purchase_Agreement.pdf',
    category: 'transaction',
    type: 'K-Contract',
    status: 'uploaded',
    uploadDate: '2024-01-06',
    size: '4.1 MB',
    uploadedBy: 'Rep One',
    required: true,
    fileUrl: '/mock-pdfs/k-contract-sample.pdf'
  }
];
