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
      color: 'blue'
    },
    'deal-history': {
      name: 'Deal History',
      icon: '📋',
      color: 'green'
    },
    'deal-analytics': {
      name: 'Deal Analytics',
      icon: '📊',
      color: 'purple'
    },
    'deal-templates': {
      name: 'Deal Templates',
      icon: '📄',
      color: 'orange'
    },
    'deal-documents': {
      name: 'Deal Documents',
      icon: '📁',
      color: 'indigo'
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navigation */}
      <div className="p-4">
        <div className="space-y-1">
          {Object.entries(dealSections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => onSectionChange(key)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                activeSection === key 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-base">{section.icon}</span>
              <span className="font-medium text-sm">{section.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Deal Overview - Moved Higher */}
      <div className="px-4 pb-4 border-t border-gray-200">
        <div className="mt-4 space-y-3">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Deal Overview</h4>
          
          {/* Deal Commission */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm">💰</span>
              <span className="text-sm font-medium text-green-800">Commission</span>
            </div>
            <div className="text-center mb-2">
              <span className="text-lg font-bold text-green-700">$175,623.21</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-green-600">Earned: <span className="font-semibold">$15,000</span></span>
              <span className="text-orange-600">Pending: <span className="font-semibold">$35,000</span></span>
            </div>
          </div>
          
          {/* Life Contingent Status */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm">📋</span>
                <span className="text-sm font-medium text-orange-800">Life Contingent</span>
              </div>
            </div>
            <p className="text-xs text-orange-600 mt-1">Requires medical review</p>
          </div>

          {/* Quick Stats - Compact */}
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center">
                <div className="font-semibold text-blue-600">3</div>
                <div className="text-gray-500">Active</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-orange-600">7</div>
                <div className="text-gray-500">Pending</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">$45K</div>
                <div className="text-gray-500">This Month</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-purple-600">21d</div>
                <div className="text-gray-500">Avg Close</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealSidebar;
