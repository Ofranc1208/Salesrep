'use client';

// Campaign Tab Navigation - Extracted from CampaignManager.tsx
import React from 'react';

export type TabType = 'overview' | 'leads' | 'queue' | 'analytics';

interface CampaignNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function CampaignNavigation({ activeTab, onTabChange }: CampaignNavigationProps) {
  const tabs = [
    { id: 'overview' as const, label: '📋 Overview' },
    { id: 'leads' as const, label: '👥 Lead Lists' },
    { id: 'queue' as const, label: '📬 Lead Queue' },
    { id: 'analytics' as const, label: '📊 Analytics' }
  ];

  const getTabClasses = (tabId: TabType) => {
    const baseClasses = 'px-6 py-4 border-b-2 font-medium text-sm transition-colors';
    const activeClasses = 'border-blue-500 text-blue-600 bg-blue-50';
    const inactiveClasses = 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50';
    
    return `${baseClasses} ${activeTab === tabId ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={getTabClasses(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
