import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TenantDashboard } from './pages/TenantDashboard';
import { BookingFlow } from './pages/BookingFlow';
import { DigitalCheckIn } from './pages/DigitalCheckIn';
import { CountrySettings } from './components/admin/CountrySettings';
import { PaymentRegistry } from './components/admin/PaymentRegistry';

const queryClient = new QueryClient();

const Navbar = () => (
  <nav className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-50">
    <Link to="/" className="text-2xl font-black text-blue-600">HOTEL.BT</Link>
    <div className="flex gap-6 text-sm font-bold text-gray-500">
      <Link to="/search" className="hover:text-blue-600">Search</Link>
      <Link to="/tenant" className="hover:text-blue-600">Hotel Dashboard</Link>
      <Link to="/admin" className="hover:text-blue-600">Platform Admin</Link>
    </div>
    <button className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-bold">Sign In</button>
  </nav>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<div className="p-20 text-center"><h1 className="text-5xl font-black">Experience Bhutan.</h1><p className="mt-4 text-gray-500">Premium hotels, local hospitality, seamless bookings.</p></div>} />
              <Route path="/search" element={<div className="p-10">Search Results & Map...</div>} />
              <Route path="/hotel/:id/book" element={<BookingFlow hotelId={1} roomTypeId={1} />} />
              <Route path="/checkin/:booking_id" element={<DigitalCheckIn />} />
              <Route path="/tenant/*" element={<TenantDashboard />} />
              <Route path="/admin" element={
                <div className="space-y-8">
                  <CountrySettings />
                  <PaymentRegistry />
                </div>
              } />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
