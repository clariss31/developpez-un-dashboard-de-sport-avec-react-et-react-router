import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();

    // Do not display Footer on the login page
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
                    {/* Tiny icon from mockup - using simple CSS bars for now instead of full image since it's just decorative */}
                    <div className="footer-icon">
                        <span className="bar red"></span>
                        <span className="bar black"></span>
                        <span className="bar red"></span>
                        <span className="bar black"></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
