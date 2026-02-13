import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Replace with your public key or use this test key (may require valid one for full functionality)
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function CartModal() {
    const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen, clearCart } = useCart();
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
                    <div className="flex items-center gap-4">
                        {isCheckout && !isSuccess && (
                            <button onClick={() => setIsCheckout(false)} className="hover:text-gray-600">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        )}
                        <h2 className="text-xl font-serif font-medium">
                            {isSuccess ? 'Order Confirmed' : isCheckout ? 'Checkout' : 'Shopping Cart'}
                        </h2>
                    </div>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-2xl font-serif font-medium">Thank You!</h3>
                            <p className="text-gray-500">Your order has been placed successfully.</p>
                            <button
                                onClick={() => {
                                    setIsSuccess(false);
                                    setIsCheckout(false);
                                    setIsCartOpen(false);
                                    clearCart();
                                }}
                                className="mt-8 bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : isCheckout ? (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm total={cartTotal} onSuccess={() => setIsSuccess(true)} />
                        </Elements>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>

                {!isCheckout && !isSuccess && cart.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-medium text-gray-600">Subtotal</span>
                            <span className="text-xl font-bold font-serif">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={() => setIsCheckout(true)}
                            className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
