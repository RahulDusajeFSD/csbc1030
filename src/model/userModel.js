const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../files/users.json');

async function getUsers() {
  try {
    const usersData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(usersData);
  } catch (error) {
    throw new Error(`Error reading users file: ${error.message}`);
  }
}


async function getUserById(userId) {
  try {
    const usersData = await getUsers(); // leveraging above function to retrieve all users
    return usersData.find((item) => item.userId == userId);
  } catch (error) {
    throw new Error(`Error reading users file: ${error.message}`);
  }
}

async function addUserToFile(userObject) {
  try {
    const usersData = await getUsers(); // leveraging above function to retrieve all users
    usersData.push(userObject); // new object from request
    await fs.writeFile(filePath, JSON.stringify(usersData), 'utf-8');
    return userObject;
  } catch (error) {
    throw new Error(`Error writing to users file: ${error.message}`);
  }
}

module.exports = {getUsers, getUserById, addUserToFile };
