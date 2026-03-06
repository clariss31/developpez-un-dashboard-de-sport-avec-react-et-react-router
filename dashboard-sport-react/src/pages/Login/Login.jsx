import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Page de connexion.
 * Affiche un formulaire de connexion et un lien pour retourner au dashboard.
 * @returns {React.ReactElement} - Page de connexion
 */

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data.token || data.jwt);
                navigate('/');
            } else {
                setError('Identifiants invalides');
            }
        } catch (err) {
            setError('Erreur de connexion au serveur');
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <div className="login-logo">
                    <div className="logo-icon">
                        <span></span><span></span><span></span>
                    </div>
                    SPORTSEE
                </div>

                <div className="login-form-container">
                    <h1>Transformez<br />vos stats en résultats</h1>
                    <div className="form-title">Se connecter</div>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Adresse email</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn">Se connecter</button>
                        <div className="forgot-password">Mot de passe oublié ?</div>
                    </form>
                </div>
            </div>

            <div className="login-right">
                <div className="image-overlay-text">
                    Analysez vos performances en un clin d'œil, suivez vos progrès et atteignez vos objectifs.
                </div>
            </div>
        </div>
    );
};

export default Login;
