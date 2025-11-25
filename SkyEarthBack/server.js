/**
 * Main Server File
 * 
 * This is the entry point of the Express.js backend application.
 * It sets up the server, middleware, routes, and database connection.
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database configuration
const { sequelize, testConnection } = require('./config/db');

// Import models
const User = require('./models/User');

// Import routes
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'SkyEarth Backend API is running',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Server port
const PORT = process.env.PORT || 5000;

/**
 * Initialize database and start server
 */
const startServer = async () => {
  try {
    // Test database connection
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Failed to connect to database. Please check your MySQL configuration.');
      process.exit(1);
    }

    // Sync database models (creates tables if they don't exist)
    // force: false - does not drop existing tables
    // alter: false - does not alter existing tables
    await sequelize.sync({ force: false, alter: false });
    console.log('✅ Database models synchronized successfully.');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
      console.log(`🔐 Authentication endpoints:`);
      console.log(`   POST http://localhost:${PORT}/api/auth/register`);
      console.log(`   POST http://localhost:${PORT}/api/auth/login`);
      console.log(`   GET  http://localhost:${PORT}/api/auth/me (protected)`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await sequelize.close();
  process.exit(0);
});

module.exports = app;

