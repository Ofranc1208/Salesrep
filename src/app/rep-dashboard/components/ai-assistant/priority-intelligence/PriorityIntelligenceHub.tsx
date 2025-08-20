'use client';

import React, { useState, useEffect } from 'react';
import { NotificationCenter } from './notification-center';
import { LeadTracker } from './lead-tracker';
import { CalendarUpdates } from './calendar-updates';
import { EmailAlerts } from './email-alerts';
import { PerformanceMetrics } from './performance-metrics';

interface PriorityIntelligenceHubProps {
  selectedPriority: 'hot' | 'active' | 'warm' | 'prospect' | null;
  onPrioritySelect: (priority: 'hot' | 'active' | 'warm' | 'prospect' | null) => void;
}

const PriorityIntelligenceHub: React.FC<PriorityIntelligenceHubProps> = ({ 
  selectedPriority, 
  onPrioritySelect 
}) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'leads' | 'calendar' | 'email' | 'metrics'>('notifications');
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new notifications
      setUnreadCount(prev => prev + Math.floor(Math.random() * 2));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const priorityItems = [
    { 
      type: 'hot', 
      label: 'Hot List: 2 leads need immediate attention', 
      color: 'red',
      urgency: 'high',
      count: 2
    },
    { 
      type: 'active', 
      label: 'Active List: 2 deals progressing well', 
      color: 'green',
      urgency: 'medium',
      count: 2
    },
    { 
      type: 'warm', 
      label: 'Warm List: 1 lead ready for nurturing', 
      color: 'orange',
      urgency: 'low',
      count: 1
    },
    { 
      type: 'prospect', 
      label: 'Prospect List: 3 leads for initial contact', 
      color: 'blue',
      urgency: 'medium',
      count: 3
    }
  ] as const;

  const handlePriorityClick = (priorityType: 'hot' | 'active' | 'warm' | 'prospect') => {
    if (selectedPriority === priorityType) {
      onPrioritySelect(null);
    } else {
      onPrioritySelect(priorityType);
    }
  };

  const tabs = [
    { 
      id: 'notifications', 
      label: 'Alerts', 
      icon: '🔔', 
      count: unreadCount,
      tooltip: 'Alerts'
    },
    { 
      id: 'leads', 
      label: 'Leads', 
      icon: '👥', 
      count: 8,
      tooltip: 'Leads'
    },
    { 
      id: 'calendar', 
      label: 'Calendar', 
      icon: '📅', 
      count: 3,
      tooltip: 'Calendar'
    },
    { 
      id: 'email', 
      label: 'Email', 
      icon: '📧', 
      count: 5,
      tooltip: 'Email'
    },
    { 
      id: 'metrics', 
      label: 'Metrics', 
      icon: '📊', 
      count: 0,
      tooltip: 'Metrics'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 relative overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-gray-700">Priority Intelligence</h4>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600 font-medium">Live</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-3 bg-gray-50 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            title={tab.tooltip}
            className={`group relative flex-1 flex items-center justify-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.count > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            )}
            
            {/* Compact Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md">
              {tab.tooltip}
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[120px]">
        {activeTab === 'notifications' && <NotificationCenter selectedPriority={selectedPriority} />}
        {activeTab === 'leads' && (
          <LeadTracker 
            priorityItems={priorityItems}
            selectedPriority={selectedPriority}
            onPriorityClick={handlePriorityClick}
          />
        )}
        {activeTab === 'calendar' && <CalendarUpdates selectedPriority={selectedPriority} />}
        {activeTab === 'email' && <EmailAlerts selectedPriority={selectedPriority} />}
        {activeTab === 'metrics' && <PerformanceMetrics selectedPriority={selectedPriority} />}
      </div>
    </div>
  );
};

export default PriorityIntelligenceHub;
