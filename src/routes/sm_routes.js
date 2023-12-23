const express = require('express');
const router = express.Router();

const sm_controller = require('../controller/sm_controller') 
const sm_auth_controller = require('../controller/sm_auth_controller');
const sm_auth_middleware = require('../middleware/sm_auth_middleware')

router.use(express.json());

router.get("/", sm_controller.getUsers);

router.post("/login", sm_auth_controller.login);

router.get("/posts", sm_auth_middleware.authenticateUser, sm_auth_middleware.authorizeUser, sm_controller.getPostsOfUser);

router.get("/posts/comments", sm_auth_middleware.authenticateUser, sm_auth_middleware.authorizeUser, sm_controller.getCommentsOfPost);


router.post('/posts', sm_auth_middleware.authenticateUser, sm_auth_middleware.authorizeUser, sm_controller.createNewUserPost);

router.put('/update/post', sm_auth_middleware.authenticateUser, sm_auth_middleware.authorizeUser, sm_controller.updatePost);

router.put('/update/comment', sm_auth_middleware.authenticateUser, sm_auth_middleware.authorizeUser, sm_controller.updateComment);

router.delete('/delete/comment', sm_auth_middleware.authenticateUser, sm_auth_middleware.authorizeUser, sm_controller.deleteComment);

module.exports=router;