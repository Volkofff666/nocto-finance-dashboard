import React from 'react';
import { formatMoney, formatDate } from '../../utils/formatMoney';
import './TransactionTable.css';

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  const getStatusBadge = (status) => {
    if (status === 'paid') return <span className="status-badge status-paid">Оплачено</span>;
    if (status === 'pending') return <span className="status-badge status-pending">Ожидание</span>;
    return <span className="status-badge status-expense">Расход</span>;
  };

  const handleDelete = (tx) => {
    if (window.confirm(`Удалить транзакцию "${tx.client}"?`)) {
      onDelete(tx.id);
    }
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Проект / Клиент</th>
          <th>Дата</th>
          <th>Статус</th>
          <th className="text-right">Сумма</th>
          <th className="text-center">Действия</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td>{tx.client}</td>
            <td>{formatDate(tx.date)}</td>
            <td>{getStatusBadge(tx.status)}</td>
            <td className="text-right">
              <span className={`amount ${tx.amount > 0 ? 'text-green' : 'text-red'}`}>
                {tx.amount > 0 ? '+' : ''}{formatMoney(tx.amount)}
              </span>
            </td>
            <td className="text-center">
              <div className="table-actions">
                <button 
                  onClick={() => onEdit(tx)} 
                  className="btn-action btn-edit"
                  title="Редактировать"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => handleDelete(tx)} 
                  className="btn-action btn-delete"
                  title="Удалить"
                >
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
