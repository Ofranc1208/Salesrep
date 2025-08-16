'use client';

import React from 'react';

interface TemplateHeaderProps {
  phoneNumber: string;
}

export default function TemplateHeader({ phoneNumber }: TemplateHeaderProps) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-gray-900">Message Templates</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            📧 Sending to: <strong>{phoneNumber}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
