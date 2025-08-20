'use client';

import React from 'react';

interface LeadListDescriptionProps {
  description?: string;
}

export default function LeadListDescription({ description }: LeadListDescriptionProps) {
  if (!description) return null;

  return (
    <div className="mt-2 p-2 bg-white rounded border">
      <p className="text-xs text-gray-600 leading-relaxed">
        <span className="font-medium">About this list:</span> {description}
      </p>
    </div>
  );
}
