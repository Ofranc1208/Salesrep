'use client';

import React, { useState } from 'react';
import { mockSalesReps, mockMessageTemplates, Lead } from '../../utils/mock-data';
import { leadAssignmentService } from '../../../rep-dashboard/components/campaign-management/services/LeadAssignmentService';

interface AssignmentControlsProps {
  selectedLeadCount: number;
  onAssignClick: () => void;
  showAssignControls: boolean;
  selectedLeads: Lead[];
  onAssignmentComplete: () => void;
}

export default function AssignmentControls({
  selectedLeadCount,
  onAssignClick,
  showAssignControls,
  selectedLeads,
  onAssignmentComplete
}: AssignmentControlsProps) {
  const [selectedRepId, setSelectedRepId] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');


  const handleConfirmAssignment = async () => {
    if (!selectedRepId) {
      alert('Please select a sales rep');
      return;
    }

    try {
      // Convert leads to assignment service format
      const leadsToAssign = selectedLeads.map(lead => ({
        id: lead.CBSI.toString(),
        clientFirstName: lead.clientFirstName,
        clientLastName: lead.clientLastName,
        phone1: lead.phone1,
        insuranceCompany: lead.insuranceCompany,
        payment100: lead.payment100,
        status: 'New' as const
      }));

      const selectedRep = mockSalesReps.find(rep => rep.id === selectedRepId);
      const selectedTemplate = mockMessageTemplates.find(t => t.id === selectedTemplateId);

      // Assign leads directly using the service
      const assignmentId = leadAssignmentService.assignLeadsToRep(
        leadsToAssign,
        selectedRepId,
        'manager-1', // Manager ID
        'campaign-1', // Campaign ID
        'Q1 Structured Settlement Buyout', // Campaign name
        selectedTemplate?.name,
        priority // Use selected priority
      );

      console.log(`✅ Assignment created: ${assignmentId}`);
      
      // Show success message
      alert(`Successfully assigned ${selectedLeads.length} leads to ${selectedRep?.name}`);
      
      // Reset form
      setSelectedRepId('');
      setSelectedTemplateId('');
      setPriority('medium');
      onAssignmentComplete();
      
    } catch (error) {
      console.error('❌ Error assigning leads:', error);
      alert('Error assigning leads. Please try again.');
    }
  };



  return (
    <div>
      {/* Assignment Button */}
      <button 
        onClick={onAssignClick}
        disabled={selectedLeadCount === 0}
        className={`w-full p-2 rounded-md font-medium transition-colors ${
          selectedLeadCount === 0 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Assign Selected Leads ({selectedLeadCount})
      </button>

      {/* Assignment Controls - Show when assign button is clicked */}
      {showAssignControls && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
          <h4 className="text-md font-semibold mb-3">Assignment Configuration</h4>
          
          {/* Sales Rep Selection */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign to Sales Rep *
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              value={selectedRepId}
              onChange={(e) => setSelectedRepId(e.target.value)}
            >
              <option value="">Select a Sales Rep</option>
              {mockSalesReps.map((rep) => (
                <option key={rep.id} value={rep.id}>
                  {rep.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Priority Selection */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          
          {/* Message Template Selection */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message Template (Optional)
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
            >
              <option value="">Select a Message Template</option>
              {mockMessageTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Confirm Assignment Button */}
          <button 
            className={`w-full p-2 rounded-md font-medium transition-colors ${
              selectedRepId 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleConfirmAssignment}
            disabled={!selectedRepId}
          >
            Confirm Assignment
          </button>
        </div>
      )}


    </div>
  );
}
