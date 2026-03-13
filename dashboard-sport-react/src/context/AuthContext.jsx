import React, { createContext, useState, useContext } from 'react';

/**
 * Création du contexte d'authentification.
 * Ce contexte permettra de partager l'état d'authentification entre les composants.
 */
const AuthContext = createContext();

/**
 * Provider pour le contexte d'authentification.
 * Gère l'état d'authentification et la persistance des données via localStorage.
 * @param {object} props - Props du composant
 * @param {React.ReactNode} props.children - Contenu à envelopper avec le provider
 * @returns {React.ReactElement} - AuthProvider avec son contenu
 */

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);


    const login = (newToken) => {
        // Écriture synchrone : localStorage est à jour AVANT que
        // UserContext ne réagisse au changement de token et appelle l'API
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
