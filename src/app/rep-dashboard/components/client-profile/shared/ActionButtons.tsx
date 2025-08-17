'use client';

import React from 'react';

interface ActionButtonsProps {
  onDocumentsClick?: () => void;
  onAgreementHubClick?: () => void;
  onClientManagementClick?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDocumentsClick,
  onAgreementHubClick,
  onClientManagementClick
}) => {
  return (
    <div className="flex justify-center space-x-8 mb-8">
      <button 
        onClick={onDocumentsClick}
        className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105"
      >
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700">Documents</span>
      </button>
      
      <button 
        onClick={onAgreementHubClick}
        className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105"
      >
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700">Agreement Hub</span>
      </button>
      
      <button 
        onClick={onClientManagementClick}
        className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105"
      >
        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700">Deal Management</span>
      </button>
    </div>
  );
};

export default ActionButtons;
