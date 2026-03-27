import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LandingPage } from './pages/LandingPage';
import { Navbar } from './components/common/Navbar';
import { TenantDashboard } from './pages/TenantDashboard';
import { BookingFlow } from './pages/BookingFlow';
import { DiningPage } from './pages/DiningPage';
import { WellnessPage } from './pages/WellnessPage';
import { HeritagePage } from './pages/HeritagePage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tenant/*" element={<TenantDashboard />} />
            <Route path="/hotel/:id/book" element={<BookingFlow hotelId="hotel_thimphu_1" roomTypeId="rt_deluxe" />} />
            <Route path="/dining" element={<DiningPage />} />
            <Route path="/wellness" element={<WellnessPage />} />
            <Route path="/heritage" element={<HeritagePage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
