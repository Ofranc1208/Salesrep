// Lead Assignment Module - Handles rep distribution and workload management
export { default as LeadAssignmentManager } from './LeadAssignmentManager';
export { default as AssignmentQueue } from './AssignmentQueue';

// Hooks and Types
export { useLeadAssignment } from './hooks';
export type { 
  UseLeadAssignmentReturn, 
  SalesRep, 
  AssignmentRule, 
  RepWorkload 
} from './hooks';
