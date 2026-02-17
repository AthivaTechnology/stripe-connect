import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../services/api';

export default function CheckoutForm({ total, onSuccess }) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        try {
            // 1. Create PaymentIntent on Backend
            // Convert total to cents
            const amountInCents = Math.round(total * 100);
            const { clientSecret } = await createPaymentIntent(amountInCents);

            // 2. Confirm Payment with Stripe
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            });

            if (result.error) {
                setError(result.error.message);
                setProcessing(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('[Payment Succeeded]', result.paymentIntent);
                    // The backend webhook also receives 'payment_intent.succeeded' to fulfill the order securely.
                    onSuccess();
                }
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'Payment failed');
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <span className="text-lg font-medium">Total to Pay</span>
                <span className="text-xl font-bold font-serif">${total.toFixed(2)}</span>
            </div>

            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 disabled:opacity-50 transition-colors"
            >
                {processing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
}
