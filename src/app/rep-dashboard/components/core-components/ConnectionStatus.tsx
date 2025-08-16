'use client';

import React from 'react';

interface ConnectionStatusProps {
  isConnected: boolean;
  totalLeads: number;
  pendingLeads: number;
  inProgressLeads: number;
  completedLeads: number;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isConnected,
  totalLeads,
  pendingLeads,
  inProgressLeads,
  completedLeads
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 mb-1">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xs font-medium text-gray-900">Data Flow</h3>
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`text-xs font-medium ${isConnected ? 'text-green-700' : 'text-red-700'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      
      {isConnected ? (
        <div className="space-y-1">
          <div className="grid grid-cols-4 gap-1 text-center">
            <div className="bg-blue-50 p-1 rounded text-center">
              <div className="text-xs text-blue-600">Total</div>
              <div className="text-sm font-bold text-blue-700">{totalLeads}</div>
            </div>
            <div className="bg-orange-50 p-1 rounded text-center">
              <div className="text-xs text-orange-600">Pending</div>
              <div className="text-sm font-bold text-orange-700">{pendingLeads}</div>
            </div>
            <div className="bg-purple-50 p-1 rounded text-center">
              <div className="text-xs text-purple-600">In Progress</div>
              <div className="text-sm font-bold text-purple-700">{inProgressLeads}</div>
            </div>
            <div className="bg-green-50 p-1 rounded text-center">
              <div className="text-xs text-green-600">Completed</div>
              <div className="text-sm font-bold text-green-700">{completedLeads}</div>
            </div>
          </div>
          
          <div className="text-xs text-gray-600 text-center">
            ✅ Real-time updates active
            <button 
              onClick={() => window.location.reload()} 
              className="mt-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 block mx-auto"
            >
              🔄 Sync
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-1">
          <div className="text-gray-500 mb-1">
            <svg className="w-4 h-4 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-xs text-gray-600 mb-1">Not connected to shared data flow</p>
          <p className="text-xs text-gray-500">Using local mock data</p>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;
