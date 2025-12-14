import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { HomeNew } from '@/pages/Home/HomeNew';
import { HotelDetails } from '@/pages/HotelDetails/HotelDetails';
import { ReservationNew } from '@/pages/Reservation/ReservationNew';
import { HistoryNew } from '@/pages/History/HistoryNew';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import './styles/globals.css';

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WishlistProvider>
            <ToastProvider>
              <Router>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomeNew />} />
                      <Route path="/hotels" element={<HomeNew />} />
                      <Route path="/hotels/:id" element={<HotelDetails />} />
                      <Route path="/reserve" element={<ReservationNew />} />
                      <Route path="/history" element={<HistoryNew />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </ToastProvider>
          </WishlistProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
