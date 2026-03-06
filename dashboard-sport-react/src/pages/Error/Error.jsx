import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Page d'erreur 404.
 * Affiche un message d'erreur et un lien pour retourner au dashboard.
 * @returns {React.ReactElement} - Page d'erreur
 */

const Error = () => {
    return (
        <div>
            <h1>404 - Page non trouvée</h1>
            <p>Désolé, la page que vous recherchez n'existe pas.</p>
            <Link to="/">Retourner au dashboard</Link>
        </div>
    );
};

export default Error;
