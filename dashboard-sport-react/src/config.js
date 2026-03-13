/**
 * Application Configuration
 *
 * USE_MOCK : true  → données locales (mockData.js), aucun serveur requis
 * USE_MOCK : false → backend Docker sur http://localhost:8000
 */

// ─── Mode de données ───────────────────────────────────────────────────────────
// true  = mock local | false = backend Docker
export const USE_MOCK = false;

// ─── Backend ───────────────────────────────────────────────────────────────────
// URL de base de l'API (sans slash final)
export const API_BASE_URL = 'http://localhost:8000';

// Token JWT de debug – utilisé uniquement quand USE_MOCK = false et qu'aucun token n'est présent dans le localStorage (pas encore connecté).
// En production, ce champ devrait rester vide ('').
export const API_DEBUG_TOKEN = '';
