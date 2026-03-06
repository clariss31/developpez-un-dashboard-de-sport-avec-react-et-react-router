import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HeartRateChart = ({ data, average, dateRange, onPrev, onNext, isNextDisabled }) => {
    return (
        <div className="chart-card heart-rate-chart">
            <div className="chart-header">
                <div className="chart-title">
                    <h3 className="value red">{average} BPM</h3>
                    <p className="subtitle">Fréquence cardiaque moyenne</p>
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
                    <ComposedChart
                        data={data}
                        margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
                        barSize={12}
                        barGap={1}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis
                            dataKey="day"
                            axisLine={true}
                            tickLine={false}
                            tick={{ fill: '#999', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#999', fontSize: 12 }}
                            domain={['dataMin - 10', 'dataMax + 10']}
                        />
                        <Tooltip
                            cursor={{ fill: '#f4f4f4' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                        />
                        <Bar
                            dataKey="min"
                            fill="#ffb4b4"
                            radius={[6, 6, 0, 0]}
                            name="Min BPM"
                        />
                        <Bar
                            dataKey="max"
                            fill="#ff3b1d"
                            radius={[6, 6, 0, 0]}
                            name="Max BPM"
                        />
                        <Line
                            type="monotone"
                            dataKey="averageCurve"
                            stroke="#0c23f5"
                            strokeWidth={2}
                            dot={{ r: 3, fill: '#0c23f5', stroke: '#0c23f5' }}
                            activeDot={{ r: 5 }}
                            name="Moyenne"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-legend">
                <span className="legend-item"><span className="dot pink"></span> Min</span>
                <span className="legend-item"><span className="dot red"></span> Max BPM</span>
                <span className="legend-item"><span className="dot blue"></span> BPM Moyen</span>
            </div>
        </div>
    );
};

export default HeartRateChart;
