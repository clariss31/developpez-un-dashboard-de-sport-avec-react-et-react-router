import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DistanceChart = ({ data, average, dateRange, onPrev, onNext, isNextDisabled }) => {
    return (
        <div className="chart-card distance-chart">
            <div className="chart-header">
                <div className="chart-title">
                    <h3 className="value blue">{average}km en moyenne</h3>
                    <p className="subtitle">Total des kilomètres 4 dernières semaines</p>
                </div>
                <div className="chart-controls">
                    <button className="nav-btn btn-prev" onClick={onPrev}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M15 18l-6-6 6-6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <span className="date-range">{dateRange}</span>
                    <button
                        className={`nav-btn btn-next ${isNextDisabled ? 'disabled' : ''}`}
                        onClick={onNext}
                        disabled={isNextDisabled}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 18l6-6-6-6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="chart-body">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
                        barSize={15}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis
                            dataKey="name"
                            axisLine={true}
                            tickLine={false}
                            tick={{ fill: '#999', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#999', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: '#f4f4f4' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                        />
                        <Bar
                            dataKey="distance"
                            fill="#a9b2f6"
                            radius={[10, 10, 0, 0]}
                            name="Km"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-legend">
                <span className="legend-item"><span className="dot blue-light"></span> Km</span>
            </div>
        </div>
    );
};

export default DistanceChart;
