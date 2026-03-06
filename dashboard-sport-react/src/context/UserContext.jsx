import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_MAIN_DATA, USER_ACTIVITY } from '../services/mockData';

/**
 * Création du contexte utilisateur.
 * Ce contexte permettra de partager les données utilisateur entre les composants.
 */
const UserContext = createContext();

/**
 * Provider pour le contexte utilisateur.
 * Gère l'état des données utilisateur et la persistance des données via les cookies.
 * @param {object} props - Props du composant
 * @param {React.ReactNode} props.children - Contenu à envelopper avec le provider
 * @returns {React.ReactElement} - UserProvider avec son contenu
 */

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [userActivity, setUserActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            const sharedProfile = {
                firstName: USER_MAIN_DATA.profile.firstName,
                lastName: USER_MAIN_DATA.profile.lastName,
                createdAt: USER_MAIN_DATA.profile.createdAt,
                profilePicture: USER_MAIN_DATA.profile.profilePicture,
            };

            const sharedStats = {
                totalDistance: USER_MAIN_DATA.statistics.totalDistance,
            };

            const sharedActivity = USER_ACTIVITY.map(session => ({
                date: session.date,
                distance: session.distance,
                duration: session.duration,
            }));

            setUserData({ profile: sharedProfile, statistics: sharedStats });
            setUserActivity(sharedActivity);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, userActivity, loading }}>
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
