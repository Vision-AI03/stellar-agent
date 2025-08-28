import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AttendanceRecord {
  id: string;
  date: string;
  name: string;
  status: 'novo_lead' | 'convertido' | 'em_andamento' | 'resolvido';
}

interface AttendanceTableProps {
  data: AttendanceRecord[];
}

const statusVariants = {
  novo_lead: { label: 'Novo Lead', variant: 'default' as const },
  convertido: { label: 'Convertido', variant: 'default' as const },
  em_andamento: { label: 'Em Andamento', variant: 'secondary' as const },
  resolvido: { label: 'Resolvido', variant: 'outline' as const },
};

const statusColors = {
  novo_lead: 'bg-primary/10 text-primary border-primary/20',
  convertido: 'bg-success/10 text-success border-success/20',
  em_andamento: 'bg-warning/10 text-warning border-warning/20',
  resolvido: 'bg-muted text-muted-foreground border-border',
};

const AttendanceTable = ({ data }: AttendanceTableProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayData = showAll ? data : data.slice(0, 10);

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">
          Últimos Atendimentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Nome do Lead/Cliente</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {record.date}
                  </TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={statusColors[record.status]}
                    >
                      {statusVariants[record.status].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {data.length > 10 && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowAll(!showAll)}
              className="w-full md:w-auto"
            >
              {showAll ? 'Ver Menos' : `Ver Mais (${data.length - 10} restantes)`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceTable;