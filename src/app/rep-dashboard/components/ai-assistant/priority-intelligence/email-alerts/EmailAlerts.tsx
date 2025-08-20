'use client';

import React, { useState } from 'react';
import { EmailAlert, EmailAlertsProps } from './types';

const EmailAlerts: React.FC<EmailAlertsProps> = ({ selectedPriority }) => {
  const [emails] = useState<EmailAlert[]>([
    {
      id: '1',
      from: 'Sarah Williams',
      subject: 'Re: Settlement Payment Question',
      preview: 'Hi, I still haven\'t heard back about my payment timeline...',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'hot',
      type: 'client',
      read: false,
      urgent: true
    },
    {
      id: '2',
      from: 'DocuSign',
      subject: 'Document Completed - Jennifer Davis',
      preview: 'Jennifer Davis has completed signing the structured settlement agreement...',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      priority: 'warm',
      type: 'document',
      read: false,
      urgent: false
    },
    {
      id: '3',
      from: 'Court Clerk',
      subject: 'Hearing Confirmation - Michael Johnson',
      preview: 'This confirms the court hearing scheduled for March 15th at 10:30 AM...',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priority: 'active',
      type: 'system',
      read: true,
      urgent: false
    },
    {
      id: '4',
      from: 'Manager Dashboard',
      subject: 'New Leads Assignment',
      preview: '3 new prospects have been assigned to your pipeline...',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      priority: 'prospect',
      type: 'internal',
      read: false,
      urgent: false
    },
    {
      id: '5',
      from: 'System Alert',
      subject: 'Payment Processing Update',
      preview: 'Payment for case #P001 has been processed successfully...',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      priority: 'system',
      type: 'system',
      read: true,
      urgent: false
    }
  ]);

  // Filter emails based on selected priority
  const filteredEmails = selectedPriority 
    ? emails.filter(e => e.priority === selectedPriority)
    : emails;

  const getEmailIcon = (type: string) => {
    switch (type) {
      case 'client': return '👤';
      case 'internal': return '🏢';
      case 'system': return '⚙️';
      case 'document': return '📄';
      default: return '📧';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'hot': return 'border-l-red-500 bg-red-50';
      case 'active': return 'border-l-green-500 bg-green-50';
      case 'warm': return 'border-l-orange-500 bg-orange-50';
      case 'prospect': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const unreadCount = filteredEmails.filter(e => !e.read).length;
  const urgentCount = filteredEmails.filter(e => e.urgent).length;

  return (
    <div className="space-y-2">
      {/* Email Summary */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-blue-50 p-2 rounded-md">
          <div className="text-lg font-bold text-blue-600">{unreadCount}</div>
          <div className="text-xs text-blue-700">Unread</div>
        </div>
        <div className="bg-red-50 p-2 rounded-md">
          <div className="text-lg font-bold text-red-600">{urgentCount}</div>
          <div className="text-xs text-red-700">Urgent</div>
        </div>
      </div>

      {/* Emails List */}
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {filteredEmails.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-xs">
            {selectedPriority ? `No emails for ${selectedPriority} list` : 'No emails'}
          </div>
        ) : (
          filteredEmails.map((email) => (
            <div
              key={email.id}
              className={`p-2 border-l-4 rounded-r-md cursor-pointer transition-all hover:shadow-sm ${
                getPriorityColor(email.priority)
              } ${!email.read ? 'opacity-100' : 'opacity-70'}`}
            >
              <div className="flex items-start space-x-2">
                <span className="text-sm">{getEmailIcon(email.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h5 className={`text-xs font-medium truncate ${
                        !email.read ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {email.from}
                      </h5>
                      {email.urgent && (
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                          !
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(email.timestamp)}
                    </span>
                  </div>
                  <p className={`text-xs truncate mt-1 ${
                    !email.read ? 'font-medium text-gray-800' : 'text-gray-600'
                  }`}>
                    {email.subject}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {email.preview}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      email.type === 'client' ? 'bg-blue-100 text-blue-600' :
                      email.type === 'internal' ? 'bg-green-100 text-green-600' :
                      email.type === 'document' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {email.type}
                    </span>
                    {!email.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2 pt-2 border-t border-gray-100">
        <button className="flex-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium">
          Compose
        </button>
        <button className="flex-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium">
          View Inbox
        </button>
      </div>
    </div>
  );
};

export default EmailAlerts;
