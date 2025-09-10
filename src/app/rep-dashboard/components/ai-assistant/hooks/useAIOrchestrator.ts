/**
 * useAIOrchestrator Hook
 * 
 * React hook for managing the AI orchestrator and specialist agents.
 * Handles agent registration, context updates, and query processing.
 */

import { useState, useEffect, useCallback } from 'react';
import { aiOrchestrator, AIResponse } from '../orchestrator';
import { campaignAI } from '../../campaign-management/ai-agent';
import { priorityAI } from '../priority-intelligence/ai-agent';

interface UseAIOrchestratorReturn {
  // Query processing
  processQuery: (query: string, context?: any) => Promise<AIResponse>;
  
  // State
  isProcessing: boolean;
  lastResponse: AIResponse | null;
  conversationHistory: any[];
  
  // Agent management
  registeredAgents: string[];
  updateAgentContext: (agentName: string, context: any) => void;
  
  // Utilities
  clearHistory: () => void;
  getAgentsInfo: () => any[];
}

export function useAIOrchestrator(): UseAIOrchestratorReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponse, setLastResponse] = useState<AIResponse | null>(null);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [registeredAgents, setRegisteredAgents] = useState<string[]>([]);

  // Initialize agents on mount
  useEffect(() => {
    // Register Campaign AI Agent
    aiOrchestrator.registerAgent(campaignAI);
    
    // Register Priority AI Agent
    aiOrchestrator.registerAgent(priorityAI);
    
    // Update registered agents list
    setRegisteredAgents([campaignAI.name, priorityAI.name]);
    
    console.log('🤖 useAIOrchestrator: Agents registered');
    
    // Cleanup on unmount
    return () => {
      aiOrchestrator.unregisterAgent(campaignAI.name);
      aiOrchestrator.unregisterAgent(priorityAI.name);
    };
  }, []);

  // Update conversation history when orchestrator history changes
  useEffect(() => {
    const updateHistory = () => {
      setConversationHistory(aiOrchestrator.getConversationContext());
    };

    // Set up interval to sync history (in a real app, this would be event-driven)
    const interval = setInterval(updateHistory, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Process query through orchestrator
  const processQuery = useCallback(async (query: string, context?: any): Promise<AIResponse> => {
    setIsProcessing(true);
    
    try {
      const response = await aiOrchestrator.processQuery(query, context);
      setLastResponse(response);
      return response;
    } catch (error) {
      console.error('❌ useAIOrchestrator: Error processing query:', error);
      const errorResponse: AIResponse = {
        content: 'I encountered an error processing your request. Please try again.',
        confidence: 0.1,
        source: 'Error Handler'
      };
      setLastResponse(errorResponse);
      return errorResponse;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Update specific agent context
  const updateAgentContext = useCallback((agentName: string, context: any) => {
    if (agentName === campaignAI.name) {
      campaignAI.updateContext(context);
    } else if (agentName === priorityAI.name) {
      priorityAI.updateContext(context);
    }
  }, []);

  // Clear conversation history
  const clearHistory = useCallback(() => {
    aiOrchestrator.clearHistory();
    setConversationHistory([]);
    setLastResponse(null);
  }, []);

  // Get agents information
  const getAgentsInfo = useCallback(() => {
    return aiOrchestrator.getAgentsInfo();
  }, []);

  return {
    // Query processing
    processQuery,
    
    // State
    isProcessing,
    lastResponse,
    conversationHistory,
    
    // Agent management
    registeredAgents,
    updateAgentContext,
    
    // Utilities
    clearHistory,
    getAgentsInfo
  };
}
