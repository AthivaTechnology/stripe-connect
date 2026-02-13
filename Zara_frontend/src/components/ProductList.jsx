import React, { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

export default function ProductList({ searchQuery = '' }) {
    const { addToCart } = useCart();
    const [hoveredId, setHoveredId] = useState(null);
    const [activeCategory, setActiveCategory] = useState("ALL");

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === "ALL" || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
            <div className="flex justify-between items-end mb-12">
                <h3 className="text-3xl font-serif font-medium tracking-tight">Curated Menu</h3>
                <div className="flex gap-4 text-sm font-medium text-gray-500">
                    {["ALL", "STARTERS", "MAINS", "DESSERT"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`transition-colors uppercase ${activeCategory === cat
                                ? "text-black border-b border-black pb-1"
                                : "hover:text-black"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group cursor-pointer"
                        onMouseEnter={() => setHoveredId(product.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                                className={`absolute bottom-4 right-4 bg-white p-3 shadow-lg rounded-full transition-all duration-300 transform ${hoveredId === product.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                    } hover:bg-black hover:text-white`}
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h4>
                                <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                            </div>
                            <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
