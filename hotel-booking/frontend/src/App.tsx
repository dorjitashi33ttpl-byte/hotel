import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ParallaxHero } from './components/landing/ParallaxHero';
import { AvailabilityBar } from './components/landing/AvailabilityBar';
import { PropertyStory } from './components/landing/PropertyStory';
import { SuitesPage } from './pages/SuitesPage';
import { DiningPage } from './pages/DiningPage';
import { WellnessPage } from './pages/WellnessPage';
import { ExclusiveOffers } from './components/landing/ExclusiveOffers';
import { LuxuryGallery } from './components/landing/LuxuryGallery';
import { SuitesDining } from './components/landing/SuitesDining';
import { Wellness } from './components/landing/Wellness';
import { TenantDashboard } from './pages/TenantDashboard';
import HotelDetail from './pages/HotelDetail';
import { BookingFlow } from './pages/BookingFlow';
import { DigitalCheckIn } from './pages/DigitalCheckIn';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { RoleManagement } from './pages/admin/RoleManagement';
import { TaxManagement } from './pages/admin/TaxManagement';
import { CountryManagement } from './pages/admin/CountryManagement';
import { AuditLogManagement } from './pages/admin/AuditLogManagement'; from './pages/admin/TaxManagement';
import { CountrySettings } from './components/admin/CountrySettings';
import { PaymentRegistry } from './components/admin/PaymentRegistry';
import { BankTemplateConfig } from './components/admin/BankTemplateConfig'; from './components/admin/PaymentRegistry';
import { ChatWidget } from './components/common/ChatWidget';
import { GlobalSearch } from './components/common/GlobalSearch';

const queryClient = new QueryClient();

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`luxury-nav ${scrolled ? 'scrolled bg-white/90' : 'bg-transparent text-white border-transparent'}`}>
      <div className="flex items-center gap-16">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tighter transition-transform hover:scale-105">
          AMAN <span className="text-[10px] tracking-[0.4em] font-sans font-normal opacity-70 ml-2">BHUTAN</span>
        </Link>
        <div className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] md:flex">
          <Link to="/" className="hover:opacity-50 transition-opacity">Experience</Link>
          <Link to="/" className="hover:opacity-50 transition-opacity">Suites</Link>
          <Link to="/" className="hover:opacity-50 transition-opacity">Wellness</Link>
          <Link to="/" className="hover:opacity-50 transition-opacity">Dining</Link>
        </div>
      </div>
      <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
        <GlobalSearch />
        <Link to="/tenant" className="hover:opacity-50 transition-opacity">Owner Portal</Link>
        <Link to="/admin" className="hover:opacity-50 transition-opacity">Admin</Link>
        <button className="bg-stone-900 text-stone-50 px-6 py-2.5 hover:bg-stone-800 transition-colors">Book Now</button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col antialiased bg-stone-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={
                <>
                  <ParallaxHero />
                  <AvailabilityBar />
                  <PropertyStory />
                  <SuitesDining />
                  <Wellness />
                  <LuxuryGallery />
                  <ExclusiveOffers />
                </>
              } />
              <Route path="/suites" element={<SuitesPage />} />
              <Route path="/dining" element={<DiningPage />} />
              <Route path="/wellness" element={<WellnessPage />} />
              <Route path="/hotel/:id" element={<HotelDetail />} />
              <Route path="/search" element={<div className="p-24 font-serif text-4xl text-center">Curating your experience...</div>} />
              <Route path="/hotel/:id/book" element={<BookingFlow hotelId={1} roomTypeId={1} />} />
              <Route path="/checkin/:bid" element={<DigitalCheckIn />} />
              <Route path="/tenant/*" element={<TenantDashboard />} />
                <div className="max-w-7xl mx-auto p-24 space-y-24">
                   <CountrySettings />
                   <PaymentRegistry />
                   <BankTemplateConfig />
                </div>
              } />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/roles" element={<RoleManagement />} />
              <Route path="/admin/tax" element={<TaxManagement />} />
              <Route path="/admin/countries" element={<CountryManagement />} />
              <Route path="/admin/audit" element={<AuditLogManagement />} />
            </Routes>
          <ChatWidget />
          </main>
          <footer className="bg-stone-900 px-24 py-16 text-stone-400">
             <div className="flex justify-between items-start border-b border-stone-800 pb-12">
                <div className="font-serif text-2xl text-stone-50">AMAN</div>
                <div className="flex gap-16 text-[10px] uppercase tracking-widest font-bold">
                   <div className="flex flex-col gap-4">
                      <span className="text-stone-600">Explore</span>
                      <a href="#" className="hover:text-stone-50 transition-colors">Destinations</a>
                      <a href="#" className="hover:text-stone-50 transition-colors">Private Jets</a>
                      <a href="#" className="hover:text-stone-50 transition-colors">Residences</a>
                   </div>
                   <div className="flex flex-col gap-4">
                      <span className="text-stone-600">Company</span>
                      <a href="#" className="hover:text-stone-50 transition-colors">Sustainability</a>
                      <a href="#" className="hover:text-stone-50 transition-colors">Careers</a>
                      <a href="#" className="hover:text-stone-50 transition-colors">Press</a>
                   </div>
                </div>
             </div>
             <div className="mt-8 text-[10px] tracking-widest uppercase">
                &copy; 2026 AMAN GROUP S.A. ALL RIGHTS RESERVED.
             </div>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
