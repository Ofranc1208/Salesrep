'use client';

import React from 'react';

interface UploadModalProps {
  selectedDocType: string;
  onUpload: () => void;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ 
  selectedDocType, 
  onUpload, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload {selectedDocType}</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-gray-600 mb-2">Drop files here or click to browse</p>
          <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
          <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
        </div>
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onUpload}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Upload Document
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
