'use client';

import React from 'react';

interface AgreementSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  formProgress: number;
}

const AgreementSidebar: React.FC<AgreementSidebarProps> = ({ 
  activeSection, 
  onSectionChange,
  formProgress 
}) => {
  const agreementSections = {
    'unified-application': {
      name: 'Unified Application',
      icon: '📋',
      description: 'Capital Now + Fasano Combined Form',
      status: formProgress > 0 ? (formProgress === 100 ? 'completed' : 'in-progress') : 'pending'
    },
    'calculators': {
      name: 'Calculators',
      icon: '🧮',
      description: 'Health & NPV Assessment Tools',
      status: 'available'
    },
    'document-status': {
      name: 'Document Status',
      icon: '📄',
      description: 'DocuSign & Signing Status',
      status: 'pending'
    },
    'templates': {
      name: 'Agreement Templates',
      icon: '📝',
      description: 'Form Templates & Versions',
      status: 'available'
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'available': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'available': return '📁';
      default: return '⏸️';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navigation */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Agreement Sections</h3>
        <div className="space-y-2">
          {Object.entries(agreementSections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => onSectionChange(key)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                activeSection === key 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-lg mt-0.5">{section.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{section.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{section.description}</div>
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-xs">{getStatusIcon(section.status)}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(section.status)}`}>
                      {section.status.charAt(0).toUpperCase() + section.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Application Overview */}
      <div className="px-4 pb-4 border-t border-gray-200 mt-auto">
        <div className="mt-4 space-y-3">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Application Overview</h4>
          
          {/* Form Types */}
          <div className="space-y-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm">🏢</span>
                <span className="text-sm font-medium text-blue-800">Capital Now</span>
              </div>
              <p className="text-xs text-blue-600">Initial application & intake</p>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm">🏥</span>
                <span className="text-sm font-medium text-orange-800">Fasano Funding</span>
              </div>
              <p className="text-xs text-orange-600">Life expectancy evaluation</p>
            </div>
          </div>

          {/* Integration Status */}
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-center">
              <div className="text-xs font-medium text-gray-700 mb-1">DocuSign Integration</div>
              <div className="flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementSidebar;
