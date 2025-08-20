import { useState, useCallback, useEffect } from 'react';
import { Lead, TabType } from '../../../types';
import { LeadManagementState, LeadManagementConfig } from './types';

export interface UseLeadManagementReturn {
  state: LeadManagementState;
  config: LeadManagementConfig;
  updateConfig: (newConfig: Partial<LeadManagementConfig>) => void;
  resetState: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export function useLeadManagement(
  initialConfig?: Partial<LeadManagementConfig>
): UseLeadManagementReturn {
  const [state, setState] = useState<LeadManagementState>({
    isLoading: false,
    error: null,
    lastUpdated: new Date().toISOString()
  });

  const [config, setConfig] = useState<LeadManagementConfig>({
    enableAutoSave: true,
    autoSaveInterval: 30000, // 30 seconds
    enableNotifications: true,
    defaultTab: 'overview',
    ...initialConfig
  });

  const updateConfig = useCallback((newConfig: Partial<LeadManagementConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      lastUpdated: new Date().toISOString()
    });
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({
      ...prev,
      error,
      lastUpdated: new Date().toISOString()
    }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading,
      lastUpdated: new Date().toISOString()
    }));
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (!config.enableAutoSave) return;

    const interval = setInterval(() => {
      // Auto-save logic would go here
      console.log('Auto-saving lead management state...');
    }, config.autoSaveInterval);

    return () => clearInterval(interval);
  }, [config.enableAutoSave, config.autoSaveInterval]);

  return {
    state,
    config,
    updateConfig,
    resetState,
    setError,
    setLoading
  };
}
