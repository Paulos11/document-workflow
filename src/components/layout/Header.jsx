export default function Header() {
  return (
    <header className="bg-neutral-surface border-b border-neutral-border shadow-small">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-h1 text-text-high">DocFlow</h1>
            <span className="text-caption text-text-muted">Document Review & Approval</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-caption-caps">
                JD
              </div>
              <span className="text-body text-text-medium">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
