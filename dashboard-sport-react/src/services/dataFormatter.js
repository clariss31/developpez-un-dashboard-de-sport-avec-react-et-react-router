import { USER_MAIN_DATA } from './mockData.js';
import { USER_ACTIVITY } from './mockData.js';

/**
 * Get firstname and name.
 * @returns {string}.
 */
export const getFormattedName = () => {
    const name = USER_MAIN_DATA.profile.firstName + ' ' + USER_MAIN_DATA.profile.lastName;
    return name;
};

/**
 * Get the profile date creation.
 * @returns {string} The profile creation date formatted as "Membre depuis le [jour] [mois] [année]".
 */
export const getFormattedProfileDateCreation = () => {
    const date = new Date(USER_MAIN_DATA.profile.createdAt);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);
    return `Membre depuis le ${formattedDate}`;
};

/**
 * Get the profile age.
 * @returns {string} The profile age formatted as "Âge : [age]".
 */
export const getFormattedProfileAge = () => {
    const age = USER_MAIN_DATA.profile.age;
    return `Âge : ${age}`;
};

/**
 * Get the profile weight.
 * @returns {string} The profile weight formatted as "Poids : [weight]kg".
 */
export const getFormattedProfileWeight = () => {
    const weight = USER_MAIN_DATA.profile.weight;
    return `Poids : ${weight}kg`;
};

/**
 * Get the profile height.
 * @returns {string} The profile height formatted as "[m]m[cm]" (e.g., "1m65").
 */
export const getFormattedProfileHeight = () => {
    const height = USER_MAIN_DATA.profile.height;
    const meters = Math.floor(height / 100);
    const centimeters = height % 100;
    return `${meters}m${centimeters}`;
};

/**
 * Get the formatted total distance from user statistics.
 * @returns {string} The total distance formatted with "km".
 */
export const getFormattedTotalDistance = () => {
    const totalDistance = parseFloat(USER_MAIN_DATA.statistics.totalDistance);
    return `${Math.round(totalDistance)} km`;
};

/**
 * Get the formatted total sessions from user statistics.
 * @returns {string} The total sessions formatted with "sessions".
 */
export const getFormattedTotalSessions = () => {
    const totalSessions = parseFloat(USER_MAIN_DATA.statistics.totalSessions);
    return `${Math.round(totalSessions)} sessions`;
};

/**
 * Get the formatted total duration from user statistics.
 * @returns {string} The total duration formatted as "[H]h [M]m".
 */
export const getFormattedTotalDuration = () => {
    const totalDurationInMinutes = parseFloat(USER_MAIN_DATA.statistics.totalDuration);
    const hours = Math.floor(totalDurationInMinutes / 60);
    const minutes = totalDurationInMinutes % 60;
    return `${hours}h ${minutes}m`;
};

/**
 * Get the formatted activity date from user statistics.
 * @returns {string} The activity date formatted as "[jour] [mois] [année]".
 */
export const getFormattedActivityDate = () => {
    const activityDate = USER_ACTIVITY[0].date;
    const date = new Date(activityDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);
    return formattedDate;
};

/**
 * Get the formatted the distance by date from user statistics.
 * @returns {int} The distance by date.
 */
export const getFormattedDistanceByDate = () => {
    const distance = USER_ACTIVITY[0].distance;
    return distance;
};

/**
 * Get the formatted the duration by date from user statistics.
 * @returns {int} The duration by date.
 */
export const getFormattedDurationByDate = () => {
    const duration = USER_ACTIVITY[0].duration;
    return duration;
};

/**
 * Get the minimum heart rate from user statistics.
 * @returns {int} The minimum heart rate.
 */
export const getMinimumHeartRate = () => {
    const minimumHeartRate = USER_ACTIVITY[0].heartRate.min;
    return minimumHeartRate;
};

/**
 * Get the maximum heart rate from user statistics.
 * @returns {int} The maximum heart rate.
 */
export const getMaximumHeartRate = () => {
    const maximumHeartRate = USER_ACTIVITY[0].heartRate.max;
    return maximumHeartRate;
};

/**
 * Get the average heart rate from user statistics.
 * @returns {int} The average heart rate.
 */
export const getAverageHeartRate = () => {
    const averageHeartRate = USER_ACTIVITY[0].heartRate.average;
    return averageHeartRate;
};

/**
 * Get the formatted the calories burned by date from user statistics.
 * @returns {int} The calories burned by date.
 */
export const getFormattedCaloriesBurnedByDate = () => {
    const caloriesBurned = USER_ACTIVITY[0].caloriesBurned;
    return caloriesBurned;
};
