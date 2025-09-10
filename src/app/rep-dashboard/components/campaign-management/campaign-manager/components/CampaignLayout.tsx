'use client';

// Campaign Layout Container - Extracted from CampaignManager.tsx
import React, { ReactNode } from 'react';

interface CampaignLayoutProps {
  navigation: ReactNode;
  content: ReactNode;
}

export default function CampaignLayout({ navigation, content }: CampaignLayoutProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-w-0 overflow-hidden h-full flex flex-col">
      {/* Tab Navigation */}
      {navigation}

      {/* Tab Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        {content}
      </div>
    </div>
  );
}
