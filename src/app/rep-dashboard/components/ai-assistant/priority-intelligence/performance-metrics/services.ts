// Performance Metrics Services - API Ready
import { Metric, MetricsAPIResponse, MetricUpdatePayload, MetricCreatePayload, MetricFilters } from './types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
const METRICS_ENDPOINT = `${API_BASE_URL}/metrics`;

// Service Class for API Integration
export class MetricsService {
  private static instance: MetricsService;
  private cache: Map<string, MetricsAPIResponse> = new Map();
  private subscribers: Set<(metrics: Metric[]) => void> = new Set();

  static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }

  // Subscribe to real-time updates
  subscribe(callback: (metrics: Metric[]) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  // Notify all subscribers
  private notifySubscribers(metrics: Metric[]) {
    this.subscribers.forEach(callback => callback(metrics));
  }

  // Fetch metrics with filters
  async fetchMetrics(filters: MetricFilters = {}): Promise<MetricsAPIResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.trend) queryParams.append('trend', filters.trend);
      if (filters.performanceThreshold) queryParams.append('performanceThreshold', filters.performanceThreshold);
      if (filters.dateRange) {
        queryParams.append('startDate', filters.dateRange.start.toISOString());
        queryParams.append('endDate', filters.dateRange.end.toISOString());
      }

      const cacheKey = queryParams.toString();
      
      // Check cache first
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey)!;
      }

      // In development, return mock data
      if (process.env.NODE_ENV === 'development') {
        const mockResponse = this.getMockMetrics(filters);
        this.cache.set(cacheKey, mockResponse);
        return mockResponse;
      }

      // Production API call
      const response = await fetch(`${METRICS_ENDPOINT}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.statusText}`);
      }

      const data: MetricsAPIResponse = await response.json();
      this.cache.set(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      // Fallback to mock data on error
      return this.getMockMetrics(filters);
    }
  }

  // Update metric
  async updateMetric(payload: MetricUpdatePayload): Promise<boolean> {
    try {
      // In development, simulate update
      if (process.env.NODE_ENV === 'development') {
        // Clear cache to force refresh
        this.cache.clear();
        return true;
      }

      // Production API call
      const response = await fetch(`${METRICS_ENDPOINT}/${payload.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to update metric: ${response.statusText}`);
      }

      // Clear cache to force refresh
      this.cache.clear();
      return true;
    } catch (error) {
      console.error('Error updating metric:', error);
      return false;
    }
  }

  // Create new metric
  async createMetric(payload: MetricCreatePayload): Promise<Metric | null> {
    try {
      // In development, simulate creation
      if (process.env.NODE_ENV === 'development') {
        const newMetric: Metric = {
          id: Date.now().toString(),
          ...payload,
          trend: 'stable',
          change: 0,
          lastUpdated: new Date()
        };
        
        // Clear cache to force refresh
        this.cache.clear();
        return newMetric;
      }

      // Production API call
      const response = await fetch(METRICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to create metric: ${response.statusText}`);
      }

      const newMetric: Metric = await response.json();
      
      // Clear cache to force refresh
      this.cache.clear();
      return newMetric;
    } catch (error) {
      console.error('Error creating metric:', error);
      return null;
    }
  }

  // Generate performance report
  async generateReport(filters: MetricFilters = {}): Promise<any> {
    try {
      // In development, return mock report
      if (process.env.NODE_ENV === 'development') {
        return {
          id: Date.now().toString(),
          title: 'Performance Report',
          generatedAt: new Date(),
          period: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            end: new Date()
          },
          insights: [
            'Response time has improved by 15% this month',
            'Conversion rate is above target for hot leads',
            'Document completion rate needs attention'
          ],
          recommendations: [
            'Focus on improving document completion workflow',
            'Maintain current response time standards',
            'Consider increasing warm lead engagement frequency'
          ]
        };
      }

      // Production API call
      const response = await fetch(`${METRICS_ENDPOINT}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate report: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating report:', error);
      return null;
    }
  }

  // WebSocket connection for real-time updates
  connectWebSocket(): void {
    if (typeof window === 'undefined') return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/metrics';
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'metrics_update') {
          this.cache.clear(); // Invalidate cache
          this.notifySubscribers(data.metrics);
        }
      };

      ws.onerror = (error) => {
        console.warn('Metrics WebSocket connection failed, falling back to polling:', error);
        this.startPolling();
      };
    } catch (error) {
      console.warn('Metrics WebSocket not available, using polling:', error);
      this.startPolling();
    }
  }

  // Fallback polling for real-time updates
  private startPolling(): void {
    setInterval(async () => {
      try {
        const response = await this.fetchMetrics();
        this.notifySubscribers(response.metrics);
      } catch (error) {
        console.error('Metrics polling error:', error);
      }
    }, 300000); // Poll every 5 minutes
  }

  // Mock data for development
  private getMockMetrics(filters: MetricFilters): MetricsAPIResponse {
    const mockMetrics: Metric[] = [
      {
        id: '1',
        name: 'Response Time',
        value: 2.3,
        target: 1.0,
        unit: 'hours',
        trend: 'down',
        change: -15,
        priority: 'hot',
        category: 'response',
        lastUpdated: new Date()
      },
      {
        id: '2',
        name: 'Conversion Rate',
        value: 45,
        target: 40,
        unit: '%',
        trend: 'up',
        change: 12,
        priority: 'hot',
        category: 'conversion',
        lastUpdated: new Date()
      },
      {
        id: '3',
        name: 'Document Completion',
        value: 78,
        target: 85,
        unit: '%',
        trend: 'up',
        change: 8,
        priority: 'active',
        category: 'quality',
        lastUpdated: new Date()
      },
      {
        id: '4',
        name: 'Court Success Rate',
        value: 92,
        target: 90,
        unit: '%',
        trend: 'stable',
        change: 0,
        priority: 'active',
        category: 'quality',
        lastUpdated: new Date()
      }
    ];

    // Apply filters
    let filteredMetrics = mockMetrics;
    
    if (filters.priority) {
      filteredMetrics = filteredMetrics.filter(m => m.priority === filters.priority);
    }
    
    if (filters.category) {
      filteredMetrics = filteredMetrics.filter(m => m.category === filters.category);
    }
    
    if (filters.trend) {
      filteredMetrics = filteredMetrics.filter(m => m.trend === filters.trend);
    }

    const calculatePerformance = (value: number, target: number) => (value / target) * 100;

    const stats = {
      totalMetrics: filteredMetrics.length,
      overallScore: Math.round(
        filteredMetrics.reduce((acc, m) => acc + calculatePerformance(m.value, m.target), 0) / filteredMetrics.length
      ),
      metricsAboveTarget: filteredMetrics.filter(m => m.value >= m.target).length,
      metricsBelowTarget: filteredMetrics.filter(m => m.value < m.target).length,
      averagePerformance: Math.round(
        filteredMetrics.reduce((acc, m) => acc + calculatePerformance(m.value, m.target), 0) / filteredMetrics.length
      ),
      byPriority: {
        hot: {
          count: filteredMetrics.filter(m => m.priority === 'hot').length,
          averageScore: 78
        },
        active: {
          count: filteredMetrics.filter(m => m.priority === 'active').length,
          averageScore: 85
        },
        warm: {
          count: filteredMetrics.filter(m => m.priority === 'warm').length,
          averageScore: 71
        },
        prospect: {
          count: filteredMetrics.filter(m => m.priority === 'prospect').length,
          averageScore: 68
        },
        overall: {
          count: filteredMetrics.filter(m => m.priority === 'overall').length,
          averageScore: 76
        }
      },
      byCategory: {
        response: filteredMetrics.filter(m => m.category === 'response').length,
        conversion: filteredMetrics.filter(m => m.category === 'conversion').length,
        quality: filteredMetrics.filter(m => m.category === 'quality').length,
        efficiency: filteredMetrics.filter(m => m.category === 'efficiency').length
      },
      trends: {
        improving: filteredMetrics.filter(m => m.trend === 'up').length,
        declining: filteredMetrics.filter(m => m.trend === 'down').length,
        stable: filteredMetrics.filter(m => m.trend === 'stable').length
      }
    };

    return {
      metrics: filteredMetrics,
      stats,
      hasMore: false
    };
  }
}
