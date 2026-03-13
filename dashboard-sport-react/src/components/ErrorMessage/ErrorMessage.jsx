import React from 'react';
import './ErrorMessage.scss';

/**
 * Composant d'affichage des erreurs de chargement de données.
 * @param {object} props
 * @param {string} props.message - Le message d'erreur à afficher
 * @returns {React.ReactElement}
 */
const ErrorMessage = ({ message }) => {
    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon-circle">
                    <span>!</span>
                </div>
                <h2 className="error-title-text">Oups ! Une erreur est survenue</h2>
                <p className="error-description">
                    {message || "Impossible de charger les données. Veuillez vérifier que l'API est bien démarrée."}
                </p>
                <button className="error-retry-button" onClick={() => window.location.reload()}>
                    Actualiser la page
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;
