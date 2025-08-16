'use client';

import React from 'react';

interface SettlementData {
  totalSettlementAmount: string;
  remainingBalance: string;
  nextPaymentDate: string;
  nextPaymentAmount: string;
  paymentFrequency: string;
  yearsRemaining: string;
  paymentsRemaining: number;
  lastPaymentDate: string;
  lastPaymentAmount: string;
}

const SettlementSummaryCard: React.FC = () => {
  // Mock settlement data
  const settlementData: SettlementData = {
    totalSettlementAmount: '$125,000.00',
    remainingBalance: '$87,500.00',
    nextPaymentDate: '2024-03-15',
    nextPaymentAmount: '$1,679.90',
    paymentFrequency: 'Monthly',
    yearsRemaining: '4.2',
    paymentsRemaining: 52,
    lastPaymentDate: '2024-02-15',
    lastPaymentAmount: '$1,679.90'
  };

  const progressPercentage = ((125000 - 87500) / 125000) * 100;

  return (
    <div className="space-y-4">
      {/* Settlement Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-medium text-gray-500">Total Settlement</div>
            <div className="text-lg font-bold text-gray-900">{settlementData.totalSettlementAmount}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500">Remaining Balance</div>
            <div className="text-lg font-bold text-green-600">{settlementData.remainingBalance}</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progressPercentage.toFixed(1)}% Paid</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-500">Next Payment:</span>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{settlementData.nextPaymentAmount}</div>
            <div className="text-xs text-gray-500">{settlementData.nextPaymentDate}</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-500">Payment Frequency:</span>
          <span className="text-sm font-medium text-gray-900">{settlementData.paymentFrequency}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-500">Years Remaining:</span>
          <span className="text-sm font-medium text-gray-900">{settlementData.yearsRemaining} years</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-500">Payments Remaining:</span>
          <span className="text-sm font-medium text-gray-900">{settlementData.paymentsRemaining}</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-xs font-medium text-gray-500">Last Payment:</span>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{settlementData.lastPaymentAmount}</div>
            <div className="text-xs text-gray-500">{settlementData.lastPaymentDate}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-3 border-t border-gray-200 space-y-2">
        <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Generate Statement</span>
        </button>
        
        <button className="w-full bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>View Full Schedule</span>
        </button>
      </div>
    </div>
  );
};

export default SettlementSummaryCard;
