'use client';

import React from 'react';

interface CollapsibleCardProps {
  title: string;
  subtitle?: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  defaultContent?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  disabledMessage?: string;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  subtitle,
  isExpanded,
  onToggle,
  children,
  defaultContent,
  className = "",
  isDisabled = false,
  disabledMessage = "Available in higher lead stages"
}) => {
  // Define clean, consistent card styling
  const getCardStyle = (title: string) => {
    switch (title.toLowerCase()) {
      case 'client profile':
      case 'client details':
        return {
          bg: 'from-blue-50 to-blue-100',
          border: 'border-blue-200',
          icon: '👤',
          iconBg: 'bg-blue-500'
        };
      case 'attorney info':
        return {
          bg: 'from-purple-50 to-purple-100',
          border: 'border-purple-200',
          icon: '⚖️',
          iconBg: 'bg-purple-500'
        };
      case 'court info':
        return {
          bg: 'from-orange-50 to-orange-100',
          border: 'border-orange-200',
          icon: '🏛️',
          iconBg: 'bg-orange-500'
        };
      case 'annuity info':
        return {
          bg: 'from-green-50 to-green-100',
          border: 'border-green-200',
          icon: '💰',
          iconBg: 'bg-green-500'
        };
      case 'offer':
        return {
          bg: 'from-cyan-50 to-cyan-100',
          border: 'border-cyan-200',
          icon: '💎',
          iconBg: 'bg-cyan-500'
        };
      case 'notes':
      case 'activity log':
        return {
          bg: 'from-indigo-50 to-indigo-100',
          border: 'border-indigo-200',
          icon: '📋',
          iconBg: 'bg-indigo-500'
        };
      case 'message history':
        return {
          bg: 'from-pink-50 to-pink-100',
          border: 'border-pink-200',
          icon: '💬',
          iconBg: 'bg-pink-500'
        };
      case 'cash advance':
        return {
          bg: 'from-amber-50 to-amber-100',
          border: 'border-amber-200',
          icon: '💵',
          iconBg: 'bg-amber-500'
        };
      case 'settlement summary':
        return {
          bg: 'from-teal-50 to-teal-100',
          border: 'border-teal-200',
          icon: '📊',
          iconBg: 'bg-teal-500'
        };
      case 'phone management':
        return {
          bg: 'from-violet-50 to-violet-100',
          border: 'border-violet-200',
          icon: '📱',
          iconBg: 'bg-violet-500'
        };
      default:
        return {
          bg: 'from-gray-50 to-gray-100',
          border: 'border-gray-200',
          icon: '📄',
          iconBg: 'bg-gray-500'
        };
    }
  };

  const cardStyle = getCardStyle(title);

  // Handle disabled state styling
  const getDisabledStyles = () => {
    if (!isDisabled) return {};
    return {
      cardBg: 'bg-gray-50',
      border: 'border-gray-200',
      headerBg: 'from-gray-100 to-gray-200',
      iconBg: 'bg-gray-400',
      textColor: 'text-gray-500',
      cursor: 'cursor-not-allowed'
    };
  };

  const disabledStyles = getDisabledStyles();

  return (
    <div className={`${isDisabled ? disabledStyles.cardBg : 'bg-white'} rounded-lg border ${isDisabled ? disabledStyles.border : cardStyle.border} shadow-sm ${!isDisabled ? 'hover:shadow-md' : ''} transition-all duration-200 ${className} relative group`}>
      {/* Simple tooltip for disabled cards */}
      {isDisabled && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
          {disabledMessage}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
        </div>
      )}
      
      <button
        onClick={isDisabled ? undefined : onToggle}
        disabled={isDisabled}
        className={`w-full px-4 py-3 bg-gradient-to-r ${isDisabled ? disabledStyles.headerBg : cardStyle.bg} ${!isDisabled ? 'hover:opacity-80' : ''} transition-all duration-200 flex items-center justify-between rounded-t-lg ${isDisabled ? disabledStyles.cursor : ''}`}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 ${isDisabled ? disabledStyles.iconBg : cardStyle.iconBg} rounded-full flex items-center justify-center text-white text-sm`}>
            {cardStyle.icon}
          </div>
          <div className="flex flex-col items-start">
            <h3 className={`text-sm font-semibold ${isDisabled ? disabledStyles.textColor : 'text-gray-900'}`}>{title}</h3>
            {subtitle && (
              <span className={`text-xs font-medium ${isDisabled ? disabledStyles.textColor : 'text-gray-500'}`}>
                {subtitle}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {defaultContent && !isExpanded && (
            <div className="text-xs text-gray-700 max-w-xs truncate">
              {defaultContent}
            </div>
          )}
          {!isDisabled && (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/50">
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>
      </button>
      
      {isExpanded && !isDisabled && (
        <div className="p-4 bg-white rounded-b-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleCard;