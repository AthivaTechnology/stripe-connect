import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';
import { CartProvider } from './context/CartContext';

import Success from './components/Success';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Simple routing for Success page
  if (window.location.pathname === '/success') {
    return (
      <CartProvider>
        <Success />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
        <Navbar onSearch={setSearchQuery} />
        <main>
          <Hero />
          <ProductList searchQuery={searchQuery} />
          <About />
        </main>
        <CartModal />

        <footer className="bg-black text-white py-12 px-4 border-t border-gray-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-serif font-bold uppercase tracking-widest mb-2">Zara</h2>
              <p className="text-gray-400 text-sm">Elevating your dining experience.</p>
            </div>
            <div className="flex gap-8 text-xs font-bold tracking-widest text-gray-400 uppercase">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
            </div>
            <p className="text-gray-600 text-xs">© 2026 Zara Food. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
