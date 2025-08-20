'use client';

import React from 'react';

interface ValidationWarningsProps {
  warnings: string[];
}

export default function ValidationWarnings({ warnings }: ValidationWarningsProps) {
  if (warnings.length === 0) return null;

  return (
    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
      <h4 className="font-semibold text-yellow-900 mb-3">⚠️ Warnings</h4>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {warnings.slice(0, 10).map((warning, index) => (
          <div key={index} className="text-sm text-yellow-700 bg-yellow-100 rounded px-3 py-2">
            {warning}
          </div>
        ))}
        {warnings.length > 10 && (
          <div className="text-sm text-yellow-600 italic">
            ... and {warnings.length - 10} more warnings
          </div>
        )}
      </div>
    </div>
  );
}
