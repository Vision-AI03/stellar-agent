// src/components/Dashboard.tsx
import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { DashboardMetrics } from './DashboardMetrics';
import { AttendanceChart } from './AttendanceChart';
import { RecentAttendances } from './RecentAttendances';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface DashboardProps {
  autoRefresh?: boolean;
  refreshInterval?: number; // em milissegundos
}

export function Dashboard({ autoRefresh = true, refreshInterval = 5 * 60 * 1000 }: DashboardProps) {
  const { data, loading, error, refetch, lastUpdated } = useDashboardData(autoRefresh, refreshInterval);

  if (loading && !data) {
    return <LoadingSpinner />;
  }

  if (error && !data) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={refetch}
      />
    );
  }

  if (!data) {
    return <div>Nenhum dado disponível</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Header do Dashboard */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>IA Agent - Clínica X</h1>
          <div className="dashboard-period">
            Período: {data.periodo}
          </div>
        </div>
        
        <div className="dashboard-actions">
          {lastUpdated && (
            <div className="last-updated">
              Última atualização: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          <button 
            onClick={refetch} 
            disabled={loading}
            className="refresh-button"
          >
            {loading ? 'Atualizando...' : 'Atualizar'}
          </button>
        </div>
      </div>

      {/* Métricas Principais */}
      <DashboardMetrics metrics={data.metricas} />

      {/* Gráficos e Tabelas */}
      <div className="dashboard-content">
        <div className="chart-section">
          <AttendanceChart data={data.atendimentosPorSemana} />
        </div>
        
        <div className="table-section">
          <RecentAttendances attendances={data.ultimosAtendimentos} />
        </div>
      </div>

      {/* Indicador de erro (se houver erro mas ainda temos dados) */}
      {error && data && (
        <div className="error-toast">
          Erro ao atualizar dados: {error}
        </div>
      )}
    </div>
  );
}
