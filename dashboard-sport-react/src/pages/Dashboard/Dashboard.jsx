import React from 'react';
import { useUser } from '../../context/UserContext';
import * as formatter from '../../services/dataFormatter';
import iconeDistance from '../../assets/images/icone-distance.png';
import Performances from '../../components/Charts/Performances';
import WeeklyGoals from '../../components/WeeklyGoals/WeeklyGoals';

/**
 * Page de tableau de bord.
 * Affiche les statistiques de l'utilisateur.
 * @returns {React.ReactElement} - Page de tableau de bord
 */

const Dashboard = () => {
    const { userData, loading } = useUser();

    if (loading || !userData) {
        return <div className="loading">Chargement...</div>;
    }

    const { profile, statistics } = userData;

    // Priorité : URL backend (mode API) → asset local (mode mock / fallback)
    const profileImg = profile.profilePicture || formatter.getAvatarPath(profile.firstName);

    return (
        <main className="dashboard">
            <section className="profile-card">
                <div className="profile-card-left">
                    <div className="profile-image-container">
                        <img
                            src={profileImg}
                            alt={profile.firstName}
                            className="profile-image"
                        />
                    </div>
                    <div className="profile-info">
                        <h2>{formatter.getFormattedName(profile)}</h2>
                        <p>{formatter.getFormattedProfileDateCreation(profile.createdAt)}</p>
                    </div>
                </div>

                <div className="profile-card-right">
                    <span className="distance-label">Distance totale parcourue</span>
                    <div className="distance-box">
                        <img src={iconeDistance} alt="" className="dist-icon" />
                        <span className="value">
                            {formatter.getFormattedTotalDistance(statistics.totalDistance)}
                        </span>
                    </div>
                </div>
            </section>

            <Performances />
            <WeeklyGoals />
        </main>
    );
};

export default Dashboard;
