import type { DocumentComment } from '../../types/app';

interface CommentItemProps {
  comment: DocumentComment;
}

const formatDateTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
};

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="bg-white border border-neutral-border rounded-md p-3.5 hover:shadow-small transition-shadow">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 shadow-small">
          {comment.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <span className="text-body-small font-semibold text-text-high">{comment.author}</span>
            <span className="text-caption text-text-muted whitespace-nowrap flex-shrink-0">
              {formatDateTime(comment.timestamp)}
            </span>
          </div>
          <p className="text-body-small text-text-medium leading-relaxed">{comment.text}</p>
        </div>
      </div>
    </div>
  );
}
