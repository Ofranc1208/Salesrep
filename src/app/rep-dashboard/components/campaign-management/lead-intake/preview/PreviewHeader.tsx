'use client';

import React from 'react';

interface PreviewHeaderProps {
  validLeadCount: number;
  campaignId: string;
}

/**
 * PreviewHeader - Displays the summary header for intake preview
 * Focused responsibility: Show validation success summary
 */
export default function PreviewHeader({ validLeadCount, campaignId }: PreviewHeaderProps) {
  return (
    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
      <h3 className="font-semibold text-green-900 mb-2">✅ Ready for Campaign Import</h3>
      <p className="text-green-700">
        {validLeadCount} leads processed and validated for <strong>{campaignId}</strong>.
      </p>
    </div>
  );
}
