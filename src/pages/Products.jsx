import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { Filter, ChevronDown, Search as SearchIcon } from 'lucide-react';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        category: 'All',
        sort: 'newest'
    });

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialSearch = searchParams.get('search') || '';
    const initialCategory = searchParams.get('category') || 'All';

    const categories = ['All', 'Electronics', 'Fashion', 'Home & Decor', 'Accessories'];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let q = collection(db, "products");

                // In a real app with index:
                // if (filter.category !== 'All') {
                //   q = query(q, where("category", "==", filter.category));
                // }

                const querySnapshot = await getDocs(q);
                let results = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Client-side filtering and search (for simplicity with Firebase indexes)
                if (initialSearch) {
                    results = results.filter(p => p.name.toLowerCase().includes(initialSearch.toLowerCase()));
                }

                if (filter.category !== 'All') {
                    results = results.filter(p => p.category === filter.category);
                } else if (initialCategory !== 'All') {
                    results = results.filter(p => p.category === initialCategory);
                }

                // Sorting
                if (filter.sort === 'priceLow') {
                    results.sort((a, b) => a.price - b.price);
                } else if (filter.sort === 'priceHigh') {
                    results.sort((a, b) => b.price - a.price);
                }

                // Fallback dummy data if no results/firestore empty
                if (results.length === 0 && !initialSearch) {
                    results = [
                        { id: '1', name: 'Premium Wireless Headphones', price: 199, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
                        { id: '2', name: 'Smart Watch Series 7', price: 349, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
                        { id: '3', name: 'Minimalist Leather Backpack', price: 89, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
                        { id: '4', name: 'Professional DSLR Camera', price: 1299, category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
                        { id: '5', name: 'Cotton Casual T-Shirt', price: 25, category: 'Fashion', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
                        { id: '6', name: 'Designer Ceramic Vase', price: 45, category: 'Home & Decor', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
                    ];

                    if (filter.category !== 'All') {
                        results = results.filter(p => p.category === filter.category);
                    }
                    if (filter.sort === 'priceLow') results.sort((a, b) => a.price - b.price);
                    else if (filter.sort === 'priceHigh') results.sort((a, b) => b.price - a.price);
                }

                setProducts(results);
            } catch (error) {
                console.error("Fetch products failed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filter, initialSearch, initialCategory]);

    return (
        <div className="products-page container fade-in">
            <div className="products-layout">
                <aside className="products-sidebar">
                    <div className="filter-section">
                        <h3 className="filter-title"><Filter size={18} /> Categories</h3>
                        <ul className="category-list">
                            {categories.map(cat => (
                                <li key={cat}>
                                    <button
                                        className={filter.category === cat ? 'active' : ''}
                                        onClick={() => setFilter({ ...filter, category: cat })}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="products-main">
                    <div className="products-header">
                        <h1 className="section-title">
                            {initialSearch ? `Search Results for "${initialSearch}"` : `${filter.category} Products`}
                        </h1>
                        <div className="products-sort">
                            <label>Sort by:</label>
                            <div className="sort-select-wrapper">
                                <select
                                    value={filter.sort}
                                    onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="priceLow">Price: Low to High</option>
                                    <option value="priceHigh">Price: High to Low</option>
                                </select>
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) : products.length > 0 ? (
                        <div className="product-grid">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-products">
                            <SearchIcon size={64} color="var(--text-muted)" />
                            <h2>No products found</h2>
                            <p>Try adjusting your search or filters to find what you're looking for.</p>
                            <button className="btn btn-primary" onClick={() => setFilter({ category: 'All', sort: 'newest' })}>
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;
