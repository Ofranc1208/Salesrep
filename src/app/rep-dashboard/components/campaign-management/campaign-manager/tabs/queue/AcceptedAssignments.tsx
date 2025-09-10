'use client';

// EXTRACTED FROM: ../QueueTab.tsx lines 176-239
// Accepted Assignments - Collapsible section showing assignments in progress

import React from 'react';
import { AcceptedAssignmentsProps } from './types';

export default function AcceptedAssignments({
  isExpanded,
  onToggle
}: AcceptedAssignmentsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="text-green-600 text-lg">✅</div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">Accepted Assignments</h3>
            <p className="text-sm text-gray-600">2 assignments in progress</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            2 Active
          </div>
          <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <div className="border-t border-gray-200 divide-y divide-gray-200">
          <div className="px-4 py-3 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">12 Prospect Leads</div>
                  <div className="text-xs text-gray-600">Follow-up Campaign • Lisa Chen • 8 processed</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  In Progress
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                  Continue
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-3 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">20 Cold Leads</div>
                  <div className="text-xs text-gray-600">Q4 Outreach • Sarah Manager • 20 completed</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                  Completed
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
