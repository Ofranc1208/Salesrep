'use client';

import React from 'react';

interface LeadListCardData {
  name: string;
  count: number;
  status: string;
  color: string;
  icon: string;
  description?: string;
}

interface LeadListCardProps {
  data: LeadListCardData;
  isActive: boolean;
  onClick: () => void;
}

export default function LeadListCard({ data, isActive, onClick }: LeadListCardProps) {
  const getColorClasses = () => {
    const baseClasses = "transition-all duration-200 cursor-pointer rounded-lg border-2 p-3";
    
    if (isActive) {
      switch (data.color) {
        case 'blue': return `${baseClasses} border-blue-500 bg-blue-50 shadow-md`;
        case 'red': return `${baseClasses} border-red-500 bg-red-50 shadow-md`;
        case 'orange': return `${baseClasses} border-orange-500 bg-orange-50 shadow-md`;
        case 'green': return `${baseClasses} border-green-500 bg-green-50 shadow-md`;
        default: return `${baseClasses} border-gray-500 bg-gray-50 shadow-md`;
      }
    } else {
      return `${baseClasses} border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm`;
    }
  };

  const getTextColorClasses = () => {
    if (isActive) {
      switch (data.color) {
        case 'blue': return 'text-blue-700';
        case 'red': return 'text-red-700';
        case 'orange': return 'text-orange-700';
        case 'green': return 'text-green-700';
        default: return 'text-gray-700';
      }
    }
    return 'text-gray-600';
  };

  const getCountColorClasses = () => {
    if (isActive) {
      switch (data.color) {
        case 'blue': return 'text-blue-900 bg-blue-100';
        case 'red': return 'text-red-900 bg-red-100';
        case 'orange': return 'text-orange-900 bg-orange-100';
        case 'green': return 'text-green-900 bg-green-100';
        default: return 'text-gray-900 bg-gray-100';
      }
    }
    return 'text-gray-700 bg-gray-100';
  };

  return (
    <div className={getColorClasses()} onClick={onClick}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{data.icon}</span>
          <span className={`text-sm font-semibold ${getTextColorClasses()}`}>
            {data.name}
          </span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getCountColorClasses()}`}>
          {data.count}
        </span>
      </div>
      
      <p className={`text-xs ${getTextColorClasses()}`}>
        {data.status}
      </p>
      
      {data.description && (
        <p className="text-xs text-gray-500 mt-1 leading-tight">
          {data.description}
        </p>
      )}
      
      {isActive && (
        <div className="mt-2 flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${
            data.color === 'blue' ? 'bg-blue-500' :
            data.color === 'red' ? 'bg-red-500' :
            data.color === 'orange' ? 'bg-orange-500' :
            data.color === 'green' ? 'bg-green-500' : 'bg-gray-500'
          }`} />
          <span className={`text-xs font-medium ${getTextColorClasses()}`}>
            Currently Active
          </span>
        </div>
      )}
    </div>
  );
}
