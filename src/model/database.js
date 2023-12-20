const { Sequelize } = require('sequelize');

// The DB being used is MySql Server.

// Initializing the DB configurations
const sequelize = new Sequelize('users', 'root', 'Planet@1122334455', {
  host: 'localhost',
  dialect: 'mysql', 
});



// Test connectivity with DB
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


module.exports = {sequelize, testConnection};
