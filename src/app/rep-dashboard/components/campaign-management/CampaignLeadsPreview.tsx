'use client';

import React from 'react';
import { Lead } from '../../types';

interface CampaignLeadsPreviewProps {
  campaignLeads: Lead[];
  selectedLead: Lead | null;
  onLeadSelect: (lead: Lead) => void;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  leadListData: {
    [key: string]: {
      name: string;
      count: number;
      status: string;
    };
  };
}

export default function CampaignLeadsPreview({
  campaignLeads,
  selectedLead,
  onLeadSelect,
  activeLeadList,
  leadListData
}: CampaignLeadsPreviewProps) {
  if (campaignLeads.length === 0) return null;

  return (
    <div className="mt-2">
      <h5 className="text-xs font-medium text-gray-700 mb-1">
        Leads in {leadListData[activeLeadList].name} ({campaignLeads.length})
      </h5>
      <div className="space-y-1 max-h-32 overflow-y-auto">
        {campaignLeads.map((lead) => (
          <div
            key={lead.id}
            onClick={() => onLeadSelect(lead)}
            className={`p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedLead?.id === lead.id ? 'bg-blue-50 border-blue-300' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="text-xs font-medium text-gray-900">
                    {lead.clientName}
                  </div>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                    lead.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                    lead.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {lead.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">CRM:</span> {lead.crmId}
                  </div>
                  <div>
                    <span className="font-medium">Insurance:</span> {lead.insuranceCompany}
                  </div>
                  <div>
                    <span className="font-medium">Payment:</span> ${lead.payment}
                  </div>
                  <div>
                    <span className="font-medium">Next Follow-up:</span> {lead.nextFollowUp}
                  </div>
                </div>
                
                {lead.notes && (
                  <div className="mt-1 text-xs text-gray-500 italic">
                    "{lead.notes}"
                  </div>
                )}
                
                <div className="mt-1 flex items-center space-x-2">
                  <div className="text-xs text-gray-500">
                    📱 {lead.phoneNumbers.length} phone number{lead.phoneNumbers.length !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-500">
                    💬 {lead.messageHistory.length} message{lead.messageHistory.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-1 ml-2">
                <div className={`w-2 h-2 rounded-full ${
                  lead.processed ? 'bg-green-500' : 'bg-orange-500'
                }`} />
                <span className="text-xs text-gray-500">
                  {lead.processed ? 'Processed' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
