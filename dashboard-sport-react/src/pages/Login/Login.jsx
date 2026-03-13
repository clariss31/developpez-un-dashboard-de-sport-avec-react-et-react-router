import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as apiService from '../../services/apiService';
import AnimatedBars from '../../components/AnimatedBars/AnimatedBars';

/**
 * Page de connexion.
 * Affiche un formulaire de connexion et un lien pour retourner au dashboard.
 * @returns {React.ReactElement} - Page de connexion
 */

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login: setAuthToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await apiService.login(username, password);
            setAuthToken(data.token || data.jwt);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Erreur de connexion au serveur');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <div className="login-logo">
                    <AnimatedBars context="header" />
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

                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
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
