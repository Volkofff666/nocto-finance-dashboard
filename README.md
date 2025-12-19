# Nocto Finance Dashboard

> Финансовая дашборд-система для digital-агентства Nocto Agency (Екатеринбург)

## Возможности

- 📊 **Dashboard** — KPI, графики денежных потоков, таблица транзакций
- 💼 **Генератор КП** — создание и экспорт коммерческих предложений в PDF
- 🔐 **Аутентификация** — JWT-токены, роли пользователей (admin, manager, accountant)
- 💰 **Финансовый учет** — доходы, расходы, прибыль с фильтрами по датам
- 📈 **Аналитика** — Chart.js графики с градиентами

## Технологии

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
- JWT authentication
- bcryptjs

## Дизайн-система

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

## Структура проекта

```
nocto-finance-dashboard/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # UI компоненты
│   │   ├── pages/         # Страницы (Dashboard, KPGenerator)
│   │   ├── services/      # API клиент
│   │   ├── utils/         # Helpers
│   │   └── styles/        # CSS tokens + global styles
│   └── package.json
│
├── server/                # Node.js Backend
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── controllers/   # Бизнес-логика
│   │   ├── middleware/    # JWT auth, роли
│   │   └── prisma/        # Prisma schema
│   └── package.json
│
└── README.md
```

## Быстрый старт

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
# Отредактировать DATABASE_URL и JWT_SECRET в .env

# Применить миграции
npx prisma migrate dev

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

### 4. Создать первого пользователя

```bash
# Через Prisma Studio
cd server
npx prisma studio

# Или через API
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nocto.ru","password":"password","name":"Admin","role":"admin"}'
```

## API Endpoints

### Auth
- `POST /api/auth/register` — Регистрация
- `POST /api/auth/login` — Вход (получение JWT)

### Finance
- `GET /api/finance/stats` — KPI метрики
- `GET /api/finance/transactions` — Список транзакций (пагинация, фильтры)
- `POST /api/finance/transactions` — Добавить транзакцию
- `PUT /api/finance/transactions/:id` — Обновить транзакцию
- `DELETE /api/finance/transactions/:id` — Удалить транзакцию

### Proposals (КП)
- `GET /api/proposals` — Список коммерческих предложений
- `POST /api/proposals` — Создать КП
- `PUT /api/proposals/:id` — Обновить КП
- `DELETE /api/proposals/:id` — Удалить КП

## Роли пользователей

- **admin** — полный доступ ко всем функциям
- **manager** — создание КП, просмотр финансов
- **accountant** — управление транзакциями, просмотр аналитики

## Roadmap

- [x] Базовая архитектура
- [x] Аутентификация JWT
- [x] Dashboard с KPI
- [x] CRUD транзакций
- [ ] Генератор КП с сохранением в БД
- [ ] Экспорт КП в PDF
- [ ] Фильтры по датам
- [ ] Email-уведомления
- [ ] Интеграция с 1С
- [ ] Mobile адаптация

## Лицензия

MIT

---

**Nocto Agency** • Екатеринбург • [nocto.ru](https://nocto.ru)