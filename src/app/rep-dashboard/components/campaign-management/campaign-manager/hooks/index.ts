// Campaign Manager Module Hooks - 2025 Best Practice Structure
// Organized by responsibility: State > Workflow > Notifications > Metrics > Actions

export { useCampaignState } from './useCampaignState';
export { useCampaignWorkflow } from './useCampaignWorkflow';
export { useCampaignNotifications } from './useCampaignNotifications';
export { useCampaignMetrics } from './useCampaignMetrics';
export { useCampaignActions } from './useCampaignActions';

// Re-export feature-level hook
export { useCampaignLeads } from '../../hooks/useCampaignLeads';
