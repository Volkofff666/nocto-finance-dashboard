import React from 'react';
import { formatMoney, formatDate } from '../../utils/formatMoney';
import './TransactionTable.css';

export default function TransactionTable({ transactions }) {
  const getStatusBadge = (status) => {
    if (status === 'paid') return <span className="status-badge status-paid">Оплачено</span>;
    if (status === 'pending') return <span className="status-badge status-pending">Ожидание</span>;
    return <span className="status-badge status-expense">Расход</span>;
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Проект / Клиент</th>
          <th>Дата</th>
          <th>Статус</th>
          <th className="text-right">Сумма</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}