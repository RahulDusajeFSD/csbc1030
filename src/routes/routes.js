const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.use(express.json());

router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.addUserToFile);

module.exports = router;
