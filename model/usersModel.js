const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../files/users.json');

const usersData = fs.readFileSync(filePath, 'utf-8');

const getUsers = () => {
  return JSON.parse(usersData);
};

const getUserById = (userId) => {
  return JSON.parse(usersData).find((item) => item.userId == userId);
};

module.exports ={getUsers, getUserById};