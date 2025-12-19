import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { fetchEmployeePerformance } from '../services/api';
import '../styles/pages/EmployeePerformance.css';

export default function EmployeePerformance() {
  const [employees, setEmployees] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('current_month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPerformance();
  }, [selectedPeriod]);

  const loadPerformance = async () => {
    try {
      setLoading(true);
      const data = await fetchEmployeePerformance({ period: selectedPeriod });
      setEmployees(data);
    } catch (error) {
      console.error('Load performance error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (current, plan) => {
    if (plan === 0) return 0;
    return Math.min(Math.round((current / plan) * 100), 100);
  };

  const getStatusColor = (progress) => {
    if (progress >= 100) return 'success';
    if (progress >= 70) return 'warning';
    return 'danger';
  };

  return (
    <div className="performance-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">ЭФФЕКТИВНОСТЬ СОТРУДНИКОВ</h1>
          <p className="page-subtitle">Отслеживание выполнения планов по клиентам</p>
        </div>
        <select 
          value={selectedPeriod} 
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="period-select"
        >
          <option value="current_month">Текущий месяц</option>
          <option value="last_month">Прошлый месяц</option>
          <option value="quarter">Квартал</option>
          <option value="year">Год</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-state">Загрузка...</div>
      ) : (
        <div className="employees-grid">
          {employees.map((employee) => {
            const progress = calculateProgress(employee.actual, employee.plan);
            const statusColor = getStatusColor(progress);

            return (
              <Card key={employee.id}>
                <div className="employee-card">
                  <div className="employee-header">
                    <div className="employee-avatar">{employee.name.charAt(0)}</div>
                    <div className="employee-info">
                      <h3 className="employee-name">{employee.name}</h3>
                      <p className="employee-role">{employee.role}</p>
                    </div>
                    <Badge variant={statusColor}>{progress}%</Badge>
                  </div>

                  <div className="progress-section">
                    <div className="progress-labels">
                      <span>План</span>
                      <span>{employee.plan.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill progress-${statusColor}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="progress-labels">
                      <span>Выполнено</span>
                      <span className={`amount-${statusColor}`}>
                        {employee.actual.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>

                  <div className="stats-row">
                    <div className="stat-item">
                      <div className="stat-label">Клиентов</div>
                      <div className="stat-value">{employee.clientsCount}</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-label">Проектов</div>
                      <div className="stat-value">{employee.projectsCount}</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-label">Остаток</div>
                      <div className={`stat-value amount-${statusColor}`}>
                        {(employee.plan - employee.actual).toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  </div>

                  {employee.clients && employee.clients.length > 0 && (
                    <div className="clients-section">
                      <h4 className="clients-title">Активные клиенты</h4>
                      <ul className="clients-list">
                        {employee.clients.map((client, idx) => (
                          <li key={idx} className="client-item">
                            <span className="client-name">{client.name}</span>
                            <span className="client-revenue">
                              {client.revenue.toLocaleString('ru-RU')} ₽
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
