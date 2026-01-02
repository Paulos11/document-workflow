import { useState } from 'react';
import { Card, Button, Badge } from '../ui';
import { MessageSquare } from 'lucide-react';
import CommentItem from './CommentItem';
import { useApp } from '../../context';
import type { DocumentComment } from '../../types/app';

interface CommentData {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

interface CommentsSectionProps {
  comments?: DocumentComment[];
  onAddComment: (comment: CommentData) => void;
}

export default function CommentsSection({ comments = [], onAddComment }: CommentsSectionProps) {
  const { currentUser } = useApp();
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment({
        id: Date.now(),
        author: currentUser.name,
        text: newComment,
        timestamp: new Date().toISOString(),
      });
      setNewComment('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card padding="none">
      <div className="p-4 border-b border-neutral-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-h3 text-text-high">Comments</h3>
          {comments.length > 0 && (
            <Badge variant="default">{comments.length}</Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-10 h-10 bg-neutral-subtle rounded-full flex items-center justify-center mx-auto mb-2">
              <MessageSquare className="w-5 h-5 text-text-muted" />
            </div>
            <p className="text-body-small text-text-muted mb-1">No comments yet</p>
            <p className="text-caption text-text-low">Be the first to share your feedback</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {comments.map((comment, index) => (
              <div key={comment.id}>
                <CommentItem comment={comment} />
                {index < comments.length - 1 && (
                  <div className="border-b border-neutral-border mt-4" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add Comment Section */}
        <div className="mt-4 pt-4 border-t border-neutral-border">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 bg-brand-primary rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Share your feedback..."
                value={newComment}

                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border border-neutral-border rounded-md text-body-small focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary min-h-[70px] resize-none"
                aria-label="Add a comment"
                maxLength={500}
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-caption text-text-muted">
                  {newComment.length}/500 characters
                </span>
                <Button
                  onClick={handleSubmit}
                  size="small"
                  disabled={!newComment.trim() || newComment.length > 500}
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
