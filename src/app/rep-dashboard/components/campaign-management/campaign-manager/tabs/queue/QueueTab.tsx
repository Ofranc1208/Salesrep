'use client';

// NEW MODULAR QUEUE TAB - Uses organized components from queue/ subfolder
// REPLACES: The original 292-line QueueTab.tsx with clean, maintainable structure

import React, { useState, useEffect } from 'react';
import { leadAssignmentService, LeadAssignment } from '../../../services/LeadAssignmentService';
import { QueueTabProps, ExpandedSections } from './types';
import QueueStats from './QueueStats';
import PendingAssignments from './PendingAssignments';
import AcceptedAssignments from './AcceptedAssignments';
import ManagerUpdates from './ManagerUpdates';

export default function QueueTab({ 
  repId = 'rep-1', 
  onAcceptAssignment, 
  onDeclineAssignment 
}: QueueTabProps) {
  // State management - extracted from original QueueTab.tsx
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    accepted: false,
    updates: false
  });
  const [assignments, setAssignments] = useState<LeadAssignment[]>([]);
  const [stats, setStats] = useState({ pending: 0, accepted: 0, declined: 0, totalLeads: 0 });

  // Load assignments - from original QueueTab.tsx lines 25-37
  useEffect(() => {
    loadAssignments();

    const unsubscribe = leadAssignmentService.subscribe('new-assignment', (data: { assignment: LeadAssignment }) => {
      if (data.assignment.assignedTo === repId) {
        loadAssignments();
      }
    });

    return unsubscribe;
  }, [repId]);

  const loadAssignments = () => {
    const repAssignments = leadAssignmentService.getRepAssignments(repId);
    const assignmentStats = leadAssignmentService.getAssignmentStats(repId);
    
    setAssignments(repAssignments);
    setStats(assignmentStats);
  };

  const handleAssignmentResponse = (assignmentId: string, response: 'accepted' | 'declined') => {
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (response === 'accepted' && assignment && onAcceptAssignment) {
      const leads: any[] = [];
      onAcceptAssignment(assignmentId, leads);
    } else if (response === 'declined' && onDeclineAssignment) {
      onDeclineAssignment(assignmentId, 'User declined assignment');
    }
    
    leadAssignmentService.respondToAssignment(assignmentId, response, repId);
    loadAssignments();
  };

  const toggleSection = (section: 'accepted' | 'updates') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const pendingAssignments = assignments.filter(a => a.status === 'pending');

  return (
    <div className="space-y-4">
      {/* Queue Statistics Component */}
      <QueueStats stats={stats} />

      {/* Pending Assignments Component - Most Important */}
      <PendingAssignments
        assignments={pendingAssignments}
        onAcceptAssignment={(assignmentId) => handleAssignmentResponse(assignmentId, 'accepted')}
        onDeclineAssignment={(assignmentId) => handleAssignmentResponse(assignmentId, 'declined')}
      />

      {/* Accepted Assignments Component - Collapsible */}
      <AcceptedAssignments
        isExpanded={expandedSections.accepted}
        onToggle={() => toggleSection('accepted')}
      />

      {/* Manager Updates Component - Collapsible */}
      <ManagerUpdates
        isExpanded={expandedSections.updates}
        onToggle={() => toggleSection('updates')}
      />
    </div>
  );
}
