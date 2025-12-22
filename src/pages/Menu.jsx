import React, { useState, useMemo, useCallback } from 'react';
import { products, categories } from '../data/products';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart();

    const filteredProducts = useMemo(() => {
        return activeCategory === "All"
            ? products
            : products.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    const handleProductClick = useCallback((product) => {
        setSelectedProduct(product);
    }, []);

    const handleAddToCart = useCallback((product) => {
        addToCart(product);
    }, [addToCart]);

    const handleCloseModal = useCallback(() => {
        setSelectedProduct(null);
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-serif font-bold text-center mb-8 text-brand-red">Our Menu</h1>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-lg font-medium transition-all ${activeCategory === cat
                            ? 'bg-brand-red text-white shadow-lg scale-105'
                            : 'bg-white text-brand-brown hover:bg-brand-orange/10'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product Grid - Memoized */}
            <ProductGrid
                products={filteredProducts}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
            />

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-default"
                        style={{ willChange: 'opacity' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 text-white md:text-gray-500 bg-black/50 md:bg-gray-100 p-2 rounded-full hover:bg-black/70 md:hover:bg-gray-200 transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            {/* Modal Image */}
                            <div className="h-64 md:h-full bg-gray-100 relative">
                                <img
                                    src={selectedProduct.image || "/placeholder-food.jpg"}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 flex flex-col">
                                <div>
                                    <h2 className="text-3xl font-serif font-bold text-brand-brown mb-2">
                                        {selectedProduct.name}
                                    </h2>
                                    <div className="text-2xl font-bold text-brand-red mb-6">
                                        ${selectedProduct.price.toFixed(2)}
                                    </div>

                                    {selectedProduct.orderingCriteria && (
                                        <div className="mb-6 p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-lg">
                                            <h4 className="font-bold text-brand-orange text-sm mb-1 uppercase tracking-wider">Ordering Note</h4>
                                            <p className="text-brand-brown/80 text-sm">
                                                {selectedProduct.orderingCriteria}
                                            </p>
                                        </div>
                                    )}

                                    <div className="prose prose-sm text-brand-brown/70 mb-8">
                                        <h4 className="font-bold text-brand-brown mb-2">Description</h4>
                                        <p>{selectedProduct.description}</p>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <Button
                                        onClick={() => {
                                            handleAddToCart(selectedProduct);
                                            handleCloseModal();
                                        }}
                                        className="w-full py-4 text-lg"
                                    >
                                        Add to Cart - ${selectedProduct.price.toFixed(2)}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
