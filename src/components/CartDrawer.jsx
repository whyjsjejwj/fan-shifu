import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function CartDrawer({ isOpen, onClose }) {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-brand-cream/30">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="text-brand-red" />
                                <h2 className="text-xl font-serif font-bold text-brand-brown">{t('cart.title')}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-brand-brown/50 space-y-4">
                                    <ShoppingBag size={48} className="opacity-20" />
                                    <p className="text-lg">{t('cart.empty')}</p>
                                    <Button onClick={onClose} variant="outline">
                                        {t('cart.continue_shopping')}
                                    </Button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex gap-4 p-3 rounded-xl border border-brand-cream bg-white shadow-sm"
                                    >
                                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-serif font-bold text-brand-brown">{item.name}</h3>
                                                <p className="text-brand-red font-medium">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="p-1 hover:text-brand-red disabled:opacity-30"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-1 hover:text-brand-red"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-4 border-t border-gray-100 bg-gray-50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600">{t('cart.subtotal')}</span>
                                    <span className="text-2xl font-bold text-brand-red">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="space-y-3">
                                    <Link to="/checkout" onClick={onClose}>
                                        <Button className="w-full py-6 text-lg shadow-lg shadow-brand-orange/20">
                                            {t('cart.checkout_now')}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
