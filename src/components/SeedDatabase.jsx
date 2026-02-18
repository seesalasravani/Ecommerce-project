import React, { useState } from 'react';
import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast } from 'react-hot-toast';
import { Database } from 'lucide-react';

const SeedDatabase = () => {
    const [seeding, setSeeding] = useState(false);

    const sampleProducts = [
        { name: 'Premium Wireless Headphones', price: 199, category: 'Electronics', description: 'Experience studio-quality sound with these premium wireless headphones. Features active noise cancellation and 40-hour battery life.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', rating: 4.8 },
        { name: 'Smart Watch Series 7', price: 349, category: 'Electronics', description: 'Track your health and stay connected with the most advanced smart watch yet. Large, always-on Retina display.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', rating: 4.5 },
        { name: 'Minimalist Leather Backpack', price: 89, category: 'Accessories', description: 'Elegant and durable, this leather backpack is perfect for professionals on the go. High-quality full grain leather.', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500', rating: 4.7 },
        { name: 'Professional DSLR Camera', price: 1299, category: 'Electronics', description: 'Capture stunning photos and videos with this professional-grade DSLR camera. Includes a versatile zoom lens.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500', rating: 4.9 },
        { name: 'Designer Ceramic Vase', price: 45, category: 'Home & Decor', description: 'A beautiful handcrafted ceramic vase to enhance your home decor. Minimalist and elegant design.', image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500', rating: 4.3 },
        { name: 'Cotton Casual T-Shirt', price: 29, category: 'Fashion', description: 'High-quality 100% cotton T-shirt for everyday comfort. Breathable and stylish.', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500', rating: 4.2 },
        { name: 'Classic Leather Wallet', price: 59, category: 'Accessories', description: 'Compact and functional leather wallet with multiple card slots and a dedicated bill compartment.', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500', rating: 4.6 }
    ];

    const seedData = async () => {
        setSeeding(true);
        try {
            // Check if products already exist to avoid duplicates
            const q = query(collection(db, "products"), limit(1));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                toast.error("Products already exist in your database!");
                setSeeding(false);
                return;
            }

            const promises = sampleProducts.map(product =>
                addDoc(collection(db, "products"), {
                    ...product,
                    createdAt: new Date().toISOString()
                })
            );

            await Promise.all(promises);
            toast.success("Successfully seeded 7 products to Firestore!");
        } catch (error) {
            console.error("Seeding failed:", error);
            toast.error("Failed to seed database. Check your Firestore rules.");
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div style={{ margin: '20px 0', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Admin Tools: Click below to populate your Firestore with sample data.
            </p>
            <button
                onClick={seedData}
                className="btn btn-outline"
                disabled={seeding}
                style={{ fontSize: '0.9rem', padding: '8px 15px' }}
            >
                <Database size={16} /> {seeding ? "Seeding..." : "Seed Firestore with Products"}
            </button>
        </div>
    );
};

export default SeedDatabase;
