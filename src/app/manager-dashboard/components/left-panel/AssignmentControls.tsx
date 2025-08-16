'use client';

import React from 'react';
import { mockSalesReps, mockMessageTemplates } from '../../utils/mock-data';

interface AssignmentControlsProps {
  selectedLeadCount: number;
  onAssignClick: () => void;
  showAssignControls: boolean;
}

export default function AssignmentControls({
  selectedLeadCount,
  onAssignClick,
  showAssignControls
}: AssignmentControlsProps) {

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
              Assign to Sales Rep
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
              <option value="">Select a Sales Rep</option>
              {mockSalesReps.map((rep) => (
                <option key={rep.id} value={rep.id}>
                  {rep.name} ({rep.activeLeads} active leads)
                </option>
              ))}
            </select>
          </div>
          
          {/* Message Template Selection */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message Template
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
              <option value="">Select a Message Template</option>
              {mockMessageTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Confirm Assignment Button */}
          <button className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 font-medium transition-colors">
            Confirm Assignment
          </button>
        </div>
      )}
    </div>
  );
}
