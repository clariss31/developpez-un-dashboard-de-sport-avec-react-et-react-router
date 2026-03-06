import { USE_MOCK, API_BASE_URL } from '../config';
import { USER_MAIN_DATA, USER_ACTIVITY } from './mockData';

/**
 * Service to fetch user's main data (profile + statistics).
 * Checks the USE_MOCK flag and switches between Mock and real API.
 * @param {string|number} userId - The user's ID
 * @returns {Promise<object>} - User main data
 */
export const getUserMainData = async (userId) => {
    if (USE_MOCK) {
        // Simulating async behavior even with mocks
        return Promise.resolve(USER_MAIN_DATA);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données utilisateur');
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

/**
 * Service to fetch user activity (sessions).
 * Checks the USE_MOCK flag and switches between Mock and real API.
 * @param {string|number} userId - The user's ID
 * @returns {Promise<array>} - User activity data
 */
export const getUserActivity = async (userId) => {
    if (USE_MOCK) {
        return Promise.resolve(USER_ACTIVITY);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/activity`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'activité');
        }
        const data = await response.json();
        return data.sessions || data; // Handle potential different API structures
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

/**
 * Service to handle user login.
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<object>} - Auth token/data
 */
export const login = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Identifiants invalides');
    }

    return await response.json();
};
