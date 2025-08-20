'use client';

import React, { useState } from 'react';
import { ChatWindow } from './chat';
import { PriorityIntelligenceHub } from './priority-intelligence';

interface OzAIAssistantProps {
  onPriorityItemSelect?: (selectedList: 'hot' | 'active' | 'warm' | 'prospect' | null) => void;
}

const OzAIAssistant: React.FC<OzAIAssistantProps> = ({ onPriorityItemSelect }) => {
  const [selectedPriority, setSelectedPriority] = useState<'hot' | 'active' | 'warm' | 'prospect' | null>(null);

  // Handle priority selection and notify parent component
  const handlePrioritySelect = (priority: 'hot' | 'active' | 'warm' | 'prospect' | null) => {
    setSelectedPriority(priority);
    onPriorityItemSelect?.(priority);
  };

  return (
    <div className="space-y-2">
      {/* Component 1: Chat Window - AI Conversation Interface */}
      <ChatWindow selectedPriority={selectedPriority} />

      {/* Component 2: Priority Intelligence Hub - Complete Modular System */}
      <PriorityIntelligenceHub 
        selectedPriority={selectedPriority}
        onPrioritySelect={handlePrioritySelect}
      />
    </div>
  );
};

export default OzAIAssistant;
