import { Card } from '../ui';
import TimelineItem from './TimelineItem';

export default function ActivityTimeline({ activities = [] }) {
  if (!activities || activities.length === 0) {
    return (
      <Card>
        <h3 className="text-h3 text-text-high mb-4">Activity Timeline</h3>
        <p className="text-body text-text-muted text-center py-6">No activity yet</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-h3 text-text-high mb-4">Activity Timeline</h3>
      <div className="space-y-4">
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
