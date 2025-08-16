'use client';

import React from 'react';

interface AISuggestionProps {
  suggestedNext: number;
  lastTemplateSent?: number;
}

export default function AISuggestion({ suggestedNext, lastTemplateSent }: AISuggestionProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1 mb-3">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mr-2">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
        <span className="text-blue-800 text-xs font-medium">
          Suggested: Template {suggestedNext}
          {lastTemplateSent && <span className="ml-2 text-blue-600">(Last: T{lastTemplateSent})</span>}
        </span>
      </div>
    </div>
  );
}
