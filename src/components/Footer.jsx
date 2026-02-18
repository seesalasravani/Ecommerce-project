import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import SeedDatabase from './SeedDatabase';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-info">
                    <h3>E-Shop</h3>
                    <p>Your one-stop shop for everything you need. Quality products at the best prices.</p>
                    <div className="social-links">
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                    </div>
                    <SeedDatabase />
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Customer Service</h4>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Shipping Policy</a></li>
                        <li><a href="#">Return & Refund</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <div className="contact-item">
                        <MapPin size={18} />
                        <span>123 Market St, San Francisco, CA</span>
                    </div>
                    <div className="contact-item">
                        <Phone size={18} />
                        <span>+1 (234) 567-890</span>
                    </div>
                    <div className="contact-item">
                        <Mail size={18} />
                        <span>support@eshop.com</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
