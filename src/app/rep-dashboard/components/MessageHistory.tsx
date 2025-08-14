'use client';

import React from 'react';
import { Lead, Message } from '../types';

interface MessageHistoryProps {
  selectedLead: Lead;
}

export default function MessageHistory({ selectedLead }: MessageHistoryProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900 mb-3">Message History</h3>
      
      {selectedLead.messageHistory.length > 0 ? (
        <div className="space-y-4">
          {selectedLead.messageHistory.map((message) => (
            <div key={message.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    message.type === 'initial' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {message.type === 'initial' ? 'Initial' : 'Follow-up'}
                  </span>
                  <span className="text-sm text-gray-600">to {message.phoneNumber}</span>
                </div>
                <span className="text-sm text-gray-500">{message.sentDate}</span>
              </div>
              <div className="text-sm text-gray-800 mb-3">
                {message.message}
              </div>
              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  message.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {message.status === 'sent' ? 'Sent' : 'Pending'}
                </span>
                {message.response && (
                  <span className="text-sm text-gray-600">
                    Response: {message.response}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📱</div>
          <p>No messages sent yet</p>
          <p className="text-sm">Select a phone number and send your first message</p>
        </div>
      )}
    </div>
  );
}
