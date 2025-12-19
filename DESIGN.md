# Nocto Finance Dashboard — Design System

> Дизайн-система для финансовой панели управления Nocto Agency

---

## Философия дизайна

### Принципы
1. **Минимализм** — никаких лишних элементов, только функциональность
2. **Контраст** — тёмная тема с яркими акцентами для важных элементов
3. **Типографика** — два шрифта: UI-шрифт для текста, моноширинный для цифр
4. **Консистентность** — одинаковые паттерны во всех компонентах
5. **Без эмодзи** — только иконки FontAwesome и текст

### Целевая аудитория
Менеджеры, аккаунт-менеджеры, руководители отделов продаж в digital-агентстве

---

## Цветовая палитра

### Основные цвета

```css
--bg: #09090b;              /* Фон приложения */
--surface: #18181b;         /* Фон карточек */
--border: #27272a;          /* Границы элементов */
```

### Текст

```css
--text: #e4e4e7;            /* Основной текст */
--text-muted: #a1a1aa;      /* Второстепенный текст */
```

### Семантические цвета

```css
--primary: #3b82f6;         /* Синий (Nocto Blue) - основные действия */
--success: #10b981;         /* Зелёный - доходы, успех */
--warning: #f59e0b;         /* Жёлтый - предупреждения */
--danger: #ef4444;          /* Красный - расходы, ошибки */
```

### Использование

- **Primary (синий)** — кнопки действий, ссылки, акценты, логотип
- **Success (зелёный)** — положительные суммы, выполненные планы, статус "Оплачено"
- **Warning (жёлтый)** — статус "Ожидание", прогресс 70-99%
- **Danger (красный)** — отрицательные суммы, статус "Расход", прогресс <70%

---

## Типографика

### Шрифты

#### Inter (UI шрифт)
```css
--font-ui: 'Inter', sans-serif;
```
**Использование:**
- Основной текст
- Заголовки страниц
- Кнопки
- Формы

#### JetBrains Mono (числовой шрифт)
```css
--font-num: 'JetBrains Mono', monospace;
```
**Использование:**
- Все денежные суммы
- Проценты
- Даты
- Метрики (KPI)
- Логотип NOCTO.

### Размеры текста

```css
/* Заголовки */
.page-title: 1.75rem (28px), font-weight: 700, letter-spacing: 1px
.section-title: 1.25rem (20px), font-weight: 600

/* Основной текст */
.text-base: 0.95rem (15px), font-weight: 400
.text-small: 0.85rem (14px)
.text-tiny: 0.75rem (12px)

/* Числа */
.amount-large: 2rem (32px), font-weight: 700
.amount-medium: 1.5rem (24px), font-weight: 600
.amount-small: 0.9rem (14px), font-weight: 600
```

### Правила

1. **Заголовки страниц** — всегда uppercase, letter-spacing 1-2px
2. **Лейблы форм** — uppercase, letter-spacing 0.5px, text-muted цвет
3. **Денежные суммы** — всегда JetBrains Mono, жирность 600-700
4. **Статусы** — uppercase, размер 0.75rem

---

## Отступы и размеры

### Spacing Scale

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```

### Радиусы скругления

```css
--radius-sm: 4px;    /* Badge, мелкие элементы */
--radius-md: 6px;    /* Input, кнопки */
--radius-lg: 8px;    /* Card, модальные окна */
--radius-xl: 12px;   /* Крупные карточки */
```

### Размеры компонентов

```css
/* Высота элементов */
Input/Button: 44px (padding: 12px 16px)
Select: 44px
Textarea: min-height 100px

/* Ширина */
Sidebar: 240px (desktop)
Modal: max-width 500px
Card: padding 24px
```

---

## Компоненты

### Button

#### Primary Button
```css
background: var(--primary);
color: #fff;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
transition: all 0.2s;

:hover {
  background: #2563eb;
  transform: translateY(-1px);
}
```

#### Secondary Button
```css
background: transparent;
border: 1px solid var(--border);
color: var(--text);
padding: 12px 24px;
border-radius: 8px;

:hover {
  background: rgba(255, 255, 255, 0.05);
}
```

#### Action Button (иконка)
```css
padding: 6px 10px;
background: transparent;
border: 1px solid var(--border);
border-radius: 6px;
font-size: 1rem;

:hover {
  transform: translateY(-1px);
  /* Цвет зависит от действия */
}
```

### Card

```css
background: var(--surface);
padding: 24px;
border-radius: 12px;
border: 1px solid var(--border);
```

### Badge

```css
padding: 6px 12px;
border-radius: 6px;
font-family: var(--font-num);
font-size: 0.85rem;
font-weight: 700;

/* Варианты */
.badge-success: rgba(16, 185, 129, 0.15) bg, var(--success) text
.badge-warning: rgba(245, 158, 11, 0.15) bg, var(--warning) text
.badge-danger: rgba(239, 68, 68, 0.15) bg, var(--danger) text
```

### Input/Textarea

```css
background: var(--bg);
border: 1px solid var(--border);
border-radius: 8px;
padding: 12px 16px;
color: var(--text);
font-size: 0.95rem;
transition: border-color 0.2s;

:focus {
  outline: none;
  border-color: var(--primary);
}
```

### Modal

```css
/* Overlay */
background: rgba(0, 0, 0, 0.75);
backdrop-filter: blur(4px);

/* Content */
background: var(--surface);
max-width: 500px;
border-radius: 12px;
padding: 32px;
```

### Progress Bar

```css
/* Container */
height: 12px;
background: var(--bg);
border-radius: 6px;

/* Fill */
height: 100%;
border-radius: 6px;
transition: width 0.5s ease;
background: зависит от прогресса (success/warning/danger)
```

### Table

```css
/* Header */
th {
  color: var(--text-muted);
  font-weight: 500;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

/* Cell */
td {
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}

/* Last row */
tr:last-child td {
  border-bottom: none;
}
```

---

## Layout

### Grid System

#### Dashboard Grid
```css
grid-template-columns: repeat(4, 1fr);
gap: 24px;
```

#### Adaptive Grid
```css
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 24px;
```

### Sidebar + Content

```css
/* Layout */
display: grid;
grid-template-columns: 240px 1fr;

/* Sidebar */
width: 240px;
background: var(--surface);
border-right: 1px solid var(--border);

/* Content */
padding: 32px;
overflow-y: auto;
```

### KP Generator Layout

```css
grid-template-columns: 400px 1fr;
height: 100vh;

/* Editor panel */
width: 400px;
overflow-y: auto;
padding: 24px;

/* Preview panel */
overflow-y: auto;
padding: 40px;
```

---

## Паттерны

### Заголовок страницы

```jsx
<div className="page-header">
  <div>
    <h1 className="page-title">ЗАГОЛОВОК</h1>
    <p className="page-subtitle">Описание страницы</p>
  </div>
  <button className="btn-primary">
    Основное действие
  </button>
</div>
```

### Пустое состояние

```jsx
<div className="empty-state">
  <p>Данные не найдены</p>
</div>
```

### Состояние загрузки

```jsx
<div className="loading-state">
  Загрузка...
</div>
```

### Форматирование денег

```javascript
// Всегда используем formatMoney
formatMoney(150000) // "150 000 ₽"

// Положительные суммы с +
amount > 0 ? `+${formatMoney(amount)}` : formatMoney(amount)

// Цвет зависит от знака
className={amount > 0 ? 'text-green' : 'text-red'}
```

### Форматирование дат

```javascript
// Используем formatDate
formatDate('2025-12-20') // "20.12.2025"

// Для заголовков
new Date().toLocaleDateString('ru-RU') // "20.12.2025"
```

---

## Иконки

### FontAwesome Icons

Используем FontAwesome 6 (CDN в index.html):

```html
<!-- Dashboard -->
<i className="fas fa-chart-line"></i>

<!-- Транзакции -->
<i className="fas fa-exchange-alt"></i>

<!-- Эффективность -->
<i className="fas fa-users"></i>

<!-- Генератор КП -->
<i className="fas fa-file-invoice"></i>

<!-- Действия -->
<i className="fas fa-edit"></i>      <!-- Редактировать -->
<i className="fas fa-trash"></i>     <!-- Удалить -->
<i className="fas fa-download"></i>  <!-- Скачать -->
<i className="fas fa-plus"></i>      <!-- Добавить -->
```

### Правила использования

1. Иконки только из FontAwesome (без эмодзи)
2. Размер иконки = размер текста рядом
3. Цвет иконки = цвет текста (наследуется)
4. В кнопках: иконка слева, текст справа

---

## Анимации

### Transitions

```css
/* Стандартная скорость */
transition: all 0.2s ease;

/* Медленная (для progress bar) */
transition: width 0.5s ease;
```

### Hover Effects

```css
/* Кнопки */
:hover {
  transform: translateY(-1px);
}

/* Карточки */
:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* Границы */
:hover {
  border-color: var(--primary);
}
```

### Focus States

```css
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--primary);
}
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  /* Stack layout */
  grid-template-columns: 1fr;
  
  /* Full width buttons */
  button { width: 100%; }
}

/* Tablet */
@media (max-width: 1200px) {
  /* 2 columns grid */
  grid-template-columns: repeat(2, 1fr);
}

/* Desktop */
@media (min-width: 1201px) {
  /* 4 columns grid */
  grid-template-columns: repeat(4, 1fr);
}
```

### Mobile Rules

1. Sidebar скрывается/превращается в hamburger menu
2. Grid становится одноколоночным
3. Padding уменьшается до 16px
4. Кнопки становятся full-width
5. Модальные окна занимают 90% ширины

---

## Файловая структура

```
client/src/
├── components/
│   ├── ui/              # Базовые компоненты
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   └── *.css
│   ├── layout/          # Layout компоненты
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   └── *.css
│   ├── charts/          # Графики
│   ├── tables/          # Таблицы
│   ├── filters/         # Фильтры
│   └── modals/          # Модальные окна
├── pages/               # Страницы
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── EmployeePerformance.jsx
│   └── KPGenerator.jsx
├── services/            # API клиенты
│   └── api.js
├── utils/               # Утилиты
│   ├── formatMoney.js
│   └── pdfExport.js
└── styles/
    ├── global.css       # Глобальные стили
    ├── tokens.css       # CSS переменные
    └── pages/           # Стили страниц
```

---

## Naming Conventions

### CSS Классы

```css
/* BEM naming */
.block__element--modifier

/* Примеры */
.sidebar__logo
.menu__item--active
.employee-card
.progress-bar
.btn-primary
```

### React Компоненты

```javascript
// PascalCase для компонентов
Dashboard.jsx
EmployeePerformance.jsx
AddTransactionModal.jsx

// camelCase для функций
handleSubmit
fetchTransactions
formatMoney
```

### Переменные

```javascript
// camelCase
const totalPrice = 0;
const isLoading = false;

// UPPER_CASE для констант
const API_URL = 'http://localhost:3000';
```

---

## Accessibility

### Правила

1. **Контраст** — минимум 4.5:1 для текста
2. **Focus states** — всегда видимые для keyboard navigation
3. **Alt текст** — для всех изображений
4. **Labels** — для всех input полей
5. **ARIA** — используем где необходимо

### Примеры

```jsx
/* Input с label */
<label htmlFor="client">Клиент</label>
<input id="client" type="text" />

/* Button с title */
<button title="Редактировать">
  <i className="fas fa-edit"></i>
</button>

/* Modal с aria-label */
<div role="dialog" aria-label="Добавить транзакцию">
  ...
</div>
```

---

## Best Practices

### DO (Делай)

- Используй CSS переменные для цветов
- Применяй transition для hover эффектов
- Форматируй деньги через formatMoney()
- Используй JetBrains Mono для всех цифр
- Добавляй loading/empty states
- Проверяй responsive на мобильных
- Пиши консистентные CSS классы

### DON'T (Не делай)

- Не используй эмодзи в UI
- Не хардкодь цвета (только через переменные)
- Не забывай про :hover и :focus states
- Не делай inline styles (только CSS классы)
- Не используй !important (кроме крайних случаев)
- Не забывай про error handling
- Не дублируй код (создавай компоненты)

---

## Changelog

### v1.0.0 (2025-12-20)
- Создана базовая дизайн-система
- Определены цвета, типографика, компоненты
- Добавлены правила и паттерны

---

**Nocto Agency** • Екатеринбург • [nocto.ru](https://nocto.ru)
