import React from 'react';
import { useUser } from '../../context/UserContext';
import sophieAvatar from '../../assets/images/sophie.png';

/**
 * Page de profil utilisateur.
 * Affiche les informations personnelles et les statistiques globales.
 * @returns {React.ReactElement} - Page de profil utilisateur
 */

const Profile = () => {
    const { userData, loading, error } = useUser();

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!userData) return <div className="no-data">Aucune donnée trouvée</div>;

    const { profile, statistics } = userData;

    // Mode API → profile.profilePicture (URL backend)
    // Mode mock → undefined → fallback sur l'asset local
    const profileImg = profile.profilePicture || sophieAvatar;

    // Formatter le temps total (secondes -> Heures + Minutes)
    const formatDuration = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return { hours, minutes };
    };

    const duration = formatDuration(statistics.totalDuration);
    const dateCreation = new Date(profile.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="profile-page">
            <div className="profile-left">
                {/* Carte Identité */}
                <div className="user-card">
                    <div className="user-avatar-container">
                        <img
                            src={profileImg}
                            alt={`${profile.firstName} ${profile.lastName}`}
                            className="user-avatar"
                        />
                    </div>
                    <div className="user-identity">
                        <h2>{profile.firstName} {profile.lastName}</h2>
                        <p>Membre depuis le {dateCreation}</p>
                    </div>
                </div>

                {/* Détails du profil */}
                <div className="profile-details-card">
                    <div className="details-title">Votre profil</div>
                    <div className="details-list">
                        <div className="detail-item">
                            <strong>Âge :</strong> <span>{profile.age}</span>
                        </div>
                        <div className="detail-item">
                            <strong>Genre :</strong> <span>{profile.gender || "Femme"}</span>
                        </div>
                        <div className="detail-item">
                            <strong>Taille :</strong> <span>{profile.height ? `${Math.floor(profile.height / 100)}m${profile.height % 100}` : "N/A"}</span>
                        </div>
                        <div className="detail-item">
                            <strong>Poids :</strong> <span>{profile.weight}kg</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-right">
                <div className="stats-section-title">Vos statistiques</div>
                <div className="stats-period">depuis le {dateCreation}</div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-label">Temps total couru</div>
                        <div className="stat-value">
                            {duration.hours}h <span>{duration.minutes}min</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-label">Calories brûlées</div>
                        <div className="stat-value">
                            {statistics.caloriesBurned || "25000"} <span>cal</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-label">Distance totale parcourue</div>
                        <div className="stat-value">
                            {statistics.totalDistance} <span>km</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-label">Nombre de jours de repos</div>
                        <div className="stat-value">
                            9 <span>jours</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-label">Nombre de sessions</div>
                        <div className="stat-value">
                            41 <span>sessions</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
