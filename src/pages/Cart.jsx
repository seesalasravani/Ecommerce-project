import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        toast.success("Proceeding to dummy checkout...");
        setTimeout(() => {
            clearCart();
            toast.success("Order placed successfully! (Demo)");
            navigate('/');
        }, 1500);
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty container fade-in">
                <div className="empty-content card">
                    <ShoppingBag size={80} color="var(--border)" />
                    <h2>Your cart is empty</h2>
                    <p>Explore our products and find something you love!</p>
                    <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page container fade-in">
            <h1 className="section-title">Shopping Cart</h1>

            <div className="cart-layout">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item card">
                            <div className="item-image" onClick={() => navigate(`/product/${item.id}`)}>
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="item-details">
                                <Link to={`/product/${item.id}`}><h3>{item.name}</h3></Link>
                                <p className="item-cat">{item.category}</p>
                                <div className="item-controls">
                                    <div className="quantity-control small">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                        <Trash2 size={18} /> Remove
                                    </button>
                                </div>
                            </div>

                            <div className="item-price">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="cart-summary">
                    <div className="summary-card card">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="free">Free</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax</span>
                            <span>$0.00</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                            Checkout <ArrowRight size={20} />
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
