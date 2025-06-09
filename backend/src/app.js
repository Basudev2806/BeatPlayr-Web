const express = require('express');
const config = require('./config');
const { security, rateLimiting, errorHandler } = require('./middleware');
const { pathBlockingMiddleware } = require('./middleware/pathBlocking');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();

// Security middleware
app.use(security.helmet);
app.use(security.cors);

// Path Blocking middleware (after IP blocking)
app.use(pathBlockingMiddleware);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.clientIP || req.ip}`, {
    userAgent: req.headers['user-agent'],
    referer: req.headers.referer
  });
  next();
});

// Rate limiting
app.use('/api/', rateLimiting);

// API routes
app.use('/api', routes);

// Health check (outside rate limiting)
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/', (req, res) => {
  const frontendUrl = config.frontendUrl || process.env.FRONTEND_URL || 'http://localhost:3000';
  
  logger.info(`Redirecting root access to frontend: ${frontendUrl}`, {
    ip: req.clientIP || req.ip,
    userAgent: req.headers['user-agent'],
    referer: req.headers.referer
  });
  
  // 302 temporary redirect to frontend
  res.redirect(302, frontendUrl);
});

// 404 handler
app.use('*', (req, res) => {
  logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;