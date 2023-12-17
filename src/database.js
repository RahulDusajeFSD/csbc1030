// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('users', 'root', 'Planet@1122334455', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
