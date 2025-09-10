'use client';

// EXTRACTED FROM: ../QueueTab.tsx lines 241-288
// Manager Updates - Collapsible section showing latest messages and notifications

import React from 'react';
import { ManagerUpdatesProps } from './types';

export default function ManagerUpdates({
  isExpanded,
  onToggle
}: ManagerUpdatesProps) {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="text-blue-600 text-lg">💬</div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">Manager Updates</h3>
            <p className="text-sm text-gray-600">Latest messages and notifications</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            2 New
          </div>
          <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-2">
          <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
            <div className="flex items-start space-x-2">
              <div className="text-blue-600 text-sm">💬</div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Sarah Manager</div>
                <div className="text-xs text-gray-600">Priority update: Focus on Q1 campaign leads first</div>
                <div className="text-xs text-gray-500">30 minutes ago</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
            <div className="flex items-start space-x-2">
              <div className="text-green-600 text-sm">✅</div>
              <div>
                <div className="font-medium text-gray-900 text-sm">System</div>
                <div className="text-xs text-gray-600">You accepted 15 leads from Q1 Structured Settlement</div>
                <div className="text-xs text-gray-500">2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
