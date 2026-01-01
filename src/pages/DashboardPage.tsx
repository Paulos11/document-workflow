import { DocumentTable } from '../components/documents';
import { useApp } from '../context';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, AlertCircle, CheckCircle2, Plus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { StatsCard } from '../components/ui';
import type { DocumentStatus } from '../constants/statuses';

interface StatCard {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export default function DashboardPage() {
  const { currentRole, documents } = useApp();
  const navigate = useNavigate();

  const getStatusCount = (status: DocumentStatus): number => {
    return documents.filter(doc => doc.status === status).length;
  };

  const pendingCount = getStatusCount('Submitted');
  const actionCount = getStatusCount('Changes Requested');
  const approvedCount = getStatusCount('Approved');

  const stats: StatCard[] = [
    {
      label: 'Total Documents',
      value: documents.length,
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      bgColor: 'bg-brand-primary/10'
    },
    {
      label: 'Awaiting Review',
      value: pendingCount,
      icon: Clock,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      bgColor: 'bg-status-warning/10'
    },
    {
      label: 'Action Required',
      value: actionCount,
      icon: AlertCircle,
      color: 'bg-orange-50 text-orange-600 border-orange-100',
      bgColor: 'bg-status-orange/10'
    },
    {
      label: 'Approved',
      value: approvedCount,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      bgColor: 'bg-status-success/10'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-neutral-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-high mb-2 tracking-tight">
            {currentRole === 'Employee' ? 'My Documents' : 'Document Management'}
          </h1>
          <p className="text-body text-text-muted max-w-2xl">
            {currentRole === 'Employee'
              ? 'Overview of your document status and recent activity.'
              : 'Monitor, review, and approve employee document submissions.'}
          </p>
        </div>
        {currentRole === 'Employee' && (
          <button
            onClick={() => navigate('/upload')}
            className="bg-brand-primary hover:bg-brand-primary-hover text-white px-5 py-2.5 rounded-md text-body-medium font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto flex-shrink-0"
          >
            <Plus className="w-5 h-5" />
            New Submission
          </button>
        )}
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      {/* Documents Section */}
      <div>
        <div className="bg-white rounded-lg border border-neutral-border shadow-small overflow-hidden">
          <DocumentTable documents={documents} />
        </div>
      </div>
    </div>
  );
}
