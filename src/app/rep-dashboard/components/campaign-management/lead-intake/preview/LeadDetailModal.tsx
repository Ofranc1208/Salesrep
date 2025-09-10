'use client';

import React, { useState } from 'react';
import { Lead } from '../../../../types';

interface LeadDetailModalProps {
  selectedLead: Lead | null;
  onClose: () => void;
}

/**
 * LeadDetailModal - Displays detailed lead information in a modal
 * Focused responsibility: Show comprehensive lead details with expandable sections
 */
export default function LeadDetailModal({ selectedLead, onClose }: LeadDetailModalProps) {
  const [showAllFields, setShowAllFields] = useState(false);

  if (!selectedLead) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Lead Details: {selectedLead.clientName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Basic Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Client Name:</span>
                <span className="ml-2 text-gray-900">{selectedLead.clientName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">CRM ID:</span>
                <span className="ml-2 text-gray-900">{selectedLead.crmId}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Campaign:</span>
                <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {selectedLead.campaignName}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Priority:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  selectedLead.priority === 'High' ? 'bg-red-100 text-red-800' :
                  selectedLead.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {selectedLead.priority}
                </span>
              </div>
            </div>
          </div>

          {/* Phone Numbers */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Phone Numbers</h4>
            <div className="space-y-2">
              {selectedLead.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded p-3">
                  <div>
                    <span className="font-medium text-gray-900">{phone.number}</span>
                    <span className="ml-2 text-sm text-gray-600">({phone.type})</span>
                    {phone.isPrimary && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Primary</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{phone.relationship}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Payment Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Monthly Payment:</span>
                <span className="ml-2 text-gray-900">{selectedLead.structuredSettlement.monthlyPayment}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Total Value:</span>
                <span className="ml-2 text-gray-900">{selectedLead.structuredSettlement.totalValue}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Start Date:</span>
                <span className="ml-2 text-gray-900">{selectedLead.structuredSettlement.startDate}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">End Date:</span>
                <span className="ml-2 text-gray-900">{selectedLead.structuredSettlement.endDate}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Insurance Company:</span>
                <span className="ml-2 text-gray-900">{selectedLead.structuredSettlement.insuranceCompany}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Offer Amount:</span>
                <span className="ml-2 text-gray-900">{selectedLead.structuredSettlement.offerAmount}</span>
              </div>
            </div>
          </div>

          {/* Client Information */}
          {selectedLead.clientInfo && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Client Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">SSN:</span>
                  <span className="ml-2 text-gray-900">{selectedLead.clientInfo.ssn}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date of Birth:</span>
                  <span className="ml-2 text-gray-900">{selectedLead.clientInfo.dateOfBirth}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Future NPV:</span>
                  <span className="ml-2 text-gray-900">{selectedLead.clientInfo.futureNPV}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Current Offers:</span>
                  <span className="ml-2 text-gray-900">{selectedLead.clientInfo.currentOffers}</span>
                </div>
              </div>
            </div>
          )}

          {/* Additional Fields */}
          {selectedLead.clientInfo?.additionalFields && Object.keys(selectedLead.clientInfo.additionalFields).length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Additional Fields</h4>
                <button
                  onClick={() => setShowAllFields(!showAllFields)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {showAllFields ? 'Hide' : 'Show All'}
                </button>
              </div>
              {showAllFields && (
                <div className="bg-gray-50 rounded p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(selectedLead.clientInfo.additionalFields).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="ml-2 text-gray-900">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
