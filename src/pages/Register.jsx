import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const { name, email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            return toast.error("Please fill in all fields");
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        try {
            setLoading(true);
            await register(name, email, password);
            toast.success("Account created successfully!");
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to create account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container fade-in">
            <div className="auth-card card">
                <div className="auth-header">
                    <UserPlus size={32} className="auth-icon" />
                    <h2>Create Account</h2>
                    <p>Join thousands of happy shoppers.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label><User size={16} /> Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="input-field"
                            placeholder="John Doe"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label><Mail size={16} /> Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="input-field"
                            placeholder="name@example.com"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label><Lock size={16} /> Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label><Lock size={16} /> Confirm Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className="input-field"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
