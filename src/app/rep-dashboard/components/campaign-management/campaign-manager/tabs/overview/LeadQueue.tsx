'use client';

// EXTRACTED FROM: ../OverviewTab.tsx lines 324-340
// Lead Queue - Compact display of pending assignments with link to full queue

import React from 'react';
import { LeadQueueProps } from './types';

export default function LeadQueue({ queueStats }: LeadQueueProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">📥 Lead Queue:</span>
          <span className="text-sm text-gray-600">
            {queueStats.pending} pending assignments
          </span>
        </div>
        <button className="text-xs text-blue-600 hover:text-blue-800">
          Go to Lead Queue →
        </button>
      </div>
    </div>
  );
}
