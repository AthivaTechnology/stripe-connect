import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getCheckoutSession, createPortalSession } from '../services/api';

export default function Success() {
    const { clearCart } = useCart();
    const [customerId, setCustomerId] = useState(null);
    const [loadingPortal, setLoadingPortal] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');

        console.log("Success Page Loaded");
        console.log("URL Search Params:", window.location.search);
        console.log("Session ID form URL:", sessionId);

        if (sessionId) {
            // Retrieve customer ID from backend
            getCheckoutSession(sessionId).then(data => {
                console.log("Checkout Session Data:", data);
                if (data.customer_id) {
                    console.log("Setting Customer ID:", data.customer_id);
                    setCustomerId(data.customer_id);
                    localStorage.setItem('stripe_customer_id', data.customer_id);
                } else {
                    console.warn("No customer_id found in session data");
                }
            }).catch(err => {
                console.error("Failed to fetch session:", err);
            });
        } else {
            console.log("No Session ID found in URL");
        }

        // Also check if we already have one
        const storedId = localStorage.getItem('stripe_customer_id');
        if (storedId && !customerId) setCustomerId(storedId);

        // Clear cart
        clearCart();
    }, []);

    const handlePortal = async () => {
        if (!customerId) return;
        setLoadingPortal(true);
        try {
            const { url } = await createPortalSession(customerId);
            window.location.href = url;
        } catch (error) {
            alert("Failed to open portal");
            setLoadingPortal(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                </div>

                <h1 className="text-3xl font-serif font-medium text-gray-900">Payment Successful!</h1>

                <p className="text-gray-500">
                    Thank you for your order. We have received your payment and are preparing your delicious food!
                </p>

                <div className="pt-4 flex flex-col gap-3 justify-center items-center">
                    <a
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors rounded-full"
                    >
                        Return to Home
                        <ArrowRight className="w-4 h-4" />
                    </a>

                    {customerId && (
                        <button
                            onClick={handlePortal}
                            disabled={loadingPortal}
                            className="inline-flex items-center justify-center gap-2 text-gray-600 hover:text-black text-sm font-medium underline-offset-4 hover:underline transition-colors"
                        >
                            <CreditCard className="w-4 h-4" />
                            {loadingPortal ? 'Loading Portal...' : 'Manage Billing / Invoices'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
