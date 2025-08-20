'use client';

import React, { useState } from 'react';
import { Campaign, LeadNotification, Lead } from '../../../types';
import { OverviewTab, LeadsTab, QueueTab, AnalyticsTab } from './tabs';

interface CampaignManagerProps {
  campaigns: Campaign[];
  selectedCampaignId: string;
  onCampaignChange: (campaignId: string) => void;
  notifications: LeadNotification[];
  onNotificationMarkAsRead: (notificationId: string) => void;
  onNotificationDismiss: (notificationId: string) => void;
  campaignLeads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  selectedLead: Lead | null;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  onLeadListChange: (listType: 'prospect' | 'hot' | 'warm' | 'active') => void;
  onLeadsReceived: (leads: Lead[], campaignId: string) => void;
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
  onLeadListChange,
  onLeadsReceived
}: CampaignManagerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'queue' | 'analytics'>('overview');
  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

  const handleLeadStatusUpdate = (leadId: string, newStatus: string) => {
    // Update lead status and sync back to campaign tracking
    console.log(`Lead ${leadId} status updated to: ${newStatus}`);
    // This would integrate with the campaign tracking system
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-w-0 overflow-hidden">
      {/* Campaign Selector - Always Visible */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Active Campaign
            </label>
            <select
              value={selectedCampaignId}
              onChange={(e) => onCampaignChange(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name} ({campaign.status})
                </option>
              ))}
            </select>
          </div>
          
          {/* Campaign Status Indicator */}
          {selectedCampaign && (
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  selectedCampaign.status === 'active' ? 'bg-green-500' :
                  selectedCampaign.status === 'paused' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`} />
                <span className="text-gray-600 font-medium">{selectedCampaign.status.toUpperCase()}</span>
              </div>
              <div className="text-gray-500">
                {selectedCampaign.processedLeads}/{selectedCampaign.totalLeads} leads processed
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            📋 Overview
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'leads'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            👥 Lead Lists
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'queue'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            📬 Lead Queue
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            📊 Analytics
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <OverviewTab
            selectedCampaign={selectedCampaign}
            notifications={notifications}
          />
        )}

        {activeTab === 'leads' && (
          <LeadsTab
            campaignLeads={campaignLeads}
            onLeadSelect={onLeadSelect}
            selectedLead={selectedLead}
            activeLeadList={activeLeadList}
            onLeadListChange={onLeadListChange}
          />
        )}

        {activeTab === 'queue' && (
          <QueueTab />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab
            selectedCampaign={selectedCampaign}
            activeLeadList={activeLeadList}
          />
        )}
      </div>
    </div>
  );
}