// Lead Overview Module - Messaging and template interface for selected leads
export { default as LeadOverview } from './LeadOverview';

// Types and Interfaces
export type { 
  LeadOverviewProps, 
  LeadOverviewState, 
  LeadOverviewConfig, 
  MessageHistoryItem 
} from './types';

// Hooks and Services
export { useLeadOverview } from './hooks';
export { LeadOverviewService } from './services';
export type { UseLeadOverviewReturn } from './hooks';
