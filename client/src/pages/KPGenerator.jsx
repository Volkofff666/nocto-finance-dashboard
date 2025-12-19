import React, { useState } from 'react';
import { createProposal } from '../services/api';
import Card from '../components/ui/Card';
import { formatMoney } from '../utils/formatMoney';
import './KPGenerator.css';

export default function KPGenerator() {
  const [clientName, setClientName] = useState('');
  const [clientSite, setClientSite] = useState('');
  const [problems, setProblems] = useState([]);
  const [services, setServices] = useState([]);
  const [strategy, setStrategy] = useState('');
  const [saving, setSaving] = useState(false);

  const problemOptions = [
    'Низкий CTR',
    'Нет UTM',
    'Слив на РСЯ',
    'Скликивание (Боты)',
    'Медленный сайт'
  ];

  const serviceOptions = [
    { name: 'Настройка Яндекс.Директ', price: 30000 },
    { name: 'Глубокий аудит', price: 15000 },
    { name: 'Защита NoctoClick', price: 5000 },
    { name: 'SEO Оптимизация', price: 40000 }
  ];

  const toggleProblem = (problem) => {
    setProblems(prev =>
      prev.includes(problem)
        ? prev.filter(p => p !== problem)
        : [...prev, problem]
    );
  };

  const toggleService = (service) => {
    setServices(prev => {
      const exists = prev.find(s => s.name === service.name);
      return exists
        ? prev.filter(s => s.name !== service.name)
        : [...prev, service];
    });
  };

  const totalPrice = services.reduce((sum, s) => sum + s.price, 0);

  const handleSaveDraft = async () => {
    if (!clientName || problems.length === 0 || services.length === 0 || !strategy) {
      alert('Заполните все обязательные поля');
      return;
    }

    try {
      setSaving(true);
      await createProposal({
        clientName,
        clientSite,
        problems,
        services,
        strategy,
        status: 'draft'
      });
      alert('Черновик сохранен!');
    } catch (error) {
      alert('Ошибка: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleExportPDF = () => {
    alert('Экспорт в PDF будет добавлен в следующей версии');
  };

  return (
    <div className="kp-generator">
      <div className="topbar">
        <div className="breadcrumbs">NOCTO / ГЕНЕРАТОР КП</div>
        <div className="topbar__actions">
          <button className="btn-secondary" onClick={handleSaveDraft} disabled={saving}>
            <i className="fas fa-save"></i>
            {saving ? 'Сохранение...' : 'Сохранить черновик'}
          </button>
          <button className="btn-primary" onClick={handleExportPDF}>
            <i className="fas fa-file-pdf"></i>
            Экспорт PDF
          </button>
        </div>
      </div>

      <div className="kp-grid">
        <div className="kp-editor">
          <Card>
            <h2 className="section-title">Данные клиента</h2>
            <div className="form-group">
              <label>Компания *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="ООО 'Клиент'"
              />
            </div>
            <div className="form-group">
              <label>Сайт</label>
              <input
                type="text"
                value={clientSite}
                onChange={(e) => setClientSite(e.target.value)}
                placeholder="site.ru"
              />
            </div>
          </Card>

          <Card>
            <h2 className="section-title">Проблемы (Аудит) *</h2>
            <div className="checkbox-grid">
              {problemOptions.map((problem) => (
                <label key={problem} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={problems.includes(problem)}
                    onChange={() => toggleProblem(problem)}
                  />
                  <span>{problem}</span>
                </label>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="section-title">Услуги *</h2>
            <div className="service-list">
              {serviceOptions.map((service) => (
                <label key={service.name} className="service-item">
                  <input
                    type="checkbox"
                    checked={services.some(s => s.name === service.name)}
                    onChange={() => toggleService(service)}
                  />
                  <span className="service-name">{service.name}</span>
                  <span className="service-price mono">{formatMoney(service.price)}</span>
                </label>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="section-title">Стратегия *</h2>
            <textarea
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              placeholder="Мы предлагаем комплексный подход..."
              rows="6"
            />
          </Card>
        </div>

        <div className="kp-preview">
          <Card>
            <h2 className="section-title">Превью</h2>
            <div className="preview-content">
              <div className="preview-header">
                <h3>NOCTO.</h3>
                <p className="preview-date">{new Date().toLocaleDateString('ru-RU')}</p>
              </div>

              <div className="preview-section">
                <h4>Коммерческое предложение</h4>
                <p><strong>Для:</strong> {clientName || 'Клиент'}</p>
                {clientSite && <p><strong>Сайт:</strong> {clientSite}</p>}
              </div>

              {problems.length > 0 && (
                <div className="preview-section">
                  <h4>01 // Результаты аудита</h4>
                  <ul>
                    {problems.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {strategy && (
                <div className="preview-section">
                  <h4>02 // Стратегия</h4>
                  <p>{strategy}</p>
                </div>
              )}

              {services.length > 0 && (
                <div className="preview-section">
                  <h4>03 // Стоимость услуг</h4>
                  <ul className="services-list">
                    {services.map((s, i) => (
                      <li key={i}>
                        <span>{s.name}</span>
                        <span className="mono">{formatMoney(s.price)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="total-price">
                    <strong>Итого инвестиции:</strong>
                    <span className="mono text-green">{formatMoney(totalPrice)}</span>
                  </div>
                </div>
              )}

              <div className="preview-footer">
                <p>NOCTO AGENCY • ЕКАТЕРИНБУРГ • NOCTO.RU</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}