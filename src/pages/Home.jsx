import React from 'react';
import { Button } from '../components/ui/Button';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t, i18n } = useTranslation();
    const featuredProducts = products.filter(p => p.popular);

    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-brown/90 text-white">
                <div
                    className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
                    style={{ backgroundImage: 'url("/hero-bg.png")' }}
                />
                <div className="relative z-10 container mx-auto px-4 text-center space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold"
                    >
                        {t('hero.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto"
                        dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link to="/menu">
                            <Button size="lg" variant="primary">
                                {t('hero.cta')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section id="story" className="py-24 bg-[#fffcf5] overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2 space-y-8"
                        >
                            <div className="relative">
                                <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-red mb-2">{t('story.title')}</h2>
                                <h3 className="text-3xl font-serif text-brand-brown opacity-80 mb-6">{t('story.subtitle')}</h3>
                                <div className="absolute -left-6 top-0 w-1 h-full bg-brand-orange opacity-20 hidden md:block"></div>
                            </div>

                            <div className="space-y-6 text-lg leading-relaxed text-brand-brown/80 font-serif">
                                <p>{t('story.p1')}</p>
                                <p>{t('story.p2')}</p>
                                <p className="font-medium text-brand-brown">{t('story.p3')}</p>
                            </div>
                        </motion.div>

                        {/* Image Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2 relative"
                        >
                            <div className="absolute inset-0 bg-brand-red rounded-lg transform rotate-3 scale-[0.98] opacity-10 z-0"></div>
                            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                                <img
                                    src="/our-story-mianpi.jpg"
                                    alt="Authentic Mianpi"
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-orange text-white rounded-full flex items-center justify-center font-serif font-bold p-4 text-center shadow-lg z-20 hidden md:flex">
                                {t('story.badge')}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Items */}
            <section className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-brand-brown mb-4">{t('featured.title')}</h2>
                    <p className="text-brand-brown/60">{t('featured.subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-brand-orange/10"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    {t('featured.badge')}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 font-serif">{product.name}</h3>
                                <p className="text-sm text-brand-brown/60 mb-4 line-clamp-2">
                                    {i18n.language === 'zh' && product.description_zh ? product.description_zh : product.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-brand-red">${product.price.toFixed(2)}</span>
                                    <Link to="/menu">
                                        <Button variant="ghost" size="sm">{t('featured.view_menu')}</Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
