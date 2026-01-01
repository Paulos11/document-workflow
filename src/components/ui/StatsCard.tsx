import type { ComponentType } from 'react';

interface Trend {
  value: number;
  isPositive: boolean;
}

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
  trend?: Trend;
  color?: string;
  bgColor?: string;
}

export function StatsCard({ label, value, icon: Icon, trend, color, bgColor }: StatsCardProps) {
  return (
    <div className="bg-white border border-neutral-border rounded-lg p-4 shadow-small hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-body-small text-text-muted font-medium mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-text-high tracking-tight">{value}</h3>

          {trend && (
            <div className={`flex items-center gap-1 mt-1.5 text-caption font-medium ${trend.isPositive ? 'text-status-success' : 'text-status-error'
              }`}>
              <span>{trend.value}%</span>
              <span className="text-text-muted font-normal">from last month</span>
            </div>
          )}
        </div>

        <div className={`p-2 rounded-lg ${bgColor || 'bg-neutral-subtle'} group-hover:scale-105 transition-transform duration-200`}>
          <Icon className={`w-4 h-4 ${color ? color.split(' ')[1] : 'text-brand-primary'}`} />
        </div>
      </div>
    </div>
  );
}
