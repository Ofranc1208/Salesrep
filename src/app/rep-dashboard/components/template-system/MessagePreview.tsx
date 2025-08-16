'use client';

import React from 'react';
import { MessageTemplate } from '../../../shared/TemplateService';

interface MessagePreviewProps {
  selectedTemplate: MessageTemplate;
  copiedMessage: string;
  onCopyMessage: () => void;
}

export default function MessagePreview({
  selectedTemplate,
  copiedMessage,
  onCopyMessage
}: MessagePreviewProps) {
  return (
    <div className="border-t pt-2">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-900">Message (T{selectedTemplate.sequence}):</h4>
        <button
          onClick={onCopyMessage}
          className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors font-medium"
          id="copyButton"
        >
          📋 Copy
        </button>
      </div>
      
      <div className="bg-gray-50 border rounded p-2 mb-2">
        <p className="text-xs text-gray-800 whitespace-pre-wrap line-clamp-3">
          {copiedMessage}
        </p>
      </div>

      <div className="text-center">
        <span className="text-xs text-gray-500">
          Ready for 8x8
        </span>
      </div>
    </div>
  );
}
