const userModel = require('../model/userModel');

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
    const userData = await userModel.getUserById(req.params.id);
    res.send({ userData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}

async function addUserToFile(req, res) {
  try {
    const objectFromRequest = req.body; // new obecjt from request
    const newUser = await userModel.addUserToFile(objectFromRequest);
    res.send({ newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}

module.exports = { getUsers, getUserById, addUserToFile };
