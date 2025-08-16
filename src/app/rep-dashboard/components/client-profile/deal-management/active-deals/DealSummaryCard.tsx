'use client';

import React from 'react';

interface DealSummaryCardProps {
  title: string;
  value: string;
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'indigo';
  subtitle?: string;
}

const DealSummaryCard: React.FC<DealSummaryCardProps> = ({
  title,
  value,
  icon,
  color,
  subtitle
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'from-blue-50 to-blue-100',
          border: 'border-blue-200',
          iconBg: 'bg-blue-500',
          text: 'text-blue-700'
        };
      case 'green':
        return {
          bg: 'from-green-50 to-green-100',
          border: 'border-green-200',
          iconBg: 'bg-green-500',
          text: 'text-green-700'
        };
      case 'orange':
        return {
          bg: 'from-orange-50 to-orange-100',
          border: 'border-orange-200',
          iconBg: 'bg-orange-500',
          text: 'text-orange-700'
        };
      case 'purple':
        return {
          bg: 'from-purple-50 to-purple-100',
          border: 'border-purple-200',
          iconBg: 'bg-purple-500',
          text: 'text-purple-700'
        };
      case 'indigo':
        return {
          bg: 'from-indigo-50 to-indigo-100',
          border: 'border-indigo-200',
          iconBg: 'bg-indigo-500',
          text: 'text-indigo-700'
        };
      default:
        return {
          bg: 'from-gray-50 to-gray-100',
          border: 'border-gray-200',
          iconBg: 'bg-gray-500',
          text: 'text-gray-700'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className={`bg-gradient-to-r ${colorClasses.bg} border ${colorClasses.border} rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-8 h-8 ${colorClasses.iconBg} rounded-full flex items-center justify-center text-white text-sm`}>
              {icon}
            </div>
            <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          </div>
          <div className="ml-11">
            <p className="text-lg font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className={`text-xs ${colorClasses.text} mt-1`}>{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealSummaryCard;
