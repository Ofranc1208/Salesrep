// Campaign Management Components - Clean Modular Architecture

// Main Campaign Manager (Uses modular components internally)
// Updated to use the modular version directly
export { CampaignManager } from './campaign-manager';

// Lead Intake Module - Spreadsheet processing and data validation
export * from './lead-intake';

// Active Leads Module - Complete lead list management system
// Note: active-leads moved to campaign-manager/tabs/lead-lists/
// export * from './active-leads'; // DEPRECATED - moved to tabs/lead-lists/

// Campaign Manager Module - Campaign overview and management
export * from './campaign-manager';
