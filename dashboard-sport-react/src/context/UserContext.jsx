import React, { createContext, useContext, useState, useEffect } from 'react';
import * as apiService from '../services/apiService';

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
    const [userData, setUserData] = useState(null);
    const [userActivity, setUserActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Pour l'instant on utilise un ID par défaut, 
                // à lier plus tard avec l'authentification réelle
                const userId = 1;

                const mainData = await apiService.getUserMainData(userId);
                const activityData = await apiService.getUserActivity(userId);

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
                    heartRate: session.heartRate, // important for the chart!
                }));

                setUserData({
                    profile: sharedProfile,
                    statistics: sharedStats,
                    activity: sharedActivity
                });
                setUserActivity(sharedActivity);
            } catch (err) {
                setError("Impossible de charger les données utilisateur");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

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
