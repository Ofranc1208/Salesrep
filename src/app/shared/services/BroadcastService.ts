/**
 * BroadcastService - Handles cross-tab communication using BroadcastChannel API
 * Extracted from useDataFlow.ts for better separation of concerns
 */

import { BaseLead } from '../types';

// Cross-tab communication using BroadcastChannel
const CHANNEL_NAME = 'lead-management-data-flow';

// Generate unique tab ID to prevent self-broadcast processing
const TAB_ID = `tab_${Date.now()}_${Math.random().toString(36).substring(2)}`;

type BroadcastEventType = 'DATA_UPDATE' | 'ASSIGNMENT_UPDATE' | 'TEMPLATE_UPDATE';

interface BroadcastData {
  leads: BaseLead[];
  stats: any;
}

interface AssignmentData {
  leadId: string;
  repId: string;
  campaignId: string;
  assignedAt: Date;
  leadData?: BaseLead;
}

type BroadcastMessage = {
  type: BroadcastEventType;
  data: BroadcastData | AssignmentData;
  tabId: string; // Include sender tab ID
};

class BroadcastService {
  private channel: BroadcastChannel | null = null;
  private listeners: Map<string, ((data: any) => void)[]> = new Map();

  constructor() {
    this.initializeChannel();
  }

  /**
   * Initialize BroadcastChannel if available
   */
  private initializeChannel(): void {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      console.log('BroadcastService: Channel initialized');
    } else {
      console.warn('BroadcastService: BroadcastChannel not available');
    }
  }

  /**
   * Broadcast data to all tabs
   */
  broadcast(type: BroadcastEventType, data: any): void {
    console.log('BroadcastService: Broadcasting to all tabs:', { type, data, tabId: TAB_ID });
    
    if (this.channel) {
      this.channel.postMessage({ type, data, tabId: TAB_ID });
    } else {
      console.warn('BroadcastService: Channel not available for broadcast');
    }
  }

  /**
   * Subscribe to broadcast messages
   */
  subscribe(eventType: BroadcastEventType, callback: (data: any) => void): () => void {
    console.log('BroadcastService: Subscribing to', eventType);
    
    // Add to local listeners
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)!.push(callback);

    // Set up channel listener if not already done
    if (this.channel && !this.channel.onmessage) {
      this.channel.onmessage = (event: MessageEvent<BroadcastMessage>) => {
        console.log('BroadcastService: Received message:', event.data);
        this.handleBroadcastMessage(event.data);
      };
    }

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(eventType);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }

  /**
   * Handle incoming broadcast messages
   */
  private handleBroadcastMessage(message: BroadcastMessage): void {
    // Ignore messages from this same tab to prevent feedback loops
    if (message.tabId === TAB_ID) {
      console.log('BroadcastService: Ignoring self-broadcast:', message.type);
      return;
    }

    console.log('BroadcastService: Processing message from other tab:', { type: message.type, fromTab: message.tabId });
    
    const listeners = this.listeners.get(message.type);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(message.data);
        } catch (error) {
          console.error(`BroadcastService: Error in listener for ${message.type}:`, error);
        }
      });
    }
  }

  /**
   * Broadcast data update
   */
  broadcastDataUpdate(leads: BaseLead[], stats: any): void {
    this.broadcast('DATA_UPDATE', { leads, stats });
  }

  /**
   * Broadcast assignment update
   */
  broadcastAssignmentUpdate(leadId: string, repId: string, campaignId: string, assignedAt: Date, leadData?: BaseLead): void {
    this.broadcast('ASSIGNMENT_UPDATE', { 
      leadId, 
      repId, 
      campaignId, 
      assignedAt, 
      leadData 
    });
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
    this.listeners.clear();
    console.log('BroadcastService: Cleaned up');
  }
}

// Create singleton instance
export const broadcastService = new BroadcastService();
export default broadcastService;
