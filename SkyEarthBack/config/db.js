/**
 * Database Configuration
 * 
 * This file sets up the Sequelize connection to MySQL database.
 * Database: skyearth_db
 * Host: localhost
 * Port: 3306
 * User: root
 * Password: (empty)
 * 
 * The database will be created automatically if it doesn't exist.
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'skyearth_db';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;

// Create Sequelize instance
const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

/**
 * Create database if it doesn't exist
 */
const createDatabaseIfNotExists = async () => {
  try {
    // Connect to MySQL without specifying a database
    const tempSequelize = new Sequelize('', DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'mysql',
      logging: false
    });

    // Create database if it doesn't exist
    await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await tempSequelize.close();
    
    console.log(`✅ Database '${DB_NAME}' is ready.`);
    return true;
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    return false;
  }
};

/**
 * Test database connection
 */
const testConnection = async () => {
  try {
    // First, ensure the database exists
    const dbCreated = await createDatabaseIfNotExists();
    if (!dbCreated) {
      return false;
    }

    // Then test the connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    return false;
  }
};

module.exports = { sequelize, testConnection };

