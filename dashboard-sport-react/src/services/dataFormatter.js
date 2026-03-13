/**
 * Formatage du nom complet (Prénom NOM).
 * @param {object} profile - Données du profil utilisateur
 * @returns {string} - Nom complet formaté
 */
export const getFormattedName = (profile) => {
    if (!profile) return '';
    return `${profile.firstName} ${profile.lastName}`;
};

/**
 * Formatage de la date de création du profil.
 * @param {string} createdAt - Date ISO de création
 * @returns {string} - Date formatée en français
 */
export const getFormattedProfileDateCreation = (createdAt) => {
    if (!createdAt) return '';
    const date = new Date(createdAt);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);
    return `Membre depuis le ${formattedDate}`;
};

/**
 * Récupération du chemin de l'avatar local.
 * @param {string} firstName - Prénom de l'utilisateur
 * @returns {string} - Chemin de l'image
 */
export const getAvatarPath = (firstName) => {
    if (!firstName) return '/src/assets/images/sophie.png';
    return `/src/assets/images/${firstName.toLowerCase()}.png`;
};

/**
 * Formatage de la distance totale.
 * @param {number|string} totalDistance - Distance totale
 * @returns {string} - Distance avec unité 'km'
 */
export const getFormattedTotalDistance = (totalDistance) => {
    const distance = parseFloat(totalDistance) || 0;
    return `${Math.round(distance)} km`;
};

/**
 * Formatage de l'âge.
 * @param {number} age - Âge de l'utilisateur
 * @returns {string} - Âge formaté
 */
export const getFormattedProfileAge = (age) => {
    if (!age) return '';
    return `Âge : ${age}`;
};

/**
 * Formatage du poids.
 * @param {number} weight - Poids de l'utilisateur
 * @returns {string} - Poids formaté
 */
export const getFormattedProfileWeight = (weight) => {
    if (!weight) return '';
    return `Poids : ${weight}kg`;
};

/**
 * Formatage de la taille.
 * @param {number} height - Taille de l'utilisateur en cm
 * @returns {string} - Taille formatée (ex: 1m65)
 */
export const getFormattedProfileHeight = (height) => {
    if (!height) return '';
    const meters = Math.floor(height / 100);
    const centimeters = height % 100;
    return `${meters}m${centimeters.toString().padStart(2, '0')}`;
};

/**
 * Extrait les données de distance pour une période de 4 semaines avec un offset.
 * @param {Array} activity - Tableau d'activités
 * @param {number} monthOffset - Offset par tranches de 28 jours (0 = actuel, 1 = précédent, etc.)
 * @returns {object} - Données formatées
 */
export const getWeeklyDistanceData = (activity, monthOffset = 0) => {
    if (!activity || !activity.length) return { data: [], average: 0, dateRange: '' };

    const sortedActivity = [...activity].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestDate = new Date(sortedActivity[0].date);

    // Appliquer l'offset (28 jours par "mois")
    const referenceDate = new Date(latestDate);
    referenceDate.setDate(referenceDate.getDate() - (monthOffset * 28));

    const weeks = [
        { name: 'S1', distance: 0 },
        { name: 'S2', distance: 0 },
        { name: 'S3', distance: 0 },
        { name: 'S4', distance: 0 },
    ];

    let totalDistanceStr = 0;
    let sessionsInPeriod = 0;

    sortedActivity.forEach(session => {
        const sessionDate = new Date(session.date);
        const diffTime = referenceDate.getTime() - sessionDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays < 28) {
            totalDistanceStr += session.distance;
            sessionsInPeriod++;

            // Attribution à l'une des 4 colonnes (S1 à S4)
            // Inverser pour que S4 soit le plus récent (à droite du graphique)
            const weekIdx = 3 - Math.floor(diffDays / 7);
            if (weekIdx >= 0 && weekIdx < 4) {
                weeks[weekIdx].distance += session.distance;
            }
        }
    });

    weeks.forEach((w, i) => {
        w.distance = Math.round(w.distance * 10) / 10;

        // Calculer la plage de dates pour chaque semaine
        // weekIdx 3 (S4) est la plus récente : [referenceDate - 6j, referenceDate]
        // weekIdx 0 (S1) est la plus ancienne : [referenceDate - 27j, referenceDate - 21j]
        const daysAgoEnd = (3 - i) * 7;
        const daysAgoStart = daysAgoEnd + 6;

        const end = new Date(referenceDate);
        end.setDate(end.getDate() - daysAgoEnd);

        const start = new Date(referenceDate);
        start.setDate(start.getDate() - daysAgoStart);

        const pad = (n) => n.toString().padStart(2, '0');
        w.range = `${pad(start.getDate())}.${pad(start.getMonth() + 1)} au ${pad(end.getDate())}.${pad(end.getMonth() + 1)}`;
    });
    const average = Math.round(totalDistanceStr / 4);

    const oldestDate = new Date(referenceDate);
    oldestDate.setDate(oldestDate.getDate() - 28);

    // Ajustement pour ne pas afficher le jour même deux fois si possible
    const rangeStart = new Date(oldestDate);
    rangeStart.setDate(rangeStart.getDate() + 1);

    const fMonth = (d) => d.toLocaleString('fr-FR', { month: 'short' });
    const fDay = (d) => d.getDate();
    const dateRange = `${fDay(rangeStart)} ${fMonth(rangeStart)} - ${fDay(referenceDate)} ${fMonth(referenceDate)}`;

    return { data: weeks, average, dateRange };
};

/**
 * Extrait les données de fréquence cardiaque des 7 derniers jours avec un offset.
 * @param {Array} activity - Tableau d'activités
 * @param {number} weekOffset - Offset par tranches de 7 jours
 * @returns {object} - Données formatées
 */
export const getLast7DaysHeartRateData = (activity, weekOffset = 0) => {
    if (!activity || !activity.length) return { data: [], average: 0, dateRange: '' };

    // 1. Trier pour trouver la date de la dernière activité (Référence)
    const sortedActivity = [...activity].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestDate = new Date(`${sortedActivity[0].date}T12:00:00`);

    // 2. Trouver le lundi de cette semaine
    const dayOfWeek = latestDate.getDay(); // 0=Dim, 1=Lun...
    const diffToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    const targetMonday = new Date(latestDate);
    targetMonday.setDate(targetMonday.getDate() - diffToMonday - (weekOffset * 7));

    const dayLabelsArr = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const resultData = [];
    let sumAvg = 0;
    let nSessions = 0;

    // 3. Boucler sur les 7 jours (Lun -> Dim)
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(targetMonday);
        currentDate.setDate(currentDate.getDate() + i);
        const dateStr = currentDate.toISOString().split('T')[0];

        // On cherche une session pour ce jour précis
        const session = activity.find(s => s.date === dateStr);

        if (session) {
            resultData.push({
                day: dayLabelsArr[i],
                min: session.heartRate.min,
                max: session.heartRate.max,
                averageCurve: session.heartRate.average,
                timestamp: currentDate.getTime()
            });
            sumAvg += session.heartRate.average;
            nSessions++;
        } else {
            // Jour sans données : on l'ajoute avec des valeurs nulles pour fixer l'axe X
            resultData.push({
                day: dayLabelsArr[i],
                min: null,
                max: null,
                averageCurve: null,
                timestamp: currentDate.getTime()
            });
        }
    }

    const average = nSessions > 0 ? Math.round(sumAvg / nSessions) : 0;

    // Plage de dates pour le titre
    const targetSunday = new Date(targetMonday);
    targetSunday.setDate(targetSunday.getDate() + 6);
    
    const fMonth = (d) => d.toLocaleString('fr-FR', { month: 'short' });
    const fDay = (d) => d.getDate();
    const dateRangeStr = `${fDay(targetMonday)} ${fMonth(targetMonday)} - ${fDay(targetSunday)} ${fMonth(targetSunday)}`;

    return { data: resultData, average, dateRange: dateRangeStr };
};

/**
 * Calcule l'impact des moyennes glissantes sur 7 jours.
 * Extrait les statistiques de la semaine en cours (les 7 derniers jours).
 * @param {Array} activity - Tableau d'activités
 * @returns {object} - Durée totale et distance totale
 */
export const getCurrentWeekStats = (activity) => {
    if (!activity || !activity.length) return { duration: 0, distance: 0 };

    const sortedActivity = [...activity].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestDate = new Date(sortedActivity[0].date);

    let totalDuration = 0;
    let totalDistanceStr = 0;

    sortedActivity.forEach(session => {
        const sessionDate = new Date(session.date);
        const diffTime = Math.abs(latestDate.getTime() - sessionDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 7) {
            totalDuration += session.duration;
            totalDistanceStr += session.distance;
        }
    });

    return {
        duration: totalDuration,
        distance: Math.round(totalDistanceStr * 10) / 10 // Arrondi à 1 décimale
    };
};

/**
 * Formate la plage de dates de la semaine en cours (les 7 derniers jours).
 * @param {Array} activity - Tableau d'activités
 * @returns {string} - Date formatée "Du DD/MM/YYYY au DD/MM/YYYY"
 */
export const getCurrentWeekDateRange = (activity) => {
    if (!activity || !activity.length) return '';

    const sortedActivity = [...activity].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestDate = new Date(sortedActivity[0].date);

    const oldestDate = new Date(latestDate);
    oldestDate.setDate(oldestDate.getDate() - 7);

    const formatFullDate = (d) => {
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return `Du ${formatFullDate(oldestDate)} au ${formatFullDate(latestDate)}`;
};
