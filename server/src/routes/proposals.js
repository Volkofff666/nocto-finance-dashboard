import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/proposals — Список КП
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const userId = req.user.id;

    const where = {
      userId,
      ...(status && { status })
    };

    const [proposals, total] = await Promise.all([
      prisma.proposal.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: parseInt(limit)
      }),
      prisma.proposal.count({ where })
    ]);

    res.json({
      data: proposals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get proposals error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/proposals/:id — Конкретное КП
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    if (!proposal || proposal.userId !== req.user.id) {
      return res.status(404).json({ error: 'КП не найдено' });
    }

    res.json(proposal);
  } catch (error) {
    console.error('Get proposal error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/proposals — Создать КП
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { clientName, clientSite, problems, services, strategy, status } = req.body;

    if (!clientName || !problems || !services || !strategy) {
      return res.status(400).json({ error: 'Заполните обязательные поля' });
    }

    // Расчет общей стоимости
    const totalPrice = Array.isArray(services)
      ? services.reduce((sum, s) => sum + (s.price || 0), 0)
      : 0;

    const proposal = await prisma.proposal.create({
      data: {
        userId: req.user.id,
        clientName,
        clientSite: clientSite || null,
        problems: JSON.stringify(problems),
        services: JSON.stringify(services),
        strategy,
        totalPrice,
        status: status || 'draft'
      }
    });

    res.status(201).json(proposal);
  } catch (error) {
    console.error('Create proposal error:', error);
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/proposals/:id — Обновить КП
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, clientSite, problems, services, strategy, status } = req.body;

    // Проверка владельца
    const existing = await prisma.proposal.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.user.id) {
      return res.status(404).json({ error: 'КП не найдено' });
    }

    // Пересчет стоимости если изменились услуги
    const totalPrice = services
      ? Array.isArray(services)
        ? services.reduce((sum, s) => sum + (s.price || 0), 0)
        : existing.totalPrice
      : existing.totalPrice;

    const proposal = await prisma.proposal.update({
      where: { id },
      data: {
        ...(clientName && { clientName }),
        ...(clientSite !== undefined && { clientSite }),
        ...(problems && { problems: JSON.stringify(problems) }),
        ...(services && { services: JSON.stringify(services) }),
        ...(strategy && { strategy }),
        ...(status && { status }),
        totalPrice
      }
    });

    res.json(proposal);
  } catch (error) {
    console.error('Update proposal error:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/proposals/:id — Удалить КП
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Проверка владельца
    const existing = await prisma.proposal.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.user.id) {
      return res.status(404).json({ error: 'КП не найдено' });
    }

    await prisma.proposal.delete({ where: { id } });
    res.json({ message: 'КП удалено' });
  } catch (error) {
    console.error('Delete proposal error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;