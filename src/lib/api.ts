// src/lib/api.ts
import { DashboardData } from './types';

// URL do seu HTTP Request (substitua pela URL real)
const API_BASE_URL = 'https://hooks.zapier.com/hooks/catch/sua-url-aqui';

export class DashboardAPI {
  static async fetchDashboardData(): Promise<DashboardData> {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard-data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.transformData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
      // Retorna dados mockados em caso de erro
      return this.getMockData();
    }
  }

  // Transforma os dados recebidos da API para o formato esperado
  private static transformData(rawData: any): DashboardData {
    return {
      metricas: {
        tempoMedioResposta: {
          valor: rawData.tempo_medio || 12,
          unidade: 's',
          variacao: rawData.variacao_tempo || 8.5
        },
        totalAtendimentos: {
          valor: rawData.total_atendimentos || 350,
          variacao: rawData.variacao_atendimentos || 12.3
        },
        leadsCaptados: {
          valor: rawData.leads_captados || 75,
          variacao: rawData.variacao_leads || -5.2
        },
        conversoes: {
          valor: rawData.conversoes || 22,
          variacao: rawData.variacao_conversoes || 15.7
        },
        satisfacao: {
          valor: rawData.satisfacao || 92,
          variacao: rawData.variacao_satisfacao || 3.1
        }
      },
      atendimentosPorSemana: rawData.atendimentos_semana || [
        { semana: 'Semana 1', atendimentos: 80 },
        { semana: 'Semana 2', atendimentos: 95 },
        { semana: 'Semana 3', atendimentos: 87 },
        { semana: 'Semana 4', atendimentos: 82 }
      ],
      ultimosAtendimentos: rawData.ultimos_atendimentos || [
        { data: '2024-11-25', nomeCliente: 'João Silva', status: 'Convertido' },
        { data: '2024-11-24', nomeCliente: 'Maria Santos', status: 'Novo Lead' },
        { data: '2024-11-24', nomeCliente: 'Pedro Oliveira', status: 'Em Andamento' },
        { data: '2024-11-23', nomeCliente: 'Ana Costa', status: 'Resolvido' },
        { data: '2024-11-23', nomeCliente: 'Carlos Mendes', status: 'Convertido' }
      ],
      periodo: rawData.periodo || 'Novembro'
    };
  }

  // Dados mockados para desenvolvimento/fallback
  private static getMockData(): DashboardData {
    return {
      metricas: {
        tempoMedioResposta: { valor: 12, unidade: 's', variacao: 8.5 },
        totalAtendimentos: { valor: 350, variacao: 12.3 },
        leadsCaptados: { valor: 75, variacao: -5.2 },
        conversoes: { valor: 22, variacao: 15.7 },
        satisfacao: { valor: 92, variacao: 3.1 }
      },
      atendimentosPorSemana: [
        { semana: 'Semana 1', atendimentos: 80 },
        { semana: 'Semana 2', atendimentos: 95 },
        { semana: 'Semana 3', atendimentos: 87 },
        { semana: 'Semana 4', atendimentos: 82 }
      ],
      ultimosAtendimentos: [
        { data: '2024-11-25', nomeCliente: 'João Silva', status: 'Convertido' },
        { data: '2024-11-24', nomeCliente: 'Maria Santos', status: 'Novo Lead' },
        { data: '2024-11-24', nomeCliente: 'Pedro Oliveira', status: 'Em Andamento' },
        { data: '2024-11-23', nomeCliente: 'Ana Costa', status: 'Resolvido' },
        { data: '2024-11-23', nomeCliente: 'Carlos Mendes', status: 'Convertido' }
      ],
      periodo: 'Novembro'
    };
  }

  // Método para enviar dados via POST (se necessário)
  static async sendDashboardData(data: any): Promise<boolean> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      return false;
    }
  }
}
