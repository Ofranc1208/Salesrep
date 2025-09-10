import { Lead } from '../../../../types';
import { ValidationResult } from '../hooks';

/**
 * LeadValidator - Handles lead data validation
 * Focused responsibility: Validate processed leads for data quality and completeness
 */
export class LeadValidator {
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
   * Validate individual lead
   */
  validateSingleLead(lead: Lead): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required field validation
    if (!lead.clientName || lead.clientName === 'Unknown Client') {
      errors.push('Client name is required');
    }

    if (!lead.phoneNumbers || lead.phoneNumbers.length === 0) {
      errors.push('At least one phone number is required');
    } else {
      const validPhones = lead.phoneNumbers.filter(p => p.number !== 'Not Available');
      if (validPhones.length === 0) {
        warnings.push('No valid phone numbers found');
      }
    }

    // Data quality warnings
    if (lead.structuredSettlement.monthlyPayment === 'Not Available') {
      warnings.push('Monthly payment amount missing');
    }

    if (lead.clientInfo?.ssn === 'Not Available') {
      warnings.push('SSN not provided');
    }

    if (lead.clientInfo?.dateOfBirth === 'Not Available') {
      warnings.push('Date of birth not provided');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Check for duplicate leads within a batch
   */
  findDuplicateLeads(leads: Lead[]): { duplicates: Lead[][]; uniqueLeads: Lead[] } {
    const duplicates: Lead[][] = [];
    const uniqueLeads: Lead[] = [];
    const seenLeads = new Map<string, Lead[]>();

    for (const lead of leads) {
      // Create a key based on client name and primary phone
      const primaryPhone = lead.phoneNumbers.find(p => p.isPrimary)?.number || '';
      const key = `${lead.clientName.toLowerCase()}_${primaryPhone}`;

      if (seenLeads.has(key)) {
        seenLeads.get(key)!.push(lead);
      } else {
        seenLeads.set(key, [lead]);
      }
    }

    for (const [key, leadGroup] of seenLeads) {
      if (leadGroup.length > 1) {
        duplicates.push(leadGroup);
      } else {
        uniqueLeads.push(leadGroup[0]);
      }
    }

    return { duplicates, uniqueLeads };
  }

  /**
   * Validate phone number format
   */
  validatePhoneNumber(phoneNumber: string): { isValid: boolean; formatted?: string; error?: string } {
    if (!phoneNumber || phoneNumber === 'Not Available') {
      return { isValid: false, error: 'Phone number is required' };
    }

    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    
    // Check length
    if (digits.length === 10) {
      return {
        isValid: true,
        formatted: `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
      };
    } else if (digits.length === 11 && digits.startsWith('1')) {
      return {
        isValid: true,
        formatted: `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
      };
    }
    
    return { isValid: false, error: 'Invalid phone number format' };
  }

  /**
   * Get validation summary statistics
   */
  getValidationSummary(validationResult: ValidationResult): {
    totalLeads: number;
    validLeads: number;
    invalidLeads: number;
    errorCount: number;
    warningCount: number;
    validationRate: number;
  } {
    const { validLeads, invalidLeads, errors, warnings } = validationResult;
    const totalLeads = validLeads.length + invalidLeads.length;
    
    return {
      totalLeads,
      validLeads: validLeads.length,
      invalidLeads: invalidLeads.length,
      errorCount: errors.length,
      warningCount: warnings.length,
      validationRate: totalLeads > 0 ? (validLeads.length / totalLeads) * 100 : 0
    };
  }
}

// Export singleton instance
export const leadValidator = new LeadValidator();
