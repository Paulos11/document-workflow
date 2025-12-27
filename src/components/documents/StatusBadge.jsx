import { Badge } from '../ui';

export default function StatusBadge({ status }) {
  const statusConfig = {
    'Pending Review': { variant: 'default', label: 'Pending Review' },
    'In Review': { variant: 'warning', label: 'In Review' },
    'Approved': { variant: 'success', label: 'Approved' },
    'Changes Requested': { variant: 'orange', label: 'Changes Requested' },
    'Resubmitted': { variant: 'purple', label: 'Resubmitted' },
    'Rejected': { variant: 'error', label: 'Rejected' },
  };

  const config = statusConfig[status] || statusConfig['Pending Review'];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
