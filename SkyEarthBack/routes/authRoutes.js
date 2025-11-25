/**
 * Authentication Routes
 * 
 * Defines all authentication-related API endpoints.
 */

const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * POST /api/auth/register
 * Register a new user
 * Body: { email, first_name, last_name, password }
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * Login user and get JWT token
 * Body: { email, password }
 */
router.post('/login', login);

/**
 * GET /api/auth/me
 * Get current logged-in user info
 * Protected route - requires valid JWT token in Authorization header
 * Header: Authorization: Bearer <token>
 */
router.get('/me', authenticateToken, getMe);

module.exports = router;

