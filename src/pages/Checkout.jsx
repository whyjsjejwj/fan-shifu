import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { storeConfig } from '../storeConfig';
import { Button } from '../components/ui/Button';
import { addDays, format, isBefore, startOfToday, parseISO, isWithinInterval } from 'date-fns';
import { AlertCircle, Calendar, MessageCircle, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
    const { t } = useTranslation();
    const { cart, totalPrice, totalItems, validateCart } = useCart();
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [dateError, setDateError] = useState("");

    const [customerRef, setCustomerRef] = useState({ name: "", phone: "", address: "" });
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const [deliveryMethod, setDeliveryMethod] = useState("pickup");
    const [mrtStation, setMrtStation] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({});

    const today = startOfToday();
    const leadTimeDays = deliveryMethod === 'delivery' ? 2 : storeConfig.leadTimeDays;
    const minDate = addDays(today, leadTimeDays);
    const minDateStr = format(minDate, 'yyyy-MM-dd');

    // Reset date if it becomes invalid when switching methods
    useEffect(() => {
        if (selectedDate && isBefore(parseISO(selectedDate), minDate)) {
            setSelectedDate("");
            setDateError(`For ${deliveryMethod === 'delivery' ? 'delivery' : 'pickup'}, please choose a date from ${format(minDate, 'dd MMM')} onwards.`);
        }
    }, [deliveryMethod, minDate, selectedDate]);

    // Validate Date for Holidays
    useEffect(() => {
        if (!selectedDate) return;
        if (selectedDate === "") return;

        const dateObj = parseISO(selectedDate);
        if (isBefore(dateObj, minDate)) {
            setDateError(`Please choose a date from ${format(minDate, 'dd MMM')} onwards.`);
            return;
        }

        const holiday = storeConfig.holidays.find(h =>
            isWithinInterval(dateObj, { start: parseISO(h.start), end: parseISO(h.end) })
        );

        if (holiday) {
            setDateError(`We are taking a break for ${holiday.reason}. Please choose another date or contact us.`);
        } else {
            setDateError("");
        }
    }, [selectedDate, minDate]);

    // Reset method if total drops below threshold
    useEffect(() => {
        if (totalPrice < storeConfig.deliveryThreshold && deliveryMethod === 'delivery') {
            setDeliveryMethod('pickup');
        }
    }, [totalPrice, deliveryMethod]);

    const handleWhatsAppOrder = () => {
        const newErrors = {};
        if (!selectedDate || dateError) newErrors.date = "Please select a valid pickup/delivery date.";

        if (deliveryMethod === 'pickup' && !selectedTime) {
            newErrors.time = "Please select a collection time.";
        }

        if (!customerRef.name.trim()) newErrors.name = "Name is required.";
        if (!customerRef.phone.trim()) newErrors.phone = "Phone number is required.";

        if (deliveryMethod === 'pickup' && !mrtStation.trim()) {
            newErrors.mrt = "MRT Station is required.";
        }
        if (deliveryMethod === 'delivery' && !address.trim()) {
            newErrors.address = "Delivery Address is required.";
        }

        // Cart Validation
        const cartErrors = validateCart();
        if (cartErrors.length > 0) {
            alert(cartErrors.join("\n")); // Simple alert for now, or could set a global error state
            return;
        }

        if (Object.keys(newErrors).length > 0) return;

        // Validation passed, show payment modal
        setShowPaymentModal(true);
    };

    const confirmOrder = () => {
        let message = `*New Order from Fan Shifu Website* 🍜\n\n`;
        message += `👤 *Customer*: ${customerRef.name}\n`;
        message += `📞 *Phone*: ${customerRef.phone}\n`;
        message += `📅 *Date*: ${selectedDate}\n`;

        if (deliveryMethod === 'pickup') {
            message += `⏰ *Time*: ${selectedTime}\n`;
            message += `🚇 *Collection*: MRT Pickup @ ${mrtStation}\n\n`;
        } else {
            message += `🚚 *Delivery*: ${address}\n\n`;
        }

        // ... (rest of message construction) ...

        message += `*🛒 Order Details:*\n`;
        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
        });

        message += `\n*💰 Total: $${totalPrice.toFixed(2)}*`;
        if (storeConfig.paymentInfo?.payNowNumber) {
            message += `\n\n💳 *Payment*: Paid via PayNow to ${storeConfig.paymentInfo.payNowNumber}`;
        }

        const encoded = encodeURIComponent(message);
        // Use api.whatsapp.com for better PC/Mobile compatibility
        window.open(`https://api.whatsapp.com/send?phone=${storeConfig.whatsappNumber}&text=${encoded}`, '_blank');
        setShowPaymentModal(false);
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-serif font-bold mb-4">{t('checkout.empty_cart')}</h2>
                <Link to="/menu"><Button>{t('checkout.browse_menu')}</Button></Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div>
                <h2 className="text-2xl font-serif font-bold mb-6">{t('checkout.order_summary')}</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-orange/10 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <div>
                                <span className="font-bold">{item.quantity}x</span> {item.name}
                            </div>
                            <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center pt-4 text-xl font-bold text-brand-red">
                        <span>{t('checkout.total')}</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Checkout Form */}
            <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold mb-6">{t('checkout.checkout_details')}</h2>

                {/* Delivery Method Selection */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${deliveryMethod === 'pickup'
                            ? 'border-brand-red bg-brand-red/5 text-brand-red'
                            : 'border-gray-200 hover:border-brand-red/50 text-gray-600'
                            }`}
                        onClick={() => setDeliveryMethod('pickup')}
                    >
                        <span className="font-bold">{t('checkout.mrt_pickup')}</span>
                        <span className="text-xs">{t('checkout.no_minimum')}</span>
                    </button>

                    <button
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${deliveryMethod === 'delivery'
                            ? 'border-brand-red bg-brand-red/5 text-brand-red'
                            : 'border-gray-200 text-gray-600'
                            } ${totalPrice < storeConfig.deliveryThreshold ? 'opacity-50 cursor-not-allowed' : 'hover:border-brand-red/50'}`}
                        onClick={() => {
                            if (totalPrice >= storeConfig.deliveryThreshold) setDeliveryMethod('delivery');
                        }}
                        disabled={totalPrice < storeConfig.deliveryThreshold}
                    >
                        <span className="font-bold">{t('checkout.home_delivery')}</span>
                        <span className="text-xs">
                            {totalPrice < storeConfig.deliveryThreshold
                                ? `${t('checkout.min_spend')} $${storeConfig.deliveryThreshold}`
                                : t('checkout.free_delivery')}
                        </span>
                    </button>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold">
                        {deliveryMethod === 'pickup' ? t('checkout.pickup_date') : t('checkout.delivery_date')} ({t('checkout.required')})
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-brand-brown/50" size={18} />
                        <input
                            type="date"
                            min={minDateStr}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-brand-orange ${errors.date || dateError ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                    </div>

                    {/* Collection Time Picker - Only for Pickup */}
                    {deliveryMethod === 'pickup' && (
                        <div className="mt-2 space-y-1">
                            <label className="block text-xs font-bold text-gray-600">
                                {t('checkout.collection_time')}
                            </label>
                            <input
                                type="time"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className={`w-full px-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-brand-orange ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            <p className="text-xs text-brand-orange">
                                {t('checkout.time_note')}
                            </p>
                        </div>
                    )}

                    <p className="text-xs text-gray-500 mt-2">
                        {t('checkout.advance_note', { days: leadTimeDays })}
                    </p>

                    {(dateError || errors.date) && (
                        <div className="flex items-start gap-2 text-red-600 text-sm">
                            <AlertCircle size={16} className="mt-0.5 shrink-0" />
                            <span>{dateError || errors.date}</span>
                        </div>
                    )}
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <input
                            type="text"
                            placeholder={t('checkout.name_placeholder')}
                            className={`w-full px-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-brand-orange ${errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={customerRef.name}
                            onChange={(e) => setCustomerRef({ ...customerRef, name: e.target.value })}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>

                    <div className="space-y-1">
                        <input
                            type="tel"
                            placeholder={t('checkout.phone_placeholder')}
                            className={`w-full px-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-brand-orange ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={customerRef.phone}
                            onChange={(e) => setCustomerRef({ ...customerRef, phone: e.target.value })}
                        />
                        {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                    </div>

                    {/* Conditional Input based on Method */}
                    {deliveryMethod === 'pickup' ? (
                        <div className="space-y-1">
                            <input
                                type="text"
                                placeholder={t('checkout.mrt_placeholder')}
                                className={`w-full px-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-brand-orange ${errors.mrt ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                value={mrtStation}
                                onChange={(e) => setMrtStation(e.target.value)}
                            />
                            {errors.mrt && <span className="text-red-500 text-sm">{errors.mrt}</span>}
                            <p className="text-xs text-gray-500">{t('checkout.coordinate_note')}</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <textarea
                                placeholder={t('checkout.address_placeholder')}
                                rows={3}
                                className={`w-full px-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-brand-orange ${errors.address ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                        </div>
                    )}
                </div>

                {/* Payment Actions */}
                <div className="pt-4 space-y-3">
                    <Button
                        onClick={handleWhatsAppOrder}
                        className="w-full bg-green-600 hover:bg-green-700 space-x-2"
                    >
                        <MessageCircle size={20} />
                        <span>{t('checkout.order_whatsapp')}</span>
                    </Button>

                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 space-y-6">
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                                    <MessageCircle size={24} />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900">{t('checkout.order_received')}</h3>
                                <p className="text-gray-500">
                                    {t('checkout.verify_payment')}
                                </p>
                            </div>

                            <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-orange/20 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">{t('checkout.total')}</span>
                                    <span className="text-xl font-bold text-brand-red">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-brand-orange/10 my-2"></div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-900">{t('checkout.paynow_label')}</div>
                                    <div className="text-2xl font-mono font-bold text-brand-brown tracking-wider">
                                        {storeConfig.paymentInfo.payNowNumber}
                                    </div>
                                    <div className="text-xs text-brand-orange">
                                        {t('checkout.transfer_note')}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-3 rounded-lg flex gap-3 text-sm text-blue-700">
                                <AlertCircle size={20} className="shrink-0" />
                                <p dangerouslySetInnerHTML={{ __html: t('checkout.screenshot_note') }} />
                            </div>

                            <div className="space-y-3 pt-2">
                                <Button
                                    onClick={confirmOrder}
                                    className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                                >
                                    {t('checkout.open_whatsapp')}
                                </Button>
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="w-full text-gray-500 hover:text-gray-800 text-sm font-medium"
                                >
                                    {t('checkout.go_back')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
