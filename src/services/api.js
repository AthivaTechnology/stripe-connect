const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const createPaymentIntent = async (amount) => {
    try {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Payment initialization failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const createCheckoutSession = async (items, customerId = null) => {
    try {
        const response = await fetch(`${API_URL}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items, customer_id: customerId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Checkout initialization failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getCheckoutSession = async (sessionId) => {
    try {
        const response = await fetch(`${API_URL}/checkout-session?sessionId=${sessionId}`);
        if (!response.ok) throw new Error('Failed to retrieve session');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const createPortalSession = async (customerId) => {
    try {
        const response = await fetch(`${API_URL}/create-portal-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customer_id: customerId }),
        });
        if (!response.ok) throw new Error('Failed to create portal session');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
