const userModel = require('../model/usersModel');

const getUsers = (req, res) => {
  const usersData = userModel.getUsers();
  res.json({ usersData });
};

const getUserById = (req, res) => {
  const userData = userModel.getUserById(req.params.id);
  res.json({ userData });
};

module.exports = {getUsers, getUserById};
