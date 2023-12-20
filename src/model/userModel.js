

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


async function getUsers() {
  try {
    const results = await sequelize.query('SELECT * FROM users');
    return results[0];
  } catch (error) {
    throw new Error(`Error reading users data: ${error.message}`);
  }
}

async function getUserById(userId) {
  try {
    const results = await sequelize.query(`SELECT * FROM users WHERE userId = ${userId}`);
    return results[0][0];
  } catch (error) {
    throw new Error(`Error reading user data: ${error.message}`);
  }
}

async function addUser(userId, title, completed) {
  try {
    await sequelize.query(`INSERT INTO users (userId, title, completed) VALUES (${userId}, '${title}', ${completed})`);
  } catch (error) {
    throw new Error(`Error inserting user data: ${error.message}`);
  }
}

module.exports = { getUsers, getUserById, addUser, testConnection, sequelize };
