'use client';

// EXTRACTED FROM: ../QueueTab.tsx lines 108-174
// Pending Assignments - Most important section, always expanded, shows assignments needing response

import React from 'react';
import { PendingAssignmentsProps } from './types';

export default function PendingAssignments({
  assignments,
  onAcceptAssignment,
  onDeclineAssignment
}: PendingAssignmentsProps) {
  
  // Helper function from original QueueTab.tsx lines 74-82
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    return `${diffInHours} hours ago`;
  };

  return (
    <div className="bg-yellow-50 rounded-lg border border-yellow-200">
      <div className="px-4 py-3 border-b border-yellow-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-yellow-600 text-lg">⚠️</div>
            <div>
              <h3 className="font-semibold text-yellow-900">Pending Assignments</h3>
              <p className="text-sm text-yellow-700">{assignments.length} assignments need response</p>
            </div>
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            {assignments.length} Pending
          </div>
        </div>
      </div>
      
      {assignments.length === 0 ? (
        <div className="px-4 py-6 text-center">
          <div className="text-yellow-600 text-2xl mb-2">✅</div>
          <p className="text-sm text-yellow-700">No pending assignments</p>
          <p className="text-xs text-yellow-600">You're all caught up!</p>
        </div>
      ) : (
        <div className="divide-y divide-yellow-200">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${
                    assignment.priority === 'high' ? 'bg-red-500' :
                    assignment.priority === 'medium' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {assignment.leadCount} {assignment.priority === 'high' ? 'High-Priority' : 
                       assignment.priority === 'medium' ? 'Medium-Priority' : 'Standard'} Leads
                    </div>
                    <div className="text-xs text-gray-600">
                      {assignment.campaignName} • Manager • {formatTimeAgo(assignment.assignedAt)}
                    </div>
                    {assignment.messageTemplate && (
                      <div className="text-xs text-blue-600">Template: {assignment.messageTemplate}</div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button 
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                    onClick={() => onAcceptAssignment(assignment.id)}
                  >
                    Accept
                  </button>
                  <button 
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-400 transition-colors"
                    onClick={() => onDeclineAssignment(assignment.id)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
