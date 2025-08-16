'use client';

import React from 'react';

interface DealSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DealSidebar: React.FC<DealSidebarProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const dealSections = {
    'active-deals': {
      name: 'Active Deals',
      icon: '🔄',
      color: 'blue',
      description: 'Current deal progress & stages'
    },
    'deal-history': {
      name: 'Deal History',
      icon: '📋',
      color: 'green',
      description: 'Completed deals & timeline'
    },
    'deal-analytics': {
      name: 'Deal Analytics',
      icon: '📊',
      color: 'purple',
      description: 'Performance metrics & insights'
    },
    'deal-templates': {
      name: 'Deal Templates',
      icon: '📄',
      color: 'orange',
      description: 'Contract templates & forms'
    },
    'deal-documents': {
      name: 'Deal Documents',
      icon: '📁',
      color: 'indigo',
      description: 'Document integration status'
    }
  };

  const getSectionColor = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-200 bg-blue-50 hover:bg-blue-100';
      case 'green': return 'border-green-200 bg-green-50 hover:bg-green-100';
      case 'purple': return 'border-purple-200 bg-purple-50 hover:bg-purple-100';
      case 'orange': return 'border-orange-200 bg-orange-50 hover:bg-orange-100';
      case 'indigo': return 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100';
      default: return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
    }
  };

  return (
    <div className="w-72 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
        <span>💼</span>
        <span>Deal Management</span>
      </h3>
      <div className="space-y-2">
        {Object.entries(dealSections).map(([key, section]) => (
          <button
            key={key}
            onClick={() => onSectionChange(key)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              activeSection === key 
                ? `${getSectionColor(section.color)} border-${section.color}-300 shadow-sm` 
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{section.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900">{section.name}</div>
                <div className="text-xs text-gray-500 leading-tight">
                  {section.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Active Deals:</span>
            <span className="font-medium text-blue-600">3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pending Docs:</span>
            <span className="font-medium text-orange-600">7</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">This Month:</span>
            <span className="font-medium text-green-600">$45K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg. Close Time:</span>
            <span className="font-medium text-purple-600">21 days</span>
          </div>
        </div>
      </div>

      {/* Mobile App Integration Note */}
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm">📱</span>
          <span className="text-xs font-medium text-blue-700">Mobile Ready</span>
        </div>
        <p className="text-xs text-blue-600">
          All endpoints ready for React Native integration
        </p>
      </div>
    </div>
  );
};

export default DealSidebar;
