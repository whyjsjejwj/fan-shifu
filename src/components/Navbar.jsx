import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItems } = useCart();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Menu', href: '/menu' },
    ];

    return (
        <>
            <nav className="sticky top-0 z-40 w-full border-b border-brand-orange/20 bg-brand-cream/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-serif font-bold text-brand-red">樊师傅</span>
                        <span className="hidden sm:inline-block text-sm text-brand-brown/80 font-medium tracking-wide">Fan Shifu</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-brand-brown hover:text-brand-red font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button
                            variant="primary"
                            size="sm"
                            className="space-x-2"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingBag size={18} />
                            <span>Cart ({totalItems})</span>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-brand-brown"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
                    </button>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden border-t border-brand-orange/20 bg-brand-cream overflow-hidden"
                        >
                            <div className="flex flex-col p-4 space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-brand-brown hover:text-brand-red"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Button
                                    className="w-full justify-center space-x-2"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsCartOpen(true);
                                    }}
                                >
                                    <ShoppingBag size={18} />
                                    <span>Cart ({totalItems})</span>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Cart Drawer */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
