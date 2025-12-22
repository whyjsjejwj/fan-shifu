export const products = [
    {
        id: 1,
        name: "Mianpi (擀面皮)",
        description: "Signature cold noodles with gluten, tossed in our secret chili oil and vinegar sauce.",
        price: 4.50,
        category: "Noodles",
        image: "/mianpi.jpg",
        popular: true,
        isSurchargeItem: true,
        orderingCriteria: "Sold in pairs (Mix & match allowed). Min 2 total order."
    },
    {
        id: 2,
        name: "Mipi (米皮)",
        description: "Silky soft rice noodles served with bean sprouts, cucumbers and savory seasoning.",
        price: 4.50,
        category: "Noodles",
        image: "/mipi.jpg",
        popular: true,
        isSurchargeItem: true,
        orderingCriteria: "Sold in pairs (Mix & match allowed). Min 2 total order."
    },
    {
        id: 3,
        name: "Roujiamo (肉夹馍)",
        description: "Crispy handmade bun stuffed with succulent, slow-braised pork belly. (Set of 2)",
        price: 9.00,
        category: "Meat",
        image: "/roujiamo-new.jpg",
        popular: true,
        orderingCriteria: "Sold as a set of 2."
    },
    {
        id: 4,
        name: "Cufen (醋粉)",
        description: "Unique noodles made from fermented vinegar residue, offering a distinct sour and savory flavor.",
        price: 5.00,
        category: "Noodles",
        image: "",
        popular: false,
        isSurchargeItem: true,
        orderingCriteria: "Sold in pairs (Mix & match allowed). Min 2 total order."
    },
    {
        id: 6,
        name: "Spiced Beef Shanks (五香牛腱子)",
        description: "Tender beef shanks braised with a blend of five spices, sliced thin. (250g)",
        price: 11.00,
        category: "Meat",
        image: "",
        popular: false
    },
    {
        id: 7,
        name: "Saozirou (臊子肉)",
        description: "Savory minced pork belly stir-fried with vinegar and spices. (500g)",
        price: 23.00,
        category: "Meat",
        image: "/saozirou.jpg",
        popular: false
    },
    {
        id: 8,
        name: "Baiji Bun (白吉饼)",
        description: "Crispy, oven-baked flatbread, perfect for pairing with savory meats.",
        price: 1.50,
        category: "Bread",
        image: "",
        popular: false,
        orderingCriteria: "Minimum order of 10 pieces."
    },
    {
        id: 9,
        name: "Gluten (面筋)",
        description: "Spongy wheat gluten pieces that absorb our signature sauces perfectly.",
        price: 4.50,
        category: "Others",
        image: "",
        popular: false,
        isSurchargeItem: true,
        orderingCriteria: "Sold in pairs (Mix & match allowed). Min 2 total order."
    },
    {
        id: 10,
        name: "Guagua (呱呱)",
        description: "Traditional buckwheat jelly snack with a unique chewy texture, served with spicy chili oil.",
        price: 4.50,
        category: "Others",
        image: "",
        popular: false,
        isSurchargeItem: true,
        orderingCriteria: "Sold in pairs (Mix & match allowed). Min 2 total order."
    }
];

export const categories = ["All", "Noodles", "Meat", "Bread", "Others"];
