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
          {/* Left Sidebar - Cleaner Layout */}
          <div className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col">
            {/* Navigation Sidebar */}
            <DealSidebar 
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
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
