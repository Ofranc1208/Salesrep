'use client';

import React from 'react';

interface LeadListCardProps {
  data: {
    name: string;
    count: number;
    status: string;
    color: string;
    icon: string;
  };
  isActive: boolean;
  onClick: () => void;
}

export default function LeadListCard({
  data,
  isActive,
  onClick
}: LeadListCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-200 bg-blue-50 hover:bg-blue-100';
      case 'red':
        return 'border-red-200 bg-red-50 hover:bg-red-100';
      case 'orange':
        return 'border-orange-200 bg-orange-50 hover:bg-orange-100';
      case 'green':
        return 'border-green-200 bg-green-50 hover:bg-green-100';
      default:
        return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
    }
  };

  const getActiveClasses = (color: string) => {
    if (!isActive) return '';
    
    switch (color) {
      case 'blue':
        return 'ring-2 ring-blue-500 border-blue-500';
      case 'red':
        return 'ring-2 ring-red-500 border-red-500';
      case 'orange':
        return 'ring-2 ring-orange-500 border-orange-500';
      case 'green':
        return 'ring-2 ring-green-500 border-green-500';
      default:
        return 'ring-2 ring-gray-500 border-gray-500';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-2 border-2 rounded-md cursor-pointer transition-all duration-200 ${getColorClasses(data.color)} ${getActiveClasses(data.color)}`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-lg">{data.icon}</div>
        <div className={`w-2 h-2 rounded-full ${
          isActive ? 'bg-green-500' : 'bg-gray-300'
        }`} />
      </div>
      
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
          {data.name}
        </h3>
        <div className="text-lg font-bold text-gray-800 mb-1">
          {data.count}
        </div>
        <p className="text-xs text-gray-600">
          {data.status}
        </p>
      </div>
    </div>
  );
}
