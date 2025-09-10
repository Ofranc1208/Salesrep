// Queue Types - Extracted from the original QueueTab.tsx (292 lines)
import { Lead } from '../../../../../types';
import { LeadAssignment } from '../../../services/LeadAssignmentService';

// Main Queue Tab Props
export interface QueueTabProps {
  repId?: string;
  onAcceptAssignment?: (assignmentId: string, leads: Lead[]) => void;
  onDeclineAssignment?: (assignmentId: string, reason?: string) => void;
}

// Queue Statistics Component
export interface QueueStatsProps {
  stats: {
    pending: number;
    accepted: number;
    declined: number;
    totalLeads: number;
  };
}

// Pending Assignments Component
export interface PendingAssignmentsProps {
  assignments: LeadAssignment[];
  onAcceptAssignment: (assignmentId: string) => void;
  onDeclineAssignment: (assignmentId: string) => void;
}

// Accepted Assignments Component
export interface AcceptedAssignmentsProps {
  isExpanded: boolean;
  onToggle: () => void;
}

// Manager Updates Component
export interface ManagerUpdatesProps {
  isExpanded: boolean;
  onToggle: () => void;
}

// Expanded Sections State
export interface ExpandedSections {
  accepted: boolean;
  updates: boolean;
}
