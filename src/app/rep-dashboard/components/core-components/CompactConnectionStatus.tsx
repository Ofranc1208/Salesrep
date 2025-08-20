'use client';

import React from 'react';

interface CompactConnectionStatusProps {
  isConnected: boolean;
  totalLeads: number;
  pendingLeads: number;
  inProgressLeads: number;
  completedLeads: number;
}

const CompactConnectionStatus: React.FC<CompactConnectionStatusProps> = ({
  isConnected,
  totalLeads,
  pendingLeads,
  inProgressLeads,
  completedLeads
}) => {
  return (
    <div className="flex items-center space-x-4 text-sm">
      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`font-medium ${isConnected ? 'text-green-700' : 'text-red-700'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {/* Quick Stats */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-600">Total: <span className="font-semibold text-gray-900">{totalLeads}</span></span>
        <span className="text-gray-600">Pending: <span className="font-semibold text-orange-600">{pendingLeads}</span></span>
        <span className="text-gray-600">In Progress: <span className="font-semibold text-purple-600">{inProgressLeads}</span></span>
        <span className="text-gray-600">Completed: <span className="font-semibold text-green-600">{completedLeads}</span></span>
      </div>

      {/* Sync Button */}
      {isConnected && (
        <button 
          onClick={() => window.location.reload()} 
          className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
        >
          <span>🔄</span>
          <span>Sync</span>
        </button>
      )}
    </div>
  );
};

export default CompactConnectionStatus;
