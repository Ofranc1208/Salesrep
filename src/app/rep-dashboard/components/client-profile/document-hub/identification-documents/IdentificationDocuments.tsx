'use client';

import React from 'react';
import DocumentCard from '../shared/DocumentCard';
import { documentCategories, mockDocuments } from '../utils/documentData';

interface IdentificationDocumentsProps {
  searchTerm: string;
  onUploadDocument: (docType: string) => void;
}

const IdentificationDocuments: React.FC<IdentificationDocumentsProps> = ({ 
  searchTerm, 
  onUploadDocument 
}) => {
  const category = documentCategories.identification;
  const categoryDocuments = mockDocuments.filter(doc => doc.category === 'identification');
  
  const filteredDocuments = categoryDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCompletionStats = () => {
    const totalRequired = category.types.filter(type => type.required).length;
    const uploadedRequired = category.types.filter(type => 
      type.required && categoryDocuments.some(doc => doc.type === type.name)
    ).length;
    
    return { uploaded: uploadedRequired, total: totalRequired };
  };

  const completionStats = getCompletionStats();

  return (
    <div className="p-6">
      {/* Category Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{category.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-600">
                {completionStats.uploaded} of {completionStats.total} required documents uploaded • 
                {filteredDocuments.length} total documents
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              Completion: {completionStats.total > 0 ? Math.round((completionStats.uploaded / completionStats.total) * 100) : 0}%
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  completionStats.uploaded === completionStats.total ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${completionStats.total > 0 ? (completionStats.uploaded / completionStats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.types.map((docType) => {
          const uploadedDoc = categoryDocuments.find(doc => doc.type === docType.name);
          
          return (
            <DocumentCard
              key={docType.name}
              docType={docType}
              uploadedDoc={uploadedDoc}
              onUploadDocument={onUploadDocument}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IdentificationDocuments;
