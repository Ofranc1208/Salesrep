'use client';

import React, { useState } from 'react';
import { Lead } from '../../../types';
import DealHeader from './shared/DealHeader';
import DealSidebar from './shared/DealSidebar';
import ActiveDeals from './active-deals/ActiveDeals';
import DealHistory from './deal-history/DealHistory';
import DealAnalytics from './deal-analytics/DealAnalytics';
import DealTemplates from './deal-templates/DealTemplates';
import DealDocuments from './deal-documents/DealDocuments';

interface DealManagementHubProps {
  selectedLead: Lead | null;
  onClose: () => void;
}

const DealManagementHub: React.FC<DealManagementHubProps> = ({ selectedLead, onClose }) => {
  const [activeSection, setActiveSection] = useState('active-deals');
  const [searchTerm, setSearchTerm] = useState('');

  const renderDealSection = () => {
    const commonProps = {
      selectedLead,
      searchTerm
    };

    switch (activeSection) {
      case 'active-deals':
        return <ActiveDeals {...commonProps} />;
      case 'deal-history':
        return <DealHistory {...commonProps} />;
      case 'deal-analytics':
        return <DealAnalytics {...commonProps} />;
      case 'deal-templates':
        return <DealTemplates {...commonProps} />;
      case 'deal-documents':
        return <DealDocuments {...commonProps} />;
      default:
        return <ActiveDeals {...commonProps} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-5/6 flex flex-col">
        {/* Header */}
        <DealHeader 
          selectedLead={selectedLead}
          onClose={onClose}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar with Deal Summary */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
            {/* Navigation Sidebar */}
            <DealSidebar 
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
            
            {/* Deal Summary Cards */}
            <div className="p-4 space-y-3 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Deal Overview</h3>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">📋</span>
                  <div>
                    <h4 className="font-medium text-orange-800 text-sm">Life Contingent</h4>
                    <p className="text-xs text-orange-600">Requires medical review</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🎯</span>
                  <div>
                    <h4 className="font-medium text-blue-800 text-sm">K-Pack Process</h4>
                    <p className="text-xs text-blue-600">Target: 2024-01-10</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">📊</span>
                  <div>
                    <h4 className="font-medium text-purple-800 text-sm">65%</h4>
                    <p className="text-xs text-purple-600">3 of 5 stages completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search deals, contracts, offers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Deal Section Content */}
            <div className="flex-1 bg-white p-6">
              {renderDealSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealManagementHub;
