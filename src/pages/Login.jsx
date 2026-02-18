import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("Please fill in all fields");
        }

        try {
            setLoading(true);
            await login(email, password);
            toast.success("Logged in successfully!");
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to login. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container fade-in">
            <div className="auth-card card">
                <div className="auth-header">
                    <LogIn size={32} className="auth-icon" />
                    <h2>Welcome Back</h2>
                    <p>Login to your account to continue shopping.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label><Mail size={16} /> Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label><Lock size={16} /> Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register">Create one</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
