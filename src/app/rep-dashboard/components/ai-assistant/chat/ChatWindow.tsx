'use client';

import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  selectedPriority: 'hot' | 'active' | 'warm' | 'prospect' | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedPriority }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Good evening Rep One. Hope you are having a great day. If you have any questions, I'm here to help.",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hot') || message.includes('urgent')) {
      return "I see you're asking about hot leads. You have 2 leads that need immediate attention. Would you like me to show you the specific tasks?";
    } else if (message.includes('active') || message.includes('deal')) {
      return "Your active deals are progressing well! 2 deals are moving through the pipeline. Document completion is at 78%. Need help prioritizing?";
    } else if (message.includes('warm') || message.includes('nurture')) {
      return "For warm leads, I recommend sending educational content and scheduling follow-ups every 3-5 days. You have 1 lead ready for nurturing.";
    } else if (message.includes('prospect') || message.includes('new')) {
      return "You have 3 new prospects ready for initial contact. I can help you prioritize which one to contact first based on value.";
    } else if (message.includes('help') || message.includes('assist')) {
      return "I'm here to help! I can assist with lead prioritization, performance insights, task management, and recommendations. What would you like to focus on?";
    } else {
      return "I understand you're asking about that. I can help you with leads, tasks, performance metrics, and recommendations. Could you be more specific about what you need?";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-2">
      {/* Chat Header */}
      <div className="flex items-center space-x-2 p-2 border-b border-gray-100">
        <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">OZ</span>
        <span className="text-sm text-gray-600">your workflow partner</span>
      </div>

      {/* Messages Container */}
      <div className="h-32 overflow-y-auto p-2 space-y-2">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-100">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatWindow;
