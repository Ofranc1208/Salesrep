'use client';

import React from 'react';

interface ValidationTriggerProps {
  leadCount: number;
  onValidationComplete: () => void;
}

export default function ValidationTrigger({ leadCount, onValidationComplete }: ValidationTriggerProps) {
  return (
    <div className="text-center py-8">
      <button
        onClick={onValidationComplete}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Validate Data
      </button>
      <p className="text-sm text-gray-600 mt-2">
        Click to validate {leadCount} processed leads
      </p>
    </div>
  );
}
