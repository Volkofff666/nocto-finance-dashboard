import React, { useState } from 'react';
import { exportProposalToPDF, generateProposalFilename } from '../utils/pdfExport';
import { createProposal } from '../services/api';
import './KPGenerator.css';

export default function KPGenerator() {
  const [clientName, setClientName] = useState('');
  const [clientSite, setClientSite] = useState('');
  const [strategy, setStrategy] = useState('');
  const [problems, setProblems] = useState([{ id: 1, text: '' }]);
  const [services, setServices] = useState([{ id: 1, name: '', price: 0 }]);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Список предустановленных проблем для быстрого выбора
  const commonProblems = [
    'Низкий CTR',
    'Нет UTM-меток',
    'Слив бюджета на РСЯ',
    'Скликивание (Боты)',
    'Медленная загрузка сайта',
    'Плохая конверсия'
  ];

  // Список типовых услуг
  const commonServices = [
    { name: 'Настройка Яндекс.Директ', price: 30000 },
    { name: 'Глубокий аудит', price: 15000 },
    { name: 'Защита NoctoClick', price: 5000 },
    { name: 'SEO Оптимизация', price: 40000 },
    { name: 'Ведение РК (месяц)', price: 25000 }
  ];

  // Добавление проблемы
  const addProblem = () => {
    setProblems([...problems, { id: Date.now(), text: '' }]);
  };

  const removeProblem = (id) => {
    if (problems.length > 1) {
      setProblems(problems.filter(p => p.id !== id));
    }
  };

  const updateProblem = (id, text) => {
    setProblems(problems.map(p => p.id === id ? { ...p, text } : p));
  };

  // Добавление услуги
  const addService = () => {
    setServices([...services, { id: Date.now(), name: '', price: 0 }]);
  };

  const removeService = (id) => {
    if (services.length > 1) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const updateService = (id, field, value) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  // Автоматический расчёт итоговой суммы
  const calculateTotal = () => {
    return services.reduce((sum, service) => sum + (parseFloat(service.price) || 0), 0);
  };

  const totalPrice = calculateTotal();

  // Сохранение черновика
  const handleSaveDraft = async () => {
    if (!clientName.trim()) {
      alert('Укажите имя клиента');
      return;
    }

    setIsSaving(true);
    try {
      const proposalData = {
        clientName,
        clientSite,
        problems: problems.filter(p => p.text.trim()).map(p => p.text),
        services: services.filter(s => s.name.trim()).map(({ name, price }) => ({ name, price: parseFloat(price) || 0 })),
        strategy,
        totalPrice,
        status: 'draft'
      };

      await createProposal(proposalData);
      alert('Черновик сохранён!');
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      alert('Не удалось сохранить черновик');
    } finally {
      setIsSaving(false);
    }
  };

  // Экспорт в PDF
  const handleExportPDF = async () => {
    if (!clientName.trim()) {
      alert('Укажите имя клиента перед экспортом');
      return;
    }

    setIsExporting(true);
    try {
      const element = document.getElementById('kp-preview');
      const filename = generateProposalFilename(clientName);
      
      await exportProposalToPDF(element, filename);
      alert('PDF успешно создан!');

      // Сохраняем КП со статусом 'sent' после экспорта
      const proposalData = {
        clientName,
        clientSite,
        problems: problems.filter(p => p.text.trim()).map(p => p.text),
        services: services.filter(s => s.name.trim()).map(({ name, price }) => ({ name, price: parseFloat(price) || 0 })),
        strategy,
        totalPrice,
        status: 'sent'
      };

      await createProposal(proposalData);
    } catch (error) {
      console.error('Ошибка при экспорте PDF:', error);
      alert('Не удалось создать PDF');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="kp-generator">
      <div className="topbar">
        <div className="breadcrumbs">NOCTO / ГЕНЕРАТОР КП</div>
      </div>

      <div className="kp-layout">
        {/* Левая панель - форма ввода */}
        <div className="kp-form">
          <div className="card">
            <h3 className="form-title">ДАННЫЕ КЛИЕНТА</h3>
            
            <div className="form-group">
              <label>Имя клиента / Компания *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="ООО \"Пример\""
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Сайт клиента</label>
              <input
                type="text"
                value={clientSite}
                onChange={(e) => setClientSite(e.target.value)}
                placeholder="example.ru"
                className="form-input"
              />
            </div>
          </div>

          <div className="card">
            <h3 className="form-title">ПРОБЛЕМЫ (АУДИТ)</h3>
            
            {/* Быстрые проблемы */}
            <div className="quick-pills">
              {commonProblems.map((problem) => (
                <button
                  key={problem}
                  onClick={() => {
                    const emptyProblem = problems.find(p => !p.text.trim());
                    if (emptyProblem) {
                      updateProblem(emptyProblem.id, problem);
                    } else {
                      setProblems([...problems, { id: Date.now(), text: problem }]);
                    }
                  }}
                  className="pill-btn"
                >
                  + {problem}
                </button>
              ))}
            </div>

            {problems.map((problem) => (
              <div key={problem.id} className="form-group-inline">
                <input
                  type="text"
                  value={problem.text}
                  onChange={(e) => updateProblem(problem.id, e.target.value)}
                  placeholder="Опишите проблему"
                  className="form-input"
                />
                <button
                  onClick={() => removeProblem(problem.id)}
                  className="btn-icon btn-danger"
                  disabled={problems.length === 1}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}

            <button onClick={addProblem} className="btn-secondary full-width">
              <i className="fas fa-plus"></i> Добавить проблему
            </button>
          </div>

          <div className="card">
            <h3 className="form-title">УСЛУГИ И СТОИМОСТЬ</h3>
            
            {/* Быстрые услуги */}
            <div className="quick-pills">
              {commonServices.map((service) => (
                <button
                  key={service.name}
                  onClick={() => {
                    const emptyService = services.find(s => !s.name.trim());
                    if (emptyService) {
                      updateService(emptyService.id, 'name', service.name);
                      updateService(emptyService.id, 'price', service.price);
                    } else {
                      setServices([...services, { id: Date.now(), name: service.name, price: service.price }]);
                    }
                  }}
                  className="pill-btn"
                >
                  + {service.name}
                </button>
              ))}
            </div>

            {services.map((service) => (
              <div key={service.id} className="form-group-service">
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => updateService(service.id, 'name', e.target.value)}
                  placeholder="Название услуги"
                  className="form-input"
                />
                <input
                  type="number"
                  value={service.price || ''}
                  onChange={(e) => updateService(service.id, 'price', e.target.value)}
                  placeholder="Цена"
                  className="form-input form-input-price"
                  min="0"
                />
                <button
                  onClick={() => removeService(service.id)}
                  className="btn-icon btn-danger"
                  disabled={services.length === 1}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}

            <button onClick={addService} className="btn-secondary full-width">
              <i className="fas fa-plus"></i> Добавить услугу
            </button>

            <div className="total-sum">
              <span>ИТОГО:</span>
              <span className="total-amount">{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>

          <div className="card">
            <h3 className="form-title">СТРАТЕГИЯ / КОММЕНТАРИЙ</h3>
            <textarea
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              placeholder="Опишите предлагаемую стратегию работы..."
              className="form-textarea"
              rows={6}
            />
          </div>

          <div className="form-actions">
            <button
              onClick={handleSaveDraft}
              className="btn-secondary"
              disabled={isSaving}
            >
              <i className="fas fa-save"></i>
              {isSaving ? 'Сохранение...' : 'Сохранить черновик'}
            </button>
            <button
              onClick={handleExportPDF}
              className="btn-primary"
              disabled={isExporting}
            >
              <i className="fas fa-file-pdf"></i>
              {isExporting ? 'Экспорт...' : 'Экспортировать PDF'}
            </button>
          </div>
        </div>

        {/* Правая панель - превью КП */}
        <div className="kp-preview-wrapper">
          <div className="card">
            <h3 className="form-title">ПРЕВЬЮ КП</h3>
            <div id="kp-preview" className="kp-preview">
              <div className="kp-header">
                <h1 className="kp-logo">NOCTO<span className="dot">.</span></h1>
                <div className="kp-meta">
                  <p>Дата: {new Date().toLocaleDateString('ru-RU')}</p>
                  <p>Менеджер: Admin</p>
                </div>
              </div>

              <h2 className="kp-title">КОММЕРЧЕСКОЕ<br/>ПРЕДЛОЖЕНИЕ</h2>
              
              <div className="kp-section">
                <p className="kp-client-info">
                  Для: <strong>{clientName || '___________'}</strong>
                </p>
                {clientSite && (
                  <p className="kp-client-site">{clientSite}</p>
                )}
              </div>

              {problems.some(p => p.text.trim()) && (
                <div className="kp-section">
                  <h3 className="kp-section-title">01 // РЕЗУЛЬТАТЫ ЭКСПРЕСС-АУДИТА</h3>
                  <ul className="kp-list">
                    {problems.filter(p => p.text.trim()).map((problem, idx) => (
                      <li key={idx}>{problem.text}</li>
                    ))}
                  </ul>
                </div>
              )}

              {strategy && (
                <div className="kp-section">
                  <h3 className="kp-section-title">02 // СТРАТЕГИЯ</h3>
                  <p className="kp-text">{strategy}</p>
                </div>
              )}

              {services.some(s => s.name.trim()) && (
                <div className="kp-section">
                  <h3 className="kp-section-title">03 // СТОИМОСТЬ УСЛУГ</h3>
                  <table className="kp-table">
                    <tbody>
                      {services.filter(s => s.name.trim()).map((service, idx) => (
                        <tr key={idx}>
                          <td>{service.name}</td>
                          <td className="kp-price">{(parseFloat(service.price) || 0).toLocaleString('ru-RU')} ₽</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="kp-total">
                    <span>Итого инвестиции:</span>
                    <span className="kp-total-amount">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              )}

              <div className="kp-footer">
                <p>NOCTO AGENCY • EKATERINBURG • NOCTO.RU</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
