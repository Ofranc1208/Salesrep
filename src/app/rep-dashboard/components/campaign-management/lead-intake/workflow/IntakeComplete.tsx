'use client';

import React from 'react';

interface IntakeCompleteProps {
  leadCount: number;
  onProcessMore: () => void;
}

export default function IntakeComplete({ leadCount, onProcessMore }: IntakeCompleteProps) {
  return (
    <div className="text-center py-8">
      <div className="text-green-600 text-6xl mb-4">✅</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Lead Intake Complete
      </h3>
      <p className="text-gray-600">
        {leadCount} leads have been successfully processed and added to campaign.
      </p>
      <button
        onClick={onProcessMore}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Process More Leads
      </button>
    </div>
  );
}
