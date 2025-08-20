// Performance Metrics Hooks
import { useState, useEffect, useCallback } from 'react';
import { Metric, MetricFilters, MetricStats } from './types';
import { MetricsService } from './services';

// Main hook for metrics management
export const usePerformanceMetrics = (filters: MetricFilters = {}) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [stats, setStats] = useState<MetricStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const metricsService = MetricsService.getInstance();

  // Fetch metrics
  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await metricsService.fetchMetrics(filters);
      setMetrics(response.metrics);
      setStats(response.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  }, [filters, metricsService]);

  // Update metric value
  const updateMetricValue = useCallback(async (metricId: string, value: number) => {
    try {
      const success = await metricsService.updateMetric({
        id: metricId,
        value
      });
      
      if (success) {
        setMetrics(prev => 
          prev.map(m => m.id === metricId ? { ...m, value, lastUpdated: new Date() } : m)
        );
        
        // Refresh to update stats
        fetchMetrics();
      }
    } catch (err) {
      console.error('Failed to update metric value:', err);
    }
  }, [metricsService, fetchMetrics]);

  // Update metric target
  const updateMetricTarget = useCallback(async (metricId: string, target: number) => {
    try {
      const success = await metricsService.updateMetric({
        id: metricId,
        target
      });
      
      if (success) {
        setMetrics(prev => 
          prev.map(m => m.id === metricId ? { ...m, target } : m)
        );
        
        // Refresh to update stats
        fetchMetrics();
      }
    } catch (err) {
      console.error('Failed to update metric target:', err);
    }
  }, [metricsService, fetchMetrics]);

  // Generate performance report
  const generateReport = useCallback(async () => {
    try {
      const report = await metricsService.generateReport(filters);
      return report;
    } catch (err) {
      console.error('Failed to generate report:', err);
      return null;
    }
  }, [metricsService, filters]);

  // Refresh metrics
  const refresh = useCallback(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  // Initial fetch and real-time subscription
  useEffect(() => {
    fetchMetrics();

    // Subscribe to real-time updates
    const unsubscribe = metricsService.subscribe((updatedMetrics) => {
      setMetrics(updatedMetrics);
    });

    // Connect WebSocket for real-time updates
    metricsService.connectWebSocket();

    return unsubscribe;
  }, [fetchMetrics, metricsService]);

  return {
    metrics,
    stats,
    loading,
    error,
    updateMetricValue,
    updateMetricTarget,
    generateReport,
    refresh
  };
};

// Hook for metric filtering
export const useMetricFilters = (initialFilters: MetricFilters = {}) => {
  const [filters, setFilters] = useState<MetricFilters>(initialFilters);

  const updateFilter = useCallback((key: keyof MetricFilters, value: any) => {
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

// Hook for metric stats
export const useMetricStats = () => {
  const [stats, setStats] = useState<MetricStats | null>(null);
  const [loading, setLoading] = useState(true);

  const metricsService = MetricsService.getInstance();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await metricsService.fetchMetrics();
        setStats(response.stats);
      } catch (err) {
        console.error('Failed to fetch metric stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Subscribe to updates
    const unsubscribe = metricsService.subscribe(() => {
      fetchStats();
    });

    return unsubscribe;
  }, [metricsService]);

  return { stats, loading };
};

// Hook for priority-specific metrics
export const usePriorityMetrics = (priority: 'hot' | 'active' | 'warm' | 'prospect') => {
  const [priorityMetrics, setPriorityMetrics] = useState<Metric[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  const { metrics, loading } = usePerformanceMetrics({ priority });

  useEffect(() => {
    if (!loading) {
      setPriorityMetrics(metrics);
      
      // Calculate overall score for this priority
      if (metrics.length > 0) {
        const score = Math.round(
          metrics.reduce((acc, metric) => 
            acc + ((metric.value / metric.target) * 100), 0
          ) / metrics.length
        );
        setOverallScore(score);
      }
    }
  }, [metrics, loading]);

  return { priorityMetrics, overallScore, loading };
};

// Hook for performance alerts
export const usePerformanceAlerts = (thresholds = { critical: 60, warning: 80 }) => {
  const [alerts, setAlerts] = useState<{
    critical: Metric[];
    warning: Metric[];
  }>({ critical: [], warning: [] });

  const { metrics, loading } = usePerformanceMetrics();

  useEffect(() => {
    if (!loading) {
      const critical: Metric[] = [];
      const warning: Metric[] = [];

      metrics.forEach(metric => {
        const performance = (metric.value / metric.target) * 100;
        
        if (performance < thresholds.critical) {
          critical.push(metric);
        } else if (performance < thresholds.warning) {
          warning.push(metric);
        }
      });

      setAlerts({ critical, warning });
    }
  }, [metrics, loading, thresholds]);

  return { alerts, loading };
};

// Hook for metric trends
export const useMetricTrends = () => {
  const [trends, setTrends] = useState<{
    improving: Metric[];
    declining: Metric[];
    stable: Metric[];
  }>({ improving: [], declining: [], stable: [] });

  const { metrics, loading } = usePerformanceMetrics();

  useEffect(() => {
    if (!loading) {
      const improving = metrics.filter(m => m.trend === 'up');
      const declining = metrics.filter(m => m.trend === 'down');
      const stable = metrics.filter(m => m.trend === 'stable');

      setTrends({ improving, declining, stable });
    }
  }, [metrics, loading]);

  return { trends, loading };
};
