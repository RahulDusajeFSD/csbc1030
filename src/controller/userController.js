const userModel = require('../model/userModel');

// Receives the rquests coming from Routes in userRoutes.js


async function getUsers(req, res) {       
  try {
    const usersData = await userModel.getUsers();  
    res.send({ usersData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}

async function getUserById(req, res) {
  try {
    const usersData = await userModel.getUsers();
    const userData = usersData.find((item) => item.userId == req.params.id);

    if (req.user.userId != req.params.id) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }

    res.send({ userData });
  } catch (error) {
    console.error(`Error reading users file: ${error.message}`);
    res.status(500).send(`Error reading users file: ${error.message}`);
  }
}

async function addUserToFile(req, res) {
  try {
    const objectFromRequest = req.body;
    const newUser = await userModel.addUserToFile(objectFromRequest);
    res.send({ newUser });
  } catch (error) {
    console.error(`Error adding user: ${error.message}`);
    res.status(500).send(`Error adding user: ${error.message}`);
  }
}

module.exports ={getUsers, getUserById, addUserToFile}