# Nocto Finance Dashboard

> Финансовая дашборд-система для digital-агентства Nocto Agency (Екатеринбург)

## 🚀 Возможности

- 📊 **Dashboard** — KPI, графики денежных потоков, таблица транзакций
- 💰 **Управление транзакциями** — CRUD операции, фильтры по датам, пагинация
- 💼 **Генератор КП** — создание и экспорт коммерческих предложений в PDF
- 📈 **Аналитика** — Chart.js графики с градиентами
- 🎨 **Dark Mode** — современный темный дизайн

## 🛠 Технологии

### Frontend
- React 18 + Vite
- React Router v6
- Chart.js + react-chartjs-2
- jsPDF + html2canvas (экспорт PDF)
- Custom CSS (dark mode дизайн-система)

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL

## 🎨 Дизайн-система

```css
:root {
  --bg: #09090b;           /* Background */
  --surface: #18181b;      /* Cards */
  --border: #27272a;       /* Borders */
  --text: #e4e4e7;         /* Main text */
  --text-muted: #a1a1aa;   /* Secondary text */
  --primary: #3b82f6;      /* Nocto Blue */
  --success: #10b981;      /* Green (Money) */
  --danger: #ef4444;       /* Red (Expenses) */
  --font-ui: 'Inter', sans-serif;
  --font-num: 'JetBrains Mono', monospace;
}
```

## 📁 Структура проекта

```
nocto-finance-dashboard/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # UI компоненты
│   │   │   ├── ui/          # Card, Button, Badge
│   │   │   ├── charts/      # FinanceChart, ExpenseChart
│   │   │   ├── layout/      # Sidebar, Topbar
│   │   │   ├── tables/      # TransactionTable
│   │   │   ├── filters/     # DateRangeFilter
│   │   │   └── modals/      # AddTransactionModal
│   │   ├── pages/           # Dashboard, KPGenerator, Transactions
│   │   ├── services/        # API клиент
│   │   ├── utils/           # Helpers (formatMoney, pdfExport)
│   │   └── styles/          # CSS tokens + page styles
│   └── package.json
│
├── server/                   # Node.js Backend
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   │   ├── finance.js   # Транзакции, статистика
│   │   │   └── proposals.js # КП (CRUD)
│   │   ├── controllers/     # Бизнес-логика
│   │   └── prisma/          # Prisma schema
│   └── package.json
│
└── README.md
```

## ⚡ Быстрый старт

### 1. Клонировать репозиторий

```bash
git clone https://github.com/Volkofff666/nocto-finance-dashboard.git
cd nocto-finance-dashboard
```

### 2. Настроить Backend

```bash
cd server
npm install

# Настроить PostgreSQL
cp .env.example .env
# Отредактировать DATABASE_URL в .env

# Применить миграции
npx prisma migrate dev

# (Опционально) Заполнить демо-данными
npx prisma db seed

# Запустить сервер
npm run dev
```

Backend запустится на `http://localhost:3000`

### 3. Настроить Frontend

```bash
cd client
npm install
npm run dev
```

Frontend откроется на `http://localhost:5173`

## 📡 API Endpoints

### Finance
- `GET /api/finance/stats` — KPI метрики (доход, расход, прибыль, история)
- `GET /api/finance/transactions` — Список транзакций (пагинация, фильтры)
- `POST /api/finance/transactions` — Добавить транзакцию
- `PUT /api/finance/transactions/:id` — Обновить транзакцию
- `DELETE /api/finance/transactions/:id` — Удалить транзакцию

### Proposals (КП)
- `GET /api/proposals` — Список коммерческих предложений
- `GET /api/proposals/:id` — Получить КП по ID
- `POST /api/proposals` — Создать КП
- `PUT /api/proposals/:id` — Обновить КП
- `DELETE /api/proposals/:id` — Удалить КП

## 🔧 Режим без авторизации

Система работает в режиме **no-auth** — все данные привязаны к демо-пользователю (`demo-user-1`). Это упрощает разработку и тестирование.

Для включения JWT авторизации:
1. Раскомментируйте `authMiddleware` в роутах
2. Добавьте `/auth/login` и `/auth/register` endpoints
3. Обновите frontend для работы с токенами

## 📋 Roadmap

- [x] Базовая архитектура
- [x] Dashboard с KPI
- [x] CRUD транзакций
- [x] Фильтры по датам
- [x] Модальное окно добавления транзакций
- [ ] Генератор КП с превью
- [ ] Экспорт КП в PDF
- [ ] Сохранение КП в базу
- [ ] Демо-данные (seed script)
- [ ] JWT аутентификация (опционально)
- [ ] Email-уведомления
- [ ] Интеграция с 1С
- [ ] Mobile адаптация

## 🤝 Разработка

### Добавление новой транзакции

```javascript
import { createTransaction } from './services/api';

await createTransaction({
  client: 'ООО "Компания"',
  amount: 150000,
  status: 'paid',
  date: '2025-12-20'
});
```

### Получение статистики

```javascript
import { fetchFinanceStats } from './services/api';

const stats = await fetchFinanceStats();
console.log(stats.income, stats.expenses, stats.netProfit);
```

## 📄 Лицензия

MIT

---

**Nocto Agency** • Екатеринбург • [nocto.ru](https://nocto.ru)
