import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <nav>
                {isAuthenticated ? (
                    <>
                        <Link style={{ marginRight: '10px' }} to="/">Dashboard</Link>
                        <Link style={{ marginRight: '10px' }} to="/profile">Profil</Link>
                        <button onClick={handleLogout} className="logout-btn">Se déconnecter</button>
                    </>
                ) : (
                    <Link to="/login">Se connecter</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
