import { Lead, PhoneNumber } from '../../../types';
import { ValidationResult } from './hooks';

class LeadIntakeService {
  /**
   * Process raw spreadsheet data into Lead objects
   */
  async processSpreadsheetData(data: any[]): Promise<Lead[]> {
    const leads: Lead[] = [];

    for (const row of data) {
      try {
        const lead = this.mapRowToLead(row);
        leads.push(lead);
      } catch (error) {
        console.warn(`Failed to process row ${row.rowIndex}:`, error);
        // Continue processing other rows
      }
    }

    return leads;
  }

  /**
   * Map a spreadsheet row to a Lead object
   */
  private mapRowToLead(row: any): Lead {
    // Extract phone numbers from various possible columns
    const phoneNumbers = this.extractPhoneNumbers(row);

    // Generate unique ID
    const leadId = this.generateLeadId(row);

    const structuredSettlement = {
      monthlyPayment: row['Monthly Payment'] || row['monthlyPayment'] || 'Not Available',
      startDate: this.formatDate(row['Payment Start'] || row['paymentStart'] || row['Start Date']),
      endDate: this.formatDate(row['Payment End'] || row['paymentEnd'] || row['End Date']),
      totalValue: row['Total Value'] || row['totalValue'] || 'Not Available',
      insuranceCompany: row['Insurance Company'] || row['insuranceCompany'] || 'Not Available',
      offerAmount: row['Offer Amount'] || row['offerAmount'] || 'Not Available'
    };

    const lead: Lead = {
      id: leadId,
      crmId: row['CRM ID'] || row['crmId'] || leadId,
      clientName: this.extractClientName(row),
      campaignName: row['Campaign'] || row['campaign'] || 'Default Campaign',
      phoneNumbers,
      payment: row['Payment Amount'] || row['paymentAmount'] || 'Not Available',
      insuranceCompany: row['Insurance Company'] || row['insuranceCompany'] || 'Not Available',
      startDate: this.formatDate(row['Start Date'] || row['startDate']),
      endDate: this.formatDate(row['End Date'] || row['endDate']),
      processed: false,
      nextFollowUp: this.calculateNextFollowUp(),
      status: 'New',
      priority: this.calculatePriority(row),
      
      // Required legacy properties
      messageHistory: [],
      phoneNumbersProcessed: 0,
      structuredSettlementDetails: structuredSettlement,
      
      // Extended properties for lead management
      structuredSettlement,
      clientInfo: {
        ssn: row['SSN'] || row['Social Security'] || 'Not Available',
        dateOfBirth: this.formatDate(row['DOB'] || row['Date of Birth'] || row['dateOfBirth']),
        futureNPV: row['Future NPV'] || row['futureNPV'] || 'Not Available',
        currentOffers: row['Current Offers'] || row['currentOffers'] || 'Not Available',
        // Store any additional fields that don't map to standard fields
        additionalFields: this.extractAdditionalFields(row)
      },

      messages: [],
      notes: row['Notes'] || row['notes'] || '',
      lastActivity: new Date().toISOString(),
      assignedTo: 'Rep 1', // Default assignment as requested
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return lead;
  }

  /**
   * Extract client name from various possible column formats
   */
  private extractClientName(row: any): string {
    // Try different possible column names
    const possibleNames = [
      'Client Name', 'clientName', 'name', 'Name',
      'First Name', 'firstName', 'Last Name', 'lastName',
      'Full Name', 'fullName'
    ];

    // If we have separate first/last names, combine them
    const firstName = row['First Name'] || row['firstName'] || '';
    const lastName = row['Last Name'] || row['lastName'] || '';
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`.trim();
    }

    // Otherwise, look for a full name field
    for (const field of possibleNames) {
      if (row[field] && row[field] !== 'Not Available') {
        return String(row[field]).trim();
      }
    }

    return 'Unknown Client';
  }

  /**
   * Extract phone numbers from various columns
   */
  private extractPhoneNumbers(row: any): PhoneNumber[] {
    const phoneNumbers: PhoneNumber[] = [];
    const phoneFields = [
      'Phone', 'phone', 'Phone Number', 'phoneNumber',
      'Phone 1', 'phone1', 'Primary Phone', 'primaryPhone',
      'Phone 2', 'phone2', 'Secondary Phone', 'secondaryPhone',
      'Phone 3', 'phone3', 'Mobile', 'mobile', 'Cell', 'cell'
    ];

    let isPrimary = true;
    for (const field of phoneFields) {
      const phoneValue = row[field];
      if (phoneValue && phoneValue !== 'Not Available' && phoneValue.toString().trim()) {
        const cleanPhone = this.cleanPhoneNumber(phoneValue.toString());
        if (cleanPhone) {
          phoneNumbers.push({
            number: cleanPhone,
            status: 'Not Contacted',
            lastUsed: '',
            isPrimary,
            type: this.determinePhoneType(field),
            relationship: 'Client',
            lastVerified: '',
            notes: ''
          });
          isPrimary = false; // Only first phone is primary
        }
      }
    }

    // If no phone numbers found, create a placeholder
    if (phoneNumbers.length === 0) {
      phoneNumbers.push({
        number: 'Not Available',
        status: 'Not Available',
        lastUsed: '',
        isPrimary: true,
        type: 'Unknown',
        relationship: 'Client',
        lastVerified: '',
        notes: 'Phone number not provided in spreadsheet'
      });
    }

    return phoneNumbers;
  }

  /**
   * Clean and format phone number
   */
  private cleanPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Handle different formats
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11 && digits.startsWith('1')) {
      return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    
    // Return original if can't format
    return phone;
  }

  /**
   * Determine phone type from field name
   */
  private determinePhoneType(fieldName: string): string {
    const field = fieldName.toLowerCase();
    if (field.includes('mobile') || field.includes('cell')) return 'Mobile';
    if (field.includes('home')) return 'Home';
    if (field.includes('work') || field.includes('office')) return 'Work';
    if (field.includes('primary')) return 'Primary';
    if (field.includes('secondary')) return 'Secondary';
    return 'Unknown';
  }

  /**
   * Format date strings
   */
  private formatDate(dateValue: any): string {
    if (!dateValue || dateValue === 'Not Available') return 'Not Available';
    
    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return 'Not Available';
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    } catch {
      return 'Not Available';
    }
  }

  /**
   * Calculate next follow-up date
   */
  private calculateNextFollowUp(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  /**
   * Calculate lead priority based on data
   */
  private calculatePriority(row: any): 'High' | 'Medium' | 'Low' {
    // Simple priority logic - can be enhanced
    const paymentAmount = parseFloat(row['Payment Amount'] || row['paymentAmount'] || '0');
    const futureNPV = parseFloat(row['Future NPV'] || row['futureNPV'] || '0');
    
    if (paymentAmount > 50000 || futureNPV > 100000) return 'High';
    if (paymentAmount > 20000 || futureNPV > 50000) return 'Medium';
    return 'Low';
  }

  /**
   * Extract additional fields that don't map to standard Lead properties
   */
  private extractAdditionalFields(row: any): Record<string, any> {
    const standardFields = new Set([
      'CRM ID', 'crmId', 'Client Name', 'clientName', 'name', 'Name',
      'First Name', 'firstName', 'Last Name', 'lastName', 'Full Name', 'fullName',
      'Phone', 'phone', 'Phone Number', 'phoneNumber', 'Phone 1', 'phone1',
      'Phone 2', 'phone2', 'Phone 3', 'phone3', 'Primary Phone', 'primaryPhone',
      'Secondary Phone', 'secondaryPhone', 'Mobile', 'mobile', 'Cell', 'cell',
      'Payment Amount', 'paymentAmount', 'Insurance Company', 'insuranceCompany',
      'Start Date', 'startDate', 'End Date', 'endDate', 'Campaign', 'campaign',
      'Monthly Payment', 'monthlyPayment', 'Payment Start', 'paymentStart',
      'Payment End', 'paymentEnd', 'Total Value', 'totalValue', 'Offer Amount', 'offerAmount',
      'SSN', 'Social Security', 'DOB', 'Date of Birth', 'dateOfBirth',
      'Future NPV', 'futureNPV', 'Current Offers', 'currentOffers',
      'Notes', 'notes', 'rowIndex'
    ]);

    const additionalFields: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(row)) {
      if (!standardFields.has(key) && value !== 'Not Available') {
        additionalFields[key] = value;
      }
    }

    return additionalFields;
  }

  /**
   * Generate unique lead ID
   */
  private generateLeadId(row: any): string {
    const timestamp = Date.now();
    const clientName = this.extractClientName(row).replace(/\s+/g, '');
    const random = Math.random().toString(36).substring(2, 8);
    return `LEAD_${clientName.substring(0, 8).toUpperCase()}_${timestamp}_${random}`;
  }

  /**
   * Validate processed leads
   */
  async validateLeads(leads: Lead[]): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const validLeads: Lead[] = [];
    const invalidLeads: any[] = [];

    for (const lead of leads) {
      const leadErrors: string[] = [];
      const leadWarnings: string[] = [];

      // Required field validation
      if (!lead.clientName || lead.clientName === 'Unknown Client') {
        leadErrors.push(`Lead ${lead.id}: Client name is required`);
      }

      if (!lead.phoneNumbers || lead.phoneNumbers.length === 0) {
        leadErrors.push(`Lead ${lead.id}: At least one phone number is required`);
      } else {
        const validPhones = lead.phoneNumbers.filter(p => p.number !== 'Not Available');
        if (validPhones.length === 0) {
          leadWarnings.push(`Lead ${lead.id}: No valid phone numbers found`);
        }
      }

      // Data quality warnings
      if (lead.structuredSettlement.monthlyPayment === 'Not Available') {
        leadWarnings.push(`Lead ${lead.id}: Monthly payment amount missing`);
      }

      if (lead.clientInfo?.ssn === 'Not Available') {
        leadWarnings.push(`Lead ${lead.id}: SSN not provided`);
      }

      if (lead.clientInfo?.dateOfBirth === 'Not Available') {
        leadWarnings.push(`Lead ${lead.id}: Date of birth not provided`);
      }

      // Categorize lead
      if (leadErrors.length === 0) {
        validLeads.push(lead);
      } else {
        invalidLeads.push({ lead, errors: leadErrors });
        errors.push(...leadErrors);
      }

      warnings.push(...leadWarnings);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      validLeads,
      invalidLeads
    };
  }

  /**
   * Enrich lead data with additional processing
   */
  async enrichLeadData(lead: Lead): Promise<Lead> {
    // Add any additional enrichment logic here
    // For now, just ensure all required fields are properly set
    
    const enrichedLead = { ...lead };

    // Ensure proper status progression
    if (enrichedLead.status === 'New') {
      enrichedLead.status = 'Assigned';
    }

    // Set assignment timestamp
    enrichedLead.assignedAt = new Date().toISOString();

    // Update last activity
    enrichedLead.lastActivity = new Date().toISOString();
    enrichedLead.updatedAt = new Date().toISOString();

    return enrichedLead;
  }
}

export const leadIntakeService = new LeadIntakeService();
