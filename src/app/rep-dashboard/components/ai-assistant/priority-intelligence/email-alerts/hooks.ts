// Email Alerts Hooks
import { useState, useEffect, useCallback } from 'react';
import { EmailAlert, EmailFilters, EmailStats } from './types';
import { EmailService } from './services';

// Main hook for email management
export const useEmailAlerts = (filters: EmailFilters = {}) => {
  const [emails, setEmails] = useState<EmailAlert[]>([]);
  const [stats, setStats] = useState<EmailStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const emailService = EmailService.getInstance();

  // Fetch emails
  const fetchEmails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await emailService.fetchEmails(filters);
      setEmails(response.emails);
      setStats(response.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  }, [filters, emailService]);

  // Mark email as read
  const markAsRead = useCallback(async (emailId: string) => {
    try {
      const success = await emailService.updateEmail({
        id: emailId,
        read: true
      });
      
      if (success) {
        setEmails(prev => 
          prev.map(e => e.id === emailId ? { ...e, read: true } : e)
        );
        
        // Update stats
        if (stats) {
          setStats(prev => prev ? { ...prev, unread: prev.unread - 1 } : null);
        }
      }
    } catch (err) {
      console.error('Failed to mark email as read:', err);
    }
  }, [emailService, stats]);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    try {
      const success = await emailService.markAllAsRead(filters);
      
      if (success) {
        setEmails(prev => prev.map(e => ({ ...e, read: true })));
        
        // Update stats
        if (stats) {
          setStats(prev => prev ? { ...prev, unread: 0 } : null);
        }
      }
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  }, [emailService, filters, stats]);

  // Archive email
  const archiveEmail = useCallback(async (emailId: string) => {
    try {
      const success = await emailService.updateEmail({
        id: emailId,
        archived: true
      });
      
      if (success) {
        setEmails(prev => prev.filter(e => e.id !== emailId));
      }
    } catch (err) {
      console.error('Failed to archive email:', err);
    }
  }, [emailService]);

  // Refresh emails
  const refresh = useCallback(() => {
    fetchEmails();
  }, [fetchEmails]);

  // Initial fetch and real-time subscription
  useEffect(() => {
    fetchEmails();

    // Subscribe to real-time updates
    const unsubscribe = emailService.subscribe((updatedEmails) => {
      setEmails(updatedEmails);
    });

    // Connect WebSocket for real-time updates
    emailService.connectWebSocket();

    return unsubscribe;
  }, [fetchEmails, emailService]);

  return {
    emails,
    stats,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    archiveEmail,
    refresh
  };
};

// Hook for email filtering
export const useEmailFilters = (initialFilters: EmailFilters = {}) => {
  const [filters, setFilters] = useState<EmailFilters>(initialFilters);

  const updateFilter = useCallback((key: keyof EmailFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const resetToInitial = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return {
    filters,
    updateFilter,
    clearFilters,
    resetToInitial,
    setFilters
  };
};

// Hook for email stats
export const useEmailStats = () => {
  const [stats, setStats] = useState<EmailStats | null>(null);
  const [loading, setLoading] = useState(true);

  const emailService = EmailService.getInstance();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await emailService.fetchEmails();
        setStats(response.stats);
      } catch (err) {
        console.error('Failed to fetch email stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Subscribe to updates
    const unsubscribe = emailService.subscribe(() => {
      fetchStats();
    });

    return unsubscribe;
  }, [emailService]);

  return { stats, loading };
};

// Hook for unread email count
export const useUnreadEmailCount = (priority?: 'hot' | 'active' | 'warm' | 'prospect') => {
  const [count, setCount] = useState(0);
  const [urgentCount, setUrgentCount] = useState(0);

  const { emails, loading } = useEmailAlerts(
    priority ? { priority } : {}
  );

  useEffect(() => {
    if (!loading) {
      setCount(emails.filter(e => !e.read).length);
      setUrgentCount(emails.filter(e => e.urgent && !e.read).length);
    }
  }, [emails, loading]);

  return { count, urgentCount, loading };
};

// Hook for composing emails
export const useEmailComposer = () => {
  const [isComposing, setIsComposing] = useState(false);
  const [sending, setSending] = useState(false);

  const emailService = EmailService.getInstance();

  const composeEmail = useCallback(async (payload: any) => {
    try {
      setSending(true);
      const success = await emailService.composeEmail(payload);
      
      if (success) {
        setIsComposing(false);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to send email:', err);
      return false;
    } finally {
      setSending(false);
    }
  }, [emailService]);

  return {
    isComposing,
    setIsComposing,
    sending,
    composeEmail
  };
};
