'use client';

import React from 'react';
import { LeadStatus } from './types';

interface LeadStatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.NEW:
        return { color: 'bg-blue-100 text-blue-800', label: 'New' };
      case LeadStatus.ASSIGNED:
        return { color: 'bg-yellow-100 text-yellow-800', label: 'Assigned' };
      case LeadStatus.CONTACTED:
        return { color: 'bg-purple-100 text-purple-800', label: 'Contacted' };
      case LeadStatus.RESPONDED:
        return { color: 'bg-green-100 text-green-800', label: 'Responded' };
      case LeadStatus.QUALIFIED:
        return { color: 'bg-emerald-100 text-emerald-800', label: 'Qualified' };
      case LeadStatus.CLOSED:
        return { color: 'bg-gray-100 text-gray-800', label: 'Closed' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}>
      {config.label}
    </span>
  );
};

export default LeadStatusBadge;
