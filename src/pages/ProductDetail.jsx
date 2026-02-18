import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useCart } from '../context/CartContext';
import Spinner from '../components/Spinner';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    // Fallback if not found in Firestore
                    const dummyProducts = [
                        { id: '1', name: 'Premium Wireless Headphones', price: 199, category: 'Electronics', description: 'Experience studio-quality sound with these premium wireless headphones. Features active noise cancellation and 40-hour battery life.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
                        { id: '2', name: 'Smart Watch Series 7', price: 349, category: 'Electronics', description: 'Track your health and stay connected with the most advanced smart watch yet. Large, always-on Retina display.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
                        { id: '3', name: 'Minimalist Leather Backpack', price: 89, category: 'Accessories', description: 'Elegant and durable, this leather backpack is perfect for professionals on the go. High-quality full grain leather.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
                    ];
                    const found = dummyProducts.find(p => p.id === id);
                    if (found) setProduct(found);
                    else navigate('/404');
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        toast.success(`${product.name} added to cart!`);
    };

    if (loading) return <Spinner fullPage />;
    if (!product) return null;

    return (
        <div className="product-detail-page container fade-in">
            <button onClick={() => navigate(-1)} className="back-btn">
                <ArrowLeft size={20} /> Back to Products
            </button>

            <div className="product-detail-layout">
                <div className="product-detail-image card">
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="product-detail-info">
                    <span className="detail-tag">{product.category}</span>
                    <h1>{product.name}</h1>
                    <div className="detail-rating">
                        <Star size={18} fill="var(--secondary)" color="var(--secondary)" />
                        <Star size={18} fill="var(--secondary)" color="var(--secondary)" />
                        <Star size={18} fill="var(--secondary)" color="var(--secondary)" />
                        <Star size={18} fill="var(--secondary)" color="var(--secondary)" />
                        <Star size={18} fill="#ccc" color="#ccc" />
                        <span>(120 Verified Reviews)</span>
                    </div>

                    <div className="detail-price">${product.price}</div>

                    <p className="detail-description">
                        {product.description || "This is a high-quality product designed to meet all your needs. Made with premium materials and advanced technology to ensure durability and performance."}
                    </p>

                    <div className="detail-actions">
                        <div className="quantity-control">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button className="btn btn-primary add-large" onClick={handleAddToCart}>
                            <ShoppingCart size={20} /> Add to Cart
                        </button>
                    </div>

                    <div className="detail-features">
                        <div className="feature">
                            <Truck size={24} />
                            <div>
                                <strong>Free Delivery</strong>
                                <p>Standard delivery in 3-5 days</p>
                            </div>
                        </div>
                        <div className="feature">
                            <RotateCcw size={24} />
                            <div>
                                <strong>Free Returns</strong>
                                <p>30 days return policy</p>
                            </div>
                        </div>
                        <div className="feature">
                            <ShieldCheck size={24} />
                            <div>
                                <strong>Secure Payment</strong>
                                <p>100% secure payment methods</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
