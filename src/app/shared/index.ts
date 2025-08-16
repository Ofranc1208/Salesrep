// Main exports from the shared folder
export * from './types';
export { AssignmentEngine } from './AssignmentEngine';
export { dataFlowService, DataFlowService } from './DataFlowService';
export { default as LeadStatusBadge } from './LeadStatusBadge';
export { useDataFlow } from './useDataFlow';

// New refactored services and hooks
export { default as broadcastService } from './services/BroadcastService';
export { useSharedState } from './hooks/useSharedState';
export { useAssignmentSync } from './hooks/useAssignmentSync';

// Template system
export { templateService, default as TemplateService } from './TemplateService';
export type { MessageTemplate, TemplateVariables } from './TemplateService';
