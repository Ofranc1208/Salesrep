'use client';

import React from 'react';

interface IntakeProgressBarProps {
  currentStep: 'upload' | 'validate' | 'preview' | 'complete';
  selectedCampaignId: string;
}

export default function IntakeProgressBar({ currentStep, selectedCampaignId }: IntakeProgressBarProps) {
  const getProgressWidth = () => {
    switch (currentStep) {
      case 'upload': return '25%';
      case 'validate': return '50%';
      case 'preview': return '75%';
      case 'complete': return '100%';
      default: return '0%';
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Lead Intake Process</h2>
        <span className="text-sm text-gray-500">
          Campaign: {selectedCampaignId}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: getProgressWidth() }}
        />
      </div>
    </div>
  );
}
