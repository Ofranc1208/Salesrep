'use client';

import React, { useState } from 'react';
import { Lead } from '../../../types';
import { ValidationResult } from './hooks';

interface IntakePreviewProps {
  leads: Lead[];
  validationResults: ValidationResult;
  onConfirm: () => void;
  onBack: () => void;
}

export default function IntakePreview({
  leads,
  validationResults,
  onConfirm,
  onBack
}: IntakePreviewProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAllFields, setShowAllFields] = useState(false);

  const { validLeads } = validationResults;

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <h3 className="font-semibold text-green-900 mb-2">✅ Ready for Import</h3>
        <p className="text-green-700">
          {validLeads.length} leads processed and validated. All leads will be assigned to <strong>Rep 1</strong>.
        </p>
      </div>

      {/* Lead Preview Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Lead Preview</h4>
          <p className="text-sm text-gray-600">Click on any lead to view detailed information</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Numbers
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {validLeads.slice(0, 10).map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.clientName}</div>
                    <div className="text-sm text-gray-500">{lead.crmId}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {lead.phoneNumbers.filter(p => p.number !== 'Not Available').length > 0
                        ? lead.phoneNumbers.filter(p => p.number !== 'Not Available')[0].number
                        : 'No valid phone'
                      }
                    </div>
                    {lead.phoneNumbers.length > 1 && (
                      <div className="text-xs text-gray-500">
                        +{lead.phoneNumbers.length - 1} more
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {lead.structuredSettlement.monthlyPayment}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      lead.priority === 'High' ? 'bg-red-100 text-red-800' :
                      lead.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {lead.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {validLeads.length > 10 && (
            <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600 text-center">
              Showing first 10 of {validLeads.length} leads
            </div>
          )}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Lead Details: {selectedLead.clientName}
              </h3>
              <button
                onClick={() => setSelectedLead(null)}
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
                    <span className="ml-2 text-gray-900">{selectedLead.campaignName}</span>
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
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Validation
        </button>
        
        <button
          onClick={onConfirm}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Import {validLeads.length} Leads
        </button>
      </div>
    </div>
  );
}
