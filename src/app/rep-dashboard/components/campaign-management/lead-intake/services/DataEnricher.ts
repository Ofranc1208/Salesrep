import { Lead } from '../../../../types';

/**
 * DataEnricher - Handles lead data enrichment and enhancement
 * Focused responsibility: Enrich and enhance lead data with additional processing
 */
export class DataEnricher {
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

  /**
   * Enrich multiple leads in batch
   */
  async enrichLeadsBatch(leads: Lead[]): Promise<Lead[]> {
    const enrichedLeads: Lead[] = [];

    for (const lead of leads) {
      try {
        const enrichedLead = await this.enrichLeadData(lead);
        enrichedLeads.push(enrichedLead);
      } catch (error) {
        console.warn(`Failed to enrich lead ${lead.id}:`, error);
        // Add the original lead if enrichment fails
        enrichedLeads.push(lead);
      }
    }

    return enrichedLeads;
  }

  /**
   * Normalize lead data formats
   */
  normalizeLeadData(lead: Lead): Lead {
    const normalizedLead = { ...lead };

    // Normalize client name (title case)
    if (normalizedLead.clientName && normalizedLead.clientName !== 'Unknown Client') {
      normalizedLead.clientName = this.toTitleCase(normalizedLead.clientName);
    }

    // Normalize phone numbers
    normalizedLead.phoneNumbers = normalizedLead.phoneNumbers.map(phone => ({
      ...phone,
      number: this.normalizePhoneNumber(phone.number)
    }));

    // Normalize dates
    if (normalizedLead.startDate && normalizedLead.startDate !== 'Not Available') {
      normalizedLead.startDate = this.normalizeDate(normalizedLead.startDate);
    }

    if (normalizedLead.endDate && normalizedLead.endDate !== 'Not Available') {
      normalizedLead.endDate = this.normalizeDate(normalizedLead.endDate);
    }

    return normalizedLead;
  }

  /**
   * Calculate lead score based on available data
   */
  calculateLeadScore(lead: Lead): number {
    let score = 0;

    // Base score for having required fields
    if (lead.clientName && lead.clientName !== 'Unknown Client') score += 20;
    if (lead.phoneNumbers.some(p => p.number !== 'Not Available')) score += 20;

    // Payment amount scoring
    const paymentAmount = parseFloat(lead.payment?.toString() || '0');
    if (paymentAmount > 50000) score += 30;
    else if (paymentAmount > 20000) score += 20;
    else if (paymentAmount > 0) score += 10;

    // Data completeness scoring
    if (lead.clientInfo?.ssn !== 'Not Available') score += 10;
    if (lead.clientInfo?.dateOfBirth !== 'Not Available') score += 10;
    if (lead.structuredSettlement.monthlyPayment !== 'Not Available') score += 10;

    return Math.min(score, 100); // Cap at 100
  }

  /**
   * Add metadata to lead
   */
  addLeadMetadata(lead: Lead, metadata: Record<string, any>): Lead {
    return {
      ...lead,
      metadata: {
        ...lead.metadata,
        ...metadata,
        enrichedAt: new Date().toISOString(),
        enrichmentVersion: '1.0'
      }
    };
  }

  /**
   * Convert string to title case
   */
  private toTitleCase(str: string): string {
    return str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Normalize phone number format
   */
  private normalizePhoneNumber(phone: string): string {
    if (!phone || phone === 'Not Available') return phone;

    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Format consistently
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11 && digits.startsWith('1')) {
      return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    
    return phone; // Return original if can't normalize
  }

  /**
   * Normalize date format
   */
  private normalizeDate(dateValue: string): string {
    if (!dateValue || dateValue === 'Not Available') return dateValue;
    
    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return dateValue;
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    } catch {
      return dateValue;
    }
  }

  /**
   * Validate enrichment requirements
   */
  validateEnrichmentRequirements(lead: Lead): { canEnrich: boolean; missingFields: string[] } {
    const missingFields: string[] = [];

    if (!lead.clientName || lead.clientName === 'Unknown Client') {
      missingFields.push('clientName');
    }

    if (!lead.phoneNumbers || lead.phoneNumbers.length === 0) {
      missingFields.push('phoneNumbers');
    }

    if (!lead.campaignName) {
      missingFields.push('campaignName');
    }

    return {
      canEnrich: missingFields.length === 0,
      missingFields
    };
  }
}

// Export singleton instance
export const dataEnricher = new DataEnricher();
