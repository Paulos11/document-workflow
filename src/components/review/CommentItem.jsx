import { formatRelativeTime } from '../../utils/dateFormatters';

export default function CommentItem({ comment }) {
  return (
    <div className="bg-white border border-neutral-border rounded-md p-3.5 hover:shadow-small transition-shadow">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 shadow-small">
          {comment.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-body-small font-semibold text-text-high">{comment.author}</span>
            <span className="text-caption text-text-muted">{formatRelativeTime(comment.timestamp)}</span>
          </div>
          <p className="text-body-small text-text-medium leading-relaxed">{comment.text}</p>
        </div>
      </div>
    </div>
  );
}
