'use client';

import React from 'react';
import { Lead } from '../../../../types';

interface LeadTableProps {
  validLeads: Lead[];
  onLeadSelect: (lead: Lead) => void;
}

/**
 * LeadTable - Displays the lead preview table
 * Focused responsibility: Show leads in tabular format with selection
 */
export default function LeadTable({ validLeads, onLeadSelect }: LeadTableProps) {
  return (
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
                Campaign
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {validLeads.slice(0, 10).map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onLeadSelect(lead)}
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
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {lead.campaignName}
                  </span>
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
  );
}
