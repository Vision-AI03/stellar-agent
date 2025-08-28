import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

const MetricCard = ({ title, value, change, icon: Icon, color = 'blue' }: MetricCardProps) => {
  const isPositive = change >= 0;
  
  const colorClasses = {
    blue: 'text-primary',
    green: 'text-success',
    orange: 'text-warning',
    purple: 'text-purple-600',
    red: 'text-destructive'
  };

  const backgroundClasses = {
    blue: 'bg-primary/10',
    green: 'bg-success/10',
    orange: 'bg-warning/10',
    purple: 'bg-purple-100',
    red: 'bg-destructive/10'
  };

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {value}
            </p>
            <div className="flex items-center mt-2">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-success mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive mr-1" />
              )}
              <span className={`text-sm font-medium ${
                isPositive ? 'text-success' : 'text-destructive'
              }`}>
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                vs mês anterior
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${backgroundClasses[color]}`}>
            <Icon className={`h-6 w-6 ${colorClasses[color]}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;