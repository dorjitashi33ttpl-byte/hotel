import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TenantDashboard } from './pages/TenantDashboard';
import { BookingFlow } from './pages/BookingFlow';
import { DigitalCheckIn } from './pages/DigitalCheckIn';
import { CountrySettings } from './components/admin/CountrySettings';
import { PaymentRegistry } from './components/admin/PaymentRegistry';
import { GlobalSearch } from './components/common/GlobalSearch';

const queryClient = new QueryClient();

const Navbar = () => (
  <nav className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-50">
    <div className="flex items-center gap-12">
      <Link to="/" className="text-2xl font-black text-blue-600">HOTEL.BT</Link>
      <GlobalSearch />
    </div>
    <div className="flex gap-6 text-sm font-bold text-gray-500">
      <Link to="/tenant" className="hover:text-blue-600">Property Center</Link>
      <Link to="/admin" className="hover:text-blue-600">Admin</Link>
      <button className="bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-gray-200">Sign In</button>
    </div>
  </nav>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 antialiased">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={
                <div className="p-24 text-center max-w-4xl mx-auto">
                   <h1 className="text-7xl font-black tracking-tight leading-tight">Explore the <span className="text-blue-600 italic">unexplored</span> Bhutan.</h1>
                   <p className="mt-8 text-xl text-gray-500 font-medium">Sustainable luxury, deep heritage, and seamless digital booking experience.</p>
                   <div className="mt-12 flex justify-center gap-6">
                      <Link to="/search" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:scale-105 transition-all">Search Hotels</Link>
                      <button className="bg-white border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all">How it works</button>
                   </div>
                </div>
              } />
              <Route path="/search" element={<div className="p-10">Map Search results...</div>} />
              <Route path="/hotel/:id/book" element={<BookingFlow hotelId={1} roomTypeId={1} />} />
              <Route path="/checkin/:bid" element={<DigitalCheckIn />} />
              <Route path="/tenant/*" element={<TenantDashboard />} />
              <Route path="/admin" element={
                <div className="max-w-7xl mx-auto p-12 space-y-12">
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
