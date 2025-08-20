'use client';

import React from 'react';

interface LeadMetricsGridProps {
  totalLeads: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export default function LeadMetricsGrid({ totalLeads, pending, inProgress, completed }: LeadMetricsGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2 mb-3">
      <div className="bg-white p-2 rounded-lg text-center border">
        <div className="text-xs text-gray-600 font-medium">Total</div>
        <div className="text-sm font-bold text-gray-900">{totalLeads}</div>
      </div>
      <div className="bg-white p-2 rounded-lg text-center border">
        <div className="text-xs text-gray-600 font-medium">Pending</div>
        <div className="text-sm font-bold text-orange-600">{pending}</div>
      </div>
      <div className="bg-white p-2 rounded-lg text-center border">
        <div className="text-xs text-gray-600 font-medium">Working</div>
        <div className="text-sm font-bold text-blue-600">{inProgress}</div>
      </div>
      <div className="bg-white p-2 rounded-lg text-center border">
        <div className="text-xs text-gray-600 font-medium">Done</div>
        <div className="text-sm font-bold text-green-600">{completed}</div>
      </div>
    </div>
  );
}
