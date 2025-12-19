import React, { useState } from 'react';
import './AddTransactionModal.css';

export default function AddTransactionModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    client: '',
    amount: '',
    status: 'paid',
    date: new Date().toISOString().split('T')[0]
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Submit error:', error);
      alert('Ошибка при добавлении транзакции');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Добавить транзакцию</h2>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="client">Клиент / Проект</label>
            <input
              type="text"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="ООО \"Компания\""
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Сумма (₽)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="150000"
              required
              className="form-input"
            />
            <small className="form-hint">
              Положительное число = доход, отрицательное = расход
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="status">Статус</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="paid">Оплачено</option>
              <option value="pending">Ожидание</option>
              <option value="expense">Расход</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Дата</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              onClick={onClose} 
              className="btn-secondary"
              disabled={loading}
            >
              Отмена
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Сохранение...' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
