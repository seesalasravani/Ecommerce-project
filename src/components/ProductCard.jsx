import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [imageError, setImageError] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="product-card card">
            <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image">
                    {!imageError ? (
                        <img 
                            src={product.image} 
                            alt={product.name}
                            onError={handleImageError}
                            loading="lazy"
                        />
                    ) : (
                        <div className="image-fallback">
                            <Package size={40} />
                            <span>Image Not Available</span>
                        </div>
                    )}
                    {product.category && <span className="product-tag">{product.category}</span>}
                </div>
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-rating">
                        <Star size={16} fill="var(--secondary)" color="var(--secondary)" />
                        <span>4.5 (120 reviews)</span>
                    </div>
                    <div className="product-price-row">
                        <span className="product-price">${product.price}</span>
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            <ShoppingCart size={20} />
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
