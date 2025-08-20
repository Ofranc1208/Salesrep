'use client';

import React from 'react';

interface CampaignActionsProps {
  // Props can be extended for action handlers
}

export default function CampaignActions({}: CampaignActionsProps) {
  return (
    <div className="mt-3 pt-2 border-t border-gray-200">
      <div className="flex space-x-2">
        <button className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors">
          View Full Report
        </button>
        <button className="px-2 py-1 bg-gray-600 text-white rounded text-xs font-medium hover:bg-gray-700 transition-colors">
          Export Data
        </button>
      </div>
    </div>
  );
}
