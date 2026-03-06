import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        if (token) {
            // Store token in cookie with 1 day expiry and Secure attribute if possible
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
