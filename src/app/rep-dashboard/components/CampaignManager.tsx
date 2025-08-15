'use client';

import React, { useState } from 'react';
import { Campaign, LeadNotification, Lead } from '../types';
import CampaignHeader from './CampaignHeader';
import LeadListCard from './LeadListCard';

interface CampaignManagerProps {
  campaigns: Campaign[];
  selectedCampaignId: string;
  onCampaignChange: (campaignId: string) => void;
  notifications: LeadNotification[];
  onNotificationMarkAsRead: (notificationId: string) => void;
  onNotificationDismiss: (notificationId: string) => void;
  // New props for lead management within campaigns
  campaignLeads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  selectedLead: Lead | null;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  onLeadListChange: (listType: 'prospect' | 'hot' | 'warm' | 'active') => void;
}

export default function CampaignManager({
  campaigns,
  selectedCampaignId,
  onCampaignChange,
  notifications,
  onNotificationMarkAsRead,
  onNotificationDismiss,
  campaignLeads,
  onLeadSelect,
  selectedLead,
  activeLeadList,
  onLeadListChange
}: CampaignManagerProps) {

  // Mock data for the 4 lead lists - MVP version with realistic numbers
  const leadListData = {
    prospect: {
      name: 'Prospect List',
      count: 3,
      status: 'New leads from manager',
      color: 'blue',
      icon: '📋'
    },
    hot: {
      name: 'Hot List', 
      count: 2,
      status: 'Actively working',
      color: 'red',
      icon: '🔥'
    },
    warm: {
      name: 'Warm List',
      count: 1,
      status: 'Following up',
      color: 'orange',
      icon: '🌡️'
    },
    active: {
      name: 'Active List',
      count: 2,
      status: 'In progress/court',
      color: 'green',
      icon: '✅'
    }
  };

  const handleLeadListSelect = (listType: 'prospect' | 'hot' | 'warm' | 'active') => {
    onLeadListChange(listType);
    // TODO: Load leads for this specific list into Lead Management
    console.log(`Switched to ${listType} list`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-w-0 overflow-hidden">
      <div className="p-3">
        <CampaignHeader
          notifications={notifications}
          onNotificationMarkAsRead={onNotificationMarkAsRead}
          onNotificationDismiss={onNotificationDismiss}
        />
        
        {/* Four Lead List Cards */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <LeadListCard
            data={leadListData.prospect}
            isActive={activeLeadList === 'prospect'}
            onClick={() => handleLeadListSelect('prospect')}
          />
          <LeadListCard
            data={leadListData.hot}
            isActive={activeLeadList === 'hot'}
            onClick={() => handleLeadListSelect('hot')}
          />
          <LeadListCard
            data={leadListData.warm}
            isActive={activeLeadList === 'warm'}
            onClick={() => handleLeadListSelect('warm')}
          />
          <LeadListCard
            data={leadListData.active}
            isActive={activeLeadList === 'active'}
            onClick={() => handleLeadListSelect('active')}
          />
        </div>

        {/* Active Lead List Details */}
        <div className="border-t border-gray-200 pt-2">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-base font-semibold text-gray-900">
              {leadListData[activeLeadList].name} - Details
            </h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              activeLeadList === 'prospect' ? 'bg-blue-100 text-blue-700' :
              activeLeadList === 'hot' ? 'bg-red-100 text-red-700' :
              activeLeadList === 'warm' ? 'bg-orange-100 text-orange-700' :
              'bg-green-100 text-green-700'
            }`}>
              {leadListData[activeLeadList].status}
            </span>
          </div>
          
          {/* Lead Count and Progress */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-xs text-gray-600 font-medium">Total Leads</div>
              <div className="text-lg font-bold text-gray-900">{leadListData[activeLeadList].count}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-xs text-gray-600 font-medium">In Progress</div>
              <div className="text-lg font-bold text-gray-900">
                {Math.floor(leadListData[activeLeadList].count * 0.3)}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-xs text-gray-600 font-medium">Completed</div>
              <div className="text-lg font-bold text-gray-900">
                {Math.floor(leadListData[activeLeadList].count * 0.1)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeLeadList === 'prospect' ? 'bg-blue-600' :
                activeLeadList === 'hot' ? 'bg-red-600' :
                activeLeadList === 'warm' ? 'bg-orange-600' :
                'bg-green-600'
              }`}
              style={{
                width: `${activeLeadList === 'prospect' ? 10 : 
                        activeLeadList === 'hot' ? 60 : 
                        activeLeadList === 'warm' ? 40 : 80}%`
              }}
            />
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs">
              Load Leads
            </button>
            <button className="px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-xs">
              View Details
            </button>
          </div>

          {/* Current Campaign Leads Preview */}
          {campaignLeads.length > 0 && (
            <div className="mt-3">
              <h5 className="text-xs font-medium text-gray-700 mb-2">
                Leads in {leadListData[activeLeadList].name} ({campaignLeads.length})
              </h5>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {campaignLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onLeadSelect(lead)}
                    className={`p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedLead?.id === lead.id ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-gray-900 truncate">
                          {lead.clientName}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          CRM: {lead.crmId} • {lead.insuranceCompany}
                        </div>
                        <div className="text-xs text-gray-500">
                          Payment: ${lead.payment} • Status: {lead.status}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
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
          )}
        </div>
      </div>
    </div>
  );
}
