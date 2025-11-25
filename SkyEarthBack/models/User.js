/**
 * User Model
 * 
 * Defines the User table structure using Sequelize.
 * Fields:
 * - id: auto-increment primary key
 * - email: unique, not null
 * - first_name: string
 * - last_name: string
 * - password: hashed, not null
 * - createdAt/updatedAt: automatic timestamps
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please provide a valid email address'
      },
      notEmpty: {
        msg: 'Email is required'
      }
    }
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: {
        args: [0, 100],
        msg: 'First name must be less than 100 characters'
      }
    }
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: {
        args: [0, 100],
        msg: 'Last name must be less than 100 characters'
      }
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password is required'
      },
      len: {
        args: [6, 255],
        msg: 'Password must be at least 6 characters long'
      }
    }
  }
}, {
  tableName: 'users',
  timestamps: true, // This enables createdAt and updatedAt
  underscored: false // Use camelCase for createdAt/updatedAt
});

module.exports = User;

