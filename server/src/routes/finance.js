import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Hardcoded user ID for no-auth mode
const DEMO_USER_ID = 'demo-user-1';

// GET /api/finance/stats — KPI метрики
router.get('/stats', async (req, res) => {
  try {
    const userId = DEMO_USER_ID;

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    });

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
    const userId = DEMO_USER_ID;

    const where = {
      userId,
      ...(startDate && endDate && {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      }),
      ...(status && { status })
    };

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        orderBy: { date: 'desc' },
        skip: (page - 1) * limit,
        take: parseInt(limit)
      }),
      prisma.transaction.count({ where })
    ]);

    res.json({
      data: transactions,
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

    const transaction = await prisma.transaction.create({
      data: {
        userId: DEMO_USER_ID,
        client,
        amount: parseFloat(amount),
        status,
        date: new Date(date)
      }
    });

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

    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        ...(client && { client }),
        ...(amount !== undefined && { amount: parseFloat(amount) }),
        ...(status && { status }),
        ...(date && { date: new Date(date) })
      }
    });

    res.json(transaction);
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/finance/transactions/:id — Удалить транзакцию
router.delete('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.transaction.delete({ where: { id } });
    res.json({ message: 'Транзакция удалена' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
