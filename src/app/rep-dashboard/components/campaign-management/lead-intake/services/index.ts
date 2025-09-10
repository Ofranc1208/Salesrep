// Lead Intake Services - Focused Components (2025 Best Practices)
// Organized by responsibility: Parser > Mapper > Validator > Enricher

// Import singleton instances for local use
import { spreadsheetParser } from './SpreadsheetParser';
import { dataMapper } from './DataMapper';
import { leadValidator } from './LeadValidator';
import { dataEnricher } from './DataEnricher';

// Export classes
export { SpreadsheetParser } from './SpreadsheetParser';
export { DataMapper } from './DataMapper';
export { LeadValidator } from './LeadValidator';
export { DataEnricher } from './DataEnricher';

// Export singleton instances
export { spreadsheetParser, dataMapper, leadValidator, dataEnricher };

// Re-export for convenience
export const leadIntakeServices = {
  spreadsheetParser,
  dataMapper,
  leadValidator,
  dataEnricher
};
