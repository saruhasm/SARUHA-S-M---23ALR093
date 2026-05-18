const express = require('express');
const cors = require('cors');
const loggingMiddleware = require('./middleware/logger');
const notificationRoutes = require('./routes/notificationRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Campus Notification System Backend is running',
    version: '1.0.0'
  });
});
app.use('/api', notificationRoutes);
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.originalUrl
  });
});
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
app.listen(PORT, () => {
  const timestamp = new Date().toISOString();
  process.stdout.write(`[${timestamp}] Server is running on http://localhost:${PORT}\n`);
});

module.exports = app;
