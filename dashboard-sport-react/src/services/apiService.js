import { USE_MOCK, API_BASE_URL, API_DEBUG_TOKEN } from '../config';
import { USER_MAIN_DATA, USER_ACTIVITY } from './mockData';

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Retourne le token JWT à utiliser pour les requêtes authentifiées.
 * Priorité : localStorage > API_DEBUG_TOKEN (config)
 * @returns {string|null}
 */
const getToken = () =>
    localStorage.getItem('token') || API_DEBUG_TOKEN || null;

/**
 * Construit les headers communs pour les requêtes authentifiées.
 * @returns {object}
 */
const authHeaders = () => {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

/**
 * Effectue un appel fetch authentifié et lève une erreur si la réponse n'est pas ok.
 * @param {string} url
 * @param {object} options - Options fetch supplémentaires
 * @returns {Promise<any>} - Corps de la réponse parsé en JSON
 */
const apiFetch = async (url, options = {}) => {
    const response = await fetch(url, {
        ...options,
        headers: {
            ...authHeaders(),
            ...(options.headers || {}),
        },
    });
    if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`HTTP ${response.status} – ${text || response.statusText}`);
    }
    return response.json();
};

// ─── Auth ──────────────────────────────────────────────────────────────────────

/**
 * Authentifie un utilisateur et retourne le token JWT + userId.
 * Toujours via l'API réelle (pas de mock pour le login).
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{ token: string, userId: number }>}
 */
export const login = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        throw new Error('Identifiants invalides');
    }
    return response.json();
};

// ─── Données utilisateur ───────────────────────────────────────────────────────

/**
 * Récupère les données principales de l'utilisateur (profil + statistiques + objectifs).
 *
 * Mode MOCK  → retourne USER_MAIN_DATA depuis mockData.js
 * Mode API   → GET /api/user-info  (auth Bearer)
 *
 * @returns {Promise<object>} - { profile, statistics, goals? }
 */
export const getUserMainData = async () => {
    if (USE_MOCK) {
        return Promise.resolve(USER_MAIN_DATA);
    }

    try {
        return await apiFetch(`${API_BASE_URL}/api/user-info`);
    } catch (error) {
        console.error('[apiService] getUserMainData error:', error);
        throw error;
    }
};

/**
 * Récupère les sessions d'activité de l'utilisateur.
 *
 * Mode MOCK  → retourne USER_ACTIVITY depuis mockData.js
 * Mode API   → GET /api/user-activity?startWeek=<ISO>&endWeek=<ISO>  (auth Bearer)
 *              Si aucune date n'est fournie, on envoie une large plage (1 an glissant).
 *
 * @param {string} [startWeek] - Date de début (YYYY-MM-DD)
 * @param {string} [endWeek]   - Date de fin   (YYYY-MM-DD)
 * @returns {Promise<Array>} - Tableau de sessions
 */
export const getUserActivity = async (startWeek, endWeek) => {
    if (USE_MOCK) {
        return Promise.resolve(USER_ACTIVITY);
    }

    try {
        // Plage par défaut : 1 an glissant
        const end = endWeek || new Date().toISOString().split('T')[0];
        const startDefault = new Date();
        startDefault.setFullYear(startDefault.getFullYear() - 1);
        const start = startWeek || startDefault.toISOString().split('T')[0];

        const url = `${API_BASE_URL}/api/user-activity?startWeek=${start}&endWeek=${end}`;
        const data = await apiFetch(url);

        // Le backend peut renvoyer un tableau directement ou { sessions: [...] }
        return Array.isArray(data) ? data : (data.sessions ?? data);
    } catch (error) {
        console.error('[apiService] getUserActivity error:', error);
        throw error;
    }
};

/**
 * Récupère le chemin de l'image de profil de l'utilisateur.
 *
 * Mode MOCK  → retourne null (le mock gère déjà profilePicture dans USER_MAIN_DATA)
 * Mode API   → GET /api/profile-image  (auth Bearer)
 *
 * @returns {Promise<string|null>} - Chemin de l'image ou null
 */
export const getProfileImage = async () => {
    if (USE_MOCK) {
        return Promise.resolve(null);
    }

    try {
        const data = await apiFetch(`${API_BASE_URL}/api/profile-image`);
        return data.imagePath ?? data.path ?? null;
    } catch (error) {
        console.error('[apiService] getProfileImage error:', error);
        return null; // Non bloquant
    }
};
