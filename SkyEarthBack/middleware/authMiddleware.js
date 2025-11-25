/**
 * Authentication Middleware
 * 
 * This middleware verifies JWT tokens from the Authorization header.
 * Format: "Bearer <token>"
 * 
 * If token is valid, attaches user info to req.user
 * If token is invalid or missing, returns 401 Unauthorized
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware to verify JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  // If no token provided
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_in_production');
    
    // Attach user info to request object
    req.user = decoded;
    
    // Continue to next middleware/route
    next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};

module.exports = { authenticateToken };

