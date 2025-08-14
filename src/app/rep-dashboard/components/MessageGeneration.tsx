'use client';

import React from 'react';

interface MessageGenerationProps {
  selectedPhoneNumber: string;
  copiedMessage: string;
  onCopyMessage: () => void;
  onGenerateFollowUp: () => void;
  onMarkComplete: () => void;
  onNextPhoneNumber: () => void;
  onPreviousPhoneNumber: () => void;
  hasMultipleNumbers: boolean;
  currentNumberIndex: number;
  totalNumbers: number;
  currentLeadProgress?: number;
  totalLeads?: number;
}

export default function MessageGeneration({
  selectedPhoneNumber,
  copiedMessage,
  onCopyMessage,
  onGenerateFollowUp,
  onMarkComplete,
  onNextPhoneNumber,
  onPreviousPhoneNumber,
  hasMultipleNumbers,
  currentNumberIndex,
  totalNumbers,
  currentLeadProgress,
  totalLeads
}: MessageGenerationProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <h3 className="font-medium text-blue-900">Message for {selectedPhoneNumber}</h3>
          {hasMultipleNumbers && (
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
              {currentNumberIndex + 1} of {totalNumbers}
            </span>
          )}
        </div>
        
        {hasMultipleNumbers && (
          <div className="flex items-center space-x-2">
            <button
              onClick={onPreviousPhoneNumber}
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
              title="Previous phone number"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={onNextPhoneNumber}
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
              title="Next phone number"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="whitespace-pre-wrap text-sm text-blue-800 mb-4">
        {copiedMessage}
      </div>

      <div className="flex space-x-3">
        <button
          id="copyButton"
          onClick={onCopyMessage}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Copy Message
        </button>
        <button
          onClick={onGenerateFollowUp}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Generate Follow-up
        </button>
        <button
          onClick={onMarkComplete}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Mark Complete
        </button>
      </div>

      {/* Auto-advance Info */}
      {hasMultipleNumbers && currentNumberIndex === totalNumbers - 1 && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Last phone number for this lead. Click "Mark Complete" to auto-advance to next lead.</span>
          </div>
        </div>
      )}
    </div>
  );
}
