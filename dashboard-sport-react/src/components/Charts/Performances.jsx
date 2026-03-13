import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import * as formatter from '../../services/dataFormatter';
import DistanceChart from './DistanceChart';
import HeartRateChart from './HeartRateChart';

/**
 * Section regroupant les graphiques de performances (Distance et Fréquence Cardiaque).
 * Gère les états d'offset pour naviguer dans l'historique des données.
 * @returns {React.ReactElement}
 */
const Performances = () => {
    const { userData } = useUser();
    const [distanceOffset, setDistanceOffset] = useState(0);
    const [heartRateOffset, setHeartRateOffset] = useState(0);

    if (!userData || !userData.activity) {
        return null;
    }

    const distanceProps = formatter.getWeeklyDistanceData(userData.activity, distanceOffset);
    const hrProps = formatter.getLast7DaysHeartRateData(userData.activity, heartRateOffset);

    // Handlers pour KM (Mois/4 semaines)
    const handleDistancePrev = () => setDistanceOffset(prev => prev + 1);
    const handleDistanceNext = () => setDistanceOffset(prev => Math.max(0, prev - 1));

    // Handlers pour BPM (Semaine)
    const handleHeartRatePrev = () => setHeartRateOffset(prev => prev + 1);
    const handleHeartRateNext = () => setHeartRateOffset(prev => Math.max(0, prev - 1));

    return (
        <section className="performances-section">
            <h2 className="section-title">Vos dernières performances</h2>
            <div className="charts-grid">
                <DistanceChart
                    data={distanceProps.data}
                    average={distanceProps.average}
                    dateRange={distanceProps.dateRange}
                    onPrev={handleDistancePrev}
                    onNext={handleDistanceNext}
                    isNextDisabled={distanceOffset === 0}
                />
                <HeartRateChart
                    data={hrProps.data}
                    average={hrProps.average}
                    dateRange={hrProps.dateRange}
                    onPrev={handleHeartRatePrev}
                    onNext={handleHeartRateNext}
                    isNextDisabled={heartRateOffset === 0}
                />
            </div>
        </section>
    );
};

export default Performances;
