import React, { useEffect, useState } from 'react';
import { fetchTransactions, createTransaction } from '../services/api';
import Card from '../components/ui/Card';
import TransactionTable from '../components/tables/TransactionTable';
import DateRangeFilter from '../components/filters/DateRangeFilter';
import AddTransactionModal from '../components/modals/AddTransactionModal';
import '../styles/pages/Transactions.css';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 1 });
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, [pagination.page, dateFilter]);

  async function loadTransactions() {
    try {
      setLoading(true);
      const data = await fetchTransactions({
        page: pagination.page,
        limit: pagination.limit,
        ...dateFilter
      });
      setTransactions(data.data);
      setPagination(prev => ({ ...prev, ...data.pagination }));
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddTransaction = async (transactionData) => {
    try {
      await createTransaction(transactionData);
      setShowAddModal(false);
      loadTransactions();
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="transactions-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">ВСЕ ТРАНЗАКЦИИ</h1>
          <p className="page-subtitle">Полная история операций</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
          <i className="icon-plus"></i>
          Добавить транзакцию
        </button>
      </div>

      <Card>
        <DateRangeFilter onFilterChange={setDateFilter} />
        
        {loading ? (
          <div className="loading-state">Загрузка...</div>
        ) : (
          <>
            <TransactionTable transactions={transactions} />
            
            {pagination.pages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="pagination-btn"
                >
                  ← Предыдущая
                </button>
                <span className="pagination-info">
                  Страница {pagination.page} из {pagination.pages}
                </span>
                <button 
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="pagination-btn"
                >
                  Следующая →
                </button>
              </div>
            )}
          </>
        )}
      </Card>

      {showAddModal && (
        <AddTransactionModal 
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTransaction}
        />
      )}
    </div>
  );
}
