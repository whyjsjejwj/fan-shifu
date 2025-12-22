export const storeConfig = {
    name: "Fan Shifu",
    whatsappNumber: "6598291805",
    leadTimeDays: 1, // Minimum days in advance
    maxLeadTimeDays: 30,
    deliveryThreshold: 100,
    holidays: [
        {
            start: "2025-01-01",
            end: "2025-01-03",
            reason: "New Year Break"
        }
    ],
    isOpen: true, // Master switch
    paymentInfo: {
        payNowNumber: "98291805",
        instructions: "Please make payment via PayNow/PayLah.",
        uen: ""
    }
};
