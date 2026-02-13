import React from 'react';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export default function Navbar({ onSearch }) {
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-8">
                        <Menu className="w-6 h-6 text-gray-800 cursor-pointer hover:text-black transition-colors" />
                        <h1
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-3xl font-bold tracking-tighter uppercase font-serif cursor-pointer"
                        >
                            Zara
                        </h1>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-gray-600">
                        <button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-black transition-colors uppercase">MENU</button>
                        <a href="#" className="hover:text-black transition-colors">SPECIALS</a>
                        <a href="#" className="hover:text-black transition-colors">CATERING</a>
                        <a href="#" className="hover:text-black transition-colors">ABOUT</a>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden sm:block">
                            <Search className="w-5 h-5 text-gray-500 absolute left-0 top-1/2 -translate-y-1/2" />
                            <input
                                placeholder="SEARCH"
                                onChange={(e) => onSearch(e.target.value)}
                                className="pl-8 bg-transparent text-sm outline-none border-b border-transparent focus:border-black transition-all w-32 focus:w-48 placeholder-gray-400 text-gray-800"
                            />
                        </div>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group"
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-800 group-hover:scale-105 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-0 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
