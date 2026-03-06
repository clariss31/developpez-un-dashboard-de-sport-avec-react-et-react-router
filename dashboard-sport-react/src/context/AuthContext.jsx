import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

/**
 * Création du contexte d'authentification.
 * Ce contexte permettra de partager l'état d'authentification entre les composants.
 */
const AuthContext = createContext();

/**
 * Provider pour le contexte d'authentification.
 * Gère l'état d'authentification et la persistance des données via les cookies.
 * @param {object} props - Props du composant
 * @param {React.ReactNode} props.children - Contenu à envelopper avec le provider
 * @returns {React.ReactElement} - AuthProvider avec son contenu
 */

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        if (token) {
            // Cookie avec le token avec 1 jour d'expiration
            Cookies.set('token', token, { expires: 1, secure: false, sameSite: 'strict' });
            setIsAuthenticated(true);
        } else {
            Cookies.remove('token');
            setIsAuthenticated(false);
        }
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
