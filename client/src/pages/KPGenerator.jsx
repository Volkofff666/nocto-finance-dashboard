import React, { useState } from 'react';
import { createProposal } from '../services/api';
import { exportProposalToPDF } from '../utils/pdfExport';
import '../styles/pages/KPGenerator.css';

export default function KPGenerator() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientSite: '',
    strategy: ''
  });

  // Проблемы (чекбоксы)
  const [problems, setProblems] = useState({
    lowCTR: false,
    noUTM: false,
    rsyaLeak: false,
    bots: false,
    slowSite: false
  });

  // Услуги (чекбоксы + цены)
  const [services, setServices] = useState({
    yandexDirect: { checked: false, price: 30000 },
    audit: { checked: false, price: 15000 },
    noctoClick: { checked: false, price: 5000 },
    seo: { checked: false, price: 40000 }
  });

  // Кейсы
  const [cases, setCases] = useState([
    {
      id: 1,
      title: 'E-commerce в строительстве',
      description: 'Клиент терял 60% бюджета на нецелевые клики. Провели глубокий аудит, настроили минус-слова, запустили РК с UTM-метками.',
      result: '+180% ROI, снижение CPA на 45%',
      included: false
    },
    {
      id: 2,
      title: 'B2B SaaS продукт',
      description: 'Стартап не мог масштабировать лидогенерацию. Создали воронку продаж с квалификацией, настроили LinkedIn Ads и ретаргетинг.',
      result: 'Рост квалифицированных лидов на 250%',
      included: false
    }
  ]);

  // Расчет итоговой суммы
  const totalPrice = Object.values(services).reduce(
    (sum, service) => sum + (service.checked ? service.price : 0),
    0
  );

  // Экспорт в PDF
  const handleExportPDF = async () => {
    const element = document.getElementById('kp-preview');
    if (element) {
      await exportProposalToPDF(element, `KP_${formData.clientName || 'Клиент'}_${Date.now()}.pdf`);
    }
  };

  // Собираем выбранные проблемы
  const selectedProblems = Object.entries(problems)
    .filter(([_, checked]) => checked)
    .map(([key]) => {
      const labels = {
        lowCTR: 'Низкий CTR',
        noUTM: 'Нет UTM',
        rsyaLeak: 'Слив на РСЯ',
        bots: 'Скликивание (Боты)',
        slowSite: 'Медленный сайт'
      };
      return labels[key];
    });

  // Собираем выбранные услуги
  const selectedServices = Object.entries(services)
    .filter(([_, service]) => service.checked)
    .map(([key, service]) => {
      const labels = {
        yandexDirect: 'Настройка Яндекс.Директ',
        audit: 'Глубокий аудит',
        noctoClick: 'Защита NoctoClick',
        seo: 'SEO Оптимизация'
      };
      return { name: labels[key], price: service.price };
    });

  const selectedCases = cases.filter(c => c.included);

  return (
    <div className="kp-generator-old">
      <div className="kp-layout">
        {/* Левая панель - Редактор */}
        <div className="kp-editor-panel">
          <div className="editor-header">
            <h2>KP EDITOR v1.0</h2>
          </div>

          <div className="editor-section">
            <label className="section-label">Клиент (Компания)</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="editor-input"
            />
          </div>

          <div className="editor-section">
            <label className="section-label">Сайт клиента</label>
            <input
              type="text"
              value={formData.clientSite}
              onChange={(e) => setFormData({ ...formData, clientSite: e.target.value })}
              className="editor-input"
            />
          </div>

          <div className="editor-section">
            <label className="section-label">Проблемы (Аудит)</label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={problems.lowCTR}
                onChange={(e) => setProblems({ ...problems, lowCTR: e.target.checked })}
              />
              Низкий CTR
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={problems.noUTM}
                onChange={(e) => setProblems({ ...problems, noUTM: e.target.checked })}
              />
              Нет UTM
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={problems.rsyaLeak}
                onChange={(e) => setProblems({ ...problems, rsyaLeak: e.target.checked })}
              />
              Слив на РСЯ
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={problems.bots}
                onChange={(e) => setProblems({ ...problems, bots: e.target.checked })}
              />
              Скликивание (Боты)
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={problems.slowSite}
                onChange={(e) => setProblems({ ...problems, slowSite: e.target.checked })}
              />
              Медленный сайт
            </label>
          </div>

          <div className="editor-section">
            <label className="section-label">Что делаем (Услуги)</label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={services.yandexDirect.checked}
                onChange={(e) => setServices({
                  ...services,
                  yandexDirect: { ...services.yandexDirect, checked: e.target.checked }
                })}
              />
              Настройка Яндекс.Директ (30к)
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={services.audit.checked}
                onChange={(e) => setServices({
                  ...services,
                  audit: { ...services.audit, checked: e.target.checked }
                })}
              />
              Глубокий аудит (15к)
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={services.noctoClick.checked}
                onChange={(e) => setServices({
                  ...services,
                  noctoClick: { ...services.noctoClick, checked: e.target.checked }
                })}
              />
              Защита NoctoClick (5к/мес)
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={services.seo.checked}
                onChange={(e) => setServices({
                  ...services,
                  seo: { ...services.seo, checked: e.target.checked }
                })}
              />
              SEO Оптимизация (40к)
            </label>
          </div>

          <div className="editor-section">
            <label className="section-label">Добавить кейсы</label>
            {cases.map(caseItem => (
              <label key={caseItem.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={caseItem.included}
                  onChange={(e) => setCases(cases.map(c => 
                    c.id === caseItem.id ? { ...c, included: e.target.checked } : c
                  ))}
                />
                {caseItem.title}
              </label>
            ))}
          </div>

          <div className="editor-section">
            <label className="section-label">Комментарий / Стратегия</label>
            <textarea
              value={formData.strategy}
              onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
              className="editor-textarea"
              rows="6"
            />
          </div>
        </div>

        {/* Правая панель - Превью */}
        <div className="kp-preview-panel">
          <div id="kp-preview" className="kp-document">
            {/* Шапка */}
            <div className="kp-doc-header">
              <div className="kp-logo-big">NOCTO<span className="dot">.</span></div>
              <div className="kp-meta">
                <div>Дата: {new Date().toLocaleDateString('ru-RU')}</div>
                <div>Менеджер: Admin</div>
              </div>
            </div>

            {/* Заголовок */}
            <div className="kp-doc-title">
              <h1>КОММЕРЧЕСКОЕ<br />ПРЕДЛОЖЕНИЕ</h1>
            </div>

            <div className="kp-doc-client">
              <div className="client-label">Для:</div>
              <div className="client-name">{formData.clientName || 'Клиент'}</div>
              {formData.clientSite && <div className="client-site">{formData.clientSite}</div>}
            </div>

            {/* 01 АУДИТ */}
            {selectedProblems.length > 0 && (
              <div className="kp-doc-section">
                <h2 className="section-number">01 // РЕЗУЛЬТАТЫ ЭКСПРЕСС-АУДИТА</h2>
                <ul className="problems-list">
                  {selectedProblems.map((problem, idx) => (
                    <li key={idx}>{problem}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 02 КЕЙСЫ */}
            {selectedCases.length > 0 && (
              <div className="kp-doc-section">
                <h2 className="section-number">02 // НАШИ КЕЙСЫ</h2>
                {selectedCases.map((caseItem, idx) => (
                  <div key={idx} className="case-block">
                    <h3 className="case-title">{caseItem.title}</h3>
                    <p className="case-desc">{caseItem.description}</p>
                    <p className="case-result">✓ {caseItem.result}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 03 СТРАТЕГИЯ */}
            {formData.strategy && (
              <div className="kp-doc-section">
                <h2 className="section-number">
                  {selectedCases.length > 0 ? '03' : '02'} // СТРАТЕГИЯ
                </h2>
                <p className="strategy-text">{formData.strategy}</p>
              </div>
            )}

            {/* 04 СТОИМОСТЬ */}
            {selectedServices.length > 0 && (
              <div className="kp-doc-section">
                <h2 className="section-number">
                  {selectedCases.length > 0 && formData.strategy ? '04' : 
                   selectedCases.length > 0 || formData.strategy ? '03' : '02'} // СТОИМОСТЬ УСЛУГ
                </h2>
                <table className="services-table">
                  <tbody>
                    {selectedServices.map((service, idx) => (
                      <tr key={idx}>
                        <td>{service.name}</td>
                        <td className="price-cell">{(service.price / 1000).toFixed(0)}к ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="total-block">
                  <div className="total-label">Итого инвестиции:</div>
                  <div className="total-price">{totalPrice.toLocaleString('ru-RU')} ₽</div>
                </div>
              </div>
            )}

            {/* Футер */}
            <div className="kp-doc-footer">
              NOCTO AGENCY • EKATERINBURG • NOCTO.RU
            </div>
          </div>

          {/* Кнопка экспорта */}
          <button onClick={handleExportPDF} className="export-btn">
            🖨️ СОХРАНИТЬ PDF
          </button>
        </div>
      </div>
    </div>
  );
}
