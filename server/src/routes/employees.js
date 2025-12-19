import express from 'express';

const router = express.Router();

// Mock данные сотрудников
const employees = [
  {
    id: '1',
    name: 'Алексей Иванов',
    role: 'Account Manager',
    plan: 500000,
    actual: 520000,
    clientsCount: 8,
    projectsCount: 12,
    clients: [
      { name: 'ООО "АвтоСпец"', revenue: 250000 },
      { name: 'TechStart Corp', revenue: 120000 },
      { name: 'IP Petrov', revenue: 150000 }
    ]
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    role: 'Sales Manager',
    plan: 400000,
    actual: 380000,
    clientsCount: 6,
    projectsCount: 9,
    clients: [
      { name: 'Клиент "Мебель+"', revenue: 180000 },
      { name: 'Digital Agency Pro', revenue: 120000 },
      { name: 'Startup "FoodTech"', revenue: 80000 }
    ]
  },
  {
    id: '3',
    name: 'Дмитрий Петров',
    role: 'Project Manager',
    plan: 600000,
    actual: 420000,
    clientsCount: 5,
    projectsCount: 8,
    clients: [
      { name: 'B2B SaaS Client', revenue: 200000 },
      { name: 'E-commerce Store', revenue: 120000 },
      { name: 'Retail Chain', revenue: 100000 }
    ]
  },
  {
    id: '4',
    name: 'Елена Козлова',
    role: 'Marketing Manager',
    plan: 350000,
    actual: 360000,
    clientsCount: 7,
    projectsCount: 10,
    clients: [
      { name: 'Local Business', revenue: 150000 },
      { name: 'Online Shop', revenue: 110000 },
      { name: 'Service Company', revenue: 100000 }
    ]
  }
];

// GET /api/employees/performance
router.get('/performance', async (req, res) => {
  try {
    const { period = 'current_month' } = req.query;
    
    // В реальности здесь будет фильтрация по периоду
    // Пока просто возвращаем mock данные
    
    res.json(employees);
  } catch (error) {
    console.error('Get performance error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/employees/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = employees.find(e => e.id === id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Сотрудник не найден' });
    }

    res.json(employee);
  } catch (error) {
    console.error('Get employee error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
