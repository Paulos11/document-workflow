import { Select } from '../ui';

export default function CategorySelect({ value, onChange }) {
  const categories = [
    { value: 'Financial Report', label: 'Financial Report' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Invoice', label: 'Invoice' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <Select
      label="Document Category"
      value={value}
      onChange={onChange}
      options={categories}
      placeholder="Select a category"
    />
  );
}
