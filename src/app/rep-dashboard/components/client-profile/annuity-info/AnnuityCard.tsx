'use client';

import React from 'react';

interface AnnuityData {
  insuranceCompany: string;
  amount: string;
  startDate: string;
  endDate: string;
}

interface AnnuityCardProps {
  annuityData: AnnuityData;
}

const AnnuityCard: React.FC<AnnuityCardProps> = ({ annuityData }) => {
  const handleViewPaymentSchedule = () => {
    // TODO: Open payment schedule modal
    console.log('Opening payment schedule viewer');
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-500">Insurance Company:</span>
        <span className="text-sm font-medium text-gray-900">{annuityData.insuranceCompany}</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-500">Monthly Amount:</span>
        <span className="text-sm font-medium text-gray-900">{annuityData.amount}</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-500">Start Date:</span>
        <span className="text-sm font-medium text-gray-900">{annuityData.startDate}</span>
      </div>
      <div className="flex justify-between items-center py-2">
        <span className="text-xs font-medium text-gray-500">End Date:</span>
        <span className="text-sm font-medium text-gray-900">{annuityData.endDate}</span>
      </div>
      
      <div className="pt-3 border-t border-gray-200 space-y-2">
        <button 
          onClick={handleViewPaymentSchedule}
          className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>View Payment Schedule</span>
        </button>
        
        <button className="w-full bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
          Add Annuity
        </button>
      </div>
    </div>
  );
};

export default AnnuityCard;
