'use client';

import React from 'react';
import { Lead } from '../types';

interface ClientDetailsProps {
  selectedLead: Lead;
}

export default function ClientDetails({ selectedLead }: ClientDetailsProps) {
  const details = selectedLead.structuredSettlementDetails;
  
  return (
    <div className="space-y-6">
      {/* Structured Settlement Details */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-3">Structured Settlement Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-700">Monthly Payment:</span>
            <span className="ml-2 font-medium text-blue-900">{details.monthlyPayment}</span>
          </div>
          <div>
            <span className="text-blue-700">Start Date:</span>
            <span className="ml-2 font-medium text-blue-900">{details.startDate}</span>
          </div>
          <div>
            <span className="text-blue-700">End Date:</span>
            <span className="ml-2 font-medium text-blue-900">{details.endDate}</span>
          </div>
          <div>
            <span className="text-blue-700">Total Value:</span>
            <span className="ml-2 font-medium text-blue-900">{details.totalValue}</span>
          </div>
          <div>
            <span className="text-blue-700">Insurance Company:</span>
            <span className="ml-2 font-medium text-blue-900">{details.insuranceCompany}</span>
          </div>
          <div>
            <span className="text-blue-700">Offer Amount:</span>
            <span className="ml-2 font-medium text-blue-900">{details.offerAmount}</span>
          </div>
        </div>
      </div>

      {/* Client Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Client Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Client:</span>
            <span className="ml-2 font-medium">{selectedLead.clientName}</span>
          </div>
          <div>
            <span className="text-gray-600">CRM ID:</span>
            <span className="ml-2 font-medium">{selectedLead.crmId}</span>
          </div>
          <div>
            <span className="text-gray-600">Next Follow-up:</span>
            <span className="ml-2 font-medium">{selectedLead.nextFollowUp}</span>
          </div>
          <div>
            <span className="text-gray-600">Status:</span>
            <span className="ml-2 font-medium">{selectedLead.status}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {selectedLead.notes && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">Notes</h4>
          <p className="text-sm text-yellow-700">{selectedLead.notes}</p>
        </div>
      )}
    </div>
  );
}
