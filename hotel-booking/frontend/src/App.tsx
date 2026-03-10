import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hero } from './components/landing/Hero';
import { Navbar } from './components/common/Navbar';
import { FadeIn } from './components/common/FadeIn';
import { TenantDashboard } from './pages/TenantDashboard';
import { BookingFlow } from './pages/BookingFlow';

const queryClient = new QueryClient();

function Landing() {
  return (
    <div className="bg-[var(--luxury-stone)] min-h-screen">
      <Hero />
      <section className="py-48 px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <FadeIn>
           <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--luxury-gold)] block mb-10">Our Story</span>
           <h2 className="text-6xl font-serif tracking-tighter leading-tight mb-12">A sanctuary designed for those who seek <span className="italic">the sublime</span>.</h2>
           <p className="text-xl text-stone-500 font-light leading-relaxed max-w-xl">
             Nestled within the high Himalayan valleys, our properties are a tribute to Bhutanese craftsmanship and the philosophy of Gross National Happiness. We invite you to experience a journey that transcends ordinary travel.
           </p>
        </FadeIn>
        <FadeIn delay={0.3}>
           <div className="relative aspect-[4/5] bg-stone-200 overflow-hidden gold-border shadow-2xl">
              <img src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1000" className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-105" />
           </div>
        </FadeIn>
      </section>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/tenant/*" element={<TenantDashboard />} />
            <Route path="/hotel/:id/book" element={<BookingFlow hotelId={1} roomTypeId={1} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
