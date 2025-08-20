'use client';

import React from 'react';
import { PriorityItem, LeadTrackerProps } from './types';

const LeadTracker: React.FC<LeadTrackerProps> = ({ 
  priorityItems, 
  selectedPriority, 
  onPriorityClick 
}) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressPercentage = (type: string) => {
    switch (type) {
      case 'hot': return 85;
      case 'active': return 65;
      case 'warm': return 40;
      case 'prospect': return 15;
      default: return 0;
    }
  };

  return (
    <div className="space-y-2">
      {/* Lead Summary */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-blue-50 p-2 rounded-md">
          <div className="text-lg font-bold text-blue-600">8</div>
          <div className="text-xs text-blue-700">Total Leads</div>
        </div>
        <div className="bg-green-50 p-2 rounded-md">
          <div className="text-lg font-bold text-green-600">$425K</div>
          <div className="text-xs text-green-700">Pipeline Value</div>
        </div>
      </div>

      {/* Lead Lists */}
      <div className="space-y-2">
        {priorityItems.map((item) => {
          const progress = getProgressPercentage(item.type);
          return (
            <div
              key={item.type}
              onClick={() => onPriorityClick(item.type)}
              className={`p-2 rounded-lg cursor-pointer transition-all duration-200 border ${
                selectedPriority === item.type 
                  ? 'bg-blue-50 border-blue-300 shadow-sm' 
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 bg-${item.color}-500 rounded-full`}></span>
                  <span className={`text-xs font-medium ${
                    selectedPriority === item.type ? 'text-blue-900' : 'text-gray-700'
                  }`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)} List
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    getUrgencyColor(item.urgency)
                  }`}>
                    {item.urgency}
                  </span>
                  <span className="text-xs font-bold text-gray-900">{item.count}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                <div 
                  className={`bg-${item.color}-500 h-1.5 rounded-full transition-all duration-300`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-600">
                <span>{progress}% Complete</span>
                <span>{item.urgency === 'high' ? 'Action Required' : 'On Track'}</span>
              </div>

              {selectedPriority === item.type && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-600 space-y-1">
                    {item.type === 'hot' && (
                      <>
                        <div>• Sarah Williams - 24hr overdue</div>
                        <div>• Michael Johnson - Health assessment pending</div>
                      </>
                    )}
                    {item.type === 'active' && (
                      <>
                        <div>• 2 deals in court process</div>
                        <div>• Document completion: 78%</div>
                      </>
                    )}
                    {item.type === 'warm' && (
                      <>
                        <div>• Jennifer Davis - Follow-up scheduled</div>
                      </>
                    )}
                    {item.type === 'prospect' && (
                      <>
                        <div>• 3 new leads from manager</div>
                        <div>• Initial contact required</div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2 pt-2 border-t border-gray-100">
        <button className="flex-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium">
          Add Lead
        </button>
        <button className="flex-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium">
          Bulk Actions
        </button>
      </div>
    </div>
  );
};

export default LeadTracker;
