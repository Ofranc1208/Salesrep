'use client';

import React from 'react';

interface LeadListHeaderProps {
  campaignName: string;
  processedCount: number;
  totalLeads: number;
}

export default function LeadListHeader({
  campaignName,
  processedCount,
  totalLeads
}: LeadListHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200 flex-shrink-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-gray-900">Lead List</h2>
          <p className="text-base text-gray-600 mt-2">Campaign: <span className="font-semibold text-blue-600">{campaignName}</span></p>
        </div>
        <div className="text-left sm:text-right flex-shrink-0">
          <div className="text-3xl font-bold text-blue-600">{processedCount}</div>
          <div className="text-base text-gray-600">of {totalLeads} processed</div>
        </div>
      </div>
      
      {/* Enhanced Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm"
          style={{ width: `${(processedCount / totalLeads) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
