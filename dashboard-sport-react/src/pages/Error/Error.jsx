import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Page d'erreur 404.
 * Affiche un message d'erreur et un lien pour retourner au dashboard.
 * @returns {React.ReactElement} - Page d'erreur
 */

const Error = () => {
    return (
        <div className="error-page">
            <h1 className="error-title">404</h1>
            <p className="error-text">Oups ! La page que vous demandez n'existe pas.</p>
            <div className="error-btn-container">
                <Link to="/" className="error-btn">Retourner sur la page d'accueil</Link>
            </div>
        </div>
    );
};

export default Error;
