'use client';

import React from 'react';

interface OfferData {
  amount: string;
  startDate: string;
  endDate: string;
  minimumOffer: string;
  maximumOffer: string;
}

interface OfferCardProps {
  offerData: OfferData;
}

const OfferCard: React.FC<OfferCardProps> = ({ offerData }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-500">Amount:</span>
        <span className="text-sm font-medium text-gray-900">{offerData.amount}</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-500">Period:</span>
        <span className="text-sm font-medium text-gray-900">{offerData.startDate} - {offerData.endDate}</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-500">Minimum:</span>
        <span className="text-sm font-medium text-green-600">{offerData.minimumOffer}</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-500">Maximum:</span>
        <span className="text-sm font-medium text-green-600">{offerData.maximumOffer}</span>
      </div>
      
      <div className="pt-3 border-t border-gray-200 space-y-2">
        <div className="text-center">
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium border border-yellow-200">
            Guaranteed
          </span>
        </div>
        <button className="w-full bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
          Customize Offer
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
