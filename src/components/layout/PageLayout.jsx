export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-background flex flex-col">
      {children}
    </div>
  );
}
