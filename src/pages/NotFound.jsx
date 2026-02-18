import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="container fade-in" style={{
            padding: '100px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
        }}>
            <Ghost size={100} color="var(--border)" />
            <h1 style={{ fontSize: '4rem', fontWeight: 800 }}>404</h1>
            <h2>Oops! Page Not Found</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px' }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
