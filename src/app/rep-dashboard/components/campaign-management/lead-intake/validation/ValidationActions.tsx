'use client';

import React from 'react';

interface ValidationActionsProps {
  isValid: boolean;
  onValidationComplete: () => void;
}

export default function ValidationActions({ isValid, onValidationComplete }: ValidationActionsProps) {
  return (
    <div className="flex justify-between">
      <button
        onClick={() => window.location.reload()}
        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Start Over
      </button>
      
      {isValid && (
        <button
          onClick={onValidationComplete}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue to Preview
        </button>
      )}
    </div>
  );
}
