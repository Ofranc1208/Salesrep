'use client';

import React from 'react';
import { Lead, Message } from '../../../types';

interface MessageHistoryCardProps {
  selectedLead: Lead;
}

export default function MessageHistoryCard({ selectedLead }: MessageHistoryCardProps) {
  const messages = selectedLead.messageHistory || [];

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">💬</div>
        <p className="text-sm font-medium">No messages sent yet</p>
        <p className="text-xs text-gray-400">Message history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div key={message.id} className="border-l-4 border-pink-400 pl-3 py-2">
          {/* Message Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                message.type === 'initial' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
              }`}>
                {message.type === 'initial' ? 'Initial' : 'Follow-up'}
              </span>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                message.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {message.status === 'sent' ? 'Sent' : 'Pending'}
              </span>
            </div>
            <span className="text-xs text-gray-500">{message.sentDate}</span>
          </div>

          {/* Phone Number and Message */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500">To:</span>
              <span className="text-sm font-medium text-gray-900">{message.phoneNumber}</span>
            </div>
            <div className="bg-gray-50 rounded-md p-2">
              <p className="text-sm text-gray-800">{message.message.substring(0, 100)}...</p>
            </div>
          </div>

          {/* Client Response (if any) */}
          {message.response && (
            <div className="mt-2 bg-blue-50 rounded-md p-2 border-l-2 border-blue-400">
              <div className="text-xs font-medium text-blue-800 mb-1">Client Response:</div>
              <p className="text-sm text-blue-700">{message.response}</p>
            </div>
          )}
        </div>
      ))}
      
      {messages.length > 3 && (
        <div className="pt-3 border-t border-gray-200 text-center">
          <button className="text-xs text-pink-600 hover:text-pink-800 font-medium">
            View All {messages.length} Messages
          </button>
        </div>
      )}
    </div>
  );
}
