// src/lib/api.ts
import { DashboardData } from './types';

// URL do seu endpoint local - será algo como: https://seu-dominio.vercel.app/api/dashboard-data
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/api' 
  : 'https://seu-dominio.vercel.app/api'; // SUBSTITUA por sua URL real

export class DashboardAPI {
  static async fetchDashboardData(): Promise<DashboardData> {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard-data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache bust para garantir dados frescos
        cache: 'no-store'
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.log('📭 Nenhum dado disponível ainda, usando dados mockados');
          return this.getMockData();
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 Dados recebidos do endpoint:', data);
      
      return data;
    } catch (error) {
      console.error('❌ Erro ao buscar dados do dashboard:', error);
      // Retorna dados mockados em caso de erro
      return this.getMockData();
    }
  }

  // Método para testar o endpoint (opcional)
  static async testEndpoint(testData: any): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      return response.ok;
    } catch (error) {
      console.error('❌ Erro ao testar endpoint:', error);
      return false;
    }
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
      periodo: 'Novembro (Dados Mock)',
      lastUpdated: new Date().toISOString()
    };
  }
}
