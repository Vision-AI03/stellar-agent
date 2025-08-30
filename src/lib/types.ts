// src/lib/types.ts
export interface DashboardMetrics {
  tempoMedioResposta: {
    valor: number;
    unidade: string;
    variacao: number;
  };
  totalAtendimentos: {
    valor: number;
    variacao: number;
  };
  leadsCaptados: {
    valor: number;
    variacao: number;
  };
  conversoes: {
    valor: number;
    variacao: number;
  };
  satisfacao: {
    valor: number;
    variacao: number;
  };
}

export interface AtendimentosPorSemana {
  semana: string;
  atendimentos: number;
}

export interface UltimoAtendimento {
  data: string;
  nomeCliente: string;
  status: 'Convertido' | 'Novo Lead' | 'Em Andamento' | 'Resolvido';
}

export interface DashboardData {
  metricas: DashboardMetrics;
  atendimentosPorSemana: AtendimentosPorSemana[];
  ultimosAtendimentos: UltimoAtendimento[];
  periodo: string;
}
