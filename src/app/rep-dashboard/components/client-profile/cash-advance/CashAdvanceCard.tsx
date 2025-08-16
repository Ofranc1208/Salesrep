'use client';

import React, { useState } from 'react';

interface CashAdvanceRequest {
  id: string;
  amount: string;
  reason: string;
  status: 'pending' | 'approved' | 'denied' | 'disbursed';
  requestDate: string;
  approvalDate?: string;
  disbursementDate?: string;
}

const CashAdvanceCard: React.FC = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestAmount, setRequestAmount] = useState('');
  const [requestReason, setRequestReason] = useState('');

  // Mock data for recent requests
  const recentRequests: CashAdvanceRequest[] = [
    {
      id: '1',
      amount: '$2,500.00',
      reason: 'Medical expenses',
      status: 'approved',
      requestDate: '2024-02-15',
      approvalDate: '2024-02-16',
      disbursementDate: '2024-02-17'
    },
    {
      id: '2',
      amount: '$1,200.00',
      reason: 'Emergency repairs',
      status: 'pending',
      requestDate: '2024-02-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'denied': return 'text-red-600 bg-red-100';
      case 'disbursed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSubmitRequest = () => {
    // TODO: Submit cash advance request
    console.log('Submitting cash advance request:', { requestAmount, requestReason });
    setShowRequestForm(false);
    setRequestAmount('');
    setRequestReason('');
  };

  return (
    <div className="space-y-4">
      {/* Request New Advance Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowRequestForm(!showRequestForm)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Request Cash Advance</span>
        </button>
      </div>

      {/* Request Form */}
      {showRequestForm && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-3">New Cash Advance Request</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Amount Requested</label>
              <input
                type="text"
                value={requestAmount}
                onChange={(e) => setRequestAmount(e.target.value)}
                placeholder="$0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Reason for Request</label>
              <textarea
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                placeholder="Please explain why you need this advance..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleSubmitRequest}
                className="flex-1 bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
              >
                Submit Request
              </button>
              <button
                onClick={() => setShowRequestForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Requests */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Recent Requests</h4>
        <div className="space-y-3">
          {recentRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium text-gray-900">{request.amount}</div>
                  <div className="text-xs text-gray-500">{request.reason}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Requested: {request.requestDate}
                {request.disbursementDate && (
                  <span className="ml-2">• Disbursed: {request.disbursementDate}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CashAdvanceCard;
