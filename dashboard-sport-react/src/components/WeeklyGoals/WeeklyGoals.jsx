import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useUser } from '../../context/UserContext';
import * as formatter from '../../services/dataFormatter';

const WeeklyGoals = () => {
    const { userData } = useUser();

    if (!userData || !userData.activity) {
        return null;
    }

    const { distance, duration } = formatter.getCurrentWeekStats(userData.activity);
    const dateRange = formatter.getCurrentWeekDateRange(userData.activity);

    // Données codées en dur basées sur les exigences de la maquette (Mockup)
    const targetCourses = 6;
    const completedCourses = 4;
    const remainingCourses = targetCourses - completedCourses;

    const data = [
        { name: 'Réalisées', value: completedCourses },
        { name: 'Restants', value: remainingCourses },
    ];

    const COLORS = ['#0c23f5', '#a9b2f6'];

    return (
        <section className="weekly-goals-section">
            <div className="section-header">
                <h2 className="section-title">Cette semaine</h2>
                <p className="date-range">{dateRange}</p>
            </div>

            <div className="weekly-goals-content">
                {/* Partie gauche : Graphique Donut des objectifs */}
                <div className="goals-card">
                    <div className="goals-header">
                        <div className="goals-count">
                            <span className="count-value">x{completedCourses}</span>
                            <span className="count-text">sur objectif de {targetCourses}</span>
                        </div>
                        <p className="goals-subtitle">Courses hebdomadaire réalisées</p>
                    </div>

                    <div className="donut-chart-container">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    stroke="none"
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="donut-legend">
                            <div className="legend-item completed">
                                <span className="dot"></span> {completedCourses} réalisées
                            </div>
                            <div className="legend-item remaining">
                                <span className="dot"></span> {remainingCourses} restants
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partie droite : Cartes Statistiques */}
                <div className="stats-cards">
                    <div className="stat-card duration-card">
                        <h3 className="stat-title">Durée d'activité</h3>
                        <p className="stat-value"><span className="number">{duration}</span> minutes</p>
                    </div>

                    <div className="stat-card distance-card">
                        <h3 className="stat-title">Distance</h3>
                        <p className="stat-value"><span className="number">{distance}</span> kilomètres</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeeklyGoals;
