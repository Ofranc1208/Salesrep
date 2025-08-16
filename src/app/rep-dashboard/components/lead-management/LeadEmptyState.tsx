'use client';

import React from 'react';

export default function LeadEmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center py-16">
        <div className="text-gray-400 text-8xl mb-6">📋</div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Leads Available</h3>
        <p className="text-lg text-gray-600">Leads will appear here once assigned to the campaign</p>
      </div>
    </div>
  );
}
