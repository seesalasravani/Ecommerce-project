import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Spinner from '../components/Spinner';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const q = query(collection(db, "products"), limit(4));
                const querySnapshot = await getDocs(q);
                const products = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFeaturedProducts(products);
            } catch (error) {
                console.error("Error fetching products:", error);
                // Fallback dummy data if Firestore is empty or fails
                setFeaturedProducts([
                    { id: '1', name: 'Premium Wireless Headphones', price: 199, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
                    { id: '2', name: 'Smart Watch Series 7', price: 349, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
                    { id: '3', name: 'Minimalist Leather Backpack', price: 89, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
                    { id: '4', name: 'Professional DSLR Camera', price: 1299, category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    const categories = [
        { name: 'Electronics', icon: '💻', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Fashion', icon: '👔', image: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Home & Decor', icon: '🏠', image: 'https://images.unsplash.com/photo-1484101403033-57105d2b77ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Accessories', icon: '⌚', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ];

    return (
        <div className="home-page fade-in">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <h1>Upgrade Your Lifestyle</h1>
                    <p>Discover the latest trends in electronics, fashion, and more. Quality guaranteed.</p>
                    <Link to="/products" className="btn btn-primary btn-lg">Shop Now</Link>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories container">
                <h2 className="section-title">Shop by Categories</h2>
                <div className="category-grid">
                    {categories.map((cat, idx) => (
                        <Link to={`/products?category=${cat.name}`} key={idx} className="category-card">
                            <img src={cat.image} alt={cat.name} />
                            <div className="category-overlay">
                                <span>{cat.icon}</span>
                                <h3>{cat.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured container">
                <div className="section-header">
                    <h2 className="section-title">Featured Products</h2>
                    <Link to="/products" className="view-all">View All Products →</Link>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="product-grid">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* Registration CTA Section */}
            {!currentUser && (
                <section className="registration-cta">
                    <div className="container cta-content">
                        <div className="cta-text">
                            <h2>Join Our E-Shop Community</h2>
                            <p>Create an account to track orders, save favorites, and get exclusive discounts.</p>
                        </div>
                        <div className="cta-actions">
                            <Link to="/register" className="btn btn-primary btn-lg">Create An Account</Link>
                            <p className="cta-login-link">Already have an account? <Link to="/login">Login here</Link></p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
