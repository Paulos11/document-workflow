import { useApp } from '../../context';
import { hasPermission, PERMISSIONS, type Role } from '../../utils';
import type { AppDocument } from '../../types/app';

interface ActionButtonsProps {
  document: AppDocument;
  onView: () => void;
  onEdit: () => void;
}

export default function ActionButtons({ document, onView, onEdit }: ActionButtonsProps) {
  const { currentUser } = useApp();

  const canView = hasPermission(currentUser.role as Role, currentUser.name, document.uploadedBy, PERMISSIONS.VIEW);

  const canEdit = hasPermission(currentUser.role as Role, currentUser.name, document.uploadedBy, PERMISSIONS.EDIT) &&
    (document.status === 'Draft' || document.status === 'Changes Requested');

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      {canView && (
        <button
          onClick={(e) => handleAction(e, onView)}
          className="p-1.5 hover:bg-neutral-subtle rounded-sm transition-colors group"
          title="View"
        >
          <svg className="w-4 h-4 text-text-muted group-hover:text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      )}

      {canEdit && (
        <button
          onClick={(e) => handleAction(e, onEdit)}
          className="p-1.5 hover:bg-neutral-subtle rounded-sm transition-colors group"
          title="Edit"
        >
          <svg className="w-4 h-4 text-text-muted group-hover:text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}
    </div>
  );
}
