/**
 * AI Orchestrator - Central AI Controller
 * 
 * Routes queries to specialized AI agents and coordinates responses.
 * Acts as the main brain that decides which specialist agents to engage
 * and combines their insights into unified responses.
 */

interface AIAgent {
  name: string;
  canHandle: (query: string) => boolean;
  process: (query: string, context?: any) => Promise<AIResponse>;
  getContext: () => any;
}

interface AIResponse {
  content: string;
  confidence: number;
  source: string;
  suggestions?: string[];
  data?: any;
}

interface OrchestratorConfig {
  maxAgents: number;
  confidenceThreshold: number;
  debugMode: boolean;
}

class AIOrchestrator {
  private agents: Map<string, AIAgent> = new Map();
  private config: OrchestratorConfig;
  private conversationHistory: any[] = [];

  constructor(config: Partial<OrchestratorConfig> = {}) {
    this.config = {
      maxAgents: 5,
      confidenceThreshold: 0.7,
      debugMode: process.env.NODE_ENV === 'development',
      ...config
    };

    if (this.config.debugMode) {
      console.log('🧠 AIOrchestrator: Initialized with config', this.config);
    }
  }

  /**
   * Register a specialized AI agent
   */
  public registerAgent(agent: AIAgent): void {
    this.agents.set(agent.name, agent);
    
    if (this.config.debugMode) {
      console.log(`🤖 AIOrchestrator: Registered ${agent.name} agent`);
    }
  }

  /**
   * Unregister an AI agent
   */
  public unregisterAgent(agentName: string): void {
    this.agents.delete(agentName);
    
    if (this.config.debugMode) {
      console.log(`🗑️ AIOrchestrator: Unregistered ${agentName} agent`);
    }
  }

  /**
   * Process user query through appropriate specialist agents
   */
  public async processQuery(query: string, userContext?: any): Promise<AIResponse> {
    if (this.config.debugMode) {
      console.log('💭 AIOrchestrator: Processing query:', query);
    }

    // Add to conversation history
    this.conversationHistory.push({
      type: 'user',
      content: query,
      timestamp: new Date().toISOString(),
      context: userContext
    });

    try {
      // Find capable agents
      const capableAgents = this.findCapableAgents(query);
      
      if (capableAgents.length === 0) {
        return this.createFallbackResponse(query);
      }

      // Process with agents
      const responses = await this.processWithAgents(capableAgents, query, userContext);
      
      // Coordinate and combine responses
      const finalResponse = this.coordinateResponses(responses, query);
      
      // Add to conversation history
      this.conversationHistory.push({
        type: 'assistant',
        content: finalResponse.content,
        timestamp: new Date().toISOString(),
        source: finalResponse.source,
        confidence: finalResponse.confidence
      });

      return finalResponse;

    } catch (error) {
      console.error('❌ AIOrchestrator: Error processing query:', error);
      return this.createErrorResponse(query, error);
    }
  }

  /**
   * Get current conversation context
   */
  public getConversationContext(): any[] {
    return [...this.conversationHistory];
  }

  /**
   * Clear conversation history
   */
  public clearHistory(): void {
    this.conversationHistory = [];
    
    if (this.config.debugMode) {
      console.log('🧹 AIOrchestrator: Conversation history cleared');
    }
  }

  /**
   * Get registered agents info
   */
  public getAgentsInfo(): { name: string; context: any }[] {
    return Array.from(this.agents.entries()).map(([name, agent]) => ({
      name,
      context: agent.getContext()
    }));
  }

  /**
   * Private Methods
   */

  private findCapableAgents(query: string): AIAgent[] {
    const capable: AIAgent[] = [];
    
    this.agents.forEach((agent, name) => {
      if (agent.canHandle(query)) {
        capable.push(agent);
        
        if (this.config.debugMode) {
          console.log(`✅ AIOrchestrator: ${name} can handle query`);
        }
      }
    });

    if (this.config.debugMode) {
      console.log(`🎯 AIOrchestrator: Found ${capable.length} capable agents`);
    }

    return capable;
  }

  private async processWithAgents(
    agents: AIAgent[], 
    query: string, 
    context?: any
  ): Promise<AIResponse[]> {
    const responses: AIResponse[] = [];

    for (const agent of agents) {
      try {
        const response = await agent.process(query, context);
        
        if (response.confidence >= this.config.confidenceThreshold) {
          responses.push(response);
          
          if (this.config.debugMode) {
            console.log(`✅ AIOrchestrator: ${agent.name} responded with confidence ${response.confidence}`);
          }
        }
      } catch (error) {
        console.error(`❌ AIOrchestrator: Error from ${agent.name}:`, error);
      }
    }

    return responses;
  }

  private coordinateResponses(responses: AIResponse[], query: string): AIResponse {
    if (responses.length === 0) {
      return this.createFallbackResponse(query);
    }

    if (responses.length === 1) {
      return responses[0];
    }

    // Multiple responses - combine intelligently
    const highestConfidence = Math.max(...responses.map(r => r.confidence));
    const primaryResponse = responses.find(r => r.confidence === highestConfidence)!;
    
    // Combine suggestions from all agents
    const allSuggestions = responses
      .flatMap(r => r.suggestions || [])
      .filter((suggestion, index, arr) => arr.indexOf(suggestion) === index); // Remove duplicates

    // Create coordinated response
    const coordinatedResponse: AIResponse = {
      content: this.combineResponseContent(responses, query),
      confidence: highestConfidence,
      source: `Coordinated (${responses.map(r => r.source).join(', ')})`,
      suggestions: allSuggestions,
      data: {
        primarySource: primaryResponse.source,
        allResponses: responses.map(r => ({
          source: r.source,
          confidence: r.confidence,
          content: r.content
        }))
      }
    };

    if (this.config.debugMode) {
      console.log('🤝 AIOrchestrator: Coordinated response from multiple agents');
    }

    return coordinatedResponse;
  }

  private combineResponseContent(responses: AIResponse[], query: string): string {
    const primaryResponse = responses.reduce((prev, current) => 
      prev.confidence > current.confidence ? prev : current
    );

    // For now, return the highest confidence response
    // In the future, this could be more sophisticated combination logic
    return primaryResponse.content;
  }

  private createFallbackResponse(query: string): AIResponse {
    return {
      content: "I understand your question, but I don't have specific information about that right now. Could you try asking about your campaign status, priority tasks, or lead management?",
      confidence: 0.3,
      source: 'Fallback',
      suggestions: [
        "Ask about campaign status",
        "Check priority tasks",
        "Review lead queue",
        "Get performance metrics"
      ]
    };
  }

  private createErrorResponse(query: string, error: any): AIResponse {
    return {
      content: "I encountered an issue processing your request. Please try again or rephrase your question.",
      confidence: 0.1,
      source: 'Error Handler',
      data: { error: error.message }
    };
  }
}

// Export singleton instance
export const aiOrchestrator = new AIOrchestrator({
  debugMode: process.env.NODE_ENV === 'development'
});

export default AIOrchestrator;
export type { AIAgent, AIResponse, OrchestratorConfig };
