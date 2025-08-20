// Performance Metrics Types
export interface Metric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  priority: 'hot' | 'active' | 'warm' | 'prospect' | 'overall';
  category?: 'response' | 'conversion' | 'quality' | 'efficiency';
  description?: string;
  lastUpdated?: Date;
  metadata?: {
    benchmark?: number;
    industryAverage?: number;
    historicalData?: Array<{
      date: Date;
      value: number;
    }>;
    [key: string]: any;
  };
}

export interface MetricFilters {
  priority?: 'hot' | 'active' | 'warm' | 'prospect' | 'overall' | null;
  category?: 'response' | 'conversion' | 'quality' | 'efficiency' | null;
  trend?: 'up' | 'down' | 'stable' | null;
  performanceThreshold?: 'above' | 'below' | 'meeting' | null;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface MetricStats {
  totalMetrics: number;
  overallScore: number;
  metricsAboveTarget: number;
  metricsBelowTarget: number;
  averagePerformance: number;
  byPriority: {
    hot: {
      count: number;
      averageScore: number;
    };
    active: {
      count: number;
      averageScore: number;
    };
    warm: {
      count: number;
      averageScore: number;
    };
    prospect: {
      count: number;
      averageScore: number;
    };
    overall: {
      count: number;
      averageScore: number;
    };
  };
  byCategory: {
    response: number;
    conversion: number;
    quality: number;
    efficiency: number;
  };
  trends: {
    improving: number;
    declining: number;
    stable: number;
  };
}

export interface PerformanceMetricsProps {
  selectedPriority: 'hot' | 'active' | 'warm' | 'prospect' | null;
}

// API Response Types
export interface MetricsAPIResponse {
  metrics: Metric[];
  stats: MetricStats;
  hasMore: boolean;
  nextCursor?: string;
}

export interface MetricUpdatePayload {
  id: string;
  value?: number;
  target?: number;
  notes?: string;
}

export interface MetricCreatePayload {
  name: string;
  value: number;
  target: number;
  unit: string;
  priority: Metric['priority'];
  category?: Metric['category'];
  description?: string;
}

// Dashboard Configuration Types
export interface DashboardConfig {
  defaultMetrics: string[]; // Metric IDs to show by default
  refreshInterval: number; // In milliseconds
  alertThresholds: {
    critical: number; // Performance percentage below which to alert
    warning: number;
  };
  chartSettings: {
    showTrends: boolean;
    timeRange: '24h' | '7d' | '30d' | '90d';
    chartType: 'line' | 'bar' | 'area';
  };
}

// Report Types
export interface PerformanceReport {
  id: string;
  title: string;
  generatedAt: Date;
  period: {
    start: Date;
    end: Date;
  };
  metrics: Metric[];
  stats: MetricStats;
  insights: string[];
  recommendations: string[];
  charts?: {
    type: string;
    data: any;
    config: any;
  }[];
}
