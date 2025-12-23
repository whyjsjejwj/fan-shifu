import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from './ui/Button';
import { useTranslation } from 'react-i18next';

const ProductGrid = memo(({ products, onProductClick, onAddToCart }) => {
    const { i18n } = useTranslation();
    return (
        <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            <AnimatePresence>
                {products.map((product) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={product.id}
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-brand-cream flex flex-col"
                    >
                        <div
                            className="h-48 overflow-hidden cursor-pointer"
                            onClick={() => onProductClick(product)}
                        >
                            <img
                                src={product.image || "/placeholder-food.jpg"}
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3
                                    className="text-xl font-bold font-serif cursor-pointer hover:text-brand-red transition-colors"
                                    onClick={() => onProductClick(product)}
                                >
                                    {product.name}
                                </h3>
                                <span className="text-brand-red font-bold text-lg">${product.price.toFixed(2)}</span>
                            </div>

                            {product.orderingCriteria && (
                                <p className="text-xs font-bold text-brand-orange mb-2 bg-brand-orange/10 p-1 px-2 rounded-md inline-block self-start">
                                    {i18n.language === 'zh' && product.orderingCriteria_zh ? product.orderingCriteria_zh : product.orderingCriteria}
                                </p>
                            )}

                            <p className="text-sm text-brand-brown/60 mb-4 flex-1 line-clamp-3">
                                {i18n.language === 'zh' && product.description_zh ? product.description_zh : product.description}
                            </p>
                            <Button
                                onClick={() => onAddToCart(product)}
                                variant="secondary"
                                className="w-full flex items-center justify-center gap-2 mt-auto"
                            >
                                <Plus size={18} /> Add to Cart
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
});

export default ProductGrid;
