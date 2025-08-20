'use client';

import React from 'react';
import { Campaign, LeadNotification } from '../../../../types';

interface OverviewTabProps {
  selectedCampaign: Campaign | undefined;
  notifications: LeadNotification[];
}

export default function OverviewTab({
  selectedCampaign,
  notifications
}: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Simplified Campaign Info */}
      {selectedCampaign && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedCampaign.name}</h3>
                <p className="text-sm text-gray-600">{selectedCampaign.managerName}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {selectedCampaign.processedLeads}/{selectedCampaign.totalLeads} processed
              </div>
              <div className="text-xs text-gray-500">{selectedCampaign.status}</div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications - Only if there are any */}
      {notifications.length > 0 && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-blue-600">🔔</div>
              <span className="text-sm font-medium text-blue-900">
                {notifications.length} new notification{notifications.length > 1 ? 's' : ''}
              </span>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>
        </div>
      )}
      
      {/* Lead Distribution by Status - Main Focus */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">Your Lead Overview</h4>
          <p className="text-sm text-gray-600">Current lead distribution</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-3xl font-bold text-blue-600">23</div>
              <div className="text-sm font-medium text-blue-700">Prospect</div>
              <div className="text-xs text-blue-600 mt-1">New leads</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
              <div className="text-3xl font-bold text-red-600">8</div>
              <div className="text-sm font-medium text-red-700">Hot</div>
              <div className="text-xs text-red-600 mt-1">High priority</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
              <div className="text-3xl font-bold text-orange-600">15</div>
              <div className="text-sm font-medium text-orange-700">Warm</div>
              <div className="text-xs text-orange-600 mt-1">Follow-up</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
              <div className="text-3xl font-bold text-green-600">12</div>
              <div className="text-sm font-medium text-green-700">Active</div>
              <div className="text-xs text-green-600 mt-1">In negotiation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Summary Stats */}
      {selectedCampaign && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">{selectedCampaign.totalLeads}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">{selectedCampaign.processedLeads}</div>
            <div className="text-sm text-gray-600">Processed</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-orange-600">{selectedCampaign.totalLeads - selectedCampaign.processedLeads}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {selectedCampaign.totalLeads > 0 ? Math.round((selectedCampaign.processedLeads / selectedCampaign.totalLeads) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      )}
    </div>
  );
}
