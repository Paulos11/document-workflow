export default function Sidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'upload', label: 'Upload Document', icon: '📤' },
    { id: 'review', label: 'Review', icon: '👁️' },
  ];

  return (
    <aside className="w-64 bg-neutral-surface border-r border-neutral-border">
      <nav className="p-4 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
              ${activeTab === tab.id
                ? 'bg-brand-primary-light text-brand-primary'
                : 'text-text-medium hover:bg-neutral-subtle'
              }
            `}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-body-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
