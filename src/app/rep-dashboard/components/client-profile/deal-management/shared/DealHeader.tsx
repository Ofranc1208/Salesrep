'use client';

import React from 'react';
import { Lead } from '../../../../types';

interface DealHeaderProps {
  selectedLead: Lead | null;
  onClose: () => void;
}

const DealHeader: React.FC<DealHeaderProps> = ({ selectedLead, onClose }) => {
  // Mock deal data - will be replaced with real API data
  const dealData = {
    crmId: selectedLead?.crmId || 'S25632',
    dealType: 'LCP', // LCP = Life Contingent, GP = Guaranteed Payment
    currentStage: 'K-Pack Process',
    progressPercentage: 65,
    estimatedFunding: '2024-02-15',
    totalValue: '$175,623.21',
    commissionEarned: '$15,000',
    commissionPending: '$35,000'
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">💼</span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Deal Management</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{selectedLead?.clientName || 'No client selected'}</span>
            <span>•</span>
            <span>CRM: {dealData.crmId}</span>
            <span>•</span>
            <span className="text-orange-600 font-medium">Life Contingent</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900">{dealData.totalValue}</div>
          <div className="text-xs text-gray-500">
            <span className="text-green-600">Earned: {dealData.commissionEarned}</span> | 
            <span className="text-orange-600"> Pending: {dealData.commissionPending}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DealHeader;