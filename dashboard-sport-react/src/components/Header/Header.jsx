import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

/**
 * Composant Header de l'application.
 * Affiche la navigation principale et gère la déconnexion.
 */

const Header = () => {
    // Récupération des informations d'authentification depuis le contexte
    const { isAuthenticated, logout } = useAuth();
    // Hook pour la navigation et la localisation actuelle
    const navigate = useNavigate();
    const location = useLocation();

    // Ne pas afficher le header sur la page de connexion
    if (location.pathname === '/login') {
        return null;
    }

    /**
     * Gère la déconnexion de l'utilisateur.
     * Appelle la méthode logout du contexte et redirige vers la page login.
     */
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/">
                    <img src={logo} alt="SportSee Logo" />
                </Link>
            </div>
            <nav className="header-nav">
                {isAuthenticated ? (
                    <div className="nav-container">
                        <NavLink to="/" end>Dashboard</NavLink>
                        <NavLink to="/profile">Mon profil</NavLink>
                        <span className="nav-separator">|</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Se déconnecter
                        </button>
                    </div>
                ) : (
                    <div className="nav-container">
                        <NavLink to="/login">Se connecter</NavLink>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
