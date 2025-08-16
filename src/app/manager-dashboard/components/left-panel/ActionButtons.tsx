'use client';

import React from 'react';

interface ActionButtonsProps {
  onManageTemplates: () => void;
}

export default function ActionButtons({ onManageTemplates }: ActionButtonsProps) {
  
  const handleSendTest = () => {
    // TODO: Implement send test functionality
    console.log('Send test clicked');
  };

  return (
    <div className="space-y-3">
      {/* Manage Templates Button */}
      <button 
        className="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800 font-medium transition-colors"
        onClick={onManageTemplates}
      >
        Manage Templates
      </button>
      
      {/* Send Test Button */}
      <button 
        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 font-medium transition-colors"
        onClick={handleSendTest}
      >
        Send Test
      </button>
    </div>
  );
}
