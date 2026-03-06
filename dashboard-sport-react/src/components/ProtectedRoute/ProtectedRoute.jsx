import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Composant ProtectedRoute pour protéger les routes nécessitant une authentification.
 * Si l'utilisateur n'est pas authentifié, il est redirigé vers la page de connexion.
 * @param {object} props - Props du composant
 * @param {React.ReactNode} props.children - Contenu à protéger
 * @returns {React.ReactNode|React.ReactElement} - Contenu protégé ou redirection
 */

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
