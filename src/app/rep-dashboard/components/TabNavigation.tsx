'use client';

import React from 'react';
import { TabType } from '../types';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  selectedLeadName?: string;
  currentProgress?: number;
  totalLeads?: number;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function TabNavigation({
  activeTab,
  onTabChange,
  selectedLeadName,
  currentProgress,
  totalLeads,
  activeLeadList
}: TabNavigationProps) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'client-details', label: 'Client Details' },
    { id: 'lead-list', label: 'Lead List' }
  ];

  return (
    <div className="border-b border-gray-200 px-4 py-2 flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-900">Lead Management</h2>
          
          {/* Active Campaign Indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ring-2 ring-offset-2 ${
              activeLeadList === 'prospect' ? 'bg-blue-500 ring-blue-300' :
              activeLeadList === 'hot' ? 'bg-red-500 ring-red-300' :
              activeLeadList === 'warm' ? 'bg-orange-500 ring-orange-300' :
              'bg-green-500 ring-green-300'
            }`} />
            <span className={`text-sm font-medium ${
              activeLeadList === 'prospect' ? 'text-blue-700' :
              activeLeadList === 'hot' ? 'text-red-700' :
              activeLeadList === 'warm' ? 'text-orange-700' :
              'text-green-700'
            }`}>
              {activeLeadList === 'prospect' ? '📋 Prospect' :
               activeLeadList === 'hot' ? '🔥 Hot' :
               activeLeadList === 'warm' ? '🌡️ Warm' :
               '✅ Active'}
            </span>
          </div>
        </div>
        
        {selectedLeadName && currentProgress !== undefined && totalLeads !== undefined && (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">{selectedLeadName}</span> • {currentProgress}/{totalLeads}
          </p>
        )}
      </div>
      
      <nav className="-mb-px flex space-x-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as TabType)}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
