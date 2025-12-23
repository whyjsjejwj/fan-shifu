export const products = [
    {
        id: 1,
        name: "Mianpi (擀面皮)",
        description: "Signature cold noodles with gluten, tossed in our secret chili oil and vinegar sauce.",
        description_zh: "招牌凉皮配面筋，拌入秘制辣椒油和香醋汁。",
        price: 4.50,
        category: "Noodles",
        image: "/mianpi-new.png",
        popular: true,
        isSurchargeItem: true,
        orderingCriteria: "Sold in pairs (Mix & match allowed). Min 2 total order.",
        orderingCriteria_zh: "成对出售（可混合搭配）。最低订购2份。"
    },
    {
        id: 2,
        name: "Mipi (米皮)",
        description: "Silky soft rice noodles served with bean sprouts, cucumbers and savory seasoning.",
        description_zh: "口感细腻的米皮，搭配豆芽、黄瓜和香浓调料。",
        price: 4.50,
        category: "Noodles",
        image: "/mipi-updated.png",
        popular: true,
        isSurchargeItem: true,
        orderingCriteria: "Sold in pairs (Mix & match allowed). Min 2 total order.",
        orderingCriteria_zh: "成对出售（可混合搭配）。最低订购2份。"
    },
    {
        id: 3,
        name: "Roujiamo (肉夹馍)",
        description: "Crispy handmade bun stuffed with succulent, slow-braised pork belly. (Set of 2)",
        description_zh: "酥脆手工白吉饼，夹入多汁慢炖腊汁肉。（2个一套）",
        price: 9.00,
        category: "Meat",
        image: "/roujiamo-new.jpg",
        popular: true,
        orderingCriteria: "Sold as a set of 2.",
        orderingCriteria_zh: "2个一套出售。"
    },
    {
        id: 4,
        name: "Cufen (醋粉)",
        description: "Unique noodles made from fermented vinegar residue, offering a distinct sour and savory flavor.",
        description_zh: "独特酿醋余料制作的面条，酸香开胃，风味独特。",
        price: 5.00,
        category: "Noodles",
        image: "/cufen.png",
        popular: false,
        isSurchargeItem: true,
        orderingCriteria: "Sold in pairs (Mix & match allowed). Min 2 total order.",
        orderingCriteria_zh: "成对出售（可混合搭配）。最低订购2份。"
    },
    {
        id: 6,
        name: "Spiced Beef Shanks (五香牛腱子)",
        description: "Tender beef shanks braised with a blend of five spices, sliced thin. (250g)",
        description_zh: "五香卤制牛腱子，切片享用，肉质鲜嫩。（250克）",
        price: 11.00,
        category: "Meat",
        image: "/spiced-beef-shanks.png",
        popular: false
    },
    {
        id: 7,
        name: "Saozirou (臊子肉)",
        description: "Savory minced pork belly stir-fried with vinegar and spices. (500g)",
        description_zh: "酸辣开胃的肉哨子，搭配醋和香料炒制。（500克）",
        price: 23.00,
        category: "Meat",
        image: "/saozirou-new.png",
        popular: false
    },
    {
        id: 8,
        name: "Baiji Bun (白吉饼)",
        description: "Crispy, oven-baked flatbread, perfect for pairing with savory meats.",
        description_zh: "酥脆烤制面饼，搭配腊汁肉的完美伴侣。",
        price: 1.50,
        category: "Bread",
        image: "/baiji-bun.png",
        popular: false,
        orderingCriteria: "Minimum order of 10 pieces.",
        orderingCriteria_zh: "最低订购10个。"
    },
    {
        id: 9,
        name: "Gluten (面筋)",
        description: "Spongy wheat gluten pieces that absorb our signature sauces perfectly.",
        description_zh: "吸饱秘制酱汁的面筋，口感软糯。",
        price: 4.50,
        category: "Others",
        image: "/gluten.png",
        popular: false,
        isSurchargeItem: true,
        orderingCriteria: "Sold in pairs (Mix & match allowed). Min 2 total order.",
        orderingCriteria_zh: "成对出售（可混合搭配）。最低订购2份。"
    },
    {
        id: 10,
        name: "Guagua (呱呱)",
        description: "Traditional buckwheat jelly snack with a unique chewy texture, served with spicy chili oil.",
        description_zh: "传统荞麦制作的小吃，口感独特有嚼劲，配辣椒油。",
        price: 4.50,
        category: "Others",
        image: "/guagua.png",
        popular: false,
        isSurchargeItem: true,
        orderingCriteria: "Sold in pairs (Mix & match allowed). Min 2 total order.",
        orderingCriteria_zh: "成对出售（可混合搭配）。最低订购2份。"
    }
];

export const categories = ["All", "Noodles", "Meat", "Bread", "Others"];
