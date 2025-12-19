import express from 'express';

const router = express.Router();

// In-memory storage (вместо БД)
let transactions = [
  {
    id: '1',
    userId: 'demo-user-1',
    client: 'ООО "АвтоСпец"',
    amount: 450000,
    status: 'paid',
    date: new Date('2025-12-15'),
    createdAt: new Date('2025-12-15')
  },
  {
    id: '2',
    userId: 'demo-user-1',
    client: 'TechStart Corp',
    amount: 120000,
    status: 'paid',
    date: new Date('2025-12-10'),
    createdAt: new Date('2025-12-10')
  },
  {
    id: '3',
    userId: 'demo-user-1',
    client: 'IP Ivanov',
    amount: 85000,
    status: 'pending',
    date: new Date('2025-12-08'),
    createdAt: new Date('2025-12-08')
  },
  {
    id: '4',
    userId: 'demo-user-1',
    client: 'Яндекс.Облако',
    amount: -45000,
    status: 'expense',
    date: new Date('2025-12-01'),
    createdAt: new Date('2025-12-01')
  },
  {
    id: '5',
    userId: 'demo-user-1',
    client: 'Зарплата разработчикам',
    amount: -850000,
    status: 'expense',
    date: new Date('2025-12-01'),
    createdAt: new Date('2025-12-01')
  },
  {
    id: '6',
    userId: 'demo-user-1',
    client: 'Клиент "Мебель+"',
    amount: 320000,
    status: 'paid',
    date: new Date('2025-11-28'),
    createdAt: new Date('2025-11-28')
  },
  {
    id: '7',
    userId: 'demo-user-1',
    client: 'Digital Agency Pro',
    amount: 180000,
    status: 'paid',
    date: new Date('2025-11-20'),
    createdAt: new Date('2025-11-20')
  },
  {
    id: '8',
    userId: 'demo-user-1',
    client: 'Аренда офиса',
    amount: -120000,
    status: 'expense',
    date: new Date('2025-11-01'),
    createdAt: new Date('2025-11-01')
  },
  {
    id: '9',
    userId: 'demo-user-1',
    client: 'Маркетинг (Google Ads)',
    amount: -85000,
    status: 'expense',
    date: new Date('2025-11-05'),
    createdAt: new Date('2025-11-05')
  },
  {
    id: '10',
    userId: 'demo-user-1',
    client: 'Startup "FoodTech"',
    amount: 290000,
    status: 'paid',
    date: new Date('2025-10-25'),
    createdAt: new Date('2025-10-25')
  }
];

let nextId = 11;

// Helper для генерации ID
function generateId() {
  return String(nextId++);
}

// GET /api/finance/stats — KPI метрики
router.get('/stats', async (req, res) => {
  try {
    const income = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = Math.abs(
      transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const netProfit = income - expenses;
    const margin = income > 0 ? ((netProfit / income) * 100).toFixed(1) : 0;

    // История по месяцам (последние 6 месяцев)
    const history = {
      labels: [],
      income: [],
      profit: []
    };

    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const monthTransactions = transactions.filter(t => {
        const txDate = new Date(t.date);
        return txDate >= monthDate && txDate < nextMonth;
      });

      const monthIncome = monthTransactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

      const monthExpenses = Math.abs(
        monthTransactions
          .filter(t => t.amount < 0)
          .reduce((sum, t) => sum + t.amount, 0)
      );

      history.labels.push(monthDate.toLocaleDateString('ru-RU', { month: 'short' }));
      history.income.push(monthIncome);
      history.profit.push(monthIncome - monthExpenses);
    }

    res.json({
      income,
      expenses,
      netProfit,
      margin: parseFloat(margin),
      history,
      transactionCount: transactions.length
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/finance/transactions — Список транзакций
router.get('/transactions', async (req, res) => {
  try {
    const { page = 1, limit = 20, startDate, endDate, status } = req.query;

    let filtered = [...transactions];

    // Фильтр по датам
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter(t => {
        const txDate = new Date(t.date);
        return txDate >= start && txDate <= end;
      });
    }

    // Фильтр по статусу
    if (status) {
      filtered = filtered.filter(t => t.status === status);
    }

    // Сортировка по дате (новые первые)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Пагинация
    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedData = filtered.slice(startIndex, endIndex);

    res.json({
      data: paginatedData,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Transactions error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/finance/transactions — Добавить транзакцию
router.post('/transactions', async (req, res) => {
  try {
    const { client, amount, status, date } = req.body;

    if (!client || amount === undefined || !status || !date) {
      return res.status(400).json({ error: 'Заполните все поля' });
    }

    const transaction = {
      id: generateId(),
      userId: 'demo-user-1',
      client,
      amount: parseFloat(amount),
      status,
      date: new Date(date),
      createdAt: new Date()
    };

    transactions.push(transaction);
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/finance/transactions/:id — Обновить транзакцию
router.put('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { client, amount, status, date } = req.body;

    const index = transactions.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Транзакция не найдена' });
    }

    transactions[index] = {
      ...transactions[index],
      ...(client && { client }),
      ...(amount !== undefined && { amount: parseFloat(amount) }),
      ...(status && { status }),
      ...(date && { date: new Date(date) })
    };

    res.json(transactions[index]);
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/finance/transactions/:id — Удалить транзакцию
router.delete('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const index = transactions.findIndex(t => t.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Транзакция не найдена' });
    }

    transactions.splice(index, 1);
    res.json({ message: 'Транзакция удалена' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
