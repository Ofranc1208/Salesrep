'use client';

import React from 'react';

interface PreviewActionsProps {
  validLeadCount: number;
  campaignId: string;
  onBack: () => void;
  onConfirm: () => void;
}

/**
 * PreviewActions - Displays action buttons for intake preview
 * Focused responsibility: Handle back and confirm actions
 */
export default function PreviewActions({ 
  validLeadCount, 
  campaignId, 
  onBack, 
  onConfirm 
}: PreviewActionsProps) {
  return (
    <div className="flex justify-between">
      <button
        onClick={onBack}
        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Back to Validation
      </button>
      
      <button
        onClick={onConfirm}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Add {validLeadCount} Leads to {campaignId}
      </button>
    </div>
  );
}
