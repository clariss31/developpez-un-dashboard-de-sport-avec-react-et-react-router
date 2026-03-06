import React from 'react';
import { Link } from 'react-router-dom';

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
