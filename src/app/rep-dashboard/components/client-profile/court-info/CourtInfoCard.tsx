'use client';

import React from 'react';

interface CourtInfoCardProps {
  // For now, we'll use placeholder data, but this can be expanded later
}

const CourtInfoCard: React.FC<CourtInfoCardProps> = () => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100">
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-500">Case #:</span>
          <span className="text-gray-400">NA</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-500">Court Date:</span>
          <span className="text-gray-400">NA</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-500">Location:</span>
          <span className="text-gray-400">NA</span>
        </div>
      </div>
    </div>
  );
};

export default CourtInfoCard;
