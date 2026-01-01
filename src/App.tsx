import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context';
import { Header, Footer } from './components/layout';
import { DashboardPage, UploadPage, ReviewPage } from './pages';
import { Toast, StatusBanner } from './components/feedback';

function App() {
  const { notification, hideNotification, statusBanner, hideStatusBanner } = useApp();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-background font-sans flex flex-col">
        <Header />

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto flex-grow w-full">
          {statusBanner && (
            <StatusBanner
              status={statusBanner.status}
              onDismiss={hideStatusBanner}
              autoHide={true}
              autoHideDuration={5000}
            />
          )}

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/document/:id" element={<ReviewPage />} />
          </Routes>
        </main>

        <Footer />

        {notification && (
          <Toast
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={hideNotification}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
