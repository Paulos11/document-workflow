export default function CommentItem({ comment }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-neutral-subtle rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-caption-caps flex-shrink-0">
          {comment.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-body-medium text-text-high">{comment.author}</span>
            <span className="text-caption text-text-muted">{formatDate(comment.timestamp)}</span>
          </div>
          <p className="text-body text-text-medium">{comment.text}</p>
        </div>
      </div>
    </div>
  );
}
