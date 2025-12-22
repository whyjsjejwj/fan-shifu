import React from 'react';

export function Footer() {
    return (
        <footer className="bg-brand-brown text-brand-cream py-8 mt-auto">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-xl font-serif font-bold mb-2">樊师傅 Fan Shifu</h3>
                    <p className="text-sm opacity-80">Authentic homemade delicacies.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-2">Quick Links</h4>
                    <ul className="space-y-1 text-sm opacity-80">
                        <li><a href="/menu" className="hover:text-brand-orange">Menu</a></li>
                        <li><a href="/#story" className="hover:text-brand-orange">Our Story</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-2">Contact</h4>
                    <p className="text-sm opacity-80">Singapore</p>
                    <p className="text-sm opacity-80">WhatsApp: +65 1234 5678</p>
                </div>
            </div>
            <div className="text-center text-xs opacity-50 mt-8 pt-4 border-t border-brand-cream/10">
                © {new Date().getFullYear()} Fan Shifu. All rights reserved.
            </div>
        </footer>
    );
}
