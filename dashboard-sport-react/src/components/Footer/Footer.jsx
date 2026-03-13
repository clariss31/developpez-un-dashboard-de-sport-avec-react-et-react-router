import React from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedBars from '../AnimatedBars/AnimatedBars';

const Footer = () => {
    const location = useLocation();

    // Ne pas afficher le Footer sur la page de connexion
    if (location.pathname === '/login') {
        return null;
    }

    return (
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-left">
                    <p>©Sportsee Tous droits réservés</p>
                </div>
                <div className="footer-right">
                    <a href="#" className="footer-link">Conditions générales</a>
                    <a href="#" className="footer-link">Contact</a>
                    <AnimatedBars context="footer" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
