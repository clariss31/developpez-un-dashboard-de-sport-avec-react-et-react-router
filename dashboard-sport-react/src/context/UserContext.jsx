import React, { createContext, useContext, useState, useEffect } from 'react';
import * as apiService from '../services/apiService';
import { useAuth } from './AuthContext';

/**
 * Création du contexte utilisateur.
 * Ce contexte permettra de partager les données utilisateur entre les composants.
 */
const UserContext = createContext();

/**
 * Provider pour le contexte utilisateur.
 * Gère l'état des données utilisateur.
 * @param {object} props - Props du composant
 * @param {React.ReactNode} props.children - Contenu à envelopper avec le provider
 * @returns {React.ReactElement} - UserProvider avec son contenu
 */

export const UserProvider = ({ children }) => {
    const { token, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [userActivity, setUserActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Ne charge les données que si un token JWT est disponible
        if (!token) {
            setLoading(false);
            return;
        }

        const loadData = async () => {
            setLoading(true);
            setError(null);

            let mainData = null;
            let activityData = [];

            try {
                // Le backend identifie l'utilisateur via le token JWT
                try {
                    mainData = await apiService.getUserMainData();
                } catch (err) {
                    if (err.status === 401) {
                        logout();
                        return; // Arrêt du chargement (redirection automatique)
                    }
                    throw new Error("Impossible de charger les données principales");
                }

                try {
                    activityData = await apiService.getUserActivity();
                } catch (err) {
                    if (err.status === 401) {
                        logout();
                        return; // Arrêt du chargement (redirection automatique)
                    }
                    console.error("Erreur chargement activité:", err);
                    // Laisse activityData comme un tableau vide, permettant au profil de s'afficher
                }

                const sharedProfile = {
                    firstName: mainData.profile.firstName,
                    lastName: mainData.profile.lastName,
                    createdAt: mainData.profile.createdAt,
                    profilePicture: mainData.profile.profilePicture,
                    age: mainData.profile.age,
                    weight: mainData.profile.weight,
                    height: mainData.profile.height,
                    gender: mainData.profile.gender || "Femme",
                };

                const sharedStats = {
                    totalDistance: mainData.statistics.totalDistance,
                    totalDuration: mainData.statistics.totalDuration,
                    totalSessions: mainData.statistics.totalSessions,
                };

                const sharedActivity = activityData.map(session => ({
                    date: session.date,
                    distance: session.distance,
                    duration: session.duration,
                    heartRate: session.heartRate,
                }));

                setUserData({
                    profile: sharedProfile,
                    statistics: sharedStats,
                    activity: sharedActivity
                });
                setUserActivity(sharedActivity);
            } catch (err) {
                setError(err.message || "Impossible de charger les données utilisateur");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [token, logout]); // Re-charge si le token change (login/logout)

    return (
        <UserContext.Provider value={{ userData, userActivity, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser doit être utilisé dans un UserProvider');
    }
    return context;
};
