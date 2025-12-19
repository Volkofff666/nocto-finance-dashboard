import express from 'express';
import cors from 'cors';
import financeRoutes from './routes/finance.js';
import proposalRoutes from './routes/proposals.js';
import employeeRoutes from './routes/employees.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Nocto Finance API (Mock Mode)',
    timestamp: new Date().toISOString() 
  });
});

// Routes
app.use('/api/finance', financeRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/employees', employeeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\nСервер Nocto Finance запущен: http://localhost:${PORT}`);
  console.log(`Режим: MOCK (in-memory storage)`);
  console.log(`Health check: http://localhost:${PORT}/health\n`);
});
