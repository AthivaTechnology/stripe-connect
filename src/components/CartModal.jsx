import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createCheckoutSession, createPortalSession } from '../services/api';

export default function CartModal() {
    const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
    const [loading, setLoading] = useState(false);
    const customerId = localStorage.getItem('stripe_customer_id');

    const handleBilling = async () => {
        if (!customerId) return;
        try {
            const { url } = await createPortalSession(customerId);
            window.location.href = url;
        } catch (error) {
            alert("Failed to open billing portal");
        }
    };

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Call backend to create session (pass customerId if we have it)
            const { url } = await createCheckoutSession(cart, customerId);
            // Redirect to Stripe
            window.location.href = url;
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Failed to start checkout. Please try again.");
            setLoading(false);
        }
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                    <h2 className="text-xl font-serif font-medium">Shopping Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p>Your cart is empty.</p>
                            <button onClick={() => setIsCartOpen(false)} className="mt-4 text-black border-b border-black text-sm hover:opacity-70">
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-20 h-24 bg-gray-100 flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-medium text-sm text-gray-900">{item.name}</h4>
                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-500">{item.category}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3 border border-gray-200 px-2 py-1">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-black text-gray-400">
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-black text-gray-400">
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-medium text-gray-600">Subtotal</span>
                            <span className="text-xl font-bold font-serif">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Redirecting...' : 'Checkout'}
                        </button>

                        {customerId && (
                            <button
                                onClick={handleBilling}
                                className="w-full mt-3 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                            >
                                Manage Billing / Invoices
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
