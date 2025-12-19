import React, { useState } from 'react';
import './DateRangeFilter.css';

export default function DateRangeFilter({ onFilterChange }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApply = () => {
    onFilterChange({ startDate, endDate });
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    onFilterChange({ startDate: '', endDate: '' });
  };

  const handleQuickFilter = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];
    
    setStartDate(startStr);
    setEndDate(endStr);
    onFilterChange({ startDate: startStr, endDate: endStr });
  };

  return (
    <div className="date-filter">
      <div className="date-filter__quick">
        <button onClick={() => handleQuickFilter(7)} className="quick-btn">
          7 дней
        </button>
        <button onClick={() => handleQuickFilter(30)} className="quick-btn">
          30 дней
        </button>
        <button onClick={() => handleQuickFilter(90)} className="quick-btn">
          90 дней
        </button>
      </div>

      <div className="date-filter__inputs">
        <label>
          <span className="label-text">От</span>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </label>
        <label>
          <span className="label-text">До</span>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </label>
      </div>

      <div className="date-filter__actions">
        <button onClick={handleApply} className="btn-primary btn-sm">
          Применить
        </button>
        <button onClick={handleReset} className="btn-secondary btn-sm">
          Сбросить
        </button>
      </div>
    </div>
  );
}
