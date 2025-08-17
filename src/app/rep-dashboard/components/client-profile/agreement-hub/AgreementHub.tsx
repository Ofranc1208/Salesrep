'use client';

import React, { useState } from 'react';
import { Lead } from '../../../types';
import AgreementHeader from './shared/AgreementHeader';
import AgreementSidebar from './shared/AgreementSidebar';
import UnifiedApplicationForm from './unified-application/UnifiedApplicationForm';
import CalculatorsMain from './calculators/CalculatorsMain';
import DocumentSigningStatus from './document-status/DocumentSigningStatus';
import AgreementTemplates from './templates/AgreementTemplates';

interface AgreementHubProps {
  selectedLead: Lead | null;
  onClose: () => void;
}

const AgreementHub: React.FC<AgreementHubProps> = ({ selectedLead, onClose }) => {
  const [activeSection, setActiveSection] = useState('unified-application');
  const [formProgress, setFormProgress] = useState(0);

  const renderAgreementSection = () => {
    const commonProps = {
      selectedLead,
      onProgressUpdate: setFormProgress
    };

    switch (activeSection) {
      case 'unified-application':
        return <UnifiedApplicationForm {...commonProps} />;
      case 'calculators':
        return <CalculatorsMain selectedLead={selectedLead} />;
      case 'document-status':
        return <DocumentSigningStatus {...commonProps} />;
      case 'templates':
        return <AgreementTemplates {...commonProps} />;
      default:
        return <UnifiedApplicationForm {...commonProps} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-5/6 flex flex-col">
        {/* Header */}
        <AgreementHeader 
          selectedLead={selectedLead}
          onClose={onClose}
          formProgress={formProgress}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
            <AgreementSidebar 
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              formProgress={formProgress}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {renderAgreementSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementHub;
