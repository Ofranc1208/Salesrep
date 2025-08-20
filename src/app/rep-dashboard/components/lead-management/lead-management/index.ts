// Lead Management Module - Main orchestrator for lead processing workflow
export { default as LeadManagement } from './LeadManagement';

// Types and Interfaces
export type { LeadManagementProps, LeadManagementState, LeadManagementConfig } from './types';

// Hooks and Services
export { useLeadManagement } from './hooks';
export { LeadManagementService } from './services';
export type { UseLeadManagementReturn } from './hooks';
