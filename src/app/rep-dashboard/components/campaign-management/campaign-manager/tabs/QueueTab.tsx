'use client';

import React, { useState } from 'react';

interface QueueTabProps {
  // Props will be added as needed
}

export default function QueueTab({}: QueueTabProps) {
  const [expandedSections, setExpandedSections] = useState({
    accepted: false,
    updates: false
  });

  const toggleSection = (section: 'accepted' | 'updates') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-4">
      {/* Quick Stats - Always Visible */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 text-center">
          <div className="text-xl font-bold text-yellow-600">3</div>
          <div className="text-xs text-yellow-700">Pending</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 text-center">
          <div className="text-xl font-bold text-blue-600">23</div>
          <div className="text-xs text-blue-700">Ready</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200 text-center">
          <div className="text-xl font-bold text-orange-600">12</div>
          <div className="text-xs text-orange-700">In Progress</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 border border-green-200 text-center">
          <div className="text-xl font-bold text-green-600">45</div>
          <div className="text-xs text-green-700">Completed</div>
        </div>
      </div>

      {/* Pending Lead Assignments - Always Expanded (Most Important) */}
      <div className="bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="px-4 py-3 border-b border-yellow-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-yellow-600 text-lg">⚠️</div>
              <div>
                <h3 className="font-semibold text-yellow-900">Pending Assignments</h3>
                <p className="text-sm text-yellow-700">3 assignments need response</p>
              </div>
            </div>
            <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              3 Pending
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-yellow-200">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">15 High-Priority Leads</div>
                  <div className="text-xs text-gray-600">Q1 Settlement • Sarah Manager • 2h ago</div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors">
                  Accept
                </button>
                <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-400 transition-colors">
                  Decline
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">8 Warm Leads</div>
                  <div className="text-xs text-gray-600">High-Value Prospects • Mike Davis • 4h ago</div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors">
                  Accept
                </button>
                <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-400 transition-colors">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accepted Assignments - Collapsible */}
      <div className="bg-white rounded-lg border border-gray-200">
        <button
          onClick={() => toggleSection('accepted')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="text-green-600 text-lg">✅</div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Accepted Assignments</h3>
              <p className="text-sm text-gray-600">2 assignments in progress</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              2 Active
            </div>
            <div className={`transform transition-transform ${expandedSections.accepted ? 'rotate-180' : ''}`}>
              ▼
            </div>
          </div>
        </button>
        
        {expandedSections.accepted && (
          <div className="border-t border-gray-200 divide-y divide-gray-200">
            <div className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">12 Prospect Leads</div>
                    <div className="text-xs text-gray-600">Follow-up Campaign • Lisa Chen • 8 processed</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    In Progress
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">20 Cold Leads</div>
                    <div className="text-xs text-gray-600">Q4 Outreach • Sarah Manager • 20 completed</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                    Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Manager Updates - Collapsible */}
      <div className="bg-gray-50 rounded-lg border border-gray-200">
        <button
          onClick={() => toggleSection('updates')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="text-blue-600 text-lg">💬</div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Manager Updates</h3>
              <p className="text-sm text-gray-600">Latest messages and notifications</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              2 New
            </div>
            <div className={`transform transition-transform ${expandedSections.updates ? 'rotate-180' : ''}`}>
              ▼
            </div>
          </div>
        </button>
        
        {expandedSections.updates && (
          <div className="border-t border-gray-200 p-4 space-y-2">
            <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
              <div className="flex items-start space-x-2">
                <div className="text-blue-600 text-sm">💬</div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">Sarah Manager</div>
                  <div className="text-xs text-gray-600">Priority update: Focus on Q1 campaign leads first</div>
                  <div className="text-xs text-gray-500">30 minutes ago</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
              <div className="flex items-start space-x-2">
                <div className="text-green-600 text-sm">✅</div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">System</div>
                  <div className="text-xs text-gray-600">You accepted 15 leads from Q1 Structured Settlement</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
