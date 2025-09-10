'use client';

// EXTRACTED FROM: ../OverviewTab.tsx lines 133-322
// Manager Communication - Expandable section with chat/email/call interfaces

import React from 'react';
import { ManagerCommunicationProps } from './types';

export default function ManagerCommunication({
  selectedCampaign,
  activeCommMode,
  onCommModeChange
}: ManagerCommunicationProps) {
  if (!selectedCampaign) return null;

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-lg">
            {selectedCampaign.managerName.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{selectedCampaign.managerName}</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>sarah.manager@company.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 font-medium">Online • Sales Manager</span>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button 
          onClick={() => onCommModeChange(activeCommMode === 'chat' ? null : 'chat')}
          className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-colors ${
            activeCommMode === 'chat' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm">Chat</span>
        </button>
        
        <button 
          onClick={() => onCommModeChange(activeCommMode === 'email' ? null : 'email')}
          className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-colors ${
            activeCommMode === 'email' 
              ? 'bg-gray-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">Email</span>
        </button>

        <button 
          onClick={() => onCommModeChange(activeCommMode === 'call' ? null : 'call')}
          className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-colors ${
            activeCommMode === 'call' 
              ? 'bg-green-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-sm">Call</span>
        </button>
      </div>

      {/* Interactive Communication Interfaces */}
      {activeCommMode === 'chat' && (
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-medium text-gray-900">Chat with {selectedCampaign.managerName}</h5>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
          
          {/* Mock Chat Messages */}
          <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white text-sm rounded-lg px-3 py-2 max-w-xs">
                Hi Sarah, I have some questions about the new leads
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 text-sm rounded-lg px-3 py-2 max-w-xs">
                Hi! I'm here to help. What do you need to know?
              </div>
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {activeCommMode === 'email' && (
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <h5 className="font-medium text-gray-900 mb-3">Send Email to {selectedCampaign.managerName}</h5>
          
          {/* Email Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">To:</label>
              <input 
                type="email" 
                value="sarah.manager@company.com"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Subject:</label>
              <input 
                type="text" 
                placeholder="Enter subject..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Message:</label>
              <textarea 
                rows={3}
                placeholder="Type your message..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {activeCommMode === 'call' && (
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <h5 className="font-medium text-gray-900 mb-3">Call {selectedCampaign.managerName}</h5>
          
          {/* Call Interface */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-1">(555) 123-4567</p>
            <p className="text-xs text-gray-500 mb-4">Ready to call</p>
            
            <div className="flex justify-center space-x-3">
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Now</span>
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
