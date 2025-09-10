'use client';

// EXTRACTED FROM: ../QueueTab.tsx lines 88-106
// Queue Statistics - 4 stat cards showing pending, accepted, total leads, declined

import React from 'react';
import { QueueStatsProps } from './types';

export default function QueueStats({ stats }: QueueStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 text-center">
        <div className="text-xl font-bold text-yellow-600">{stats.pending}</div>
        <div className="text-xs text-yellow-700">Pending</div>
      </div>
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 text-center">
        <div className="text-xl font-bold text-blue-600">{stats.accepted}</div>
        <div className="text-xs text-blue-700">Accepted</div>
      </div>
      <div className="bg-orange-50 rounded-lg p-3 border border-orange-200 text-center">
        <div className="text-xl font-bold text-orange-600">{stats.totalLeads}</div>
        <div className="text-xs text-orange-700">Total Leads</div>
      </div>
      <div className="bg-green-50 rounded-lg p-3 border border-green-200 text-center">
        <div className="text-xl font-bold text-green-600">{stats.declined}</div>
        <div className="text-xs text-green-700">Declined</div>
      </div>
    </div>
  );
}
