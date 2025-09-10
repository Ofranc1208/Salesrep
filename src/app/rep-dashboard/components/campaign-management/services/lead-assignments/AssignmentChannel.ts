/**
 * Assignment Channel - BroadcastChannel communication
 * Focused responsibility: Handle cross-dashboard messaging
 */
export class AssignmentChannel {
  private channel: BroadcastChannel;
  private callbacks: Map<string, Function[]> = new Map();

  constructor() {
    this.channel = new BroadcastChannel('lead-assignment-channel');
    this.setupChannelListener();
  }

  /**
   * Send message through channel
   */
  sendMessage(type: string, data: any): void {
    try {
      this.channel.postMessage({ type, data });
      console.log(`📡 Sent ${type} message`);
    } catch (error) {
      console.error('📡 Error sending message:', error);
    }
  }

  /**
   * Subscribe to message types
   */
  subscribe(event: string, callback: Function): () => void {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.callbacks.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  /**
   * Handle incoming messages
   */
  private setupChannelListener(): void {
    this.channel.onmessage = (event) => {
      const { type, data } = event.data;
      
      console.log(`📡 Received ${type} message`);
      
      // Notify subscribers
      const callbacks = this.callbacks.get(type);
      if (callbacks) {
        callbacks.forEach(callback => {
          try {
            callback(data);
          } catch (error) {
            console.error(`📡 Error in ${type} callback:`, error);
          }
        });
      }
    };
  }

  /**
   * Close channel
   */
  close(): void {
    this.channel.close();
  }
}

export const assignmentChannel = new AssignmentChannel();
