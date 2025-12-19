import React, { useEffect, useState } from 'react';
import { fetchFinanceStats, fetchTransactions } from '../services/api';
import Card from '../components/ui/Card';
import FinanceChart from '../components/charts/FinanceChart';
import ExpenseChart from '../components/charts/ExpenseChart';
import TransactionTable from '../components/tables/TransactionTable';
import { formatMoney } from '../utils/formatMoney';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    income: 0,
    expenses: 0,
    netProfit: 0,
    margin: 0,
    history: { labels: [], income: [], profit: [] }
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, txData] = await Promise.all([
        fetchFinanceStats(),
        fetchTransactions({ page: 1, limit: 5 })
      ]);
      
      setStats(statsData);
      setTransactions(txData.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <div className="topbar">
        <div className="breadcrumbs">NOCTO / DASHBOARD</div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <Card className="kpi-card">
          <div className="kpi-head">
            <span>ОБЩИЙ ПРИХОД</span>
            <span>+12%</span>
          </div>
          <div className="kpi-value text-green">
            {formatMoney(stats.income)}
          </div>
          <div className="kpi-sub">К прошлому месяцу</div>
        </Card>

        <Card className="kpi-card">
          <div className="kpi-head">
            <span>РАСХОДЫ</span>
          </div>
          <div className="kpi-value text-red">
            {formatMoney(stats.expenses)}
          </div>
          <div className="kpi-sub">Зарплаты, Сервисы, Офис</div>
        </Card>

        <Card className="kpi-card highlight-card">
          <div className="kpi-head">
            <span>ЧИСТАЯ ПРИБЫЛЬ</span>
          </div>
          <div className="kpi-value text-green">
            {formatMoney(stats.netProfit)}
          </div>
          <div className="kpi-sub">Маржинальность: {stats.margin}%</div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="chart-card">
        <div className="card-header">
          <h3>ДИНАМИКА ДЕНЕЖНЫХ ПОТОКОВ</h3>
          <div className="chart-legend">
            <span><span className="dot bg-green"></span>Прибыль</span>
            <span><span className="dot bg-blue"></span>Выручка</span>
          </div>
        </div>
        <FinanceChart data={stats.history} />
      </Card>

      {/* Bottom Grid */}
      <div className="bottom-grid">
        {/* Transactions Table */}
        <Card>
          <div className="card-header">
            <h3>ПОСЛЕДНИЕ ТРАНЗАКЦИИ</h3>
            <a href="#" className="link-more">Все операции →</a>
          </div>
          <TransactionTable transactions={transactions} />
        </Card>

        {/* Expense Structure */}
        <Card className="structure-card">
          <div className="card-header">
            <h3>СТРУКТУРА РАСХОДОВ</h3>
          </div>
          <ExpenseChart />
          <div className="structure-list">
            <div className="s-item">
              <span><span className="dot bg-red"></span>ФОТ (Зарплаты)</span>
              <span className="mono">65%</span>
            </div>
            <div className="s-item">
              <span><span className="dot bg-orange"></span>Офис / Аренда</span>
              <span className="mono">20%</span>
            </div>
            <div className="s-item">
              <span><span className="dot bg-purple"></span>Маркетинг</span>
              <span className="mono">15%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}