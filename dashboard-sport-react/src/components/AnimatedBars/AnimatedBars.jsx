import React from 'react';
import './AnimatedBars.scss';

/**
 * Composant d'animation de barres (style égaliseur audio).
 * Utilisé dans le Header (à gauche du logo) et dans le Footer (après "Contact").
 * @param {object} props
 * @param {'header'|'footer'} props.context - Contexte d'affichage pour le sizing
 */
const AnimatedBars = ({ context = 'footer' }) => {
    return (
        <div className={`animated-bars animated-bars--${context}`} aria-hidden="true">
            {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={`animated-bars__bar animated-bars__bar--${i}`} />
            ))}
        </div>
    );
};

export default AnimatedBars;
