'use client';

// NEW MODULAR OVERVIEW TAB - Uses organized components from overview/ subfolder
// REPLACES: The original 392-line OverviewTab.tsx with clean, maintainable structure

import React, { useState, useEffect } from 'react';
import { leadAssignmentService, LeadAssignment } from '../../../services/LeadAssignmentService';
import { OverviewTabProps } from './types';
import ManagerStatus from './ManagerStatus';
import ManagerCommunication from './ManagerCommunication';
import LeadQueue from './LeadQueue';
import LeadInventory from './LeadInventory';

export default function OverviewTab({
  selectedCampaign,
  campaignLeads,
  activeLeadList,
  onLeadListChange,
  repId = 'rep-1',
  onAcceptAssignment,
  onDeclineAssignment
}: OverviewTabProps) {
  // State management - extracted from original OverviewTab.tsx
  const [assignments, setAssignments] = useState<LeadAssignment[]>([]);
  const [queueStats, setQueueStats] = useState({ pending: 0, accepted: 0, declined: 0, totalLeads: 0 });
  const [showManagerDetails, setShowManagerDetails] = useState(false);
  const [activeCommMode, setActiveCommMode] = useState<'chat' | 'email' | 'call' | null>(null);

  // Load assignments for queue integration - from original OverviewTab.tsx
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
    setQueueStats(assignmentStats);
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

  return (
    <div className="space-y-3">
      {/* Manager Status Component */}
      <ManagerStatus
        selectedCampaign={selectedCampaign}
        onShowDetails={() => setShowManagerDetails(!showManagerDetails)}
        showDetails={showManagerDetails}
      />

      {/* Manager Communication Component - Only show when details are expanded */}
      {showManagerDetails && (
        <ManagerCommunication
          selectedCampaign={selectedCampaign}
          activeCommMode={activeCommMode}
          onCommModeChange={setActiveCommMode}
        />
      )}

      {/* Lead Queue Component */}
      <LeadQueue queueStats={queueStats} />

      {/* Lead Inventory Component */}
      <LeadInventory
        activeLeadList={activeLeadList}
        onLeadListChange={onLeadListChange}
      />
    </div>
  );
}
