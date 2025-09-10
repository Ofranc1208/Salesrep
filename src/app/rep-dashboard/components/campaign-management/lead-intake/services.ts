// REFACTORED: Lead Intake Service - Now uses small, focused components
// Components: SpreadsheetParser, DataMapper, LeadValidator, DataEnricher

import { Lead } from '../../../types';
import { ValidationResult } from './hooks';
import { spreadsheetParser, dataMapper, leadValidator, dataEnricher } from './services/index';

/**
 * Lead Intake Service - Coordinates small, focused components
 * Uses: SpreadsheetParser + DataMapper + LeadValidator + DataEnricher
 */
class LeadIntakeService {
  /**
   * Process raw spreadsheet data into Lead objects (delegates to SpreadsheetParser + DataMapper)
   */
  async processSpreadsheetData(data: any[], campaignId: string): Promise<Lead[]> {
    return spreadsheetParser.processSpreadsheetData(data, campaignId, dataMapper);
  }

  /**
   * Validate processed leads (delegates to LeadValidator)
   */
  async validateLeads(leads: Lead[]): Promise<ValidationResult> {
    return leadValidator.validateLeads(leads);
  }

  /**
   * Enrich lead data with additional processing (delegates to DataEnricher)
   */
  async enrichLeadData(lead: Lead): Promise<Lead> {
    return dataEnricher.enrichLeadData(lead);
  }

  /**
   * Complete processing pipeline: Parse → Map → Validate → Enrich
   */
  async processLeadsPipeline(data: any[], campaignId: string): Promise<{
    leads: Lead[];
    validationResult: ValidationResult;
    enrichedLeads: Lead[];
  }> {
    // Step 1: Process spreadsheet data
    const leads = await this.processSpreadsheetData(data, campaignId);

    // Step 2: Validate leads
    const validationResult = await this.validateLeads(leads);

    // Step 3: Enrich valid leads
    const enrichedLeads = await dataEnricher.enrichLeadsBatch(validationResult.validLeads);

    return {
      leads,
      validationResult,
      enrichedLeads
    };
  }

  /**
   * Get service health status (coordinates all components)
   */
  getServiceStatus() {
    return {
      isReady: true,
      components: {
        spreadsheetParser: 'ready',
        dataMapper: 'ready', 
        leadValidator: 'ready',
        dataEnricher: 'ready'
      },
      lastActivity: new Date().toISOString()
    };
  }
}

export const leadIntakeService = new LeadIntakeService();
