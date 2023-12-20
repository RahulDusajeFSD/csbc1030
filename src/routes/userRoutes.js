const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controller/authController');

router.use(express.json());

router.post('/login', authController.login);   // users/login - routed to authController to generate JWT token.

router.get('/', userController.getUsers); // Currently, only routed to getAllUsers without any authentication.

router.get('/:id', authMiddleware.authenticateUser, userController.getUserById);

// The above route first checks for authentication which in authenticationMiddleware and upon successful exxecution of auth middleware,
// it moves to next() which is to getUserByID in user controller.

router.post('/', authMiddleware.authenticateUser, authMiddleware.authorizeUser, userController.addUserToFile);

// The above route first checks for authentication which in authenticationMiddleware and upon successful exxecution of auth middleware,
// it moves to next() which is to authorize the user - this checks if the authenticated user has user id = 1 and if so, it moves to next() 
// which is to add UserToFile.

module.exports = router;
