'use client';

import React from 'react';

interface CampaignSummaryProps {
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function CampaignSummary({ activeLeadList }: CampaignSummaryProps) {
  const getCampaignInfo = () => {
    switch (activeLeadList) {
      case 'prospect':
        return {
          type: '📋 New leads from manager',
          priority: 'Medium',
          closeRate: '15-25%',
          avgDealSize: '$2,500'
        };
      case 'hot':
        return {
          type: '🔥 Actively working leads',
          priority: 'High',
          closeRate: '60-80%',
          avgDealSize: '$2,150'
        };
      case 'warm':
        return {
          type: '🌡️ Following up leads',
          priority: 'Medium',
          closeRate: '30-50%',
          avgDealSize: '$2,200'
        };
      case 'active':
        return {
          type: '✅ In progress/court cases',
          priority: 'Critical',
          closeRate: '80-95%',
          avgDealSize: '$3,850'
        };
    }
  };

  const campaignInfo = getCampaignInfo();

  return (
    <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="font-medium text-gray-700">Campaign Type:</span>
          <div className="text-gray-600 mt-0.5">
            {campaignInfo.type}
          </div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Priority Level:</span>
          <div className="text-gray-600 mt-0.5">
            {campaignInfo.priority}
          </div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Expected Close Rate:</span>
          <div className="text-gray-600 mt-0.5">
            {campaignInfo.closeRate}
          </div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Avg. Deal Size:</span>
          <div className="text-gray-600 mt-0.5">
            {campaignInfo.avgDealSize}
          </div>
        </div>
      </div>
    </div>
  );
}
