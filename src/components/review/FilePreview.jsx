import { Card } from '../ui';

export default function FilePreview({ fileName }) {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-h3 text-text-high mb-2">{fileName}</h3>
        <p className="text-body text-text-low mb-6">File preview would appear here</p>
        <button className="text-brand-primary hover:text-brand-primary-hover text-body-medium transition-colors">
          Download File
        </button>
      </div>
    </Card>
  );
}
