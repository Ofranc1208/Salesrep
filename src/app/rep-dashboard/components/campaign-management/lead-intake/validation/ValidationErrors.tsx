'use client';

import React from 'react';

interface ValidationErrorsProps {
  errors: string[];
}

export default function ValidationErrors({ errors }: ValidationErrorsProps) {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
      <h4 className="font-semibold text-red-900 mb-3">❌ Critical Errors</h4>
      <div className="space-y-2">
        {errors.map((error, index) => (
          <div key={index} className="text-sm text-red-700 bg-red-100 rounded px-3 py-2">
            {error}
          </div>
        ))}
      </div>
    </div>
  );
}
