require('dotenv').config();

const { Sequelize } = require('sequelize');

// Centralized configuration for Sequelize
const config = {
  dialect: 'postgres',
  dialectOptions: {
    decimalNumbers: true,
  },
  host: process.env.DB_HOST || 'localhost', // Default to localhost if DB_HOST is not set
  port: process.env.DB_PORT || 5432, // Default to the Postgres port
  pool: {
    max: 5, // Max number of connections in the pool
    min: 0,
    acquire: 30000, // The maximum time in ms to acquire a connection before throwing an error
    idle: 10000, // The maximum time in ms that a connection can be idle before being released
  },
};

// Check if the DATABASE_URL (e.g., Heroku Postgres) is available for production environments
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, config)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, config);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
