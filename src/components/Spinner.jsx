import React from 'react';

const Spinner = ({ fullPage = false }) => {
    if (fullPage) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255,255,255,0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999
            }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="loader-container">
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;
