import { Card } from '../ui';
import TimelineItem from './TimelineItem';

export default function ActivityTimeline({ activities = [] }) {
  if (!activities || activities.length === 0) {
    return (
      <Card padding="none">
        <div className="p-4 border-b border-neutral-border">
          <h3 className="text-h3 text-text-high">Activity Timeline</h3>
        </div>
        <p className="text-body-small text-text-muted text-center py-8">No activity yet</p>
      </Card>
    );
  }

  return (
    <Card padding="none">
      <div className="p-4 border-b border-neutral-border">
        <h3 className="text-h3 text-text-high">Activity Timeline</h3>
      </div>
      <div className="p-4 space-y-4">
        {activities.map((activity, index) => (
          <TimelineItem
            key={activity.id || index}
            activity={activity}
            isLast={index === activities.length - 1}
          />
        ))}
      </div>
    </Card>
  );
}
