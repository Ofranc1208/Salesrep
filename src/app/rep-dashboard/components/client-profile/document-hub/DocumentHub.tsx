'use client';

import React, { useState } from 'react';
import { Lead } from '../../../types';
import LegalDocuments from './legal-documents/LegalDocuments';
import FinancialDocuments from './financial-documents/FinancialDocuments';
import IdentificationDocuments from './identification-documents/IdentificationDocuments';
import TransactionDocuments from './transaction-documents/TransactionDocuments';
import CommunicationDocuments from './communication-documents/CommunicationDocuments';
import DocumentSidebar from './shared/DocumentSidebar';
import DocumentHeader from './shared/DocumentHeader';
import UploadModal from './shared/UploadModal';

interface DocumentHubProps {
  selectedLead: Lead | null;
  onClose: () => void;
}

const DocumentHub: React.FC<DocumentHubProps> = ({ selectedLead, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('legal');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string>('');

  const handleUploadDocument = (docType: string) => {
    setSelectedDocType(docType);
    setShowUploadModal(true);
  };

  const handleFileUpload = () => {
    // Mock upload functionality
    alert(`Document upload initiated for: ${selectedDocType}\n\nIn a real application, this would handle file upload to the server.`);
    setShowUploadModal(false);
    setSelectedDocType('');
  };

  const renderDocumentCategory = () => {
    const commonProps = {
      searchTerm,
      onUploadDocument: handleUploadDocument
    };

    switch (activeCategory) {
      case 'legal':
        return <LegalDocuments {...commonProps} />;
      case 'financial':
        return <FinancialDocuments {...commonProps} />;
      case 'identification':
        return <IdentificationDocuments {...commonProps} />;
      case 'transaction':
        return <TransactionDocuments {...commonProps} />;
      case 'communication':
        return <CommunicationDocuments {...commonProps} />;
      default:
        return <LegalDocuments {...commonProps} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-5/6 flex flex-col">
        {/* Header */}
        <DocumentHeader 
          selectedLead={selectedLead}
          onClose={onClose}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <DocumentSidebar 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Search Bar */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Document Category Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              {renderDocumentCategory()}
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <UploadModal
            selectedDocType={selectedDocType}
            onUpload={handleFileUpload}
            onClose={() => {
              setShowUploadModal(false);
              setSelectedDocType('');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentHub;