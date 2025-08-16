'use client';

import React from 'react';

interface Document {
  id: string;
  name: string;
  category: string;
  type: string;
  status: 'uploaded' | 'pending' | 'approved' | 'rejected';
  uploadDate: string;
  size: string;
  uploadedBy: string;
  required: boolean;
  description?: string;
  fileUrl?: string;
}

interface DocumentType {
  name: string;
  required: boolean;
  description: string;
}

interface DocumentCardProps {
  docType: DocumentType;
  uploadedDoc?: Document;
  onUploadDocument: (docType: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ 
  docType, 
  uploadedDoc, 
  onUploadDocument 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded': return '📤';
      case 'approved': return '✅';
      case 'pending': return '⏳';
      case 'rejected': return '❌';
      default: return '📄';
    }
  };

  const handleViewDocument = (doc: Document) => {
    console.log('Opening document:', doc.name);
    alert(`Opening document: ${doc.name}\n\nIn a real application, this would open a PDF viewer or download the document.`);
  };

  return (
    <div
      className={`border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200 ${
        uploadedDoc 
          ? uploadedDoc.status === 'approved'
            ? 'border-green-200 bg-green-50' 
            : uploadedDoc.status === 'rejected'
              ? 'border-red-200 bg-red-50'
              : 'border-blue-200 bg-blue-50'
          : docType.required 
            ? 'border-orange-200 bg-orange-50' 
            : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-gray-900">{docType.name}</h4>
            {docType.required && (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                Required
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mb-2 leading-relaxed">{docType.description}</p>
        </div>
        
        <div className="ml-2">
          {uploadedDoc ? (
            <div className="flex items-center space-x-1">
              <span className="text-lg">{getStatusIcon(uploadedDoc.status)}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {uploadedDoc && (
        <div className="border-t pt-3 mt-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 font-medium truncate flex-1 mr-2">{uploadedDoc.name}</span>
            <span className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(uploadedDoc.status)}`}>
              {uploadedDoc.status}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{uploadedDoc.size}</span>
            <span>{uploadedDoc.uploadDate}</span>
          </div>
          <div className="text-xs text-gray-500">
            Uploaded by: <span className="font-medium">{uploadedDoc.uploadedBy}</span>
          </div>
          <div className="flex space-x-2 mt-3">
            <button 
              onClick={() => handleViewDocument(uploadedDoc)}
              className="flex-1 text-xs bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View</span>
            </button>
            <button 
              onClick={() => onUploadDocument(docType.name)}
              className="flex-1 text-xs bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors flex items-center justify-center space-x-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Replace</span>
            </button>
          </div>
        </div>
      )}

      {!uploadedDoc && (
        <button 
          onClick={() => onUploadDocument(docType.name)}
          className="w-full mt-2 text-xs bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Upload {docType.name}</span>
        </button>
      )}
    </div>
  );
};

export default DocumentCard;
