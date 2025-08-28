import { useState } from 'react';
import Header from '@/components/layout/Header';
import MetricCard from '@/components/dashboard/MetricCard';
import WeeklyChart from '@/components/dashboard/WeeklyChart';
import AttendanceTable from '@/components/dashboard/AttendanceTable';
import { 
  Clock, 
  Users, 
  UserPlus, 
  TrendingUp, 
  ThumbsUp 
} from 'lucide-react';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('11'); // Novembro

  // Dados mockados que mudam baseado no mês
  const getMonthData = (month: string) => {
    const baseData = {
      responseTime: { value: '12s', change: 8.5 },
      totalAttendances: { value: '350', change: 12.3 },
      leads: { value: '75', change: -5.2 },
      conversions: { value: '22', change: 15.7 },
      satisfaction: { value: '92%', change: 3.1 },
      weeklyData: [
        { week: 'Semana 1', atendimentos: 80 },
        { week: 'Semana 2', atendimentos: 95 },
        { week: 'Semana 3', atendimentos: 90 },
        { week: 'Semana 4', atendimentos: 85 },
      ],
      attendanceRecords: [
        { id: '1', date: '2024-11-25', name: 'João Silva', status: 'convertido' as const },
        { id: '2', date: '2024-11-24', name: 'Maria Santos', status: 'novo_lead' as const },
        { id: '3', date: '2024-11-24', name: 'Pedro Oliveira', status: 'em_andamento' as const },
        { id: '4', date: '2024-11-23', name: 'Ana Costa', status: 'resolvido' as const },
        { id: '5', date: '2024-11-23', name: 'Carlos Mendes', status: 'convertido' as const },
        { id: '6', date: '2024-11-22', name: 'Lucia Ferreira', status: 'novo_lead' as const },
        { id: '7', date: '2024-11-22', name: 'Rafael Lima', status: 'em_andamento' as const },
        { id: '8', date: '2024-11-21', name: 'Beatriz Alves', status: 'resolvido' as const },
        { id: '9', date: '2024-11-21', name: 'Gabriel Rocha', status: 'convertido' as const },
        { id: '10', date: '2024-11-20', name: 'Fernanda Cruz', status: 'novo_lead' as const },
        { id: '11', date: '2024-11-20', name: 'Roberto Dias', status: 'em_andamento' as const },
        { id: '12', date: '2024-11-19', name: 'Patricia Souza', status: 'resolvido' as const },
        { id: '13', date: '2024-11-19', name: 'Bruno Cardoso', status: 'convertido' as const },
        { id: '14', date: '2024-11-18', name: 'Camila Ribeiro', status: 'novo_lead' as const },
        { id: '15', date: '2024-11-18', name: 'Diego Martins', status: 'em_andamento' as const },
      ]
    };

    // Simular variação nos dados baseado no mês
    if (month !== '11') {
      const variation = Math.random() * 0.3 - 0.15; // -15% a +15%
      return {
        ...baseData,
        totalAttendances: { 
          ...baseData.totalAttendances, 
          value: Math.round(350 * (1 + variation)).toString() 
        },
        leads: { 
          ...baseData.leads, 
          value: Math.round(75 * (1 + variation)).toString() 
        },
        conversions: { 
          ...baseData.conversions, 
          value: Math.round(22 * (1 + variation)).toString() 
        },
        weeklyData: baseData.weeklyData.map(week => ({
          ...week,
          atendimentos: Math.round(week.atendimentos * (1 + variation))
        }))
      };
    }

    return baseData;
  };

  const data = getMonthData(selectedMonth);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedMonth={selectedMonth} 
        onMonthChange={setSelectedMonth} 
      />
      
      <main className="container mx-auto p-4 space-y-6">
        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Tempo Médio de Resposta"
            value={data.responseTime.value}
            change={data.responseTime.change}
            icon={Clock}
            color="blue"
          />
          <MetricCard
            title="Total de Atendimentos"
            value={data.totalAttendances.value}
            change={data.totalAttendances.change}
            icon={Users}
            color="green"
          />
          <MetricCard
            title="Leads Captados"
            value={data.leads.value}
            change={data.leads.change}
            icon={UserPlus}
            color="orange"
          />
          <MetricCard
            title="Conversões"
            value={data.conversions.value}
            change={data.conversions.change}
            icon={TrendingUp}
            color="purple"
          />
          <MetricCard
            title="Satisfação"
            value={data.satisfaction.value}
            change={data.satisfaction.change}
            icon={ThumbsUp}
            color="green"
          />
        </div>

        {/* Gráfico e Tabela */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyChart data={data.weeklyData} />
          <AttendanceTable data={data.attendanceRecords} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;