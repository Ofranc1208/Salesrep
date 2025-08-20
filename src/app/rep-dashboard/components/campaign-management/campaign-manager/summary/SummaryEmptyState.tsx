'use client';

import React from 'react';

export default function SummaryEmptyState() {
  return (
    <div className="border-t border-gray-200 pt-2 mt-2">
      <div className="bg-gray-50 p-3 rounded-lg text-center">
        <p className="text-sm text-gray-600">Select a campaign to view summary</p>
      </div>
    </div>
  );
}
