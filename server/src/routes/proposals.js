import express from 'express';

const router = express.Router();

// In-memory storage для КП
let proposals = [
  {
    id: '1',
    userId: 'demo-user-1',
    clientName: 'ООО "СтройКом"',
    clientSite: 'stroykom.ru',
    problems: ['Низкий CTR', 'Нет UTM', 'Слив на РСЯ'],
    services: [
      { name: 'Настройка Яндекс.Директ', price: 30000 },
      { name: 'Глубокий аудит', price: 15000 }
    ],
    strategy: 'Мы предлагаем комплексный подход...',
    totalPrice: 45000,
    status: 'draft',
    createdAt: new Date('2025-12-10'),
    updatedAt: new Date('2025-12-10')
  }
];

let nextId = 2;

function generateId() {
  return String(nextId++);
}

// GET /api/proposals — Список КП
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    
    let filtered = [...proposals];
    if (status) {
      filtered = filtered.filter(p => p.status === status);
    }

    // Сортировка по дате (новые первые)
    filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    res.json(filtered);
  } catch (error) {
    console.error('Get proposals error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/proposals/:id — Получить КП по ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = proposals.find(p => p.id === id);
    
    if (!proposal) {
      return res.status(404).json({ error: 'КП не найдено' });
    }

    res.json(proposal);
  } catch (error) {
    console.error('Get proposal error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/proposals — Создать КП
router.post('/', async (req, res) => {
  try {
    const { clientName, clientSite, problems, services, strategy, status = 'draft' } = req.body;

    if (!clientName || !services || services.length === 0) {
      return res.status(400).json({ error: 'Заполните обязательные поля' });
    }

    const totalPrice = services.reduce((sum, service) => sum + (service.price || 0), 0);

    const proposal = {
      id: generateId(),
      userId: 'demo-user-1',
      clientName,
      clientSite: clientSite || '',
      problems: problems || [],
      services,
      strategy: strategy || '',
      totalPrice,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    proposals.push(proposal);
    res.status(201).json(proposal);
  } catch (error) {
    console.error('Create proposal error:', error);
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/proposals/:id — Обновить КП
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, clientSite, problems, services, strategy, status } = req.body;

    const index = proposals.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'КП не найдено' });
    }

    const totalPrice = services 
      ? services.reduce((sum, service) => sum + (service.price || 0), 0)
      : proposals[index].totalPrice;

    proposals[index] = {
      ...proposals[index],
      ...(clientName && { clientName }),
      ...(clientSite !== undefined && { clientSite }),
      ...(problems && { problems }),
      ...(services && { services, totalPrice }),
      ...(strategy !== undefined && { strategy }),
      ...(status && { status }),
      updatedAt: new Date()
    };

    res.json(proposals[index]);
  } catch (error) {
    console.error('Update proposal error:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/proposals/:id — Удалить КП
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const index = proposals.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'КП не найдено' });
    }

    proposals.splice(index, 1);
    res.json({ message: 'КП удалено' });
  } catch (error) {
    console.error('Delete proposal error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
