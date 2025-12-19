# NOCTO UI KIT

> Универсальная дизайн-система для всех проектов Nocto  
> CRM, сайты, блоги, лендинги, веб-приложения

---

## Философия

### DNA Nocto
1. **Минимализм** — ничего лишнего, только функциональность
2. **Контраст** — тёмные и светлые темы с яркими акцентами
3. **Типографика** — чёткая иерархия, два шрифта
4. **Скорость** — легкие анимации, быстрая загрузка
5. **Универсальность** — работает на любых устройствах

---

## Цветовая система

### Brand Colors

```css
/* Nocto Blue */
--nocto-blue-50: #eff6ff;
--nocto-blue-100: #dbeafe;
--nocto-blue-200: #bfdbfe;
--nocto-blue-300: #93c5fd;
--nocto-blue-400: #60a5fa;
--nocto-blue-500: #3b82f6;  /* Primary */
--nocto-blue-600: #2563eb;
--nocto-blue-700: #1d4ed8;
--nocto-blue-800: #1e40af;
--nocto-blue-900: #1e3a8a;
```

### Dark Theme (по умолчанию)

```css
:root[data-theme="dark"] {
  /* Background */
  --bg-primary: #09090b;
  --bg-secondary: #18181b;
  --bg-tertiary: #27272a;
  
  /* Surface */
  --surface: #18181b;
  --surface-raised: #27272a;
  --surface-overlay: #3f3f46;
  
  /* Border */
  --border-subtle: #27272a;
  --border-default: #3f3f46;
  --border-strong: #52525b;
  
  /* Text */
  --text-primary: #fafafa;
  --text-secondary: #e4e4e7;
  --text-tertiary: #a1a1aa;
  --text-disabled: #71717a;
  --text-inverse: #09090b;
  
  /* Interactive */
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --primary-pressed: #1d4ed8;
  
  /* Status */
  --success: #10b981;
  --success-subtle: rgba(16, 185, 129, 0.15);
  --warning: #f59e0b;
  --warning-subtle: rgba(245, 158, 11, 0.15);
  --danger: #ef4444;
  --danger-subtle: rgba(239, 68, 68, 0.15);
  --info: #06b6d4;
  --info-subtle: rgba(6, 182, 212, 0.15);
}
```

### Light Theme

```css
:root[data-theme="light"] {
  /* Background */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;
  
  /* Surface */
  --surface: #ffffff;
  --surface-raised: #f9fafb;
  --surface-overlay: #f3f4f6;
  
  /* Border */
  --border-subtle: #f3f4f6;
  --border-default: #e5e7eb;
  --border-strong: #d1d5db;
  
  /* Text */
  --text-primary: #111827;
  --text-secondary: #374151;
  --text-tertiary: #6b7280;
  --text-disabled: #9ca3af;
  --text-inverse: #ffffff;
  
  /* Interactive */
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --primary-pressed: #1d4ed8;
  
  /* Status */
  --success: #10b981;
  --success-subtle: rgba(16, 185, 129, 0.1);
  --warning: #f59e0b;
  --warning-subtle: rgba(245, 158, 11, 0.1);
  --danger: #ef4444;
  --danger-subtle: rgba(239, 68, 68, 0.1);
  --info: #06b6d4;
  --info-subtle: rgba(6, 182, 212, 0.1);
}
```

### Semantic Colors

```css
/* Links */
--link-default: var(--primary);
--link-hover: var(--primary-hover);
--link-visited: #7c3aed;

/* Focus */
--focus-ring: var(--primary);
--focus-ring-width: 2px;
--focus-ring-offset: 2px;

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

---

## Типографика

### Шрифтовые семейства

```css
/* Sans-serif (UI) */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif;

/* Monospace (код, цифры) */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 
             'Courier New', monospace;

/* Serif (блог, лонгриды) */
--font-serif: 'Merriweather', 'Georgia', 'Times New Roman', serif;
```

### Размеры и веса

```css
/* Font Sizes */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
--text-7xl: 4.5rem;      /* 72px */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Letter Spacing */
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0em;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
```

### Типографская шкала

```css
/* Display (геройные заголовки лендингов) */
.display-2xl { font-size: var(--text-7xl); line-height: var(--leading-none); font-weight: var(--font-bold); }
.display-xl { font-size: var(--text-6xl); line-height: var(--leading-tight); font-weight: var(--font-bold); }
.display-lg { font-size: var(--text-5xl); line-height: var(--leading-tight); font-weight: var(--font-bold); }

/* Headings */
.heading-h1 { font-size: var(--text-4xl); line-height: var(--leading-tight); font-weight: var(--font-bold); }
.heading-h2 { font-size: var(--text-3xl); line-height: var(--leading-tight); font-weight: var(--font-bold); }
.heading-h3 { font-size: var(--text-2xl); line-height: var(--leading-snug); font-weight: var(--font-semibold); }
.heading-h4 { font-size: var(--text-xl); line-height: var(--leading-snug); font-weight: var(--font-semibold); }
.heading-h5 { font-size: var(--text-lg); line-height: var(--leading-normal); font-weight: var(--font-semibold); }
.heading-h6 { font-size: var(--text-base); line-height: var(--leading-normal); font-weight: var(--font-semibold); }

/* Body Text */
.body-xl { font-size: var(--text-xl); line-height: var(--leading-relaxed); }
.body-lg { font-size: var(--text-lg); line-height: var(--leading-relaxed); }
.body-base { font-size: var(--text-base); line-height: var(--leading-normal); }
.body-sm { font-size: var(--text-sm); line-height: var(--leading-normal); }
.body-xs { font-size: var(--text-xs); line-height: var(--leading-normal); }

/* Mono (для кода, цифр) */
.mono { font-family: var(--font-mono); }

/* Serif (для статей) */
.serif { font-family: var(--font-serif); }
```

---

## Отступы

### Spacing Scale

```css
--space-0: 0;
--space-px: 1px;
--space-0_5: 0.125rem;   /* 2px */
--space-1: 0.25rem;      /* 4px */
--space-1_5: 0.375rem;   /* 6px */
--space-2: 0.5rem;       /* 8px */
--space-2_5: 0.625rem;   /* 10px */
--space-3: 0.75rem;      /* 12px */
--space-3_5: 0.875rem;   /* 14px */
--space-4: 1rem;         /* 16px */
--space-5: 1.25rem;      /* 20px */
--space-6: 1.5rem;       /* 24px */
--space-7: 1.75rem;      /* 28px */
--space-8: 2rem;         /* 32px */
--space-9: 2.25rem;      /* 36px */
--space-10: 2.5rem;      /* 40px */
--space-12: 3rem;        /* 48px */
--space-14: 3.5rem;      /* 56px */
--space-16: 4rem;        /* 64px */
--space-20: 5rem;        /* 80px */
--space-24: 6rem;        /* 96px */
--space-32: 8rem;        /* 128px */
```

---

## Скругления

```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* полное скругление */
```

---

## Компоненты

### Buttons

#### Primary
```css
.btn-primary {
  background: var(--primary);
  color: var(--text-inverse);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  border: none;
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.btn-primary:active {
  background: var(--primary-pressed);
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

#### Secondary
```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  border: 1px solid var(--border-default);
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  background: var(--surface-raised);
  border-color: var(--border-strong);
}
```

#### Ghost
```css
.btn-ghost {
  background: transparent;
  color: var(--text-primary);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  border: none;
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-ghost:hover {
  background: var(--surface-raised);
}
```

#### Sizes
```css
/* Small */
.btn-sm { padding: 0.5rem 1rem; font-size: var(--text-sm); }

/* Medium (default) */
.btn-md { padding: 0.75rem 1.5rem; font-size: var(--text-base); }

/* Large */
.btn-lg { padding: 1rem 2rem; font-size: var(--text-lg); }

/* Extra Large */
.btn-xl { padding: 1.25rem 2.5rem; font-size: var(--text-xl); }
```

### Cards

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* Варианты */
.card-flat { box-shadow: none; }
.card-elevated { box-shadow: var(--shadow-xl); }
.card-interactive { cursor: pointer; }
```

### Inputs

```css
.input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: var(--text-base);
  font-family: var(--font-sans);
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.input:hover {
  border-color: var(--border-strong);
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 var(--focus-ring-width) var(--primary-subtle);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--bg-secondary);
}

.input::placeholder {
  color: var(--text-tertiary);
}
```

### Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

/* Варианты */
.badge-primary { background: var(--primary-subtle); color: var(--primary); }
.badge-success { background: var(--success-subtle); color: var(--success); }
.badge-warning { background: var(--warning-subtle); color: var(--warning); }
.badge-danger { background: var(--danger-subtle); color: var(--danger); }
.badge-neutral { background: var(--surface-raised); color: var(--text-tertiary); }
```

### Alert

```css
.alert {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border-left: 4px solid;
  display: flex;
  gap: var(--space-3);
}

.alert-success {
  background: var(--success-subtle);
  border-color: var(--success);
  color: var(--success);
}

.alert-warning {
  background: var(--warning-subtle);
  border-color: var(--warning);
  color: var(--warning);
}

.alert-danger {
  background: var(--danger-subtle);
  border-color: var(--danger);
  color: var(--danger);
}

.alert-info {
  background: var(--info-subtle);
  border-color: var(--info);
  color: var(--info);
}
```

### Modal

```css
/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Content */
.modal-content {
  background: var(--surface);
  border-radius: var(--radius-2xl);
  max-width: 32rem;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-2xl);
  animation: scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Header */
.modal-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-default);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Body */
.modal-body {
  padding: var(--space-6);
}

/* Footer */
.modal-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--border-default);
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
}
```

### Tooltip

```css
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip-content {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  padding: var(--space-2) var(--space-3);
  background: var(--surface-overlay);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}

.tooltip:hover .tooltip-content {
  opacity: 1;
}

.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--surface-overlay);
}
```

---

## Layout Components

### Container

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

/* Breakpoints */
@media (min-width: 640px) { .container { max-width: 640px; } }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }
@media (min-width: 1536px) { .container { max-width: 1536px; } }
```

### Grid

```css
.grid {
  display: grid;
  gap: var(--space-6);
}

/* Columns */
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid-cols-12 { grid-template-columns: repeat(12, 1fr); }

/* Auto-fit */
.grid-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### Section

```css
.section {
  padding-top: var(--space-16);
  padding-bottom: var(--space-16);
}

.section-sm {
  padding-top: var(--space-12);
  padding-bottom: var(--space-12);
}

.section-lg {
  padding-top: var(--space-24);
  padding-bottom: var(--space-24);
}
```

---

## Анимации

### Transitions

```css
/* Стандартные */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Keyframes

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Blog Components

### Article

```css
.article {
  max-width: 65ch;
  margin: 0 auto;
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
}

.article h2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  margin-top: var(--space-12);
  margin-bottom: var(--space-4);
  font-family: var(--font-sans);
}

.article h3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  margin-top: var(--space-8);
  margin-bottom: var(--space-3);
  font-family: var(--font-sans);
}

.article p {
  margin-bottom: var(--space-6);
}

.article a {
  color: var(--link-default);
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: text-decoration-color var(--transition-fast);
}

.article a:hover {
  text-decoration-color: currentColor;
}

.article blockquote {
  border-left: 4px solid var(--primary);
  padding-left: var(--space-4);
  margin: var(--space-6) 0;
  font-style: italic;
  color: var(--text-secondary);
}

.article code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--surface-raised);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
}

.article pre {
  background: var(--surface-raised);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  overflow-x: auto;
  margin: var(--space-6) 0;
}

.article pre code {
  background: none;
  padding: 0;
}
```

### Hero Section

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-12) var(--space-4);
}

.hero-title {
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-6);
}

.hero-subtitle {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
}

.hero-cta {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero-title { font-size: var(--text-4xl); }
  .hero-subtitle { font-size: var(--text-lg); }
}
```

### Feature Card

```css
.feature-card {
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  background: var(--surface);
  border: 1px solid var(--border-default);
  transition: all var(--transition-base);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary);
}

.feature-icon {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-subtle);
  color: var(--primary);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
}

.feature-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-2);
}

.feature-description {
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}
```

---

## Utility Classes

### Text Utilities

```css
/* Alignment */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* Colors */
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-tertiary { color: var(--text-tertiary); }
.text-success { color: var(--success); }
.text-warning { color: var(--warning); }
.text-danger { color: var(--danger); }

/* Transform */
.uppercase { text-transform: uppercase; }
.lowercase { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }

/* Truncate */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### Spacing Utilities

```css
/* Margin */
.m-0 { margin: 0; }
.m-auto { margin: auto; }
.mt-4 { margin-top: var(--space-4); }
.mb-4 { margin-bottom: var(--space-4); }
.mx-auto { margin-left: auto; margin-right: auto; }

/* Padding */
.p-0 { padding: 0; }
.p-4 { padding: var(--space-4); }
.px-4 { padding-left: var(--space-4); padding-right: var(--space-4); }
.py-4 { padding-top: var(--space-4); padding-bottom: var(--space-4); }
```

### Display Utilities

```css
.hidden { display: none; }
.block { display: block; }
.inline { display: inline; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.grid { display: grid; }
```

---

## Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */

/* Usage */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## Примеры использования

### Лендинг Page

```html
<section class="hero">
  <div class="container">
    <h1 class="hero-title">NOCTO AGENCY</h1>
    <p class="hero-subtitle">
      Digital-агентство полного цикла в Екатеринбурге
    </p>
    <div class="hero-cta">
      <button class="btn-primary btn-lg">Оставить заявку</button>
      <button class="btn-secondary btn-lg">Портфолио</button>
    </div>
  </div>
</section>
```

### Блог Post

```html
<article class="article">
  <h1>Заголовок статьи</h1>
  <p>Первый параграф...</p>
  
  <h2>Подзаголовок</h2>
  <p>Текст...</p>
  
  <blockquote>
    Важная цитата
  </blockquote>
  
  <pre><code>const example = 'code';</code></pre>
</article>
```

### CRM Dashboard

```html
<div class="container">
  <div class="grid grid-cols-4">
    <div class="card">
      <h3 class="heading-h4">Доход</h3>
      <p class="mono text-3xl text-success">+1 500 000 ₽</p>
    </div>
    <!-- Другие карточки -->
  </div>
</div>
```

---

## Best Practices

### DO
1. Используй CSS переменные
2. Соблюдай spacing scale
3. Применяй transitions
4. Используй семантические HTML теги
5. Пиши accessible код
6. Тестируй на разных устройствах
7. Используй mobile-first подход

### DON'T
1. Не хардкодь цвета
2. Не используй !important
3. Не делай inline styles
4. Не забывай про hover/focus states
5. Не используй эмодзи в UI
6. Не игнорируй accessibility
7. Не дублируй код

---

## Installation

### NPM Package (будущее)

```bash
npm install @nocto/ui-kit
```

### CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.nocto.ru/ui-kit/v1/nocto.css">

<!-- Шрифты -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Иконки -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

---

## Changelog

### v1.0.0 (2025-12-20)
- Создана базовая дизайн-система
- Dark & Light темы
- Компоненты: Button, Card, Input, Badge, Modal, Alert
- Layout: Container, Grid, Section
- Blog: Article, Hero, Feature Card
- Utility classes
- Responsive breakpoints

---

**Nocto Agency** • Екатеринбург • [nocto.ru](https://nocto.ru)
