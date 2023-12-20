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

async function addUserToFile(userObject) {
  try {
    const usersData = await getUsers();
    usersData.push(userObject);
    await fs.writeFile(filePath, JSON.stringify(usersData), 'utf-8');
    return userObject;
  } catch (error) {
    throw new Error(`Error writing to users file: ${error.message}`);
  }
}


module.exports={getUsers,addUserToFile}