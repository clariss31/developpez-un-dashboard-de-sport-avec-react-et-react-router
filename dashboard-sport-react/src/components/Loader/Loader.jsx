import React from 'react';
import './Loader.scss';

/**
 * Composant de chargement générique
 * @param {object} props 
 * @param {string} props.text - Texte optionnel affiché sous le loader
 */
const Loader = ({ text }) => {
    return (
        <div className="loader-container">
            <div className="loader-spinner"></div>
            {text && <p className="loader-text">{text}</p>}
        </div>
    );
};

export default Loader;
