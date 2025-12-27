import { Card, Input, Select } from '../ui';

export default function MetadataForm({ metadata, onChange }) {
  const categories = [
    { value: 'Financial Report', label: 'Financial Report' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Invoice', label: 'Invoice' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Other', label: 'Other' },
  ];

  const reviewers = [
    { value: 'Sarah Johnson', label: 'Sarah Johnson' },
    { value: 'Michael Chen', label: 'Michael Chen' },
    { value: 'Emily Brown', label: 'Emily Brown' },
    { value: 'David Wilson', label: 'David Wilson' },
  ];

  return (
    <Card>
      <h3 className="text-h3 text-text-high mb-4">Document Metadata</h3>
      <div className="space-y-4">
        <Select
          label="Category"
          value={metadata.category}
          onChange={(e) => onChange('category', e.target.value)}
          options={categories}
          placeholder="Select a category"
          required
        />
        <Input
          label="Description"
          value={metadata.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Brief description of the document"
        />
        <Select
          label="Assign Reviewer"
          value={metadata.reviewer}
          onChange={(e) => onChange('reviewer', e.target.value)}
          options={reviewers}
          placeholder="Select a reviewer"
          required
        />
      </div>
    </Card>
  );
}
