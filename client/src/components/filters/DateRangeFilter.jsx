import React, { useState } from 'react';
import './DateRangeFilter.css';

/**
 * Компонент фильтрации по диапазону дат
 * @param {Function} onFilterChange - Callback для применения фильтров
 * @param {Object} initialRange - Начальные значения фильтров
 */
export default function DateRangeFilter({ onFilterChange, initialRange = {} }) {
  const [startDate, setStartDate] = useState(initialRange.startDate || '');
  const [endDate, setEndDate] = useState(initialRange.endDate || '');

  const handleApply = () => {
    // Проверка: начальная дата не может быть позже конечной
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      alert('Начальная дата не может быть позже конечной');
      return;
    }

    onFilterChange({ startDate, endDate });
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    onFilterChange({ startDate: '', endDate: '' });
  };

  // Быстрые фильтры
  const setQuickFilter = (days) => {
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
      <div className="date-filter__inputs">
        <label>
          <span className="text-muted">От</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </label>
        <label>
          <span className="text-muted">До</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </label>
      </div>

      <div className="date-filter__quick">
        <button onClick={() => setQuickFilter(7)} className="btn-quick" title="Последние 7 дней">
          7Д
        </button>
        <button onClick={() => setQuickFilter(30)} className="btn-quick" title="Последние 30 дней">
          30Д
        </button>
        <button onClick={() => setQuickFilter(90)} className="btn-quick" title="Последние 90 дней">
          90Д
        </button>
      </div>

      <div className="date-filter__actions">
        <button onClick={handleApply} className="btn-primary">
          <i className="fas fa-check"></i>
          Применить
        </button>
        <button onClick={handleReset} className="btn-secondary">
          <i className="fas fa-times"></i>
          Сбросить
        </button>
      </div>
    </div>
  );
}
