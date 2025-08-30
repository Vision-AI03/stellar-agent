// src/hooks/useDashboardData.ts
import { useState, useEffect, useCallback } from 'react';
import { DashboardData } from '../lib/types';
import { DashboardAPI } from '../lib/api';

interface UseDashboardDataResult {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

export function useDashboardData(
  autoRefresh = true,
  refreshInterval = 5 * 60 * 1000 // 5 minutos por padrão
): UseDashboardDataResult {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const dashboardData = await DashboardAPI.fetchDashboardData();
      setData(dashboardData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao carregar dados do dashboard:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para forçar atualização dos dados
  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Efeito inicial - carrega os dados quando o componente monta
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Efeito para auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    lastUpdated
  };
}
