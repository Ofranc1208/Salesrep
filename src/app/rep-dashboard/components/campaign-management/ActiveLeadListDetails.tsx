'use client';

import React from 'react';

interface ActiveLeadListDetailsProps {
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  leadListData: {
    [key: string]: {
      name: string;
      count: number;
      status: string;
    };
  };
}

export default function ActiveLeadListDetails({ 
  activeLeadList, 
  leadListData 
}: ActiveLeadListDetailsProps) {
  const getProgressWidth = () => {
    switch (activeLeadList) {
      case 'prospect': return '10%';
      case 'hot': return '60%';
      case 'warm': return '40%';
      case 'active': return '80%';
      default: return '10%';
    }
  };

  const getProgressColor = () => {
    switch (activeLeadList) {
      case 'prospect': return 'bg-blue-600';
      case 'hot': return 'bg-red-600';
      case 'warm': return 'bg-orange-600';
      case 'active': return 'bg-green-600';
      default: return 'bg-blue-600';
    }
  };

  const getStatusColor = () => {
    switch (activeLeadList) {
      case 'prospect': return 'bg-blue-100 text-blue-700';
      case 'hot': return 'bg-red-100 text-red-700';
      case 'warm': return 'bg-orange-100 text-orange-700';
      case 'active': return 'bg-green-100 text-green-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="border-t border-gray-200 pt-2">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-900">
          {leadListData[activeLeadList].name} - Details
        </h4>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {leadListData[activeLeadList].status}
        </span>
      </div>
      
      {/* Lead Count and Progress */}
      <div className="grid grid-cols-3 gap-1 mb-2">
        <div className="bg-gray-50 p-2 rounded text-center">
          <div className="text-xs text-gray-600 font-medium">Total Leads</div>
          <div className="text-sm font-bold text-gray-900">{leadListData[activeLeadList].count}</div>
        </div>
        <div className="bg-gray-50 p-2 rounded text-center">
          <div className="text-xs text-gray-600 font-medium">In Progress</div>
          <div className="text-sm font-bold text-gray-900">
            {Math.floor(leadListData[activeLeadList].count * 0.3)}
          </div>
        </div>
        <div className="bg-gray-50 p-2 rounded text-center">
          <div className="text-xs text-gray-600 font-medium">Completed</div>
          <div className="text-sm font-bold text-gray-900">
            {Math.floor(leadListData[activeLeadList].count * 0.1)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
        <div
          className={`h-1 rounded-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: getProgressWidth() }}
        />
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-1">
        <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs">
          Load Leads
        </button>
        <button className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-xs">
          View Details
        </button>
      </div>
    </div>
  );
}
