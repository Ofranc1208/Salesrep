'use client';

import React from 'react';
import { Lead } from '../types';
import { formatDate } from '../utils/date-helpers';

interface LeadListProps {
  leads: Lead[];
  selectedLead: Lead | null;
  onLeadSelect: (lead: Lead) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  campaignInfo: {
    name: string;
    totalLeads: number;
    processedLeads: number;
  };
}

export default function LeadList({
  leads,
  selectedLead,
  onLeadSelect,
  getStatusColor,
  getStatusText,
  campaignInfo
}: LeadListProps) {
  const processedCount = leads.filter(lead => lead.processed).length;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Clean Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Lead List</h2>
            <p className="text-sm text-gray-600 mt-1">Campaign: {campaignInfo.name}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{processedCount}</div>
            <div className="text-sm text-gray-600">of {campaignInfo.totalLeads} processed</div>
          </div>
        </div>
        
        {/* Simple Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(processedCount / campaignInfo.totalLeads) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Clean Table */}
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CRM ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Follow-up
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr 
                key={lead.id}
                onClick={() => onLeadSelect(lead)}
                className={`cursor-pointer hover:bg-blue-50 transition-colors ${
                  selectedLead?.id === lead.id ? 'bg-blue-100' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {lead.processed && (
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.clientName}</div>
                      <div className="text-sm text-gray-500">
                        {lead.payment} • {lead.insuranceCompany}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-mono">{lead.crmId}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{formatDate(lead.nextFollowUp)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            lead.processed 
                              ? 'bg-green-500' 
                              : lead.phoneNumbersProcessed > 0 
                                ? 'bg-blue-500' 
                                : 'bg-gray-300'
                          }`}
                          style={{ 
                            width: `${lead.phoneNumbers.length > 0 ? (lead.phoneNumbersProcessed / lead.phoneNumbers.length) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 min-w-[2rem] text-right">
                      {lead.phoneNumbersProcessed}/{lead.phoneNumbers.length}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {leads.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Leads Available</h3>
          <p className="text-gray-600">Leads will appear here once assigned to the campaign</p>
        </div>
      )}
    </div>
  );
}

