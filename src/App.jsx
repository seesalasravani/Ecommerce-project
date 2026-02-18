import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { seedDatabase } from './utils/seedDatabase';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Spinner from './components/Spinner';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <Spinner fullPage />;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Seed database with products on first load
  useEffect(() => {
    seedDatabase();
  }, []);

  // Placeholder components for pages not yet implemented to avoid crashes
  const ComingSoon = ({ title }) => (
    <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>This page is under development.</p>
    </div>
  );

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Toaster position="top-right" />
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
