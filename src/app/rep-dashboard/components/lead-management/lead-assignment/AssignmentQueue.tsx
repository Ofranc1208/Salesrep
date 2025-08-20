'use client';

import React, { useState } from 'react';
import { Lead } from '../../../types';
import { SalesRep, AssignmentRule } from './hooks';

interface AssignmentQueueProps {
  unassignedLeads: Lead[];
  salesReps: SalesRep[];
  onAssignLead: (leadId: string, repId: string) => void;
  onBulkAssignment: (assignments: { leadId: string; repId: string }[]) => void;
  isAssigning: boolean;
  assignmentRules: AssignmentRule[];
}

export default function AssignmentQueue({
  unassignedLeads,
  salesReps,
  onAssignLead,
  onBulkAssignment,
  isAssigning,
  assignmentRules
}: AssignmentQueueProps) {
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [bulkAssignTo, setBulkAssignTo] = useState<string>('');

  const toggleLeadSelection = (leadId: string) => {
    const newSelection = new Set(selectedLeads);
    if (newSelection.has(leadId)) {
      newSelection.delete(leadId);
    } else {
      newSelection.add(leadId);
    }
    setSelectedLeads(newSelection);
  };

  const selectAllLeads = () => {
    if (selectedLeads.size === unassignedLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(unassignedLeads.map(lead => lead.id)));
    }
  };

  const handleBulkAssignment = () => {
    if (!bulkAssignTo || selectedLeads.size === 0) return;
    
    const assignments = Array.from(selectedLeads).map(leadId => ({
      leadId,
      repId: bulkAssignTo
    }));
    
    onBulkAssignment(assignments);
    setSelectedLeads(new Set());
    setBulkAssignTo('');
  };

  const getSuggestedRep = (lead: Lead): string => {
    // Apply assignment rules
    for (const rule of assignmentRules.filter(r => r.isActive).sort((a, b) => a.order - b.order)) {
      if (rule.condition === 'priority' && lead.priority === rule.value) {
        return rule.assignTo;
      }
      if (rule.condition === 'amount') {
        const paymentAmount = parseFloat(lead.structuredSettlement.monthlyPayment.replace(/[^0-9.-]+/g, ''));
        if (paymentAmount >= parseFloat(rule.value)) {
          return rule.assignTo;
        }
      }
      if (rule.condition === 'insurance' && lead.insuranceCompany.toLowerCase().includes(rule.value.toLowerCase())) {
        return rule.assignTo;
      }
      if (rule.condition === 'custom' && rule.value === 'default') {
        return rule.assignTo;
      }
    }
    
    // Fallback to least loaded rep
    const availableReps = salesReps.filter(rep => rep.isActive && rep.currentLeads < rep.maxLeads);
    if (availableReps.length > 0) {
      return availableReps.sort((a, b) => a.workloadScore - b.workloadScore)[0].id;
    }
    
    return 'Rep 1'; // Default fallback
  };

  if (unassignedLeads.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">✅</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">All Leads Assigned</h3>
          <p className="text-gray-600">
            Great job! All leads have been assigned to sales reps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Queue Controls */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={selectAllLeads}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {selectedLeads.size === unassignedLeads.length ? 'Deselect All' : 'Select All'}
            </button>
            {selectedLeads.size > 0 && (
              <>
                <span className="text-sm text-gray-600">
                  {selectedLeads.size} selected
                </span>
                <select
                  value={bulkAssignTo}
                  onChange={(e) => setBulkAssignTo(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Rep</option>
                  {salesReps.filter(rep => rep.isActive).map(rep => (
                    <option key={rep.id} value={rep.id}>
                      {rep.name} ({rep.currentLeads}/{rep.maxLeads})
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleBulkAssignment}
                  disabled={!bulkAssignTo || isAssigning}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  {isAssigning ? 'Assigning...' : 'Bulk Assign'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Queue List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {unassignedLeads.map((lead) => {
            const isSelected = selectedLeads.has(lead.id);
            const suggestedRep = getSuggestedRep(lead);
            const suggestedRepInfo = salesReps.find(rep => rep.id === suggestedRep);
            
            return (
              <div
                key={lead.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleLeadSelection(lead.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{lead.clientName}</h4>
                      <p className="text-sm text-gray-600">{lead.crmId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {lead.structuredSettlement.monthlyPayment}
                      </div>
                      <div className="text-xs text-gray-500">
                        {lead.insuranceCompany}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        lead.priority === 'High' ? 'bg-red-100 text-red-800' :
                        lead.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {lead.priority}
                      </span>
                    </div>
                    
                    <div className="text-right min-w-[120px]">
                      <div className="text-sm font-medium text-blue-600">
                        Suggested: {suggestedRepInfo?.name || suggestedRep}
                      </div>
                      <div className="text-xs text-gray-500">
                        {suggestedRepInfo ? `${suggestedRepInfo.currentLeads}/${suggestedRepInfo.maxLeads} leads` : ''}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onAssignLead(lead.id, suggestedRep)}
                        disabled={isAssigning}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        Auto-Assign
                      </button>
                      
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            onAssignLead(lead.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        disabled={isAssigning}
                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <option value="">Manual Assign</option>
                        {salesReps.filter(rep => rep.isActive).map(rep => (
                          <option key={rep.id} value={rep.id}>
                            {rep.name} ({rep.currentLeads}/{rep.maxLeads})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Lead Details */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {lead.phoneNumbers.filter(p => p.number !== 'Not Available').length} phone numbers
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    Campaign: {lead.campaignName}
                  </span>
                  {lead.clientInfo?.ssn !== 'Not Available' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Complete Profile
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
