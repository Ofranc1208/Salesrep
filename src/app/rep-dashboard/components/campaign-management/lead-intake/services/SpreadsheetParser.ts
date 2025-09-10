import { Lead } from '../../../../types';

/**
 * SpreadsheetParser - Handles raw spreadsheet data processing
 * Focused responsibility: Convert raw spreadsheet rows into Lead objects
 */
export class SpreadsheetParser {
  /**
   * Process raw spreadsheet data into Lead objects
   */
  async processSpreadsheetData(data: any[], campaignId: string, dataMapper: any): Promise<Lead[]> {
    const leads: Lead[] = [];

    for (const row of data) {
      try {
        const lead = dataMapper.mapRowToLead(row, campaignId);
        leads.push(lead);
      } catch (error) {
        console.warn(`Failed to process row ${row.rowIndex}:`, error);
        // Continue processing other rows
      }
    }

    return leads;
  }

  /**
   * Validate raw spreadsheet structure
   */
  validateSpreadsheetStructure(data: any[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data || data.length === 0) {
      errors.push('Spreadsheet is empty');
      return { isValid: false, errors };
    }

    if (data.length < 2) {
      errors.push('Spreadsheet must contain at least a header row and one data row');
      return { isValid: false, errors };
    }

    // Check for required columns (basic validation)
    const firstRow = data[0];
    const requiredColumns = ['Client Name', 'clientName', 'name', 'Name'];
    const hasNameColumn = requiredColumns.some(col => 
      Object.keys(firstRow).some(key => key.toLowerCase().includes(col.toLowerCase()))
    );

    if (!hasNameColumn) {
      errors.push('Spreadsheet must contain a client name column');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Extract headers from spreadsheet data
   */
  extractHeaders(data: any[]): string[] {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  }

  /**
   * Get data preview for validation
   */
  getDataPreview(data: any[], maxRows: number = 5): any[] {
    return data.slice(0, maxRows);
  }
}

// Export singleton instance
export const spreadsheetParser = new SpreadsheetParser();
