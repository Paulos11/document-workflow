import { useState } from 'react';
import { Card, Button, Input } from '../ui';
import CommentItem from './CommentItem';

export default function CommentsSection({ comments = [], onAddComment }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment({
        id: Date.now(),
        author: 'John Doe',
        text: newComment,
        timestamp: new Date().toISOString(),
      });
      setNewComment('');
    }
  };

  return (
    <Card>
      <h3 className="text-h3 text-text-high mb-4">Comments</h3>
      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <p className="text-body text-text-muted text-center py-6">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
      <div className="border-t border-neutral-border pt-4">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3"
        />
        <Button onClick={handleSubmit} size="small" disabled={!newComment.trim()}>
          Add Comment
        </Button>
      </div>
    </Card>
  );
}
