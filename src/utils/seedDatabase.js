import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Product data organized by category
const productsData = {
    Electronics: [
        { name: 'Premium Wireless Headphones', price: 199, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'High-quality wireless headphones with noise cancellation' },
        { name: 'Smart Watch Series 7', price: 349, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Advanced smartwatch with health tracking' },
        { name: 'Professional DSLR Camera', price: 1299, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Professional grade DSLR camera' },
        { name: 'Portable SSD 1TB', price: 129, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Fast and reliable portable storage' },
        { name: 'Wireless Charger Pro', price: 49, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Multi-device wireless charging pad' },
        { name: '4K Webcam', price: 159, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Crystal clear 4K video streaming' },
        { name: 'Mechanical Gaming Keyboard', price: 119, image: 'https://images.unsplash.com/photo-1587829191301-26d2a0abb4d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'RGB mechanical keyboard for gaming' },
        { name: 'Noise-Cancelling Earbuds', price: 249, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'True wireless earbuds with ANC' },
        { name: 'USB-C Hub Multi-Port', price: 69, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'All-in-one USB-C connectivity hub' },
        { name: 'Wireless Mouse Pro', price: 59, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Precision wireless mouse with long battery' }
    ],
    Fashion: [
        { name: 'Cotton Casual T-Shirt', price: 25, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Comfortable cotton t-shirt' },
        { name: 'Premium Denim Jeans', price: 79, image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'High-quality denim jeans' },
        { name: 'Casual Sneakers', price: 89, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Comfortable and stylish sneakers' },
        { name: 'Wool Winter Coat', price: 199, image: 'https://images.unsplash.com/photo-1539533057440-7814c9d626cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Warm wool winter coat' },
        { name: 'Summer Floral Dress', price: 59, image: 'https://images.unsplash.com/photo-1595777712802-93ff1a54415d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Beautiful floral summer dress' },
        { name: 'Leather Jacket', price: 249, image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Classic black leather jacket' },
        { name: 'Casual Chinos', price: 69, image: 'https://images.unsplash.com/photo-1473819802416-a9b5c3e89a5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Versatile casual chinos' },
        { name: 'Polo Shirt Collection', price: 45, image: 'https://images.unsplash.com/photo-1618099215451-5a9a53f102c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Classic polo shirt' },
        { name: 'Fancy Button-Up Shirt', price: 75, image: 'https://images.unsplash.com/photo-1602810316693-3667c854239f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Elegant button-up shirt' },
        { name: 'Athletic Performance Shorts', price: 39, image: 'https://images.unsplash.com/photo-1506629082632-401444d85e5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'High-performance sports shorts' }
    ],
    'Home & Decor': [
        { name: 'Designer Ceramic Vase', price: 45, image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Beautiful ceramic vase' },
        { name: 'Modern Wall Clock', price: 35, image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Stylish modern wall clock' },
        { name: 'LED String Lights', price: 29, image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Decorative LED string lights' },
        { name: 'Marble Coffee Table', price: 299, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Elegant marble coffee table' },
        { name: 'Fuzzy Area Rug', price: 89, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Soft and cozy area rug' },
        { name: 'Canvas Wall Art Set', price: 79, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Modern canvas art prints' },
        { name: 'Decorative Pillow Set', price: 49, image: 'https://images.unsplash.com/photo-1516062423479-7f3b9c9e786e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Colorful decorative pillows' },
        { name: 'Plant Pot Collection', price: 25, image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Modern plant pots' },
        { name: 'Table Lamp Modern', price: 65, image: 'https://images.unsplash.com/photo-1565182999561-9cc6fa8d86f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Minimalist table lamp' },
        { name: 'Throw Blanket Soft', price: 55, image: 'https://images.unsplash.com/photo-1577005228509-5be2bc35c4a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Cozy throw blanket' }
    ],
    Accessories: [
        { name: 'Minimalist Leather Backpack', price: 89, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Stylish leather backpack' },
        { name: 'Classic Wrist Watch', price: 149, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Elegant wrist watch' },
        { name: 'Sunglasses UV Protection', price: 75, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Stylish UV protection sunglasses' },
        { name: 'Leather Wallet', price: 49, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Premium leather wallet' },
        { name: 'Silk Scarf', price: 39, image: 'https://images.unsplash.com/photo-1490218450466-ee8f656f8bf0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Luxurious silk scarf' },
        { name: 'Canvas Tote Bag', price: 59, image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Durable canvas tote bag' },
        { name: 'Stainless Steel Belt', price: 45, image: 'https://images.unsplash.com/photo-1624526267942-ab67cb38121d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Stainless steel belt' },
        { name: 'Designer Sunglasses', price: 129, image: 'https://images.unsplash.com/photo-1572635196237-708eadad3870?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Designer sunglasses' },
        { name: 'Beanie Winter Hat', price: 29, image: 'https://images.unsplash.com/photo-1543163521-9145f2c86ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Warm winter beanie' },
        { name: 'Crossbody Messenger Bag', price: 79, image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: 'Practical messenger bag' }
    ]
};

// Function to seed the database
export const seedDatabase = async () => {
    try {
        // Check if products already exist
        const productsCollection = collection(db, 'products');
        const existingProducts = await getDocs(productsCollection);

        if (existingProducts.size > 0) {
            console.log('Database already seeded with products');
            return { success: true, message: 'Database already seeded' };
        }

        // Add products to Firestore
        let addedCount = 0;
        for (const [category, products] of Object.entries(productsData)) {
            for (const product of products) {
                await addDoc(productsCollection, {
                    ...product,
                    category,
                    createdAt: new Date().toISOString(),
                    rating: Math.floor(Math.random() * 2) + 4, // Random rating 4-5
                    reviews: Math.floor(Math.random() * 500)
                });
                addedCount++;
            }
        }

        console.log(`Successfully added ${addedCount} products to Firestore`);
        return { success: true, message: `Added ${addedCount} products` };
    } catch (error) {
        console.error('Error seeding database:', error);
        return { success: false, error: error.message };
    }
};

// Alternative: Export data for manual import
export { productsData };
