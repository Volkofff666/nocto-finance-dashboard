import React, { useState, useEffect } from 'react';
import { fetchTransactions, deleteTransaction, updateTransaction } from '../services/api';
import Card from '../components/ui/Card';
import TransactionTable from '../components/tables/TransactionTable';
import DateRangeFilter from '../components/filters/DateRangeFilter';
import AddTransactionModal from '../components/modals/AddTransactionModal';
import EditTransactionModal from '../components/modals/EditTransactionModal';
import '../styles/pages/Transactions.css';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    loadTransactions();
  }, [pagination.page, dateRange]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(dateRange.startDate && { startDate: dateRange.startDate }),
        ...(dateRange.endDate && { endDate: dateRange.endDate })
      };
      const response = await fetchTransactions(params);
      setTransactions(response.data);
      setFilteredTransactions(response.data);
      setPagination(prev => ({ ...prev, total: response.pagination.total }));
    } catch (error) {
      console.error('Load transactions error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowEditModal(true);
  };

  const handleUpdate = async (formData) => {
    try {
      await updateTransaction(editingTransaction.id, formData);
      await loadTransactions();
      setShowEditModal(false);
      setEditingTransaction(null);
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      await loadTransactions();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Ошибка при удалении транзакции');
    }
  };

  const handleAddSuccess = () => {
    setShowAddModal(false);
    loadTransactions();
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="transactions-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">ТРАНЗАКЦИИ</h1>
          <p className="page-subtitle">Управление доходами и расходами</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
          + Добавить транзакцию
        </button>
      </div>

      <Card>
        <div className="transactions-filters">
          <DateRangeFilter onChange={handleDateRangeChange} />
        </div>

        {loading ? (
          <div className="loading-state">Загрузка...</div>
        ) : filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <p>Транзакции не найдены</p>
          </div>
        ) : (
          <>
            <TransactionTable 
              transactions={filteredTransactions} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="pagination-btn"
                >
                  ← Предыдущая
                </button>
                <span className="pagination-info">
                  Страница {pagination.page} из {totalPages}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page >= totalPages}
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
          onSuccess={handleAddSuccess}
        />
      )}

      {showEditModal && editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={() => {
            setShowEditModal(false);
            setEditingTransaction(null);
          }}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}
