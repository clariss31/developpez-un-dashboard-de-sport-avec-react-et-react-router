import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_MAIN_DATA, USER_ACTIVITY } from '../services/mockData';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [userActivity, setUserActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching and filtering only shared data
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
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
