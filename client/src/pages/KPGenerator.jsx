import React, { useState } from 'react';
import { createProposal } from '../services/api';
import { exportProposalToPDF } from '../utils/pdfExport';
import Card from '../components/ui/Card';
import '../styles/pages/KPGenerator.css';

export default function KPGenerator() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientSite: '',
    clientIndustry: '',
    problems: [],
    services: [],
    cases: [],
    strategy: '',
    implementation: '',
    expectedResults: ''
  });

  const [currentProblem, setCurrentProblem] = useState('');
  const [currentService, setCurrentService] = useState({ name: '', price: '' });
  const [currentCase, setCurrentCase] = useState({ title: '', description: '', result: '' });
  const [activeTab, setActiveTab] = useState('info');
  const [saving, setSaving] = useState(false);

  // Добавление проблемы
  const handleAddProblem = () => {
    if (currentProblem.trim()) {
      setFormData(prev => ({
        ...prev,
        problems: [...prev.problems, currentProblem.trim()]
      }));
      setCurrentProblem('');
    }
  };

  const handleRemoveProblem = (index) => {
    setFormData(prev => ({
      ...prev,
      problems: prev.problems.filter((_, i) => i !== index)
    }));
  };

  // Добавление услуги
  const handleAddService = () => {
    if (currentService.name.trim() && currentService.price) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, { ...currentService, price: parseFloat(currentService.price) }]
      }));
      setCurrentService({ name: '', price: '' });
    }
  };

  const handleRemoveService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  // Добавление кейса
  const handleAddCase = () => {
    if (currentCase.title.trim() && currentCase.description.trim()) {
      setFormData(prev => ({
        ...prev,
        cases: [...prev.cases, currentCase]
      }));
      setCurrentCase({ title: '', description: '', result: '' });
    }
  };

  const handleRemoveCase = (index) => {
    setFormData(prev => ({
      ...prev,
      cases: prev.cases.filter((_, i) => i !== index)
    }));
  };

  // Расчет итоговой суммы
  const totalPrice = formData.services.reduce((sum, s) => sum + s.price, 0);

  // Сохранение КП
  const handleSave = async (status = 'draft') => {
    try {
      setSaving(true);
      await createProposal({
        ...formData,
        status,
        totalPrice
      });
      alert(status === 'draft' ? 'Черновик сохранён!' : 'КП создано!');
    } catch (error) {
      alert('Ошибка при сохранении');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Экспорт в PDF
  const handleExportPDF = async () => {
    const element = document.getElementById('kp-preview');
    if (element) {
      await exportProposalToPDF(element, `KP_${formData.clientName || 'Клиент'}_${Date.now()}.pdf`);
    }
  };

  return (
    <div className="kp-generator">
      <div className="page-header">
        <div>
          <h1 className="page-title">ГЕНЕРАТОР КП</h1>
          <p className="page-subtitle">Создание коммерческого предложения</p>
        </div>
        <div className="header-actions">
          <button onClick={() => handleSave('draft')} className="btn-secondary" disabled={saving}>
            💾 Сохранить черновик
          </button>
          <button onClick={handleExportPDF} className="btn-primary">
            🖨️ Экспорт в PDF
          </button>
        </div>
      </div>

      <div className="kp-container">
        {/* Форма редактирования */}
        <div className="kp-editor">
          <Card>
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
              >
                📋 Информация
              </button>
              <button 
                className={`tab ${activeTab === 'problems' ? 'active' : ''}`}
                onClick={() => setActiveTab('problems')}
              >
                ⚠️ Проблемы
              </button>
              <button 
                className={`tab ${activeTab === 'services' ? 'active' : ''}`}
                onClick={() => setActiveTab('services')}
              >
                💼 Услуги
              </button>
              <button 
                className={`tab ${activeTab === 'cases' ? 'active' : ''}`}
                onClick={() => setActiveTab('cases')}
              >
                📊 Кейсы
              </button>
              <button 
                className={`tab ${activeTab === 'strategy' ? 'active' : ''}`}
                onClick={() => setActiveTab('strategy')}
              >
                🎯 Стратегия
              </button>
            </div>

            <div className="tab-content">
              {/* Вкладка: Информация */}
              {activeTab === 'info' && (
                <div className="form-section">
                  <div className="form-group">
                    <label>Название клиента *</label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="ООО &quot;Компания&quot;"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Сайт клиента</label>
                    <input
                      type="text"
                      value={formData.clientSite}
                      onChange={(e) => setFormData({ ...formData, clientSite: e.target.value })}
                      placeholder="example.com"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Отрасль</label>
                    <input
                      type="text"
                      value={formData.clientIndustry}
                      onChange={(e) => setFormData({ ...formData, clientIndustry: e.target.value })}
                      placeholder="E-commerce, B2B, Недвижимость..."
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              {/* Вкладка: Проблемы */}
              {activeTab === 'problems' && (
                <div className="form-section">
                  <div className="add-item-group">
                    <input
                      type="text"
                      value={currentProblem}
                      onChange={(e) => setCurrentProblem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddProblem()}
                      placeholder="Низкий CTR, Слив бюджета, Нет UTM..."
                      className="form-input"
                    />
                    <button onClick={handleAddProblem} className="btn-add">+ Добавить</button>
                  </div>
                  <ul className="items-list">
                    {formData.problems.map((problem, idx) => (
                      <li key={idx} className="item">
                        <span>{problem}</span>
                        <button onClick={() => handleRemoveProblem(idx)} className="btn-remove">✕</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Вкладка: Услуги */}
              {activeTab === 'services' && (
                <div className="form-section">
                  <div className="add-service-group">
                    <input
                      type="text"
                      value={currentService.name}
                      onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                      placeholder="Настройка Яндекс.Директ"
                      className="form-input"
                    />
                    <input
                      type="number"
                      value={currentService.price}
                      onChange={(e) => setCurrentService({ ...currentService, price: e.target.value })}
                      placeholder="30000"
                      className="form-input price-input"
                    />
                    <button onClick={handleAddService} className="btn-add">+ Добавить</button>
                  </div>
                  <ul className="services-list">
                    {formData.services.map((service, idx) => (
                      <li key={idx} className="service-item">
                        <span className="service-name">{service.name}</span>
                        <span className="service-price">{service.price.toLocaleString('ru-RU')} ₽</span>
                        <button onClick={() => handleRemoveService(idx)} className="btn-remove">✕</button>
                      </li>
                    ))}
                  </ul>
                  {formData.services.length > 0 && (
                    <div className="total-price">
                      <strong>Итого:</strong> {totalPrice.toLocaleString('ru-RU')} ₽
                    </div>
                  )}
                </div>
              )}

              {/* Вкладка: Кейсы */}
              {activeTab === 'cases' && (
                <div className="form-section">
                  <div className="case-form">
                    <input
                      type="text"
                      value={currentCase.title}
                      onChange={(e) => setCurrentCase({ ...currentCase, title: e.target.value })}
                      placeholder="Название кейса (например: E-commerce в строительстве)"
                      className="form-input"
                    />
                    <textarea
                      value={currentCase.description}
                      onChange={(e) => setCurrentCase({ ...currentCase, description: e.target.value })}
                      placeholder="Описание проблемы клиента и нашего решения..."
                      className="form-textarea"
                      rows="4"
                    />
                    <input
                      type="text"
                      value={currentCase.result}
                      onChange={(e) => setCurrentCase({ ...currentCase, result: e.target.value })}
                      placeholder="Результат: +150% ROI, снижение CPA на 40%"
                      className="form-input"
                    />
                    <button onClick={handleAddCase} className="btn-add full-width">+ Добавить кейс</button>
                  </div>
                  <div className="cases-list">
                    {formData.cases.map((caseItem, idx) => (
                      <div key={idx} className="case-card">
                        <div className="case-header">
                          <h4>{caseItem.title}</h4>
                          <button onClick={() => handleRemoveCase(idx)} className="btn-remove">✕</button>
                        </div>
                        <p className="case-description">{caseItem.description}</p>
                        {caseItem.result && (
                          <p className="case-result">📈 {caseItem.result}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Вкладка: Стратегия */}
              {activeTab === 'strategy' && (
                <div className="form-section">
                  <div className="form-group">
                    <label>Стратегия решения</label>
                    <textarea
                      value={formData.strategy}
                      onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                      placeholder="Опишите комплексный подход к решению задач клиента..."
                      className="form-textarea"
                      rows="6"
                    />
                  </div>
                  <div className="form-group">
                    <label>План внедрения</label>
                    <textarea
                      value={formData.implementation}
                      onChange={(e) => setFormData({ ...formData, implementation: e.target.value })}
                      placeholder="Этапы работы: 1. Аудит (1 неделя) 2. Настройка (2 недели)..."
                      className="form-textarea"
                      rows="6"
                    />
                  </div>
                  <div className="form-group">
                    <label>Ожидаемые результаты</label>
                    <textarea
                      value={formData.expectedResults}
                      onChange={(e) => setFormData({ ...formData, expectedResults: e.target.value })}
                      placeholder="Увеличение конверсии на 30%, снижение CPA на 25%..."
                      className="form-textarea"
                      rows="4"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Превью КП */}
        <div className="kp-preview-container">
          <Card>
            <div id="kp-preview" className="kp-preview">
              <div className="kp-header">
                <h1 className="kp-logo">NOCTO<span className="dot">.</span></h1>
                <p className="kp-date">{new Date().toLocaleDateString('ru-RU')}</p>
              </div>

              <h2 className="kp-title">КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ</h2>
              <p className="kp-subtitle">
                Для: <strong>{formData.clientName || 'Клиент'}</strong>
                {formData.clientSite && <> • {formData.clientSite}</>}
              </p>

              {formData.clientIndustry && (
                <p className="kp-industry">Отрасль: {formData.clientIndustry}</p>
              )}

              {formData.problems.length > 0 && (
                <div className="kp-section">
                  <h3>01 // РЕЗУЛЬТАТЫ АУДИТА</h3>
                  <ul className="kp-list">
                    {formData.problems.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.cases.length > 0 && (
                <div className="kp-section">
                  <h3>02 // НАШИ КЕЙСЫ</h3>
                  {formData.cases.map((caseItem, idx) => (
                    <div key={idx} className="kp-case">
                      <h4>{caseItem.title}</h4>
                      <p>{caseItem.description}</p>
                      {caseItem.result && <p className="kp-case-result">✓ {caseItem.result}</p>}
                    </div>
                  ))}
                </div>
              )}

              {formData.strategy && (
                <div className="kp-section">
                  <h3>03 // СТРАТЕГИЯ РЕШЕНИЯ</h3>
                  <p className="kp-text">{formData.strategy}</p>
                </div>
              )}

              {formData.implementation && (
                <div className="kp-section">
                  <h3>04 // ПЛАН ВНЕДРЕНИЯ</h3>
                  <p className="kp-text" style={{ whiteSpace: 'pre-line' }}>{formData.implementation}</p>
                </div>
              )}

              {formData.services.length > 0 && (
                <div className="kp-section">
                  <h3>05 // СТОИМОСТЬ УСЛУГ</h3>
                  <table className="kp-table">
                    <thead>
                      <tr>
                        <th>Услуга</th>
                        <th>Стоимость</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.services.map((service, idx) => (
                        <tr key={idx}>
                          <td>{service.name}</td>
                          <td>{service.price.toLocaleString('ru-RU')} ₽</td>
                        </tr>
                      ))}
                      <tr className="total-row">
                        <td><strong>ИТОГО ИНВЕСТИЦИИ:</strong></td>
                        <td><strong>{totalPrice.toLocaleString('ru-RU')} ₽</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {formData.expectedResults && (
                <div className="kp-section">
                  <h3>06 // ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ</h3>
                  <p className="kp-text">{formData.expectedResults}</p>
                </div>
              )}

              <div className="kp-footer">
                <p>NOCTO AGENCY • ЕКАТЕРИНБУРГ • NOCTO.RU</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
