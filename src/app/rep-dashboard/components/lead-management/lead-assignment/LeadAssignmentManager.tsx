'use client';

import React, { useState } from 'react';
import { Lead } from '../../../types';
import AssignmentQueue from './AssignmentQueue';
import RepWorkloadView from './RepWorkloadView';
import AssignmentRules from './AssignmentRules';
import { useLeadAssignment } from './hooks';

interface LeadAssignmentManagerProps {
  leads: Lead[];
  onLeadAssigned: (leadId: string, repId: string) => void;
  onBulkAssignment: (assignments: { leadId: string; repId: string }[]) => void;
}

export default function LeadAssignmentManager({
  leads,
  onLeadAssigned,
  onBulkAssignment
}: LeadAssignmentManagerProps) {
  const [activeTab, setActiveTab] = useState<'queue' | 'workload' | 'rules'>('queue');

  const {
    unassignedLeads,
    salesReps,
    assignmentRules,
    assignLead,
    bulkAssign,
    updateAssignmentRules,
    getRepWorkload,
    isAssigning
  } = useLeadAssignment(leads);

  const handleLeadAssignment = async (leadId: string, repId: string) => {
    await assignLead(leadId, repId);
    onLeadAssigned(leadId, repId);
  };

  const handleBulkAssignment = async (assignments: { leadId: string; repId: string }[]) => {
    await bulkAssign(assignments);
    onBulkAssignment(assignments);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'queue':
        return (
          <AssignmentQueue
            unassignedLeads={unassignedLeads}
            salesReps={salesReps}
            onAssignLead={handleLeadAssignment}
            onBulkAssignment={handleBulkAssignment}
            isAssigning={isAssigning}
            assignmentRules={assignmentRules}
          />
        );
      
      case 'workload':
        return (
          <RepWorkloadView
            salesReps={salesReps}
            leads={leads}
            getRepWorkload={getRepWorkload}
            onReassignLead={(leadId, fromRepId, toRepId) => {
              handleLeadAssignment(leadId, toRepId);
            }}
          />
        );
      
      case 'rules':
        return (
          <AssignmentRules
            rules={assignmentRules}
            onUpdateRules={updateAssignmentRules}
            salesReps={salesReps}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Lead Assignment</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {unassignedLeads.length} unassigned leads
            </span>
            <button
              onClick={() => {
                // Auto-assign based on rules
                const autoAssignments = unassignedLeads.slice(0, 10).map((lead, index) => ({
                  leadId: lead.id,
                  repId: salesReps[index % salesReps.length]?.id || 'Rep 1'
                }));
                handleBulkAssignment(autoAssignments);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              disabled={unassignedLeads.length === 0}
            >
              Auto-Assign
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 py-3 border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'queue', label: 'Assignment Queue', count: unassignedLeads.length },
            { id: 'workload', label: 'Rep Workload', count: salesReps.length },
            { id: 'rules', label: 'Assignment Rules', count: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {renderTabContent()}
      </div>
    </div>
  );
}
