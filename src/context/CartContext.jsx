import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('fan-shifu-cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('fan-shifu-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: product.id === 8 ? 10 : 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Calculate total price with surcharge logic
    const surchargeItemsCount = cart
        .filter(item => item.isSurchargeItem)
        .reduce((acc, item) => acc + item.quantity, 0);

    let totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Surcharge rule: If exactly 2 items from the "surcharge group" (Noodles/Others), AND total items in cart is exactly 2, add $1.00
    if (surchargeItemsCount === 2 && totalItems === 2) {
        totalPrice += 1.00;
    }

    const validateCart = () => {
        const errors = [];

        // Rule: Noodles/Others must be bought in pairs (Min 2)
        if (surchargeItemsCount > 0 && surchargeItemsCount < 2) {
            errors.push("Noodles and Others must be ordered in pairs or more (Min 2 items total).");
        }

        // Rule: Baiji Bun min 10
        const buns = cart.find(item => item.id === 8); // Baiji Bun ID 8
        if (buns && buns.quantity < 10) {
            errors.push("Baiji Buns (白吉饼) must be ordered in minimum quantity of 10.");
        }

        return errors;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, validateCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
