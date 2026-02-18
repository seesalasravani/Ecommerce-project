import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ShoppingCart,
    User,
    LogOut,
    Search,
    Menu,
    X,
    ShoppingBag,
    Moon,
    Sun
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { currentUser, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}`);
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
                    <ShoppingBag size={28} className="logo-icon" />
                    <span>E-Shop</span>
                </Link>

                <form className="nav-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit"><Search size={20} /></button>
                </form>

                <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/products" className="nav-item" onClick={() => setIsMenuOpen(false)}>Products</Link>

                    <div className="nav-actions">
                        <button className="theme-toggle" onClick={toggleTheme}>
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <Link to="/cart" className="nav-cart" onClick={() => setIsMenuOpen(false)}>
                            <ShoppingCart size={24} />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>

                        {currentUser ? (
                            <div className="nav-user">
                                <span className="user-name">Hi, {currentUser.displayName?.split(' ')[0]}</span>
                                <button onClick={handleLogout} className="logout-btn" title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="nav-auth-links">
                                <Link to="/login" className="login-link" onClick={() => setIsMenuOpen(false)}>
                                    <User size={20} />
                                    <span>Login</span>
                                </Link>
                                <Link to="/register" className="register-link" onClick={() => setIsMenuOpen(false)}>
                                    <span>Register</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
