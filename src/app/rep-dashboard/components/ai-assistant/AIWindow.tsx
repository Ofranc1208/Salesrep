'use client';

import React, { useState } from 'react';

interface AIWindowProps {
  selectedLead: any;
  selectedPhoneNumber: string;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function AIWindow({ selectedLead, selectedPhoneNumber, activeLeadList }: AIWindowProps) {
  const [customerMessage, setCustomerMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{type: 'customer' | 'ai', message: string, timestamp: string}>>([]);

  const getLeadListContext = () => {
    switch (activeLeadList) {
      case 'prospect':
        return 'New leads from manager - focus on initial contact and qualification';
      case 'hot':
        return 'Actively working leads - focus on closing and moving to next stage';
      case 'warm':
        return 'Following up leads - focus on re-engagement and progress';
      case 'active':
        return 'In progress cases - focus on court process and documentation';
      default:
        return 'General sales assistance';
    }
  };

  const generateAIResponse = async () => {
    if (!customerMessage.trim()) return;
    
    setIsGenerating(true);
    
    // Add customer message to history
    const newCustomerMessage = {
      type: 'customer' as const,
      message: customerMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setConversationHistory(prev => [...prev, newCustomerMessage]);
    
    // Simulate AI response generation with context awareness
    setTimeout(() => {
      let responses: string[] = [];
      
      if (activeLeadList === 'prospect') {
        responses = [
          "Hi! I'm calling about your structured settlement with [Insurance Company]. We can help you access your funds early. Would you like to learn more?",
          "Hello! I'm reaching out about your settlement payments. We offer early payout options that could help with immediate needs. Are you interested in discussing this?",
          "Good day! I'm calling about your structured settlement. We can provide you with a lump sum payment instead of waiting for monthly payments. Would you like to explore this option?"
        ];
      } else if (activeLeadList === 'hot') {
        responses = [
          "Great! I'm glad you're interested. Let me explain how our early payout program works and what we can offer you.",
          "Perfect! I can see you're ready to move forward. Let me walk you through the process and get your application started.",
          "Excellent! I'll need to gather some information to prepare your personalized offer. Can we schedule a time to go through the details?"
        ];
      } else if (activeLeadList === 'warm') {
        responses = [
          "I understand you've been busy. I wanted to follow up on our previous conversation about your structured settlement options.",
          "Hi again! I wanted to check in and see if you've had a chance to think about the early payout opportunity we discussed.",
          "Hello! I'm reaching back out about your settlement. Have you had any questions or concerns about moving forward?"
        ];
      } else if (activeLeadList === 'active') {
        responses = [
          "Great news! Your case is progressing well. I wanted to update you on the next steps in the court process.",
          "Hi! I'm calling to let you know we've received the latest documentation. We're on track for the scheduled court date.",
          "Hello! I wanted to confirm we have everything we need for your court hearing. Is there anything you'd like me to clarify?"
        ];
      }
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      
      // Add AI response to history
      const newAIResponse = {
        type: 'ai' as const,
        message: randomResponse,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setConversationHistory(prev => [...prev, newAIResponse]);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show temporary success message
    const button = document.activeElement as HTMLButtonElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.className = 'px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors';
      setTimeout(() => {
        button.textContent = originalText;
        button.className = 'px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors';
      }, 2000);
    }
  };

  const clearConversation = () => {
    setConversationHistory([]);
    setCustomerMessage('');
    setAiResponse('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">🤖</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Sales Assistant</h3>
            <p className="text-sm text-gray-600">Always here to help with your sales conversations</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            Ready for 8x8
          </span>
          <button
            onClick={clearConversation}
            className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Context Awareness */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-blue-600 text-sm font-medium">Current Context:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            activeLeadList === 'prospect' ? 'bg-blue-100 text-blue-700' :
            activeLeadList === 'hot' ? 'bg-red-100 text-red-700' :
            activeLeadList === 'warm' ? 'bg-orange-100 text-orange-700' :
            'bg-green-100 text-green-700'
          }`}>
            {activeLeadList.toUpperCase()} LIST
          </span>
        </div>
        <p className="text-sm text-blue-800">{getLeadListContext()}</p>
        {selectedLead && (
          <div className="mt-2 text-xs text-blue-700">
            <strong>Active Lead:</strong> {selectedLead.clientName} • {selectedLead.insuranceCompany} • ${selectedLead.payment}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Message Input */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Message
          </label>
          <textarea
            value={customerMessage}
            onChange={(e) => setCustomerMessage(e.target.value)}
            placeholder="Paste or type the customer's message here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <button
            onClick={generateAIResponse}
            disabled={!customerMessage.trim() || isGenerating}
            className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate AI Response'
            )}
          </button>
        </div>

        {/* AI Response Output */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            AI Suggested Response
          </label>
          <div className="h-32 p-3 border border-gray-300 rounded-md bg-gradient-to-br from-gray-50 to-blue-50 overflow-y-auto">
            {aiResponse ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-800">{aiResponse}</p>
                <button
                  onClick={() => copyToClipboard(aiResponse)}
                  className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Copy Response
                </button>
              </div>
            ) : (
              <div className="text-gray-400 text-sm text-center pt-8">
                {customerMessage.trim() 
                  ? 'Click "Generate AI Response" to get suggestions'
                  : 'Enter a customer message to get AI response suggestions'
                }
              </div>
            )}
          </div>
        </div>

        {/* Quick Response Templates */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Responses
          </label>
          <div className="space-y-2">
            {[
              "Thank you for your interest! When can I call you?",
              "I'd love to discuss your options. What time works best?",
              "Great question! Let me explain the process. Can we talk?",
              "Perfect timing! We're offering special rates. Interested?"
            ].map((template, index) => (
              <button
                key={index}
                onClick={() => copyToClipboard(template)}
                className="w-full p-2 text-sm text-left border border-gray-200 rounded-md hover:bg-gray-50 transition-colors truncate"
                title={template}
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conversation History */}
      {conversationHistory.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Conversation History</h4>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {conversationHistory.map((entry, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  entry.type === 'customer' 
                    ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                    : 'bg-green-50 border-l-4 border-l-green-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">
                      {entry.type === 'customer' ? 'Customer' : 'AI Assistant'} • {entry.timestamp}
                    </div>
                    <p className="text-sm text-gray-800">{entry.message}</p>
                  </div>
                  {entry.type === 'ai' && (
                    <button
                      onClick={() => copyToClipboard(entry.message)}
                      className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Copy
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
