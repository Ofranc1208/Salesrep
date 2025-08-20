// Calendar Updates Hooks
import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent, CalendarFilters, CalendarStats } from './types';
import { CalendarService } from './services';

// Main hook for calendar management
export const useCalendarEvents = (filters: CalendarFilters = {}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [stats, setStats] = useState<CalendarStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calendarService = CalendarService.getInstance();

  // Fetch calendar events
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await calendarService.fetchEvents(filters);
      setEvents(response.events);
      setStats(response.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch calendar events');
    } finally {
      setLoading(false);
    }
  }, [filters, calendarService]);

  // Update event status
  const updateEventStatus = useCallback(async (eventId: string, status: CalendarEvent['status']) => {
    try {
      const success = await calendarService.updateEvent({
        id: eventId,
        status
      });
      
      if (success) {
        setEvents(prev => 
          prev.map(e => e.id === eventId ? { ...e, status } : e)
        );
        
        // Update stats
        if (stats) {
          // Recalculate stats based on new status
          fetchEvents();
        }
      }
    } catch (err) {
      console.error('Failed to update event status:', err);
    }
  }, [calendarService, stats, fetchEvents]);

  // Mark event as completed
  const markEventCompleted = useCallback(async (eventId: string) => {
    await updateEventStatus(eventId, 'completed');
  }, [updateEventStatus]);

  // Reschedule event
  const rescheduleEvent = useCallback(async (eventId: string, newDate: string, newTime: string) => {
    try {
      const success = await calendarService.updateEvent({
        id: eventId,
        date: newDate,
        time: newTime
      });
      
      if (success) {
        setEvents(prev => 
          prev.map(e => e.id === eventId ? { ...e, date: newDate, time: newTime } : e)
        );
      }
    } catch (err) {
      console.error('Failed to reschedule event:', err);
    }
  }, [calendarService]);

  // Refresh events
  const refresh = useCallback(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Initial fetch and real-time subscription
  useEffect(() => {
    fetchEvents();

    // Subscribe to real-time updates
    const unsubscribe = calendarService.subscribe((updatedEvents) => {
      setEvents(updatedEvents);
    });

    // Connect WebSocket for real-time updates
    calendarService.connectWebSocket();

    return unsubscribe;
  }, [fetchEvents, calendarService]);

  return {
    events,
    stats,
    loading,
    error,
    updateEventStatus,
    markEventCompleted,
    rescheduleEvent,
    refresh
  };
};

// Hook for calendar filtering
export const useCalendarFilters = (initialFilters: CalendarFilters = {}) => {
  const [filters, setFilters] = useState<CalendarFilters>(initialFilters);

  const updateFilter = useCallback((key: keyof CalendarFilters, value: any) => {
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

// Hook for calendar stats
export const useCalendarStats = () => {
  const [stats, setStats] = useState<CalendarStats | null>(null);
  const [loading, setLoading] = useState(true);

  const calendarService = CalendarService.getInstance();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await calendarService.fetchEvents();
        setStats(response.stats);
      } catch (err) {
        console.error('Failed to fetch calendar stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Subscribe to updates
    const unsubscribe = calendarService.subscribe(() => {
      fetchStats();
    });

    return unsubscribe;
  }, [calendarService]);

  return { stats, loading };
};

// Hook for upcoming events count
export const useUpcomingEventsCount = (priority?: 'hot' | 'active' | 'warm' | 'prospect') => {
  const [count, setCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);

  const { events, loading } = useCalendarEvents(
    priority ? { priority } : {}
  );

  useEffect(() => {
    if (!loading) {
      setCount(events.filter(e => e.status === 'upcoming').length);
      setOverdueCount(events.filter(e => e.status === 'overdue').length);
    }
  }, [events, loading]);

  return { count, overdueCount, loading };
};

// Hook for today's events
export const useTodaysEvents = () => {
  const [todaysEvents, setTodaysEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const { events } = useCalendarEvents();

  useEffect(() => {
    const today = new Date().toDateString();
    const filtered = events.filter(event => {
      // Simple check for "Today" or current date
      return event.date === 'Today' || new Date(event.date).toDateString() === today;
    });
    
    setTodaysEvents(filtered);
    setLoading(false);
  }, [events]);

  return { todaysEvents, loading };
};
